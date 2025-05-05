'use client'

import { ChatRoom } from '@/components/ChatRoom'

export default function ChatPage() {
  // For demo purposes, we'll use hardcoded values
  // In a real app, these would come from your auth system
  const demoUser = {
    id: 'user-1',
    name: 'Demo User'
  }

  const demoRoom = 'room-1'

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
        <ChatRoom
          roomId={demoRoom}
          userId={demoUser.id}
          userName={demoUser.name}
        />
      </div>
    </main>
  )
} 