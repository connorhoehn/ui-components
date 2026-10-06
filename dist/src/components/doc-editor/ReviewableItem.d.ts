import type { TaskItem } from '../../types/document';
interface ReviewableItemProps {
    item: TaskItem;
    onAck: (notes?: string) => void;
    onReject: (reason: string) => void;
}
export default function ReviewableItem({ item, onAck, onReject }: ReviewableItemProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ReviewableItem.d.ts.map