// Emoji shortcodes for `:` autocomplete.
//
// A curated list rather than a full Unicode emoji database: the whole set is
// ~1,900 entries and several hundred KB, which is a large thing to put in every
// consumer's bundle so that someone can type `:derelict_house:`. These are the
// codes people actually reach for in a work chat, and the list is data — a host
// that wants the full set can pass its own.
//
// Codes match Slack/GitHub naming where the two agree, because that is the
// muscle memory people arrive with: `:+1:` and `:tada:` have to work.

export interface EmojiShortcode {
  /** The code typed between colons, without them. */
  code: string;
  emoji: string;
  /** Extra search terms, so `:party:` finds 🎉 even though its code is `tada`. */
  keywords?: readonly string[];
}

export const EMOJI_SHORTCODES: readonly EmojiShortcode[] = [
  // Reactions people actually send
  { code: '+1', emoji: '👍', keywords: ['thumbsup', 'yes', 'lgtm', 'approve'] },
  { code: '-1', emoji: '👎', keywords: ['thumbsdown', 'no'] },
  { code: 'heart', emoji: '❤️', keywords: ['love'] },
  { code: 'fire', emoji: '🔥', keywords: ['lit', 'hot'] },
  { code: 'tada', emoji: '🎉', keywords: ['party', 'celebrate', 'ship'] },
  { code: 'clap', emoji: '👏', keywords: ['applause'] },
  { code: '100', emoji: '💯', keywords: ['hundred', 'perfect'] },
  { code: 'eyes', emoji: '👀', keywords: ['look', 'watching'] },
  { code: 'rocket', emoji: '🚀', keywords: ['ship', 'deploy', 'launch'] },
  { code: 'sparkles', emoji: '✨', keywords: ['new', 'shiny'] },
  { code: 'pray', emoji: '🙏', keywords: ['please', 'thanks', 'thankyou'] },
  { code: 'muscle', emoji: '💪', keywords: ['strong'] },
  { code: 'wave', emoji: '👋', keywords: ['hello', 'hi', 'bye'] },
  { code: 'ok_hand', emoji: '👌', keywords: ['ok', 'fine'] },
  { code: 'handshake', emoji: '🤝', keywords: ['deal', 'agree'] },
  { code: 'crossed_fingers', emoji: '🤞', keywords: ['hope', 'luck'] },
  { code: 'salute', emoji: '🫡', keywords: ['yes', 'ack', 'onit'] },

  // Faces
  { code: 'smile', emoji: '😀', keywords: ['happy'] },
  { code: 'grin', emoji: '😁' },
  { code: 'joy', emoji: '😂', keywords: ['lol', 'laugh', 'crying'] },
  { code: 'rofl', emoji: '🤣', keywords: ['lmao', 'laugh'] },
  { code: 'sweat_smile', emoji: '😅', keywords: ['phew', 'nervous'] },
  { code: 'wink', emoji: '😉' },
  { code: 'heart_eyes', emoji: '😍', keywords: ['love'] },
  { code: 'smiling_face_with_tear', emoji: '🥲' },
  { code: 'thinking', emoji: '🤔', keywords: ['hmm', 'think'] },
  { code: 'sunglasses', emoji: '😎', keywords: ['cool'] },
  { code: 'upside_down', emoji: '🙃', keywords: ['irony'] },
  { code: 'star_struck', emoji: '🤩', keywords: ['wow'] },
  { code: 'cry', emoji: '😢', keywords: ['sad'] },
  { code: 'sob', emoji: '😭', keywords: ['crying', 'sad'] },
  { code: 'rage', emoji: '😡', keywords: ['angry', 'mad'] },
  { code: 'exploding_head', emoji: '🤯', keywords: ['mindblown', 'wow'] },
  { code: 'scream', emoji: '😱', keywords: ['fear', 'panic'] },
  { code: 'sleeping', emoji: '😴', keywords: ['tired', 'zzz'] },
  { code: 'zany_face', emoji: '🤪', keywords: ['silly'] },
  { code: 'melting_face', emoji: '🫠', keywords: ['dead', 'overwhelmed'] },
  { code: 'face_with_monocle', emoji: '🧐', keywords: ['inspect', 'review'] },
  { code: 'shushing_face', emoji: '🤫', keywords: ['quiet', 'secret'] },
  { code: 'partying_face', emoji: '🥳', keywords: ['party', 'birthday'] },
  { code: 'grimacing', emoji: '😬', keywords: ['yikes', 'awkward'] },
  { code: 'neutral_face', emoji: '😐', keywords: ['meh'] },
  { code: 'expressionless', emoji: '😑', keywords: ['blank'] },
  { code: 'smiling_imp', emoji: '😈', keywords: ['evil'] },

  // Work / engineering
  { code: 'bug', emoji: '🐛', keywords: ['defect', 'issue'] },
  { code: 'wrench', emoji: '🔧', keywords: ['fix', 'tool'] },
  { code: 'hammer', emoji: '🔨', keywords: ['build'] },
  { code: 'gear', emoji: '⚙️', keywords: ['settings', 'config'] },
  { code: 'warning', emoji: '⚠️', keywords: ['careful', 'caution'] },
  { code: 'rotating_light', emoji: '🚨', keywords: ['alert', 'incident', 'siren'] },
  { code: 'white_check_mark', emoji: '✅', keywords: ['done', 'pass', 'green'] },
  { code: 'x', emoji: '❌', keywords: ['fail', 'no', 'red'] },
  { code: 'heavy_check_mark', emoji: '✔️', keywords: ['done'] },
  { code: 'hourglass', emoji: '⏳', keywords: ['wait', 'pending', 'slow'] },
  { code: 'zap', emoji: '⚡', keywords: ['fast', 'perf', 'lightning'] },
  { code: 'boom', emoji: '💥', keywords: ['crash', 'break'] },
  { code: 'memo', emoji: '📝', keywords: ['note', 'docs', 'write'] },
  { code: 'chart_with_upwards_trend', emoji: '📈', keywords: ['metrics', 'up', 'growth'] },
  { code: 'chart_with_downwards_trend', emoji: '📉', keywords: ['metrics', 'down'] },
  { code: 'lock', emoji: '🔒', keywords: ['secure', 'auth', 'private'] },
  { code: 'key', emoji: '🔑', keywords: ['secret', 'auth'] },
  { code: 'mag', emoji: '🔍', keywords: ['search', 'find', 'investigate'] },
  { code: 'link', emoji: '🔗', keywords: ['url'] },
  { code: 'pushpin', emoji: '📌', keywords: ['pin', 'important'] },
  { code: 'calendar', emoji: '📅', keywords: ['date', 'schedule'] },
  { code: 'bulb', emoji: '💡', keywords: ['idea', 'suggestion'] },
  { code: 'construction', emoji: '🚧', keywords: ['wip', 'progress'] },
  { code: 'recycle', emoji: '♻️', keywords: ['refactor'] },
  { code: 'lipstick', emoji: '💄', keywords: ['ui', 'style', 'polish'] },
  { code: 'package', emoji: '📦', keywords: ['release', 'build', 'bundle'] },
  { code: 'robot', emoji: '🤖', keywords: ['bot', 'ai', 'agent'] },
  { code: 'ghost', emoji: '👻', keywords: ['flaky', 'spooky'] },
  { code: 'snail', emoji: '🐌', keywords: ['slow'] },
  { code: 'trophy', emoji: '🏆', keywords: ['win', 'best'] },
  { code: 'dart', emoji: '🎯', keywords: ['target', 'goal'] },
  { code: 'brain', emoji: '🧠', keywords: ['smart', 'think'] },

  // Everything else people type
  { code: 'coffee', emoji: '☕', keywords: ['brb', 'morning'] },
  { code: 'pizza', emoji: '🍕', keywords: ['lunch', 'food'] },
  { code: 'beers', emoji: '🍻', keywords: ['cheers', 'friday'] },
  { code: 'cake', emoji: '🍰', keywords: ['birthday'] },
  { code: 'star', emoji: '⭐', keywords: ['favourite', 'favorite'] },
  { code: 'rainbow', emoji: '🌈' },
  { code: 'sunny', emoji: '☀️', keywords: ['sun', 'weather'] },
  { code: 'snowflake', emoji: '❄️', keywords: ['cold', 'freeze'] },
  { code: 'dog', emoji: '🐶' },
  { code: 'cat', emoji: '🐱' },
  { code: 'unicorn', emoji: '🦄', keywords: ['rare'] },
  { code: 'seedling', emoji: '🌱', keywords: ['new', 'grow'] },
  { code: 'anchor', emoji: '⚓', keywords: ['stable'] },
  { code: 'balloon', emoji: '🎈', keywords: ['party'] },
  { code: 'gift', emoji: '🎁', keywords: ['present'] },
];

/**
 * Ranks shortcodes for a query.
 *
 * Prefix matches on the CODE come first: someone typing `:fi` means `fire`,
 * not `crossed_fingers` — a plain substring search buries the obvious answer
 * under coincidental matches, which is the difference between autocomplete
 * that feels instant and autocomplete you have to read.
 */
export function searchEmoji(
  query: string,
  list: readonly EmojiShortcode[] = EMOJI_SHORTCODES,
  limit = 8,
): EmojiShortcode[] {
  const q = query.trim().toLowerCase();
  if (!q) return list.slice(0, limit);

  const codePrefix: EmojiShortcode[] = [];
  const codeSubstring: EmojiShortcode[] = [];
  const keywordMatch: EmojiShortcode[] = [];

  for (const item of list) {
    if (item.code.startsWith(q)) codePrefix.push(item);
    else if (item.code.includes(q)) codeSubstring.push(item);
    else if (item.keywords?.some((k) => k.startsWith(q))) keywordMatch.push(item);
  }

  return [...codePrefix, ...codeSubstring, ...keywordMatch].slice(0, limit);
}
