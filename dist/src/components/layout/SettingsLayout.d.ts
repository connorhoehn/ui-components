import { CSSProperties, ReactNode } from 'react';
export interface SettingsSection {
    id: string;
    /** Sidebar label. */
    label: ReactNode;
    /** Optional small description shown under the label in the rail. */
    description?: ReactNode;
    /** Optional icon glyph rendered next to the label. */
    icon?: ReactNode;
    /** Section content. */
    content: ReactNode;
}
export interface SettingsLayoutProps {
    /** Page title shown above the rail. */
    title: ReactNode;
    /** Optional secondary line under the title. */
    subtitle?: ReactNode;
    /** Section list. The first section is selected by default. */
    sections: SettingsSection[];
    /** Currently active section id (controlled). When omitted, uncontrolled. */
    activeSectionId?: string;
    /** Notified when the user picks a section. */
    onSectionChange?: (id: string) => void;
    /**
     * When true (or non-null), shows the sticky save bar.
     * The bar exposes Save + Cancel buttons.
     */
    dirty?: boolean;
    /** Save button label. Default "Save changes". */
    saveLabel?: ReactNode;
    /** Cancel button label. Default "Cancel". */
    cancelLabel?: ReactNode;
    /** Save click handler. */
    onSave?: () => void;
    /** Cancel click handler. */
    onCancel?: () => void;
    /** When true, the save button shows a saving state. */
    saving?: boolean;
    /** Optional extra content for the save bar (e.g. dirty-field count). */
    saveBarSlot?: ReactNode;
    /** Width of the rail in px. Default 220. */
    railWidth?: number;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function SettingsLayout({ title, subtitle, sections, activeSectionId, onSectionChange, dirty, saveLabel, cancelLabel, onSave, onCancel, saving, saveBarSlot, railWidth, className, style, 'data-testid': testId, }: SettingsLayoutProps): import("react").JSX.Element;
export default SettingsLayout;
//# sourceMappingURL=SettingsLayout.d.ts.map