export function AboutPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">About TanStack Router</h2>
      <div className="prose prose-lg max-w-none">
        <p>
          TanStack Router is a modern routing solution for React applications that
          provides:
        </p>
        <ul className="mt-4 space-y-2">
          <li>First-class TypeScript support</li>
          <li>Automatic route type generation</li>
          <li>Built-in search param handling</li>
          <li>Nested routing capabilities</li>
          <li>Route pre-fetching</li>
        </ul>
        <p className="mt-6">
          This demo showcases some basic features of TanStack Router in a clean,
          professional interface.
        </p>
      </div>
    </div>
  )
} 