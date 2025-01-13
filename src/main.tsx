import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { HomePage } from './routes'
import { AboutPage } from './routes/about'
import { UsersPage } from './routes/users'
import { UserDetailsPage } from './routes/users.$userId'

// Create a root route
const rootRoute = new RootRoute({
  component: Layout,
})

// Create individual route components
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersPage,
})

const userDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserDetailsPage,
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  usersRoute,
  userDetailsRoute,
])

// Create the router using your route tree
const router = new Router({ routeTree })

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)