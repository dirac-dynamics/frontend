import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Fleet = () => import('@/views/Fleet')
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
      redirect: '/dashboard',
      name: '',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
          {
            path: 'fleet',
            name: 'Fleet',
            component: Fleet
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

