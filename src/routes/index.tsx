import { FeatureCard } from '../components/FeatureCard'

const features = [
  {
    title: 'Type Safety',
    description: 'Full TypeScript support with automatic type inference',
    icon: '🛡️',
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and minimal re-renders',
    icon: '⚡',
  },
  {
    title: 'Developer Experience',
    description: 'Great DX with excellent debugging capabilities',
    icon: '👨‍💻',
  },
]

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome to TanStack Router
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          A fully type-safe router for React applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  )
} 