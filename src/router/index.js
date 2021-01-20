import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Fleet = () => import('@/views/Fleet')
const Dashboard = () => import('@/views/Dashboard')
const Trucks = () => import('@/views/Trucks')
const Parcels = () => import('@/views/Parcels')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/fleet',
      name: '',
      component: TheContainer,
      children: [
        {
          path: 'fleet',
          name: 'Fleet',
          component: Fleet
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'trucks',
          name: 'Trucks',
          component: Trucks
        },
        {
          path: 'parcels',
          name: 'Parcels',
          component: Parcels
        },
    ]
    }
  ]
}

