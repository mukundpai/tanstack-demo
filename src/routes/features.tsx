import { useNavigate } from '@tanstack/react-router'
import { routerFeatures } from '../data/features'

export function FeaturesPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">TanStack Router Features</h2>
        <p className="mt-2 text-gray-600">Explore the powerful features that make TanStack Router unique</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routerFeatures.map((feature) => (
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
    </div>
  )
} 