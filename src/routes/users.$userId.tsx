import { useParams } from '@tanstack/react-router'

const users = [
  { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', role: 'Manager', email: 'bob@example.com' },
  { id: 4, name: 'Alice Brown', role: 'Developer', email: 'alice@example.com' },
]

export function UserDetailsPage() {
  const { userId } = useParams({ from: '/users/$userId' })
  const user = users.find((u) => u.id === Number(userId))

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">User Details</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Name</h3>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Role</h3>
          <p className="text-gray-600">{user.role}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Email</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  )
} 