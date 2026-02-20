<template>
  <div class="card featured-card">
    <div class="card-thumb">
        <template v-if="item.img">
            <img :src="'./src/assets/img/'+item.img" alt="" class="thumb-img">
        </template>
        <template v-else>
            <span class="thumb-icon">{{ item.icon }}</span>
        </template>
        
        <div v-if="item.featuredTag" class="featured-tag">{{ item.featuredTag }}</div>
    </div>
    <div class="card-body">
        <!-- Name -->
        <div class="item-name">{{ item.name }}</div>

        <!-- Description -->
        <div v-if="item.desc" class="item-desc">{{ item.desc }}</div>
      
      <!-- Top row: Badge left, Price right -->
      <div class="card-bottom">
        <BadgePill v-if="item.badge" :badge="item.badge" :badgeLabel="item.badgeLabel" />
        <div class="spacer"></div>
        
        <!-- Single price -->
        <div v-if="item.price" class="item-price">
          <span v-if="item.originalPrice" class="original-price">{{ item.originalPrice }}</span>
          <span class="featured-price">{{ item.price }}</span>
        </div>

        <!-- Sizes -->
        <div v-if="item.sizes" class="item-sizes">
          <span v-for="size in item.sizes" :key="size.label" class="item-size item-price">
            <span class="size-label">{{ size.label }}</span>
            <div class="size-prices">
              <span v-if="size.originalPrice" class="original-price">{{ size.originalPrice }}</span>
              <span class="size-price">{{ size.price }}</span>
            </div>
          </span>
        </div>
      </div>

      <!-- Options -->
      <div v-if="item.flavors || item.extras" class="item-options">
        <span class="options-label">Options:</span>
        <div class="options-tags">
          <span v-for="flavor in item.flavors" :key="flavor" class="option-tag">
            {{ flavor }}
          </span>
          <span v-for="extra in item.extras" :key="extra.name" class="option-tag">
            {{ extra.name }} <span class="extra-price">{{ extra.price }}</span>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import BadgePill from './BadgePill.vue'
defineProps({ item: Object })
</script>

<style scoped>
.featured-card {
  flex-direction: column;
}

.card-thumb {
  height: 150px;
  background: linear-gradient(135deg, #f5ede6, #e8d5c4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.thumb-img {
    height: 100%;
}
.thumb-icon {
  font-size: 4.5rem;
}

.featured-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}

.card-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.item-desc {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.4;
}

/* Standaard price style */
.item-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--accent-light);
    border-radius: 8px;
    padding: 4px 10px;
    gap: 1px;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent);
}

.original-price {
  font-size: 0.68rem;
  color: var(--muted);
  text-decoration: line-through;
}

.featured-price, .size-price {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--accent);
}

.item-sizes {
  display: flex;
  gap: 8px;
}

.size-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.size-prices {
  display: flex;
  flex-direction: column;
}

/* Options */
.item-options {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 4px;
}

.options-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--muted);
  flex-shrink: 0;
  padding-top: 2px;
}

.options-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.option-tag {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 2px 8px;
  white-space: nowrap;
  display: inline-flex;
  gap: 3px;
}

.extra-price {
  font-weight: 700;
  color: var(--accent);
}

.spacer { flex: 1; }
</style>