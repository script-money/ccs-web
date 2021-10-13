import Home from '../pages/Home.page'

export interface IRouteType {
  name: 'Home'
  path: '/'
  component: () => JSX.Element
  nav: true
}

export const ROUTES = [{ name: 'Home', path: '/', component: Home, nav: true }]

export const NAV_ROUTES = ROUTES.filter(r => r.nav)
