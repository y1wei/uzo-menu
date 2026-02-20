<template>
   <div class="card regular-card">
    <div class="card-thumb">
      <template v-if="item.img">
        <img :src="'./src/assets/img/'+item.img" alt="">
      </template>
      <template v-else>
        {{ item.icon }}
      </template>
    </div>
    <div class="card-body">
      <div class="item-name">{{ item.name }}</div>
      <div v-if="item.desc" class="item-desc">{{ item.desc }}</div>
      <div class="card-foot">
        <BadgePill v-if="item.badge" :badge="item.badge" :badgeLabel="item.badgeLabel" />
        <!-- single price -->
        <span v-if="item.price" class="item-price">{{ item.price }}</span>
        <!-- multiple sizes -->
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
    </div>
  </div>
</template>

<script setup>
import BadgePill from './BadgePill.vue'
defineProps({ item: Object })
</script>

<style scoped>
.card-thumb {
  width: 90px;
  height: auto;
  flex-shrink: 0;
  background: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
}

.card-thumb img {
  max-height: auto;
}

.card-body {
  padding: 11px 13px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.item-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.item-desc {
  font-size: 0.76rem;
  color: var(--muted);
  margin-top: 3px;
  line-height: 1.4;
}

.item-price {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--accent);
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--accent-light);
  border-radius: 8px;
  padding: 4px 10px;
  gap: 1px;
}

.original-price {
  font-size: 0.68rem;
  color: var(--muted);
  text-decoration: line-through;
}

/* multi price */
.item-sizes {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.size-prices {
  display: flex;
  flex-direction: column;
}

.size-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

</style>