import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import type { Post } from '../types'

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-blue-600 font-semibold">Loading Posts (5 seconds)...</p>
      </div>
    </div>
  )
}

function LazyPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 5000))
        setPosts(Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          title: `Lazy Loaded Post ${i + 1}`,
          category: ['Tech', 'Design', 'Business'][i % 3],
          excerpt: `This is a lazy loaded post ${i + 1}...`,
          content: `Full content for lazy loaded post ${i + 1}`
        })))
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Lazy Loaded Posts</h2>
        <p className="mt-2 text-gray-600">This page demonstrates lazy loading in TanStack Router</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
            <p className="mt-2 text-gray-600">{post.excerpt}</p>
            <span className="mt-2 inline-block px-3 py-1 text-sm rounded-full bg-gray-100">
              {post.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LazyPosts

export const Route = createFileRoute('/lazy/posts')({
  component: LazyPosts
}) 