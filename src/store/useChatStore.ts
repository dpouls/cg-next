import { create } from 'zustand'

// Types for our chat system
export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  timestamp: Date
  roomId: string
}

export interface Room {
  id: string
  name: string
  participants: string[]
  lastMessage?: Message
}

export interface ChatState {
  // State
  messages: Record<string, Message[]> // roomId -> messages
  rooms: Room[]
  activeRoom: string | null
  onlineUsers: string[] // array of user IDs
  
  // Actions
  setMessages: (roomId: string, messages: Message[]) => void
  addMessage: (message: Message) => void
  setRooms: (rooms: Room[]) => void
  setActiveRoom: (roomId: string | null) => void
  setOnlineUsers: (users: string[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  // Initial state
  messages: {},
  rooms: [],
  activeRoom: null,
  onlineUsers: [],

  // Actions
  setMessages: (roomId, messages) => 
    set((state) => ({
      messages: { ...state.messages, [roomId]: messages }
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [message.roomId]: [...(state.messages[message.roomId] || []), message]
      }
    })),

  setRooms: (rooms) => set({ rooms }),
  
  setActiveRoom: (roomId) => set({ activeRoom: roomId }),
  
  setOnlineUsers: (users) => set({ onlineUsers: users })
})) 