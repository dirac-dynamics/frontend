export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Fleet',
        to: '/fleet',
        icon: 'cib-openstreetmap'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Trucks',
        to: '/trucks',
        icon: 'cil-truck'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Parcels',
        to: '/parcels',
        icon: 'cil-gift'
      }
    ]
  }
]