export const mockChatUsers = [
  { id: 'demo-user', name: 'Demo User', status: 'online', avatar: null },
  { id: 'alice', name: 'Alice Smith', status: 'online', avatar: null },
  { id: 'bob', name: 'Bob Johnson', status: 'away', avatar: null },
  { id: 'carol', name: 'Carol Williams', status: 'offline', avatar: null },
];

export const mockRooms = [
  { id: 'room-general', name: 'General', unreadCount: 2 },
  { id: 'room-engineering', name: 'Engineering', unreadCount: 0 },
  { id: 'room-design', name: 'Design', unreadCount: 5 },
  { id: 'room-random', name: 'Random', unreadCount: 0 },
];

export const mockMessages = [
  {
    id: 'msg-1',
    roomId: 'room-general',
    author: 'alice',
    content: 'Hey team! Has anyone reviewed the new pipeline editor?',
    timestamp: '2026-05-07T09:00:00Z',
  },
  {
    id: 'msg-2',
    roomId: 'room-general',
    author: 'demo-user',
    content: 'Yes, looking at it now. The drag-and-drop is smooth!',
    timestamp: '2026-05-07T09:05:00Z',
  },
  {
    id: 'msg-3',
    roomId: 'room-general',
    author: 'bob',
    content: 'I will check it out after lunch.',
    timestamp: '2026-05-07T09:10:00Z',
  },
];
