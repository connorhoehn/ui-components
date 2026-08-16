import type { MyItem } from '../../hooks/useMyMentionsAndTasks';
interface MyMentionsPanelProps {
    items: MyItem[];
    onNavigateToSection: (sectionId: string) => void;
    onClose: () => void;
}
export default function MyMentionsPanel({ items, onNavigateToSection, onClose, }: MyMentionsPanelProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MyMentionsPanel.d.ts.map