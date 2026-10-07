import React from 'react';
interface PanelProps {
    children: React.ReactNode;
    variant?: 'light' | 'dark';
    width?: number;
    style?: React.CSSProperties;
    /**
     * Render inline where it is placed, filling its parent, instead of fixed to
     * the right edge of the window — for a panel that IS a view (an editor tab)
     * rather than one that slides over it. `width` is ignored when docked.
     */
    docked?: boolean;
    'data-testid'?: string;
}
export declare const Panel: React.FC<PanelProps>;
interface PanelHeaderProps {
    title: string;
    onClose: () => void;
    actions?: React.ReactNode;
    variant?: 'light' | 'dark';
}
export declare const PanelHeader: React.FC<PanelHeaderProps>;
interface PanelBodyProps {
    children: React.ReactNode;
    padding?: string;
}
export declare const PanelBody: React.FC<PanelBodyProps>;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'danger';
    size?: 'sm' | 'md';
}
export declare const Button: React.FC<ButtonProps>;
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    activeColor?: string;
    size?: number;
}
export declare const IconButton: React.FC<IconButtonProps>;
export {};
//# sourceMappingURL=Panel.d.ts.map