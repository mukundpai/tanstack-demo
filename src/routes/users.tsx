import { useNavigate } from '@tanstack/react-router'
import { UserCard } from '../components/UserCard'

const users = [
  { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', role: 'Manager', email: 'bob@example.com' },
  { id: 4, name: 'Alice Brown', role: 'Developer', email: 'alice@example.com' },
]

export function UsersPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
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