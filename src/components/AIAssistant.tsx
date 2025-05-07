'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ThreadDetail, Comment } from '@/services/threads'

interface AIAssistantProps {
  className?: string;
  thread?: ThreadDetail;
}

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function AIAssistant({ className, thread }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Format thread data with timestamps
  const formattedThread = thread ? {
    ...thread,
    created_at: formatTimestamp(thread.created_at),
    comments: thread.comments.map(comment => ({
      ...comment,
      created_at: formatTimestamp(comment.created_at),
      children: comment.children?.map((child: Comment) => ({
        ...child,
        created_at: formatTimestamp(child.created_at)
      }))
    }))
  } : null

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            AI
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              I can help you:
            </p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Compose clear and effective comments</li>
              <li>• Explain complex discussions</li>
              <li>• Identify logical fallacies</li>
              <li>• Provide fact-checking and sources</li>
            </ul>

            {formattedThread && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium mb-2">Current Thread Data:</p>
                <pre className="text-xs bg-muted p-2 rounded-md overflow-auto max-h-[200px]">
                  {JSON.stringify(formattedThread, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 