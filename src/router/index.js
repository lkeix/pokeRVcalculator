import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '@/components/main.vue'
import tos from '@/components/tos.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: main
  },
  {
    path: '/term-of-service',
    name: 'tos',
    component: tos
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
