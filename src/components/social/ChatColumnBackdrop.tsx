// ChatColumnBackdrop — the chat column, turned into a console.
//
// Switching the composer to Agent or Terminal changes what Enter does: the
// message stops being a message and becomes an instruction to something that
// will go away and work. That is a big enough change of mode that a small
// segmented control cannot carry it alone — people type into the wrong mode and
// only find out when the wrong thing happens. So the whole column answers: the
// light surface crossfades to the near-black gradient, a star field drifts up
// behind the transcript, and the chrome flips to the dark palette. You cannot
// be in agent mode and not know it.
//
// HOW THE DARK HALF WORKS. Not a second set of classes on every composite in
// the column — that is the migration this library keeps refusing to sign up
// for, and it goes stale the moment someone adds a row. Instead the wrapper
// carries `data-theme="dark"`, which is the documented per-subtree theme switch
// in styles.css ("<div data-theme='dark'> → just that subtree flips"), so every
// `bg-surface` / `text-text-primary` / `border-border` in the column resolves
// to its night value with no component changes at all. On top of that,
// `.uic-chat-console` re-points the SURFACE tokens to transparent and to
// alpha-over-dark, which is the part the theme switch cannot know about: an
// opaque panel, however dark, would hide every star behind it.
//
// Reverting is the same two classes coming off, so "Back to chat" is a
// crossfade rather than a re-render into a different design.

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { AGENT_PARTICLE_COLORS, ParticlesBackground } from '../shared/ParticlesBackground';
import type { ComposerMode } from './RichChatComposer';

/** Matches the CSS transition and `ParticlesBackground`'s own crossfade. */
const CROSSFADE_MS = 300;

export interface ChatColumnBackdropProps {
  /**
   * The composer's mode. `chat` is the ordinary light column; `agent` and
   * `terminal` are the console.
   */
  mode?: ComposerMode;
  /**
   * True while a loop is mid-turn. Denser, faster, and the cloud leans toward
   * the pointer — the same "this is working" signal the lab shell uses, said by
   * the whole column instead of one pane.
   */
  working?: boolean;
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

/**
 * Wraps the message list + composer so the column as a whole changes state with
 * the mode. Layout is identical in both states — only colour and the backdrop
 * change — so nothing reflows across the transition.
 */
export function ChatColumnBackdrop({
  mode = 'chat',
  working = false,
  className,
  children,
  'data-testid': testId = 'chat-column-backdrop',
}: ChatColumnBackdropProps) {
  const console_ = mode !== 'chat';
  // Held one crossfade past the switch back, so the dark palette leaves WITH
  // the star field rather than a frame before it — a column that goes white
  // while the sky is still fading out flashes.
  const [dark, setDark] = useState(console_);
  useEffect(() => {
    if (console_) {
      setDark(true);
      return;
    }
    const timer = setTimeout(() => setDark(false), CROSSFADE_MS);
    return () => clearTimeout(timer);
  }, [console_]);

  return (
    <div
      data-testid={testId}
      data-mode={mode}
      data-console={console_ ? 'true' : 'false'}
      data-working={working ? 'true' : 'false'}
      {...(dark ? { 'data-theme': 'dark' } : {})}
      className={cn(
        'relative flex min-h-0 min-w-0 flex-1 flex-col transition-colors duration-300 motion-reduce:transition-none',
        dark && 'uic-chat-console',
        className,
      )}
    >
      <ParticlesBackground
        active={console_}
        // Working is denser and a touch quicker, and the cloud follows the
        // pointer — a difference you feel before you read the status line.
        particleCount={working ? 260 : 170}
        speed={working ? 0.16 : 0.07}
        moveParticlesOnHover={working}
        particleHoverFactor={0.6}
        alphaParticles
        particleColors={AGENT_PARTICLE_COLORS}
        particleBaseSize={working ? 110 : 90}
        fallbackIntensity={working ? 'medium' : 'low'}
        className="flex min-h-0 min-w-0 flex-1 flex-col"
        data-testid={`${testId}-particles`}
      >
        {children}
      </ParticlesBackground>
    </div>
  );
}

export default ChatColumnBackdrop;
