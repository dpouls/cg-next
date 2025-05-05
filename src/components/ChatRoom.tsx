'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useChatStore } from '@/store/useChatStore'
import { socketService } from '@/services/socket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import type { Message } from '@/store/useChatStore'

interface ChatRoomProps {
  roomId: string
  userId: string
  userName: string
}

const DEFAULT_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Welcome to the Common Ground chat! 👋',
    senderId: 'system',
    senderName: 'System',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    roomId: 'default'
  },
  {
    id: '2',
    content: 'Hi everyone! I\'m excited to be here and discuss important topics.',
    senderId: 'user1',
    senderName: 'Sarah',
    timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
    roomId: 'default'
  },
  {
    id: '3',
    content: 'Hello Sarah! I\'m looking forward to our discussion. What topics are you most interested in?',
    senderId: 'user2',
    senderName: 'Michael',
    timestamp: new Date(Date.now() - 3400000), // 57 minutes ago
    roomId: 'default'
  },
  {
    id: '4',
    content: 'I\'m particularly interested in environmental policies and community development. How about you?',
    senderId: 'user1',
    senderName: 'Sarah',
    timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
    roomId: 'default'
  },
  {
    id: '5',
    content: 'Those are great topics! I\'m passionate about education reform and healthcare accessibility. Maybe we can find some common ground between our interests?',
    senderId: 'user2',
    senderName: 'Michael',
    timestamp: new Date(Date.now() - 3200000), // 53 minutes ago
    roomId: 'default'
  }
]

export function ChatRoom({ roomId, userId, userName }: ChatRoomProps) {
  const [message, setMessage] = useState('')
  const { messages, addMessage, setMessages } = useChatStore()

  // Fetch initial messages
  const { data: initialMessages } = useQuery<Message[]>({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/rooms/${roomId}/messages`)
        const data = await response.json()
        return data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      } catch (error) {
        // Return default messages if API fails
        return DEFAULT_MESSAGES
      }
    }
  })

  // Update messages when initial data is loaded
  useEffect(() => {
    if (initialMessages) {
      setMessages(roomId, initialMessages)
    }
  }, [initialMessages, roomId, setMessages])

  // Connect to socket and join room
  useEffect(() => {
    socketService.connect(userId)
    socketService.joinRoom(roomId)

    return () => {
      socketService.leaveRoom(roomId)
    }
  }, [roomId, userId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    socketService.sendMessage({
      content: message,
      senderId: userId,
      senderName: userName,
      roomId
    })

    setMessage('')
  }

  return (
    <Card className="p-4 h-[600px] flex flex-col bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages[roomId]?.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-3 rounded-lg ${
              msg.senderId === userId 
                ? 'bg-primary/20 text-primary-foreground ml-auto border border-primary/30' 
                : msg.senderId === 'system'
                ? 'bg-muted/30 text-muted-foreground mx-auto border border-muted/40'
                : 'bg-secondary/10 border border-secondary/20'
            } max-w-[80%]`}
          >
            <div className="text-sm font-semibold text-primary">{msg.senderName}</div>
            <div className="mt-1">{msg.content}</div>
            <div className="text-xs opacity-70 mt-1">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-background/80 border-primary/30 focus:border-primary/50 focus:ring-primary/20"
        />
        <Button 
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
        >
          Send
        </Button>
      </form>
    </Card>
  )
} 