'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getThreads } from '@/services/threads'

export default function ThreadsPage() {
  const router = useRouter()
  const { data: threads, isLoading, error } = useQuery({
    queryKey: ['threads'],
    queryFn: getThreads
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Threads</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Thread
          </Button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Threads</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Thread
          </Button>
        </div>
        <Card className="p-4">
          <p className="text-red-500">Failed to load threads</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Threads</h1>
        <Button onClick={() => router.push('/threads/create')}>
          <Plus className="mr-2 h-4 w-4" />
          New Thread
        </Button>
      </div>

      <div className="space-y-4">
        {threads?.map((thread) => (
          <Card
            key={thread.id}
            className="p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/threads/${thread.id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{thread.title}</h2>
            <div className="flex items-center text-sm text-gray-500">
              <span>Posted by {thread.authorName}</span>
              <span className="mx-2">•</span>
              <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{thread.commentCount} comments</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 