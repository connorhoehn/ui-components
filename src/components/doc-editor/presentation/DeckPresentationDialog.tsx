// DeckPresentationDialog — present a deck's rendered slides full-window.
//
// Reading and editing hosts both present the platform's existing slide
// previews here. Selection stays in the host (`slideIndex` / `onSlideChange`);
// opening or closing never changes the document. Ported from the
// aws-agentcore portal in 2.441.0 together with `DeckReader`.

import { Button } from '../../ui/Button';
import { Inline } from '../../ui/Stack';
import ErrorState from '../../shared/ErrorState';
import LoadingState from '../../shared/LoadingState';
import Modal from '../../shared/Modal';
import { Text } from '../../shared/Text';
import { PresentationView } from '../PresentationView';
import type { PresentationPreviewSlide } from './PresentationEditor';
import { svgDataUri } from './svgPreview';
import { useComposerFocus } from '../../social/ConversationInputs';

export interface DeckPresentationDialogProps {
  /** The deck's title. The dialog is named "Present <title>". */
  title: string;
  slides: readonly PresentationPreviewSlide[];
  open: boolean;
  /** Zero-based, including the renderer's generated Sources slide. */
  slideIndex: number;
  onSlideChange: (index: number) => void;
  onClose: () => void;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  /**
   * Hand the reader to the page's conversation ("Chat & agent"). The dialog
   * closes first, and the callback runs on the next frame so the modal has
   * restored focus before the host moves it. Absent (the default), the
   * dialog asks the conversation-input registry (`useComposerFocus`) for the
   * agent composer and shows the button only while one is mounted.
   */
  onFocusConversation?: () => void;
  /** Prefix for the view's test ids (`<testId>-position`, `<testId>-stage`, …). */
  testId?: string;
}

const noop = () => {};

export function DeckPresentationDialog({
  title,
  slides,
  open,
  slideIndex,
  onSlideChange,
  onClose,
  loading = false,
  error,
  onRetry,
  onFocusConversation,
  testId = 'deck-presentation',
}: DeckPresentationDialogProps) {
  const composerFocus = useComposerFocus();
  const handoff = onFocusConversation
    ?? (composerFocus.present ? () => { composerFocus.request({ mode: 'agent' }); } : undefined);
  const focusConversation = () => {
    onClose();
    // Let Modal remove its focus trap and restore the opener before the host
    // moves the caret into its composer.
    requestAnimationFrame(() => handoff?.());
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={`Present ${title}`}
      maxWidth={1280}
      cardClassName="flex h-[min(90vh,960px)] flex-col p-4"
    >
      <Inline gap="sm" align="center" className="justify-between">
        <Text size="sm" weight="semibold">Presenting</Text>
        <Inline gap="xs" align="center">
          {handoff && <Button size="sm" variant="secondary" onClick={focusConversation}>Chat &amp; agent</Button>}
          <Button size="sm" variant="secondary" onClick={onClose}>Exit presentation</Button>
        </Inline>
      </Inline>
      {error ? (
        <div className="flex min-h-0 flex-1 items-center justify-center" data-testid={`${testId}-error`}>
          <ErrorState
            title="Couldn't prepare the presentation"
            description={error}
            {...(onRetry ? { actionLabel: 'Retry preview', onAction: onRetry } : {})}
          />
        </div>
      ) : loading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center" data-testid={`${testId}-loading`}>
          <LoadingState label="Preparing your current slides…" />
        </div>
      ) : (
        <PresentationView
          title={title}
          revisions={[{
            id: 'current',
            label: 'Current',
            slides: slides.map((slide, index) => {
              const src = svgDataUri(slide.svg);
              const name = slide.title || `Slide ${index + 1}`;
              return {
                id: slide.id,
                index: index + 1,
                title: name,
                ...(src ? { preview: <img src={src} alt={name} className="h-full w-full object-contain" /> } : {}),
              };
            }),
          }]}
          revisionId="current"
          onRevisionChange={noop}
          slideIndex={slideIndex + 1}
          onSlideChange={(index) => onSlideChange(index - 1)}
          autoFocus
          className="min-h-0 flex-1"
          data-testid={testId}
        />
      )}
    </Modal>
  );
}

export default DeckPresentationDialog;
