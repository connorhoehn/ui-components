// The composer's presentation, for what renders inside it (2.512.0). A
// `RichChatComposer presentation="prompt"` (and so `ContextComposer` /
// `ConversationComposer`) provides `prompt` to its `header`, so a
// `ComposerPromptDeck` placed there drops its keyboard chrome without the host
// passing the deck's own `presentation`.

import { createContext } from 'react';

export type ComposerPresentation = 'card' | 'prompt';

export const ComposerPresentationContext = createContext<ComposerPresentation | null>(null);
