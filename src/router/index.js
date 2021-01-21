import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Fleet = () => import('@/views/Fleet')
const Parcels = () => import('@/views/Parcels')
const Trucks = () => import('@/views/Trucks')
const Dashboard = () => import('@/views/Dashboard')

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
          path: 'parcels',
          name: 'Parcels',
          component: Parcels
        },
        {
          path: 'trucks',
          name: 'Trucks',
          component: Trucks
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
    ]
    }
  ]
}

