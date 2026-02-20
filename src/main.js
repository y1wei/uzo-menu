import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MenuView from './views/MenuView.vue'
import AdminPanel from './views/AdminPanel.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: MenuView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
