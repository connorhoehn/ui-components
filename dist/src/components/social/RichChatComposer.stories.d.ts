import type { Meta, StoryObj } from '@storybook/react-vite';
import { RichChatComposer } from './RichChatComposer';
declare const meta: Meta<typeof RichChatComposer>;
export default meta;
type Story = StoryObj<typeof RichChatComposer>;
export declare const Default: Story;
/**
 * Mentions, on their own.
 *
 * Type `@` then a letter — `n` matches four of these people. Arrow keys move,
 * Enter or Tab commits, Escape dismisses. The committed chip is a NODE carrying
 * the userId, which is why the panel below reports an id and not just a name:
 * that is the difference between a real mention and the text "@Nora".
 */
export declare const Mentions: Story;
/** No file capability: the paperclip and the drop overlay are absent, not greyed. */
export declare const ChatOnly: Story;
/** Drag an image in — it stages as a chip with a thumbnail and travels on send. */
export declare const Attachments: Story;
/** No directory wired: typing "@" is just an @ character. */
export declare const WithoutMentions: Story;
/**
 * The Documents editor's composer: a compact mode row (label, `1 2 3`,
 * `⌥n`) instead of three large tabs. Option-1/2/3 switch while focus is in
 * the composer; typing `>` alone switches to Terminal and `/run ` to Agent.
 * Terminal is refused here with a reason, as it is when no run is attached.
 */
export declare const CompactModes: Story;
export declare const AdaptiveMatrix: Story;
/** A host whose design tokens have no radius at all still gets a rounded composer; `radius` / `--composer-radius` override. */
export declare const RadiusOnASquareHost: Story;
/** The input grows with its content to `maxInputHeight`, then scrolls inside itself. */
export declare const AutoGrowCap: Story;
/**
 * The editor's docked card (2.383.0): `toolbar="compact"` — B, I, link,
 * bulleted list, attach, then the muted `/ commands`; strikethrough, code,
 * numbered list and quote under `?` → Formatting. The chat column keeps the
 * default `full` strip above it for comparison.
 */
export declare const CompactStrip: Story;
/**
 * 2.389.0 — a light composer whose context is a menu, not a removable chip:
 * `Agent ▾` at the left, `This guide ▾` at the right of the mode row.
 */
export declare const ReferenceMenu: Story;
/**
 * 2.389.1 — the composer in a box whose width comes from its children: an
 * `auto` grid column and an inline-block. The composer's size class keys off
 * its own width, and in a box like this that width depends on which controls
 * the size class shows — the loop that used to end in "Maximum update depth
 * exceeded". It now settles on one layout.
 */
export declare const ContentSizedContainer: Story;
//# sourceMappingURL=RichChatComposer.stories.d.ts.map