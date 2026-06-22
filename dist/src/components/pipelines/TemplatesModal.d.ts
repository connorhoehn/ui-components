import { PipelineTemplate } from './templates';
interface TemplatesModalProps {
    open: boolean;
    onClose: () => void;
    /** New API: invoked after the template has been persisted with the new id. */
    onCreated?: (pipelineId: string) => void;
    /** Legacy API: invoked with the raw template; caller is responsible for
     * persistence + navigation. Kept for backwards-compat. */
    onSelect?: (template: PipelineTemplate) => void;
}
export default function TemplatesModal({ open, onClose, onCreated, onSelect, }: TemplatesModalProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=TemplatesModal.d.ts.map