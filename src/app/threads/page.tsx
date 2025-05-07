'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare, User, Clock } from 'lucide-react'
import { getThreads, Thread } from '@/services/threads'
import Link from 'next/link'

export default function ThreadsPage() {
  const { data: threads, isLoading, error } = useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: getThreads
  })

  if (error) {
    return (
      <div className="container py-12">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-destructive text-center">
              Failed to load threads. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Discussion Threads</h1>
          <Button>Create New Thread</Button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))
          ) : (
            // Thread list
            threads?.map((thread) => (
              <Link href={`/threads/${thread.thread_id}`} key={thread.thread_id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">{thread.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{thread.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(thread.updated_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{thread.comment_count} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 