<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h1>Menu Control Panel</h1>
      <button @click="goBack" class="back-btn">← Back to Menu</button>
    </div>

    <div class="admin-content">
      
      <!-- Toggle Categories -->
      <section class="admin-section">
        <h2>📂 Drink Categories</h2>
        <div class="toggle-list">
          <div v-for="cat in drinkCategories" :key="cat.id" class="toggle-item">
            <label class="toggle-label">
              <input 
                type="checkbox" 
                :checked="!settings.hiddenCategories.includes(cat.id)"
                @change="toggleCategory(cat.id)"
              />
              <span class="toggle-text">{{ cat.label }}</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Toggle Items within Categories -->
      <section class="admin-section" v-for="cat in drinkCategories" :key="'items-' + cat.id">
        <h2>{{ cat.icon }} {{ cat.label }} - Items</h2>
        <div class="toggle-list">
          <div v-for="(item, idx) in cat.items" :key="idx" class="toggle-item">
            <label class="toggle-label">
              <input 
                type="checkbox" 
                :checked="!isItemHidden(cat.id, idx)"
                @change="toggleItem(cat.id, idx)"
              />
              <span class="toggle-text">{{ item.name }}</span>
            </label>
          </div>
          <div v-if="cat.featured" v-for="(item, idx) in cat.featured" :key="idx" class="toggle-item">
            <label class="toggle-label">
              <input 
                type="checkbox" 
                :checked="!isItemHidden(cat.id, idx)"
                @change="toggleItem(cat.id, idx)"
              />
              <span class="toggle-text">{{ item.name }}</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Save Button -->
      <div class="admin-actions">
        <button @click="saveSettings" class="save-btn" :disabled="saving">
          {{ saving ? '💾 Saving...' : 'Save & Publish' }}
        </button>
        <button @click="resetSettings" class="reset-btn" :disabled="saving">
          Reset All
        </button>
      </div>

      <div v-if="lastSaved" class="last-saved">
        Last saved: {{ lastSaved }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { drinkCategories } from '../data/menu.js'

const settings = ref({
  hiddenCategories: [],
  hiddenItems: {}
})

const saving = ref(false)
const lastSaved = ref('')

// Load settings from Firebase
onMounted(async () => {
  try {
    const docRef = doc(db, 'settings', 'menu')
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      settings.value = {
        hiddenCategories: data.hiddenCategories || [],
        hiddenItems: data.hiddenItems || {}
      }
      if (data.updatedAt) {
        lastSaved.value = new Date(data.updatedAt.seconds * 1000).toLocaleString()
      }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
    alert('Error loading settings from server')
  }
})

function toggleCategory(catId) {
  const index = settings.value.hiddenCategories.indexOf(catId)
  if (index > -1) {
    settings.value.hiddenCategories.splice(index, 1)
  } else {
    settings.value.hiddenCategories.push(catId)
  }
}

function isItemHidden(catId, itemIndex) {
  return settings.value.hiddenItems[catId]?.includes(itemIndex) || false
}

function toggleItem(catId, itemIndex) {
  if (!settings.value.hiddenItems[catId]) {
    settings.value.hiddenItems[catId] = []
  }
  
  const index = settings.value.hiddenItems[catId].indexOf(itemIndex)
  if (index > -1) {
    settings.value.hiddenItems[catId].splice(index, 1)
  } else {
    settings.value.hiddenItems[catId].push(itemIndex)
  }
}

async function saveSettings() {
  saving.value = true
  try {
    const docRef = doc(db, 'settings', 'menu')
    await setDoc(docRef, {
      hiddenCategories: settings.value.hiddenCategories,
      hiddenItems: settings.value.hiddenItems,
      updatedAt: new Date()
    })
    
    lastSaved.value = new Date().toLocaleString()
    alert('✅ Settings saved! All guest devices will update within seconds.')
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('❌ Error saving settings. Check console.')
  } finally {
    saving.value = false
  }
}

async function resetSettings() {
  if (!confirm('Reset all settings to default? This will show all items.')) return
  
  saving.value = true
  try {
    settings.value = {
      hiddenCategories: [],
      hiddenItems: {}
    }
    
    const docRef = doc(db, 'settings', 'menu')
    await setDoc(docRef, {
      hiddenCategories: [],
      hiddenItems: {},
      updatedAt: new Date()
    })
    
    lastSaved.value = new Date().toLocaleString()
    alert('🔄 Settings reset!')
  } catch (error) {
    console.error('Error resetting:', error)
    alert('❌ Error resetting settings')
  } finally {
    saving.value = false
  }
}

function goBack() {
  window.location.href = '/'
}
</script>

<style scoped>
.admin-panel {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 20px 110px;
  background: var(--bg);
  min-height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border);
}

.admin-header h1 {
  font-size: 1.8rem;
  color: var(--text);
}

.back-btn {
  padding: 10px 20px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 0.9;
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-section {
  background: var(--surface);
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.admin-section h2 {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: var(--text);
  font-weight: 700;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toggle-item {
  padding: 12px 14px;
  background: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border);
  transition: background 0.2s;
}

.toggle-item:hover {
  background: var(--accent-light);
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.toggle-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--accent);
}

.toggle-text {
  font-size: 0.95rem;
  color: var(--text);
  font-weight: 500;
}

.admin-actions {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 90px;
  position: fixed;
  display: flex;
  gap: 12px;
  padding: 20px;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.save-btn, .reset-btn {
  flex: 1;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.save-btn:disabled, .reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.save-btn {
  background: #27ae60;
  color: white;
}

.save-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.reset-btn {
  background: #e74c3c;
  color: white;
}

.reset-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.last-saved {
  text-align: center;
  color: var(--muted);
  font-size: 0.85rem;
  padding: 12px;
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid var(--border);
}
</style>