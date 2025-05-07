'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-gray-900"
            }`}
          >
            Home
          </Link>
          <Link
            href="/threads"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/threads" ? "text-primary" : "text-gray-900"
            }`}
          >
            Threads
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/profile"
                    ? "text-primary"
                    : "text-gray-900"
                }`}
              >
                Profile
              </Link>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
} 