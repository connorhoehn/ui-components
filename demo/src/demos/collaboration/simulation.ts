import type { SimulationTimeline } from '../../engine/types';

export const collaborationTimeline: SimulationTimeline = {
  id: 'collaboration-full',
  name: 'Real-time Collaboration',
  description: 'Simulates presence, cursors, reactions, typing indicators, and activity.',
  loop: true,
  events: [
    // --- Users join ---
    {
      delay: 300,
      message: { type: 'presence', action: 'joined', userId: 'user-alice', displayName: 'Alice Chen', color: '#ec4899' },
      description: 'Alice joined',
    },
    {
      delay: 500,
      message: { type: 'cursor', action: 'joined', userId: 'user-alice', displayName: 'Alice Chen', color: '#ec4899', position: { x: 120, y: 80 } },
      description: 'Alice cursor appeared',
    },
    {
      delay: 800,
      message: { type: 'presence', action: 'joined', userId: 'user-bob', displayName: 'Bob Martinez', color: '#10b981' },
      description: 'Bob joined',
    },
    {
      delay: 300,
      message: { type: 'cursor', action: 'joined', userId: 'user-bob', displayName: 'Bob Martinez', color: '#10b981', position: { x: 400, y: 200 } },
      description: 'Bob cursor appeared',
    },
    {
      delay: 600,
      message: { type: 'presence', action: 'joined', userId: 'user-carol', displayName: 'Carol Park', color: '#f59e0b' },
      description: 'Carol joined',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'joined', userId: 'user-carol', displayName: 'Carol Park', color: '#f59e0b', position: { x: 300, y: 320 } },
      description: 'Carol cursor appeared',
    },

    // --- Alice moves and types ---
    {
      delay: 500,
      message: { type: 'cursor', action: 'moved', userId: 'user-alice', position: { x: 150, y: 100 } },
      description: 'Alice moving',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-alice', position: { x: 180, y: 110 } },
      description: 'Alice moving',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-alice', position: { x: 220, y: 120 } },
      description: 'Alice moving to document',
    },
    {
      delay: 300,
      message: { type: 'presence', action: 'typing', userId: 'user-alice', isTyping: true },
      description: 'Alice started typing',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-alice', position: { x: 250, y: 125 } },
      description: 'Alice typing',
    },

    // --- Bob moves around ---
    {
      delay: 300,
      message: { type: 'cursor', action: 'moved', userId: 'user-bob', position: { x: 380, y: 180 } },
      description: 'Bob moving',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-bob', position: { x: 350, y: 160 } },
      description: 'Bob moving',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-bob', position: { x: 320, y: 140 } },
      description: 'Bob moving toward doc',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-bob', position: { x: 300, y: 130 } },
      description: 'Bob near document',
    },

    // --- Alice stops typing, makes selection ---
    {
      delay: 500,
      message: { type: 'presence', action: 'typing', userId: 'user-alice', isTyping: false },
      description: 'Alice stopped typing',
    },
    {
      delay: 400,
      message: { type: 'cursor', action: 'selection', userId: 'user-alice', displayName: 'Alice Chen', color: '#ec4899', selection: { startX: 60, startY: 90, endX: 350, endY: 110 } },
      description: 'Alice selected text',
    },

    // --- Carol reacts ---
    {
      delay: 800,
      message: { type: 'reaction', action: 'cursor.reaction', userId: 'user-carol', emoji: '🔥', duration: 2000 },
      description: 'Carol reacted with fire',
    },
    {
      delay: 200,
      message: { type: 'reaction', action: 'sent', userId: 'user-carol', displayName: 'Carol Park', color: '#f59e0b', emoji: '🔥' },
      description: 'Carol fire reaction in feed',
    },

    // --- Bob starts typing ---
    {
      delay: 600,
      message: { type: 'presence', action: 'typing', userId: 'user-bob', isTyping: true },
      description: 'Bob started typing',
    },
    {
      delay: 300,
      message: { type: 'cursor', action: 'moved', userId: 'user-bob', position: { x: 280, y: 150 } },
      description: 'Bob at document',
    },

    // --- Alice clears selection, reacts ---
    {
      delay: 700,
      message: { type: 'cursor', action: 'selection.cleared', userId: 'user-alice' },
      description: 'Alice cleared selection',
    },
    {
      delay: 400,
      message: { type: 'reaction', action: 'cursor.reaction', userId: 'user-alice', emoji: '👍', duration: 2000 },
      description: 'Alice reacted thumbs up',
    },
    {
      delay: 200,
      message: { type: 'reaction', action: 'sent', userId: 'user-alice', displayName: 'Alice Chen', color: '#ec4899', emoji: '👍' },
      description: 'Alice thumbs up in feed',
    },

    // --- Carol moves and makes selection ---
    {
      delay: 500,
      message: { type: 'cursor', action: 'moved', userId: 'user-carol', position: { x: 200, y: 280 } },
      description: 'Carol moving',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-carol', position: { x: 180, y: 250 } },
      description: 'Carol moving',
    },
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-carol', position: { x: 160, y: 220 } },
      description: 'Carol moving',
    },
    {
      delay: 400,
      message: { type: 'cursor', action: 'selection', userId: 'user-carol', displayName: 'Carol Park', color: '#f59e0b', selection: { startX: 100, startY: 200, endX: 400, endY: 220 } },
      description: 'Carol selected paragraph',
    },
    {
      delay: 300,
      message: { type: 'presence', action: 'typing', userId: 'user-carol', isTyping: true },
      description: 'Carol started typing',
    },

    // --- Bob stops typing, reacts ---
    {
      delay: 800,
      message: { type: 'presence', action: 'typing', userId: 'user-bob', isTyping: false },
      description: 'Bob stopped typing',
    },
    {
      delay: 300,
      message: { type: 'reaction', action: 'cursor.reaction', userId: 'user-bob', emoji: '❤️', duration: 2000 },
      description: 'Bob reacted heart',
    },
    {
      delay: 200,
      message: { type: 'reaction', action: 'sent', userId: 'user-bob', displayName: 'Bob Martinez', color: '#10b981', emoji: '❤️' },
      description: 'Bob heart in feed',
    },

    // --- New user joins late ---
    {
      delay: 1000,
      message: { type: 'presence', action: 'joined', userId: 'user-david', displayName: 'David Kim', color: '#6366f1' },
      description: 'David joined',
    },
    {
      delay: 300,
      message: { type: 'cursor', action: 'joined', userId: 'user-david', displayName: 'David Kim', color: '#6366f1', position: { x: 500, y: 300 } },
      description: 'David cursor appeared',
    },

    // --- Carol stops typing, clears selection ---
    {
      delay: 600,
      message: { type: 'presence', action: 'typing', userId: 'user-carol', isTyping: false },
      description: 'Carol stopped typing',
    },
    {
      delay: 300,
      message: { type: 'cursor', action: 'selection.cleared', userId: 'user-carol' },
      description: 'Carol cleared selection',
    },

    // --- David moves quickly ---
    {
      delay: 200,
      message: { type: 'cursor', action: 'moved', userId: 'user-david', position: { x: 450, y: 260 } },
      description: 'David moving',
    },
    {
      delay: 150,
      message: { type: 'cursor', action: 'moved', userId: 'user-david', position: { x: 400, y: 220 } },
      description: 'David moving fast',
    },
    {
      delay: 150,
      message: { type: 'cursor', action: 'moved', userId: 'user-david', position: { x: 350, y: 180 } },
      description: 'David moving fast',
    },
    {
      delay: 150,
      message: { type: 'cursor', action: 'moved', userId: 'user-david', position: { x: 320, y: 160 } },
      description: 'David settled',
    },

    // --- Multi-reaction burst ---
    {
      delay: 800,
      message: { type: 'reaction', action: 'sent', userId: 'user-david', displayName: 'David Kim', color: '#6366f1', emoji: '🎉' },
      description: 'David celebration',
    },
    {
      delay: 300,
      message: { type: 'reaction', action: 'sent', userId: 'user-alice', displayName: 'Alice Chen', color: '#ec4899', emoji: '🎉' },
      description: 'Alice celebration',
    },
    {
      delay: 200,
      message: { type: 'reaction', action: 'sent', userId: 'user-bob', displayName: 'Bob Martinez', color: '#10b981', emoji: '👏' },
      description: 'Bob clapping',
    },
    {
      delay: 200,
      message: { type: 'reaction', action: 'sent', userId: 'user-carol', displayName: 'Carol Park', color: '#f59e0b', emoji: '💯' },
      description: 'Carol 100',
    },

    // --- Someone leaves ---
    {
      delay: 1500,
      message: { type: 'presence', action: 'left', userId: 'user-david' },
      description: 'David left',
    },

    // --- Final movements before loop ---
    {
      delay: 500,
      message: { type: 'cursor', action: 'moved', userId: 'user-alice', position: { x: 300, y: 200 } },
      description: 'Alice repositioning',
    },
    {
      delay: 300,
      message: { type: 'cursor', action: 'moved', userId: 'user-bob', position: { x: 400, y: 250 } },
      description: 'Bob repositioning',
    },
    {
      delay: 300,
      message: { type: 'cursor', action: 'moved', userId: 'user-carol', position: { x: 250, y: 300 } },
      description: 'Carol repositioning',
    },

    // --- Reset before loop ---
    {
      delay: 2000,
      message: { type: 'presence', action: 'left', userId: 'user-alice' },
      description: 'Alice left (loop reset)',
    },
    {
      delay: 100,
      message: { type: 'presence', action: 'left', userId: 'user-bob' },
      description: 'Bob left (loop reset)',
    },
    {
      delay: 100,
      message: { type: 'presence', action: 'left', userId: 'user-carol' },
      description: 'Carol left (loop reset)',
    },
  ],
};
