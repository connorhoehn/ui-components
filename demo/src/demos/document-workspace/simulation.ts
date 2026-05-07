import type { SimulationTimeline } from '../../engine/types';

export const documentCollaborationTimeline: SimulationTimeline = {
  id: 'document-collaboration',
  name: 'Document Collaboration',
  description: 'Simulates collaborative editing with cursors, typing, comments, and mentions.',
  loop: true,
  events: [
    {
      delay: 500,
      message: {
        type: 'cursor',
        action: 'joined',
        userId: 'user-alice',
        displayName: 'Alice Smith',
        color: '#ec4899',
        position: { line: 4, column: 0 },
      },
      description: 'Alice joined the document',
    },
    {
      delay: 1000,
      message: {
        type: 'cursor',
        action: 'moved',
        userId: 'user-alice',
        position: { line: 4, column: 12 },
      },
      description: 'Alice cursor moved',
    },
    {
      delay: 300,
      message: {
        type: 'presence',
        action: 'typing.started',
        userId: 'user-alice',
        displayName: 'Alice Smith',
      },
      description: 'Alice started typing',
    },
    {
      delay: 400,
      message: {
        type: 'document',
        action: 'text.insert',
        userId: 'user-alice',
        position: { line: 4, column: 12 },
        text: 'The ',
      },
      description: 'Alice typed "The "',
    },
    {
      delay: 350,
      message: {
        type: 'document',
        action: 'text.insert',
        userId: 'user-alice',
        position: { line: 4, column: 16 },
        text: 'quarterly ',
      },
      description: 'Alice typed "quarterly "',
    },
    {
      delay: 300,
      message: {
        type: 'document',
        action: 'text.insert',
        userId: 'user-alice',
        position: { line: 4, column: 26 },
        text: 'report ',
      },
      description: 'Alice typed "report "',
    },
    {
      delay: 400,
      message: {
        type: 'document',
        action: 'text.insert',
        userId: 'user-alice',
        position: { line: 4, column: 33 },
        text: 'shows significant growth.',
      },
      description: 'Alice typed "shows significant growth."',
    },
    {
      delay: 600,
      message: {
        type: 'cursor',
        action: 'moved',
        userId: 'user-alice',
        position: { line: 4, column: 58 },
      },
      description: 'Alice cursor at end of sentence',
    },
    {
      delay: 800,
      message: {
        type: 'presence',
        action: 'typing.stopped',
        userId: 'user-alice',
        displayName: 'Alice Smith',
      },
      description: 'Alice stopped typing',
    },
    {
      delay: 1500,
      message: {
        type: 'document',
        action: 'comment.added',
        userId: 'user-alice',
        displayName: 'Alice Smith',
        commentId: 'comment-1',
        selection: { startLine: 4, startColumn: 16, endLine: 4, endColumn: 58 },
        text: 'Can we add specific percentages here?',
      },
      description: 'Alice added a comment',
    },
    {
      delay: 2000,
      message: {
        type: 'chat',
        action: 'mention',
        userId: 'user-alice',
        displayName: 'Alice Smith',
        targetUserId: 'demo-user',
        text: '@Demo User please review the quarterly section',
        channel: 'doc-comments',
      },
      description: 'Alice mentioned you in a comment',
    },
    {
      delay: 2000,
      message: {
        type: 'cursor',
        action: 'moved',
        userId: 'user-alice',
        position: { line: 8, column: 0 },
      },
      description: 'Alice moved to line 8',
    },
  ],
};
