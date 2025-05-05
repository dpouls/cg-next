import { io, Socket } from 'socket.io-client'
import { useChatStore, Message } from '@/store/useChatStore'

class SocketService {
  private socket: Socket | null = null
  private static instance: SocketService

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }
    return SocketService.instance
  }

  connect(userId: string) {
    if (this.socket?.connected) return

    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000', {
      auth: { userId },
      transports: ['websocket'],
    })

    this.setupListeners()
  }

  private setupListeners() {
    if (!this.socket) return

    // Handle new messages
    this.socket.on('message', (message) => {
      useChatStore.getState().addMessage(message)
    })

    // Handle online users updates
    this.socket.on('onlineUsers', (users) => {
      useChatStore.getState().setOnlineUsers(users)
    })

    // Handle room updates
    this.socket.on('rooms', (rooms) => {
      useChatStore.getState().setRooms(rooms)
    })

    // Handle connection errors
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })
  }

  // Join a chat room
  joinRoom(roomId: string) {
    this.socket?.emit('joinRoom', roomId)
  }

  // Leave a chat room
  leaveRoom(roomId: string) {
    this.socket?.emit('leaveRoom', roomId)
  }

  // Send a message
  sendMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    this.socket?.emit('message', message)
  }

  // Disconnect from the server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }
}

export const socketService = SocketService.getInstance() 