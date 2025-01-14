import { useParams, useNavigate } from '@tanstack/react-router'
import { routerFeatures } from '../data/features'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function FeatureDetailsPage() {
  const { featureId } = useParams({ from: '/features/$featureId' })
  const navigate = useNavigate()
  const feature = routerFeatures.find(f => f.id === featureId)

  if (!feature) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Feature not found</h2>
        <button
          onClick={() => navigate({ to: '/features' })}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Features
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <button
        onClick={() => navigate({ to: '/features' })}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back to Features
      </button>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl">{feature.icon}</span>
        <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
      </div>

      <div className="prose max-w-none">
        <p className="text-lg text-gray-600">{feature.detailedDescription}</p>
        
        <h3 className="text-xl font-semibold mt-8 mb-4">Code Example</h3>
        <div className="rounded-lg overflow-hidden">
          <SyntaxHighlighter 
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              borderRadius: '0.5rem'
            }}
          >
            {feature.codeExample}
          </SyntaxHighlighter>
        </div>

        <div className="mt-8">
          <a
            href={feature.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            View Documentation →
          </a>
        </div>
      </div>
    </div>
  )
} 