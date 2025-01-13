import { useNavigate } from '@tanstack/react-router'

interface FeatureExample {
  name: string
  description: string
  codeExample: string
  location: string
}

const routerFeatures: FeatureExample[] = [
  {
    name: 'Type-Safe Navigation',
    description: 'Fully typed navigation with params and search parameters',
    codeExample: `navigate({ 
  to: '/features/$featureId',
  params: { featureId: 'routing' }
})`,
    location: 'Used in FeaturesPage for navigation'
  },
  {
    name: 'Search Parameters',
    description: 'Validated search parameters with Zod',
    codeExample: `const searchSchema = z.object({
  search: z.string().optional(),
  role: z.enum(['Developer', 'Designer', 'Manager']).optional(),
})`,
    location: 'Implemented in UsersPage for filtering'
  },
  {
    name: 'Nested Routes',
    description: 'Hierarchical routing structure',
    codeExample: `postsRoute.addChildren([postDetailsRoute])`,
    location: 'Main router configuration'
  },
  {
    name: 'Route Preloading',
    description: 'Preload routes for faster navigation',
    codeExample: `navigate({
  to: '/posts/$postId',
  params: { postId: '1' },
  preload: true
})`,
    location: 'Used in PostDetailsPage for related posts'
  }
]

export function ArchitecturePage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">App Architecture</h2>
        <p className="mt-2 text-gray-600">Overview of routing structure and TanStack Router features</p>
      </div>

      {/* Route Structure */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Route Structure</h3>
        <div className="font-mono text-sm">
          <pre className="bg-gray-50 p-4 rounded-lg">
{`/                   # Home
├── /features        # Features List
│   └── /$featureId  # Feature Details
├── /users          # Users List
│   └── /$userId    # User Details
├── /posts          # Posts List
│   └── /$postId    # Post Details
├── /about          # About Page
└── /architecture   # This Page`}
          </pre>
        </div>
      </div>

      {/* Features Used */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routerFeatures.map((feature) => (
          <div key={feature.name} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <p className="text-sm text-gray-500 mb-2">Location: {feature.location}</p>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{feature.codeExample}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
} 