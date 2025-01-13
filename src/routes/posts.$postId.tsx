import { useParams, useNavigate } from '@tanstack/react-router'

const posts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  category: ['Tech', 'Design', 'Business'][i % 3],
  content: `This is the full content for post ${i + 1}. It contains much more detailed information about the topic at hand. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  relatedPosts: [
    i > 0 ? i : i + 1,
    i < 19 ? i + 2 : i,
    i < 18 ? i + 3 : i
  ].filter(id => id !== i + 1)
}))

export function PostDetailsPage() {
  const { postId } = useParams({ from: '/posts/$postId' })
  const navigate = useNavigate()
  const post = posts.find(p => p.id === Number(postId))

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        <button
          onClick={() => navigate({ to: '/posts' })}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Posts
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <button
        onClick={() => navigate({ to: '/posts' })}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back to Posts
      </button>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h2>
      <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm mb-6">
        {post.category}
      </span>

      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.relatedPosts.map((relatedId) => {
            const relatedPost = posts.find(p => p.id === relatedId)
            if (!relatedPost) return null
            
            return (
              <div
                key={relatedId}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => 
                  navigate({
                    to: '/posts/$postId',
                    params: { postId: String(relatedId) }
                  })
                }
                onMouseEnter={() => {
                  // Preload the related post route
                  navigate({
                    to: '/posts/$postId',
                    params: { postId: String(relatedId) },
                    preload: true
                  })
                }}
              >
                <h4 className="font-medium text-gray-900">{relatedPost.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{relatedPost.category}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 