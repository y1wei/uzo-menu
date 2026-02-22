<template>
  <!-- NAV Fixed-->
  <Nav
    :categories="allCategories"
    :activeCategory="activeCategory"
    @navigate="scrollToSection"
  />

  <div>
    <!-- HERO -->
    <div class="hero">
      <span class="hero-icon">{{ restaurant.icon }}</span>
      <h1>{{ restaurant.name }}</h1>
      <p>{{ restaurant.tagline }}</p>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <div class="info-bar">
        <template v-if="todayHours">
          🕐 Open today · {{ todayHours.label }} {{ todayHours.open }} – {{ todayHours.close }}
        </template>
        <template v-else>
          <span>Sorry, we're closed today.</span>
        </template>
      </div>
      <div class="allergy-bar">⚠️ Allergen info available on request — ask our staff</div>

      <div v-if="activeHappyHourPeriod" class="happy-hour-banner">
        <div style="text-align: center;">🎉 Happy Hour right now!</div> 
        {{ restaurant.happyHour.discount }} off on select beers from {{ activeHappyHourPeriod.start }} until {{ activeHappyHourPeriod.end }}
      </div>

      <!-- DRINKS -->
      <div
        v-for="cat in visibleDrinkCategories"
        :key="cat.id"
        class="section"
        :id="'sec-' + cat.id"
      >
        <div class="sec-title">{{ cat.icon }} {{ cat.label }}</div>
        <!-- Featured card(s) - handle both single item and array -->
        <template v-if="cat.featured">
          <!-- If featured is an array -->
          <template v-if="Array.isArray(cat.featured)">
            <FeaturedCard v-for="item in cat.featured" :key="item.name" :item="item"/>
          </template>
          <!-- If featured is a single item -->
          <FeaturedCard v-else :item="cat.featured" />
        </template>

        <!-- Compact style -->
        <div v-if="cat.layout === 'compact'" class="drink-compact-list">
          <CompactCard v-for="item in cat.items" :key="item.name" :item="item" />
        </div>

        <!-- Card style -->
        <div v-else class="drinks-list">
          <RegularCard v-for="item in cat.items" :key="item.name" :item="item" />
        </div>
      </div>

      <!-- FOOD DIVIDER -->
      <!-- <div class="section-divider"><span>🍽 Food Menu</span></div> -->

      <!-- FOOD SECTIONS -->
      <!-- <div
        v-for="cat in foodCategories"
        :key="cat.id"
        class="section"
        :id="'sec-' + cat.id"
      >
        <div class="sec-title">{{ cat.icon }} {{ cat.label }}</div>
        <FoodCard v-if="cat.featured" :item="cat.featured" :featured="true" />
        <FoodCard v-for="item in cat.items" :key="item.name" :item="item" />
      </div> -->
      <div class="footer">
        <h3>Can't find what you're looking for?</h3>
        <p>Our friendly staff is here to help! Feel free to ask about special requests, recommendations, or items not listed on the menu.</p>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Nav from '../components/Nav.vue'
import FoodCard from '../components/FoodCard.vue'
import { restaurant, drinkCategories, foodCategories } from '../data/menu.js'
import RegularCard from '../components/RegularCard.vue'
import CompactCard from '../components/CompactCard.vue'
import FeaturedCard from '../components/FeaturedCard.vue'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

const menuSettings = ref({
  hiddenCategories: [],
  hiddenItems: {}
})

const now = ref(new Date())
const todayIndex = computed(() => now.value.getDay()) // 0 = Sunday, 6 = Saturday
const currentTime = computed(() => now.value.getHours() * 100 + now.value.getMinutes()) // e.g. 14:30 = 1430

// == OPENING HOURS ==
const todayHours = computed(() =>{
  const hours = restaurant.hours[todayIndex.value]
  if (!hours || !hours.open || !hours.close) {
    return null
  }
  return hours
})

const activeHappyHourPeriod = computed(() => {
  // If closed, no happy hour
  if (!restaurant.happyHour || !todayHours.value) return null
  
  const { start, end } = restaurant.happyHour
  const starts = Array.isArray(start) ? start : [start]
  const ends = Array.isArray(end) ? end : [end]

  for (let i = 0; i < starts.length; i++) {
    const startTime = parseInt(starts[i].replace(':', ''))
    const endTime = parseInt(ends[i].replace(':', ''))
    
    if (currentTime.value >= startTime && currentTime.value < endTime) {
      return { start: starts[i], end: ends[i] }
    }
  }

  return null
})
const isHappyHour = computed(() => activeHappyHourPeriod.value !== null)

// Apply happy hour discount to prices
function applyDiscountToItem(item) {  
  const discount = parseFloat(restaurant.happyHour.discount) / 100
  

  item.badge = 'happyhour',
  item.badgeLabel = `🔥 ${restaurant.happyHour.discount} off`
  
  // If item has a single price
  if (item.price) {
    item.originalPrice = item.price
    item.price = calculateDiscount(item.price, discount)
  }
  
  // If item has sizes with different prices
  if (item.sizes) {
    item.sizes = item.sizes.map(size => ({
      ...size,
      originalPrice: size.price,
      price: calculateDiscount(size.price, discount)
    }))
  }
}

function calculateDiscount(price, discount) {
  const num = parseFloat(price.replace('€', ''))
  const discounted = (num * (1 - discount)).toFixed(2)
  return `€${discounted}`
}

// Filter categories based on happy hour
const visibleDrinkCategories = computed(() => {
  return drinkCategories
    .filter(cat => {
        // Filter admin-hidden categories
        if (menuSettings.value.hiddenCategories.includes(cat.id)) return false
        // Filter happy hour category when not active
        if (cat.happyHourOnly && !isHappyHour.value) return false
        return true
    })
    .map(cat => {

      // Deep clone to avoid mutation
      const clonedCat = JSON.parse(JSON.stringify(cat))
      // Filter out admin-hidden items
      if (menuSettings.value.hiddenItems[cat.id]) {
        clonedCat.items = clonedCat.items.filter((item, idx) => 
          !menuSettings.value.hiddenItems[cat.id].includes(idx)
        )
        
        // Also filter featured if it's an array
        if (Array.isArray(clonedCat.featured)) {
          clonedCat.featured = clonedCat.featured.filter((item, idx) => 
            !menuSettings.value.hiddenItems[cat.id].includes(idx)
          )
        }
      }

      if (isHappyHour.value) {
        // Apply to featured
        if (clonedCat.featured) {
          const featured = Array.isArray(clonedCat.featured) ? clonedCat.featured : [clonedCat.featured]
          featured.forEach(item => {
            if (item.happyHour) {
              applyDiscountToItem(item)
            }
          })
        }

        // Apply to items
        clonedCat.items.forEach(item => {
          if (item.happyHour) {
            applyDiscountToItem(item)
          }
        })
      }
      
      return clonedCat
    })
})
const allCategories = computed(() => [
  ...visibleDrinkCategories.value.map(c => ({ id: c.id, icon: c.icon, label: c.label })),
  ...foodCategories.map(c => ({ id: c.id, icon: c.icon, label: c.label }))
])

// == NAVIGATION ==
const activeCategory = ref(drinkCategories[0].id)
function scrollToSection(id) {
  activeCategory.value = id
  const el = document.getElementById('sec-' + id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// == LIFECYCLE ==
let intervalId = null

onMounted(() => {
    // Real-time listener for admin settings
    const unsubscribe = onSnapshot(doc(db, 'settings', 'menu'), (doc) => {
        if (doc.exists()) {
        const data = doc.data()
        menuSettings.value = {
            hiddenCategories: data.hiddenCategories || [],
            hiddenItems: data.hiddenItems || {}
        }
        }
    })

  // Update time every minute
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 60000)

  const ids = [
    ...visibleDrinkCategories.value.map(c => c.id),
    ...foodCategories.map(c => c.id)
  ]
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) activeCategory.value = e.target.id.replace('sec-', '')
    })
  }, { rootMargin: '-40% 0px -55% 0px' })

  ids.forEach(id => {
    const el = document.getElementById('sec-' + id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  //if (intervalId) clearInterval(intervalId)
  unsubscribe()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.card {
  display: flex;
  overflow: hidden;
  cursor: pointer;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  transition: transform 0.15s;
  margin-bottom: 10px;
  gap: 10px;
}
.card:active { transform: scale(0.98); }

.card-thumb img{
  max-width: 100%;
  padding: 5px;
}

.hero { 
  background: linear-gradient(160deg, #D35400, #F39C12); 
  padding: 40px 24px 32px; 
  text-align: center; 
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: calc(50vw - 50%);
  padding-right: calc(50vw - 50%);
}

.hero-icon { font-size: 3rem; display: block; margin-bottom: 10px; }
.hero h1 { 
  font-family: 'Lobster';
  font-size: 1.8rem; 
  font-weight: 800; 
  color: #fff; 
  letter-spacing: -0.5px; 
}
.hero p { color: rgba(255,255,255,0.55); font-size: 0.85rem; margin-top: 5px; }
.content { padding: 0 14px 60px; }
.info-bar { 
  background: var(--accent-light); 
  border-radius: 12px; 
  padding: 11px 14px; 
  margin: 18px 0 4px; 
  font-size: 15px; 
  color: var(--accent); 
  font-weight: 500; 
}
.allergy-bar {
  background: #fffbea;
  border: 1px solid #f0e080;
  color: #7a6200;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.78rem;
  font-weight: 500;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.happy-hour-banner {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #7a5c00;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 12px 16px;
  border-radius: 12px;
  margin: 16px 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  border: 2px solid #ffed4e;
}
.section { padding-top: 22px; }
.sec-title { 
  font-size: 1.1rem; 
  font-weight: 800; 
  color: var(--text); 
  margin-bottom: 12px; 
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.sec-title::after { content: ''; flex: 1; height: 2px; background: var(--border); border-radius: 4px; }
.drinks-list {
  display: flex;
  flex-direction: column;
}
.drink-compact-list {
  overflow: hidden;
}
.section-divider { display: flex; align-items: center; gap: 12px; margin: 30px 0 0; }
.section-divider span { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); white-space: nowrap; }
.section-divider::before, .section-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.footer {
  margin: 30px auto;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  border: 2px dashed var(--border);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.footer h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
}
.footer p {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
}
</style>