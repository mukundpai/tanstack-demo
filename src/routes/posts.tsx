import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

interface Post {
  id: number
  title: string
  category: string
  excerpt: string
}

const posts: Post[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  category: ['Tech', 'Design', 'Business'][i % 3],
  excerpt: `This is a sample excerpt for post ${i + 1}. Click to read more about this interesting topic.`
}))

export function PostsPage() {
  const navigate = useNavigate()
  const { category, page = '1', search } = useSearch({ from: '/posts' })
  const [isLoading, setIsLoading] = useState(false)

  const filteredPosts = posts.filter((post) => {
    if (category && post.category !== category) return false
    if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const currentPage = parseInt(page)
  const postsPerPage = 5
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true)
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300))
    navigate({
      search: (prev) => ({ ...prev, page: String(newPage) }),
      replace: true
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 border rounded-lg"
            value={search || ''}
            onChange={(e) => 
              navigate({
                search: (prev) => ({ 
                  ...prev, 
                  search: e.target.value || undefined,
                  page: '1'
                })
              })
            }
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={category || ''}
            onChange={(e) => 
              navigate({
                search: (prev) => ({ 
                  ...prev, 
                  category: e.target.value || undefined,
                  page: '1'
                })
              })
            }
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            currentPosts.map((post) => (
              <div 
                key={post.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => navigate({ 
                  to: '/posts/$postId',
                  params: { postId: String(post.id) }
                })}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                  <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
                    {post.category}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{post.excerpt}</p>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded-lg ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 