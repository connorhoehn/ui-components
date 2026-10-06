import { type ReactNode } from 'react';
import type { Tone } from './tones';
export interface ComposerSuggestion {
    id: string;
    /** Why this is being offered — shown above the title on the card. */
    reason: string;
    title: string;
    /** Fills the prompt field when chosen. */
    prompt: string;
    /** Fills the title field. Defaults to the suggestion's own title. */
    fillTitle?: string;
    label?: string;
    tone?: Tone;
    meta?: ReactNode;
    context?: string;
}
export interface TaskComposerProps {
    /** Section heading, e.g. "Queue a job". */
    title: string;
    /** One line under the heading saying what happens on submit. */
    description?: string;
    titlePlaceholder?: string;
    promptPlaceholder?: string;
    /** Offered above the fields. Empty or omitted renders no strip at all. */
    suggestions?: readonly ComposerSuggestion[];
    /** Heading for the strip. */
    suggestionsTitle?: string;
    /** Shown in place of the strip while suggestions are still being fetched. */
    suggestionsLoading?: boolean;
    /**
     * Shown when there are no suggestions AND loading is done. Omit to render
     * nothing — an empty state for an optional nicety is itself noise.
     */
    suggestionsEmpty?: ReactNode;
    onSubmit: (task: {
        title: string;
        prompt: string;
        suggestionId?: string;
    }) => void;
    /** Fires when a suggestion is chosen, before the fields are filled. */
    onChooseSuggestion?: (suggestion: ComposerSuggestion) => void;
    submitLabel?: string;
    /** Quiet note beside the submit button, e.g. where it will run. */
    hint?: ReactNode;
    busy?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function TaskComposer({ title, description, titlePlaceholder, promptPlaceholder, suggestions, suggestionsTitle, suggestionsLoading, suggestionsEmpty, onSubmit, onChooseSuggestion, submitLabel, hint, busy, className, 'data-testid': testId, }: TaskComposerProps): import("react").JSX.Element;
export default TaskComposer;
//# sourceMappingURL=TaskComposer.d.ts.map