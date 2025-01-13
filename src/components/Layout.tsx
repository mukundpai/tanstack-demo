import { Link, Outlet, useNavigate } from '@tanstack/react-router'

export function Layout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate({ to: '/' })}
            >
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h1 className="text-xl font-bold text-gray-900">TanStack Router Demo</h1>
            </div>
            <nav className="flex gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                activeProps={{ className: 'text-blue-600 font-medium' }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                activeProps={{ className: 'text-blue-600 font-medium' }}
              >
                About
              </Link>
              <Link
                to="/users"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                activeProps={{ className: 'text-blue-600 font-medium' }}
              >
                Users
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <Outlet />
      </main>

      <footer className="bg-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Built with TanStack Router & React
          </p>
        </div>
      </footer>
    </div>
  )
} 