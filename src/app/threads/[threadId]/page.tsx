'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare, ThumbsUp, User, Clock, ArrowLeft } from 'lucide-react'
import { getThreadDetail, ThreadDetail } from '@/services/threads'
import { Comment } from '@/components/Comment'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

export default function ThreadPage({ params }: { params: { threadId: string } }) {
  const router = useRouter()
  const [newComment, setNewComment] = useState('')
  
  const { data: thread, isLoading, error } = useQuery<ThreadDetail>({
    queryKey: ['thread', params.threadId],
    queryFn: () => getThreadDetail(params.threadId)
  })

  const handleReply = (parentId: string, content: string) => {
    // TODO: Implement reply functionality
    console.log('Reply to', parentId, 'with content:', content)
  }

  const handleNewComment = () => {
    if (newComment.trim()) {
      // TODO: Implement new comment functionality
      console.log('New comment:', newComment)
      setNewComment('')
    }
  }

  if (error) {
    return (
      <div className="container py-12">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-destructive text-center">
              Failed to load thread. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Threads
        </Button>

        {isLoading ? (
          // Loading skeleton
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Thread content */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {thread?.author_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{thread?.author_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(thread?.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <CardTitle>{thread?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{thread?.content}</p>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{thread?.likes}</span>
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thread?.comment_count} comments</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New comment form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
                <Textarea
                  placeholder="What are your thoughts?"
                  value={newComment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                  className="min-h-[100px] mb-4"
                />
                <div className="flex justify-end">
                  <Button onClick={handleNewComment}>
                    Post Comment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Comments</h3>
              {thread?.comments.map((comment) => (
                <Comment 
                  key={comment.comment_id} 
                  comment={comment} 
                  onReply={handleReply}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 