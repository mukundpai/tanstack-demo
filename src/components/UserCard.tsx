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
      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
          {user.role}
        </span>
      </div>
    </div>
  )
} 