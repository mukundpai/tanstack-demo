interface User {
  id: number
  name: string
  role: string
  email: string
}

interface UserCardProps {
  user: User
  onClick: () => void
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div
      className="p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer group rounded-lg hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 group-hover:bg-blue-100 transition-colors">
          {user.role}
        </span>
      </div>
    </div>
  )
} 