'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, Mail, User } from 'lucide-react'
import { getCurrentUser, User as UserType } from '@/services/user'

export default function ProfilePage() {
  const { data: user, isLoading, error } = useQuery<UserType>({
    queryKey: ['userProfile'],
    queryFn: getCurrentUser
  })

  if (error) {
    return (
      <div className="container py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-destructive text-center">
              Failed to load profile. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information and account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image Section */}
            <div className="relative">
              {isLoading ? (
                <Skeleton className="h-32 w-32 rounded-full" />
              ) : (
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={user?.profile_image_filename || '/placeholder-avatar.png'}
                    alt={`${user?.first_name} ${user?.last_name}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {user?.first_name?.[0]}
                    {user?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              )}
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-0 right-0 rounded-full"
              >
                Change
              </Button>
            </div>

            {/* User Information */}
            <div className="w-full space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Full Name</div>
                      <div className="font-medium">
                        {user?.first_name} {user?.last_name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">{user?.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Member Since</div>
                      <div className="font-medium">
                        {new Date(user?.profile_image_uploaded_at || '').toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 w-full">
              <Button variant="outline" className="flex-1">
                Edit Profile
              </Button>
              <Button variant="outline" className="flex-1">
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 