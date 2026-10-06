import { type PipelineTemplate } from './templates';
interface TemplatesModalProps {
    open: boolean;
    onClose: () => void;
    /** New API: invoked after the template has been persisted with the new id. */
    onCreated?: (pipelineId: string) => void;
    /** Legacy API: invoked with the raw template; caller is responsible for
     * persistence + navigation. Kept for backwards-compat. */
    onSelect?: (template: PipelineTemplate) => void;
    /**
     * Author id baked into templates built from this modal. Wins over this
     * library's `useIdentityContext().userId`. Defaults to the context's
     * `userId` (or `''`, which the template builders below turn into
     * `'anonymous'`, when no `<IdentityProvider>` is mounted) via the
     * non-throwing `useOptionalIdentityContext`.
     */
    userId?: string;
}
export default function TemplatesModal({ open, onClose, onCreated, onSelect, userId: userIdProp, }: TemplatesModalProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=TemplatesModal.d.ts.map