'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, MessageSquare } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Common Ground
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/threads">
            <Button variant="ghost">
              <MessageSquare className="h-5 w-5 mr-2" />
              Threads
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
} 