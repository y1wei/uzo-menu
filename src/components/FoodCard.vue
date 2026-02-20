<template>
  <!-- Featured full-width card -->
  <template v-if="featured">
    <FeaturedCard :item="item" />
  </template>
  <!-- <div v-if="featured" class="card-feat">
    <div class="feat-img">
      {{ item.icon }}
      <div class="feat-tag">⭐ Chef's Pick</div>
    </div>
    <div class="feat-body">
      <div class="card-name">{{ item.name }}</div>
      <div v-if="item.desc" class="card-desc">{{ item.desc }}</div>
      <div class="card-foot">
        <span class="price">{{ item.price }}</span>
        <BadgePill badge="popular" />
      </div>
    </div>
  </div> -->

  <!-- Regular card -->
  <div v-else class="card">
    <div class="card-thumb">
      <template v-if="imageSrc">
          <img :src="imageSrc" :alt="item.name" class="thumb-img">
      </template>
      <template v-else>
          <span class="thumb-icon">{{ item.icon }}</span>
      </template>
    </div>
    <div class="card-body">
      <div class="card-name">{{ item.name }}</div>
      <div v-if="item.desc" class="card-desc">{{ item.desc }}</div>
      <div class="card-foot">
        <BadgePill v-if="item.badge" :badge="item.badge" :badgeLabel="item.badgeLabel" />
        <span class="price">{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import BadgePill from './BadgePill.vue'
import FeaturedCard from './FeaturedCard.vue'
import { computed } from 'vue'
import { getImage } from '../utils/getImage'

const props = defineProps({
  item: Object,
  featured: { type: Boolean, default: false }
})
const imageSrc = computed(() => getImage(props.item.img))
</script>

<style scoped>
.card-feat { background: var(--surface); border-radius: var(--radius); box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; margin-bottom: 12px; cursor: pointer; transition: transform 0.15s; }
.card-feat:active { transform: scale(0.98); }
.feat-img { height: 150px; background: linear-gradient(135deg, #f5ede6, #e8d5c4); display: flex; align-items: center; justify-content: center; font-size: 4.5rem; position: relative; }
.feat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
.feat-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-thumb {
  width: 90px;
  /* height: 90px; */
  flex-shrink: 0;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
}
.card-body {
  padding: 11px 13px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}
.card-name { font-size: 0.92rem; font-weight: 700; color: var(--text); line-height: 1.3; }
.card-desc { font-size: 0.76rem; color: var(--muted); line-height: 1.4; }
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}
.price {
  font-size: 0.98rem;
  font-weight: 800;
  color: var(--accent);
  margin-left: auto;
}
</style>