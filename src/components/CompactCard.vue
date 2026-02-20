<template>
  <div class="card compact-card">
    <div class="card-thumb">
      <template v-if="imageSrc">
        <img :src="imageSrc" :alt="item.name">
      </template>
      <template v-else>
        {{ item.icon }}
      </template>
      
    </div>
    <div class="card-body">
      
      <!-- Top: Just badge -->
      <div  v-if="item.badge" class="card-header">
        <BadgePill :badge="item.badge" :badgeLabel="item.badgeLabel" />
      </div>

      <!-- Name -->
      <div class="item-name">{{ item.name }}</div>

      <!-- Options -->
      <div class="item-info">
        <!-- Description -->
        <div v-if="item.desc" class="item-desc">{{ item.desc }}</div>

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

        <div class="spacer"></div>

        <!-- Price on right -->
        <span v-if="item.price" class="item-price">{{ item.price }}</span>
        <div v-if="item.sizes" class="item-sizes">
          <span v-for="size in item.sizes" :key="size.label" class="item-size item-price">
            <span class="size-label">{{ size.label }}</span>
            <span class="size-price">{{ size.price }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BadgePill from './BadgePill.vue'
import { computed } from 'vue'
import { getImage } from '../utils/getImage'

const props = defineProps({ item: Object })
const imageSrc = computed(() => getImage(props.item.img))
</script>

<style scoped>
.compact-card {
  gap: 10px;
}

.card-thumb {
  width: 90px;
  height: auto;
  flex-shrink: 0;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}
.card-thumb img {
  max-height: 60px;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  text-align: left;
  padding: 10px 12px;
}

.card-header {
  display: flex;
  align-items: center;
  min-height: 20px;
}

.item-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.item-info {
  display: flex;
  align-items: end;
  gap: 8px;
  margin-top: 2px;
}

.item-desc {
  font-size: 0.7rem;
  color: var(--muted);
  line-height: 1.3;
  
}

.item-price {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--accent-light);
  border-radius: 8px;
  padding: 3px 8px;
  gap: 1px;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--accent);
}


.item-options {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  gap: 5px;
  min-width: 0;
}

.options-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--muted);
  flex-shrink: 0;
  padding-top: 2px;
}

.options-tags {
  display: flex;
  overflow-x: auto;
  gap: 4px;
  flex-shrink: 0
}

.option-tag {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 2px 6px;
  white-space: nowrap;
  display: inline-flex;
  gap: 2px;
}

.extra-price {
  font-weight: 700;
  color: var(--accent);
}


.item-sizes {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.size-label {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
} 

.spacer {flex: 1;}
</style>