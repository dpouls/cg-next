import api from '@/lib/axios';

export interface Thread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
  parentId: string | null;
  children: Comment[];
}

export interface ThreadDetail extends Thread {
  comments: Comment[];
}

// Mock data for threads
export const mockThreads: Thread[] = [
  {
    id: "1",
    title: "First Thread",
    content: "This is the content of the first thread",
    authorId: "user1",
    authorName: "John Doe",
    createdAt: "2024-03-15T10:00:00Z",
    likes: 10,
    commentCount: 5,
  },
  {
    id: "2",
    title: "Second Thread",
    content: "This is the content of the second thread",
    authorId: "user2",
    authorName: "Jane Smith",
    createdAt: "2024-03-15T11:00:00Z",
    likes: 5,
    commentCount: 2,
  },
];

// Mock data for comments
export const mockComments: Comment[] = [
  {
    id: "1",
    content: "This is a comment",
    authorId: "user2",
    authorName: "Jane Smith",
    createdAt: "2024-03-15T10:30:00Z",
    likes: 3,
    parentId: null,
    children: [
      {
        id: "2",
        content: "This is a reply",
        authorId: "user1",
        authorName: "John Doe",
        createdAt: "2024-03-15T10:35:00Z",
        likes: 1,
        parentId: "1",
        children: [],
      },
    ],
  },
  {
    id: "3",
    content: "Another top-level comment",
    authorId: "user3",
    authorName: "Bob Johnson",
    createdAt: "2024-03-15T11:00:00Z",
    likes: 2,
    parentId: null,
    children: [],
  },
];

// Mock thread detail
export const mockThreadDetail: ThreadDetail = {
  ...mockThreads[0],
  comments: mockComments,
};

// Function to get all threads
export const getThreads = async (): Promise<Thread[]> => {
  // TODO: Replace with actual API call
  return mockThreads;
};

// Function to get a specific thread with comments
export const getThreadDetail = async (threadId: string): Promise<ThreadDetail> => {
  // TODO: Replace with actual API call
  return mockThreadDetail;
};

// Function to create a new thread
export const createThread = async (data: {
  title: string;
  content: string;
}): Promise<Thread> => {
  // TODO: Replace with actual API call
  const newThread: Thread = {
    id: Math.random().toString(36).substring(7),
    title: data.title,
    content: data.content,
    authorId: "user1", // This would come from the authenticated user
    authorName: "John Doe", // This would come from the authenticated user
    createdAt: new Date().toISOString(),
    likes: 0,
    commentCount: 0,
  };

  return newThread;
}; 