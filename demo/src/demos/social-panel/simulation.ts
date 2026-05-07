import type { SimulationTimeline } from '../../engine/types';

export const socialActivityTimeline: SimulationTimeline = {
  id: 'social-activity',
  name: 'Social Panel Activity',
  description: 'Simulates chat messages, typing indicators, reactions, and user presence.',
  loop: true,
  events: [
    {
      delay: 1000,
      message: {
        type: 'chat',
        action: 'message',
        messageId: 'msg-101',
        userId: 'user-alice',
        displayName: 'Alice',
        text: 'Hey everyone! Has anyone looked at the new pipeline config?',
        channel: 'general',
        timestamp: Date.now(),
      },
      description: 'New message from Alice',
    },
    {
      delay: 2000,
      message: {
        type: 'presence',
        action: 'typing.started',
        userId: 'user-bob',
        displayName: 'Bob',
        channel: 'general',
      },
      description: 'Bob is typing...',
    },
    {
      delay: 2500,
      message: {
        type: 'chat',
        action: 'message',
        messageId: 'msg-102',
        userId: 'user-bob',
        displayName: 'Bob',
        text: 'Yes! The new transform step is way faster. Went from 12s to 3s on our dataset.',
        channel: 'general',
        timestamp: Date.now(),
      },
      description: 'New message from Bob',
    },
    {
      delay: 1500,
      message: {
        type: 'reaction',
        action: 'added',
        messageId: 'msg-102',
        userId: 'user-alice',
        displayName: 'Alice',
        emoji: '🔥',
        channel: 'general',
      },
      description: 'Alice reacted with fire emoji',
    },
    {
      delay: 2000,
      message: {
        type: 'presence',
        action: 'joined',
        userId: 'user-carol',
        displayName: 'Carol Martinez',
        channel: 'general',
        status: 'online',
      },
      description: 'Carol joined the room',
    },
    {
      delay: 1800,
      message: {
        type: 'chat',
        action: 'post',
        postId: 'post-50',
        userId: 'user-carol',
        displayName: 'Carol Martinez',
        title: 'Weekly Pipeline Performance Report',
        preview: 'Average processing time decreased 45% this week...',
        channel: 'feed',
        timestamp: Date.now(),
      },
      description: 'New post in feed from Carol',
    },
  ],
};
