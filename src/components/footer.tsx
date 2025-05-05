'use client'

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-sm ">
              Common Ground brings people together to talk with each other — not past each other.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm  hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="text-sm  hover:text-foreground">Privacy</Link></li>
              <li><Link href="/contact" className="text-sm  hover:text-foreground">Contact</Link></li>
              <li><Link href="/terms" className="text-sm  hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className=" hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className=" hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:contact@commonground.com" className=" hover:text-foreground">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center text-sm ">
          © 2025 Common Ground — Built to bring people together.
        </div>
      </div>
    </footer>
  )
} 