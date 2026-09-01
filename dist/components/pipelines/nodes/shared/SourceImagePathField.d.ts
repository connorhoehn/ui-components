export interface SourceImagePathFieldProps {
    value: string | undefined;
    onChange: (next: string | undefined) => void;
    /** Node being edited; drives the real upstream image-ref suggestions. */
    nodeId?: string;
    label?: string;
    help?: string;
    placeholder?: string;
}
export default function SourceImagePathField({ value, onChange, nodeId, label, help, placeholder, }: SourceImagePathFieldProps): import("react").JSX.Element;
//# sourceMappingURL=SourceImagePathField.d.ts.map