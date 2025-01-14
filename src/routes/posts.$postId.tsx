import { useParams, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'

const posts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  category: ['Tech', 'Design', 'Business'][i % 3],
  content: `This is the full content for post ${i + 1}...`,
  relatedPosts: [
    i > 0 ? i : i + 1,
    i < 19 ? i + 2 : i,
    i < 18 ? i + 3 : i
  ].filter((id, index, self) => 
    self.indexOf(id) === index && id !== i + 1
  )
}))

export function PostDetailsPage() {
  const { postId } = useParams({ from: '/posts/$postId' })
  const navigate = useNavigate()
  const debouncedRef = useRef<Function>()
  
  useEffect(() => {
    // Create the debounced function
    debouncedRef.current = debounce((relatedId: number) => {
      navigate({
        to: '/posts/$postId',
        params: { postId: String(relatedId) }
      })
    }, 300)

    // Cleanup
    return () => {
      debouncedRef.current?.cancel()
    }
  }, [navigate])

  const handlePreload = useCallback((relatedId: number) => {
    debouncedRef.current?.(relatedId)
  }, [])

  const post = posts.find(p => p.id === Number(postId))

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate({ to: '/posts' })}
        className="text-blue-600 hover:text-blue-800"
      >
        ← Back to Posts
      </button>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
            {post.category}
          </span>
        </div>
        <p className="text-gray-600">{post.content}</p>
      </div>

      {post.relatedPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Related Posts</h3>
          {post.relatedPosts.map(relatedId => {
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
                onMouseEnter={() => handlePreload(relatedId)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{relatedPost.title}</h3>
                  <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
                    {relatedPost.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
} 