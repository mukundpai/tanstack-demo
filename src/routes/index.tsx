import { useNavigate } from '@tanstack/react-router'
import { FeatureCard } from '../components/FeatureCard'
import { routerFeatures } from '../data/features'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to TanStack Router
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          A fully type-safe router for React applications with built-in search params,
          caching, pending UI, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {routerFeatures.slice(0, 6).map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate({ 
              to: '/features/$featureId',
              params: { featureId: feature.id }
            })}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{feature.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">
          Ready to explore more?
        </h3>
        <p className="text-blue-700 mb-6">
          Check out our interactive demos showcasing all TanStack Router features
        </p>
        <button
          onClick={() => navigate({ to: '/features' })}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Features
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Type-Safe by Default
          </h3>
          <p className="text-gray-600">
            Experience the power of full TypeScript integration with automatic type
            inference for routes, params, and search parameters.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Modern Features
          </h3>
          <p className="text-gray-600">
            Built for modern React applications with features like file-based routing,
            route pre-fetching, and built-in pending UI support.
          </p>
        </div>
      </div>
    </div>
  )
} 