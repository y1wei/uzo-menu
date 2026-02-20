<template>
  <nav class="nav-wrap">
    <div class="nav-scroll">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="nav-btn"
        :class="{ active: activeCategory === cat.id }"
        @click="$emit('navigate', cat.id)"
      >
        <span class="nav-icon">{{ cat.icon }}</span>
        <span class="nav-label">{{ cat.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  categories: Array,
  activeCategory: String
})
defineEmits(['navigate'])
</script>

<style scoped>
.nav-wrap {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  z-index: 100;
  background: var(--surface);
  border-top: 1px solid var(--border);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  padding-bottom: env(safe-area-inset-bottom); /* handles iPhone notch */
}
.nav-scroll {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 8px 12px;
  gap: 6px;
}
.nav-scroll::-webkit-scrollbar { display: none; }

.nav-btn {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 6px 16px;
  border: 1.5px solid var(--border);
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--muted);
  white-space: nowrap;
}

.nav-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.nav-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.nav-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2px;
}
</style>