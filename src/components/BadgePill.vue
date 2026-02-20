<template>
  <span class="badge" :class="badgeClass">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  badge: String,
  badgeLabel: String
})

const badgeMap = {
  popular: { class: 'badge-pop', label: '🔥 Popular' },
  new:     { class: 'badge-new', label: '✨ New' },
  vegan:   { class: 'badge-veg', label: '🌿 Vegan' },
  happyhour:  { class: 'badge-happy', label: '' },
  default: { class: 'badge-def', label: '' }
}

const badgeClass = computed(() => {
  const resolved = badgeMap[props.badge] ?? badgeMap.default
  return resolved.class
})

const label = computed(() => {
  if (props.badge === 'happyhour') return props.badgeLabel
  const resolved = badgeMap[props.badge] ?? badgeMap.default
  return resolved.label || props.badgeLabel || ''
})
</script>

<style scoped>
    .badge { font-size: 0.66rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
    .badge-pop { background: #fef3e2; color: #d4820a; }
    .badge-new { background: #e6f5ee; color: #1a8a4a; }
    .badge-veg { background: #e8f5e6; color: #2e7d32; }
    .badge-def { background: var(--accent-light); color: var(--accent); }
    .badge-happy { background: linear-gradient(135deg, #ffd700, #ffed4e); color: #7a5c00; border: 1px solid #ffed4e; }
</style>