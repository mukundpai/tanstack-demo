export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  detailedDescription: string
  codeExample: string
  documentation: string
}

export const routerFeatures: Feature[] = [
  {
    id: 'type-safety',
    title: 'Type Safety',
    description: 'Full TypeScript support with automatic type inference',
    icon: '🛡️',
    detailedDescription: 'TanStack Router provides first-class TypeScript support with automatic type inference for routes, params, and search parameters.',
    codeExample: `const userRoute = new Route({
  path: '/users/$userId',
  validateSearch: (search) => ({
    tab: z.enum(['overview', 'details']).optional()
  })
})`,
    documentation: 'https://tanstack.com/router/latest/docs/framework/react/guide/type-safety'
  },
  {
    id: 'search-params',
    title: 'Search Parameters',
    description: 'Built-in search parameter handling with validation',
    icon: '🔍',
    detailedDescription: 'Handle URL search parameters with built-in validation and type safety. Perfect for filters, pagination, and more.',
    codeExample: `const { search, page } = useSearch({ from: '/posts' })`,
    documentation: 'https://tanstack.com/router/latest/docs/framework/react/guide/search-params'
  },
  {
    id: 'preloading',
    title: 'Route Preloading',
    description: 'Preload routes for faster navigation',
    icon: '⚡',
    detailedDescription: 'Improve user experience by preloading routes before navigation occurs.',
    codeExample: `navigate({ to: '/posts/$postId', preload: true })`,
    documentation: 'https://tanstack.com/router/latest/docs/framework/react/guide/preloading'
  },
  {
    id: 'nested-routing',
    title: 'Nested Routing',
    description: 'Support for nested routes and layouts',
    icon: '📑',
    detailedDescription: 'Create complex routing hierarchies with nested routes and shared layouts.',
    codeExample: `const rootRoute = new RootRoute({ component: Layout })`,
    documentation: 'https://tanstack.com/router/latest/docs/framework/react/guide/nested-routes'
  }
] 