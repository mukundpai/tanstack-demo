import { useNavigate, useSearch } from '@tanstack/react-router'
import { UserCard } from '../components/UserCard'

export const users = [
  { id: 1, name: 'Shishir K', role: 'Manager', email: 'shishir@gstzen.in' },
  { id: 2, name: 'Sumanth', role: 'Senior Software Developer', email: 'sumanth@gstzen.in' },
  { id: 3, name: 'Praneeth K', role: 'Senior Software Developer', email: 'praneeth@gstzen.in' },
  { id: 4, name: 'Utkarsh', role: 'Senior SOftware Developer', email: 'utkarsh@gstzen.in' },
]

export function UsersPage() {
  const navigate = useNavigate()
  const { search, role } = useSearch({ from: '/users' })

  const filteredUsers = users.filter((user) => {
    if (role && user.role !== role) return false
    if (search && !user.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={search || ''}
            onChange={(e) => 
              navigate({
                to: '/users',
                search: {
                  search: e.target.value || undefined,
                  role
                }
              })
            }
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => 
              navigate({
                to: '/users/$userId',
                params: { userId: String(user.id) }
              })
            }
          />
        ))}
      </div>
    </div>
  )
} 