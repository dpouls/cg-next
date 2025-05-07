'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, ThumbsUp, Reply } from 'lucide-react'
import { Comment as CommentType } from '@/services/threads'
import { Textarea } from '@/components/ui/textarea'

interface CommentProps {
  comment: CommentType;
  onReply: (parentId: string, content: string) => void;
}

function formatTimestamp(timestamp: string) {
  console.log('Formatting timestamp:', timestamp)
  const date = new Date(timestamp)
  const formatted = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  console.log('Formatted timestamp:', formatted)
  return formatted
}

export function Comment({ comment, onReply }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  useEffect(() => {
    console.log('Comment data:', comment)
  }, [comment])

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.comment_id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {comment.author_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{comment.author_name}</span>
              <span className="text-xs text-gray-600">
                {formatTimestamp(comment.created_at)}
              </span>
            </div>
            <p className="text-sm mb-2">{comment.content}</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1"
                onClick={() => setIsReplying(!isReplying)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            </div>

            {isReplying && (
              <div className="mt-4">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleReply}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}

            {comment.children && comment.children.length > 0 && (
              <div className="mt-4 pl-4 border-l-2">
                {comment.children.map((child) => (
                  <Comment 
                    key={child.comment_id} 
                    comment={child} 
                    onReply={onReply}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 