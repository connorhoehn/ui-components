import type { SimulationTimeline } from '../../engine/types';

export const callWidgetTimeline: SimulationTimeline = {
  id: 'call-widget-live',
  name: 'Call Widget Experience',
  description: 'Simulates a full call lifecycle: chat messages, incoming call, answer, speaking, screen share, and hangup.',
  loop: true,
  events: [
    // --- Chat messages arrive ---
    {
      delay: 800,
      message: { type: 'chat', action: 'message', sender: 'sarah', text: 'Hey team, can we do a quick sync on the API changes?', time: '9:42 AM' },
      description: 'Sarah sends message',
    },
    {
      delay: 1200,
      message: { type: 'chat', action: 'message', sender: 'marcus', text: 'Sure, give me 5 minutes to wrap up this PR', time: '9:43 AM' },
      description: 'Marcus replies',
    },
    {
      delay: 1000,
      message: { type: 'chat', action: 'message', sender: 'sarah', text: "No rush. I'll start a call when everyone's ready", time: '9:43 AM' },
      description: 'Sarah replies',
    },
    {
      delay: 1400,
      message: { type: 'chat', action: 'message', sender: 'alex', text: "I'm free now", time: '9:44 AM' },
      description: 'Alex is available',
    },
    {
      delay: 2000,
      message: { type: 'chat', action: 'message', sender: 'marcus', text: 'OK ready. Go ahead and call', time: '9:47 AM' },
      description: 'Marcus is ready',
    },
    {
      delay: 1500,
      message: { type: 'chat', action: 'message', sender: 'sarah', text: '\u{1F4DE} Starting a call...', time: '9:48 AM' },
      description: 'Sarah announces call',
    },

    // --- Incoming call ---
    {
      delay: 1000,
      message: { type: 'call', action: 'ring' },
      description: 'Incoming call from Sarah',
    },

    // --- Answer the call ---
    {
      delay: 3000,
      message: { type: 'call', action: 'answer' },
      description: 'Call answered',
    },

    // --- Connecting... then active ---
    {
      delay: 1500,
      message: { type: 'call', action: 'connected' },
      description: 'Call connected',
    },

    // --- Speaking simulation ---
    {
      delay: 2000,
      message: { type: 'call', action: 'speaking', speaker: 'sarah' },
      description: 'Sarah speaking',
    },
    {
      delay: 2500,
      message: { type: 'call', action: 'speaking', speaker: 'marcus' },
      description: 'Marcus speaking',
    },
    {
      delay: 2000,
      message: { type: 'call', action: 'speaking', speaker: 'local' },
      description: 'You speaking',
    },
    {
      delay: 1800,
      message: { type: 'call', action: 'speaking', speaker: 'sarah' },
      description: 'Sarah speaking',
    },
    {
      delay: 2200,
      message: { type: 'call', action: 'speaking', speaker: null },
      description: 'Silence',
    },

    // --- Mute toggle ---
    {
      delay: 1500,
      message: { type: 'call', action: 'mute', muted: true },
      description: 'You muted',
    },
    {
      delay: 2000,
      message: { type: 'call', action: 'speaking', speaker: 'marcus' },
      description: 'Marcus speaking',
    },
    {
      delay: 2500,
      message: { type: 'call', action: 'mute', muted: false },
      description: 'You unmuted',
    },

    // --- Upgrade to video ---
    {
      delay: 2000,
      message: { type: 'call', action: 'upgrade-video' },
      description: 'Upgraded to video',
    },
    {
      delay: 2000,
      message: { type: 'call', action: 'speaking', speaker: 'sarah' },
      description: 'Sarah speaking (video)',
    },
    {
      delay: 2500,
      message: { type: 'call', action: 'speaking', speaker: 'local' },
      description: 'You speaking (video)',
    },

    // --- Screen share ---
    {
      delay: 2000,
      message: { type: 'call', action: 'screen-share', sharing: true },
      description: 'Screen sharing started',
    },
    {
      delay: 3000,
      message: { type: 'call', action: 'speaking', speaker: 'marcus' },
      description: 'Marcus commenting on share',
    },
    {
      delay: 2500,
      message: { type: 'call', action: 'screen-share', sharing: false },
      description: 'Screen sharing stopped',
    },

    // --- Minimize and expand ---
    {
      delay: 2000,
      message: { type: 'call', action: 'minimize' },
      description: 'Widget minimized',
    },
    {
      delay: 3000,
      message: { type: 'call', action: 'expand' },
      description: 'Widget expanded',
    },

    // --- End call ---
    {
      delay: 2000,
      message: { type: 'call', action: 'speaking', speaker: 'sarah' },
      description: 'Sarah wrapping up',
    },
    {
      delay: 2500,
      message: { type: 'call', action: 'end' },
      description: 'Call ended',
    },

    // --- Post-call chat ---
    {
      delay: 1500,
      message: { type: 'chat', action: 'message', sender: 'sarah', text: 'Great sync! I\'ll update the ticket.', time: '9:55 AM' },
      description: 'Sarah post-call message',
    },
    {
      delay: 1200,
      message: { type: 'chat', action: 'message', sender: 'marcus', text: '\u{1F44D}', time: '9:55 AM' },
      description: 'Marcus thumbs up',
    },

    // --- Reset for loop ---
    {
      delay: 4000,
      message: { type: 'call', action: 'reset' },
      description: 'Reset (loop restart)',
    },
  ],
};
