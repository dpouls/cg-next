'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'
import { useToast } from '@/components/ui/use-toast'

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { setUser, setToken } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setPasswordError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      date_of_birth: formData.get('date_of_birth'),
      address_zip: formData.get('address_zip'),
      auth_provider: 'email',
      profile_data: {},
      phone_number: formData.get('phone_number'),
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.status === 201) {
        const userData = await response.json()
        // Store user data and token
        setUser({
          id: userData.id,
          name: `${userData.first_name} ${userData.last_name}`,
          email: userData.email
        })
        setToken(userData.token)
        
        toast({
          title: "Account created",
          description: "Welcome to Common Ground!",
        })

        router.push('/profile')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Sign up failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Join Common Ground to start meaningful conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  required
                  className="bg-background/80 border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  required
                  className="bg-background/80 border-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-background/80 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                required
                className="bg-background/80 border-primary/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/80 border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`bg-background/80 border-primary/30 ${
                    passwordError ? 'border-destructive' : ''
                  }`}
                />
              </div>
            </div>
            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                required
                className="bg-background/80 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                className="bg-background/80 border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_zip">ZIP Code</Label>
              <Input
                id="address_zip"
                name="address_zip"
                required
                placeholder="Enter your ZIP code"
                className="bg-background/80 border-primary/30"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 