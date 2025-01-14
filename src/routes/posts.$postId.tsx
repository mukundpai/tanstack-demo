import { useParams, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'

const posts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  category: ['Tech', 'Design', 'Business'][i % 3],
  content: `This is the full content for post ${i + 1}...`,
}))

export function PostDetailsPage() {
  const { postId } = useParams({ from: '/posts/$postId' })
  const navigate = useNavigate()
  const debouncedRef = useRef<Function>()
  
  useEffect(() => {
    debouncedRef.current = debounce((nextId: number) => {
      navigate({
        to: '/posts/$postId',
        params: { postId: String(nextId) },
        preload: true,
      })
    }, 300)

    return () => {
      debouncedRef.current?.cancel()
    }
  }, [navigate])

  const handlePreload = useCallback((nextId: number) => {
    debouncedRef.current?.(nextId)
  }, [])

  const handleNavigate = useCallback((nextId: number) => {
    debouncedRef.current?.cancel()
    navigate({
      to: '/posts/$postId',
      params: { postId: String(nextId) }
    })
  }, [navigate])

  const currentPostIndex = posts.findIndex(p => p.id === Number(postId))
  const post = posts[currentPostIndex]
  const previousPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null
  const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null

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

      <div className="flex justify-between items-center gap-4">
        {previousPost && (
          <div
            className="flex-1 p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => handleNavigate(previousPost.id)}
            // onMouseEnter={() => handlePreload(previousPost.id)}
          >
            <div className="text-sm text-gray-500 mb-1">← Previous Post</div>
            <h3 className="text-lg font-semibold text-gray-900">{previousPost.title}</h3>
          </div>
        )}
        
        {nextPost && (
          <div
            className="flex-1 p-4 border rounded-lg "
            onClick={() => handleNavigate(nextPost.id)}
            onMouseEnter={() => handlePreload(nextPost.id)}
          >
            <div className="text-sm text-gray-500 mb-1">Next Post →</div>
            <h3 className="text-lg font-semibold text-gray-900">{nextPost.title}</h3>
          </div>
        )}
      </div>
    </div>
  )
} 