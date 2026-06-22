import { CommentThread, Participant } from '../../types/document';
interface SectionCommentsProps {
    comments: CommentThread[];
    onAddComment: (text: string, parentCommentId?: string | null) => void;
    participants?: Participant[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}
export default function SectionComments({ comments, onAddComment, participants, onResolveThread, onUnresolveThread, }: SectionCommentsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=SectionComments.d.ts.map