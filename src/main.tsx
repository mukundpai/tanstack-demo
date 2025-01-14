import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { z } from 'zod'
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
import { PostsPage } from './routes/posts'
import { PostDetailsPage } from './routes/posts.$postId'
import { FeaturesPage } from './routes/features'
import { FeatureDetailsPage } from './routes/features.$featureId'
import { ArchitecturePage } from './routes/architecture'
import './index.css'

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

// Example of using search parameters
const usersSearchSchema = z.object({
  search: z.string().optional(),
  role: z.enum(['Developer', 'Designer', 'Manager']).optional(),
})

const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/users',
  validateSearch: (search: Record<string, unknown>) => {
    return usersSearchSchema.parse(search)
  },
  component: UsersPage,
})

const userDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserDetailsPage,
})

const postsSearchSchema = z.object({
  search: z.string().optional(),
  category: z.enum(['Tech', 'Design', 'Business']).optional(),
  page: z.string().optional(),
})

const postsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/posts',
  validateSearch: (search: Record<string, unknown>) => {
    return postsSearchSchema.parse(search)
  },
  component: PostsPage,
})

const postDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  component: PostDetailsPage,
})

const featuresRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/features',
  validateSearch: (search: Record<string, unknown>) => {
    return postsSearchSchema.parse(search)
  },
  component: FeaturesPage,
})

const featureDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/features/$featureId',
  component: FeatureDetailsPage,
})

const architectureRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/architecture',
  component: ArchitecturePage,
})

const lazyPostsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/lazy/posts',
  component: lazy(() => import('./routes/lazy.posts')),
  pendingComponent: () => (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-blue-600 font-semibold">Loading Route...</p>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600">Error Loading Posts</h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
    </div>
  )
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  architectureRoute,
  postsRoute.addChildren([postDetailsRoute]),
  featuresRoute.addChildren([featureDetailsRoute]),
  usersRoute.addChildren([userDetailsRoute]),
  lazyPostsRoute
])

// Create the router using your route tree
const router = new Router({ routeTree })

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Make sure you're using createRoot
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
