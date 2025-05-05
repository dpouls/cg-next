'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Common Ground
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
} 