import api from '@/lib/axios';

export interface Thread {
  thread_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  author_name: string;
  comment_count: number;
}

export interface Comment {
  comment_id: string;
  thread_id: string;
  parent_id: string | null;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  likes: number;
  children: Comment[];
}

export interface ThreadDetail extends Thread {
  content: string;
  likes: number;
  comments: Comment[];
}

// Temporary mock data until API is ready
const mockThreads: Thread[] = [
  {
    thread_id: '1',
    title: 'How can we improve local recycling programs?',
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-10T10:00:00Z',
    author_id: 'user1',
    author_name: 'John Doe',
    comment_count: 15
  },
  {
    thread_id: '2',
    title: 'Community garden initiative proposal',
    created_at: '2024-03-09T15:30:00Z',
    updated_at: '2024-03-10T08:45:00Z',
    author_id: 'user2',
    author_name: 'Jane Smith',
    comment_count: 23
  },
  {
    thread_id: '3',
    title: 'Public transportation improvements needed',
    created_at: '2024-03-08T09:15:00Z',
    updated_at: '2024-03-09T16:20:00Z',
    author_id: 'user3',
    author_name: 'Mike Johnson',
    comment_count: 42
  },
  {
    thread_id: '4',
    title: 'Local school funding discussion',
    created_at: '2024-03-07T14:00:00Z',
    updated_at: '2024-03-08T11:30:00Z',
    author_id: 'user4',
    author_name: 'Sarah Williams',
    comment_count: 31
  },
  {
    thread_id: '5',
    title: 'Neighborhood safety improvements',
    created_at: '2024-03-06T11:45:00Z',
    updated_at: '2024-03-07T09:15:00Z',
    author_id: 'user5',
    author_name: 'David Brown',
    comment_count: 19
  }
];

const mockComments: Comment[] = [
  {
    comment_id: '1',
    thread_id: '1',
    parent_id: null,
    content: 'I think we should start by improving the recycling bins in public spaces. Many people don\'t recycle because it\'s not convenient.',
    author_id: 'user2',
    author_name: 'Jane Smith',
    created_at: '2024-03-10T10:30:00Z',
    updated_at: '2024-03-10T10:30:00Z',
    likes: 12,
    children: [
      {
        comment_id: '2',
        thread_id: '1',
        parent_id: '1',
        content: 'Good point! We could also add more educational signs near the bins to help people understand what can be recycled.',
        author_id: 'user3',
        author_name: 'Mike Johnson',
        created_at: '2024-03-10T11:00:00Z',
        updated_at: '2024-03-10T11:00:00Z',
        likes: 8,
        children: [
          {
            comment_id: '4',
            thread_id: '1',
            parent_id: '2',
            content: 'I\'ve seen some cities use QR codes on bins that link to recycling guides. That could be a modern solution!',
            author_id: 'user1',
            author_name: 'John Doe',
            created_at: '2024-03-10T11:30:00Z',
            updated_at: '2024-03-10T11:30:00Z',
            likes: 15,
            children: []
          }
        ]
      }
    ]
  },
  {
    comment_id: '3',
    thread_id: '1',
    parent_id: null,
    content: 'We should also consider implementing a composting program. Food waste makes up a significant portion of our trash.',
    author_id: 'user4',
    author_name: 'Sarah Williams',
    created_at: '2024-03-10T10:45:00Z',
    updated_at: '2024-03-10T10:45:00Z',
    likes: 9,
    children: []
  }
];

const mockThreadDetail: ThreadDetail = {
  thread_id: '1',
  title: 'How can we improve local recycling programs?',
  content: 'Our community\'s recycling rate is below the national average. I\'d like to hear ideas from everyone about how we can improve our recycling programs and encourage more participation. What has worked in other communities? What challenges do you see in our current system?',
  created_at: '2024-03-10T10:00:00Z',
  updated_at: '2024-03-10T10:00:00Z',
  author_id: 'user1',
  author_name: 'John Doe',
  comment_count: 4,
  likes: 25,
  comments: mockComments
};

export const getThreads = async (): Promise<Thread[]> => {
  try {
    // When API is ready, uncomment this:
    // const { data } = await api.get<Thread[]>('/api/v1/threads');
    // return data;
    
    // For now, return mock data
    return mockThreads;
  } catch (error) {
    throw new Error('Failed to fetch threads');
  }
};

export const getThreadDetail = async (threadId: string): Promise<ThreadDetail> => {
  try {
    // When API is ready, uncomment this:
    // const { data } = await api.get<ThreadDetail>(`/api/v1/threads/${threadId}`);
    // return data;
    
    // For now, return mock data
    return mockThreadDetail;
  } catch (error) {
    throw new Error('Failed to fetch thread detail');
  }
}; 