import type { CSSProperties, ReactNode } from 'react';
import { type ChipTone } from './Chip';
export interface ThumbnailCardProps {
    /** Card title (required). */
    title: ReactNode;
    /** Short description. */
    description?: ReactNode;
    /** Optional category label. Shows as a Chip in the content area. */
    category?: ReactNode;
    /** Tone for the category chip. Default 'neutral'. */
    categoryTone?: ChipTone;
    /**
     * Optional thumbnail image URL. When omitted, an icon/emoji placeholder is
     * rendered against a tonal gradient background.
     */
    thumbnail?: string;
    /** Fallback glyph rendered when no thumbnail is provided. */
    icon?: ReactNode;
    /** Pixel height of the thumbnail strip. Default 160. */
    thumbnailHeight?: number;
    /** When provided, renders as an <a> wrapping the card. */
    href?: string;
    /** Optional click handler (renders as a button if no href). */
    onClick?: () => void;
    /** When provided, renders a small badge in the top-right of the thumbnail. */
    badge?: ReactNode;
    /** Optional render function for a custom right-side meta in the content. */
    meta?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function ThumbnailCard({ title, description, category, categoryTone, thumbnail, icon, thumbnailHeight, href, onClick, badge, meta, className, style, 'data-testid': testId, }: ThumbnailCardProps): import("react/jsx-runtime").JSX.Element;
export default ThumbnailCard;
//# sourceMappingURL=ThumbnailCard.d.ts.map