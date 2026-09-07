// frontend/src/hooks/useMyMentionsAndTasks.ts
//
// Derives "my mentions" and "my tasks" from document sections and comments.

import { useMemo } from 'react';
import type { Section, CommentThread } from '../types/document';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MentionItem {
  kind: 'mention';
  sectionId: string;
  sectionTitle: string;
  commentId: string;
  authorName: string;
  authorColor: string;
  commentText: string;
  timestamp: string;
}

export interface TaskAssignment {
  kind: 'task';
  sectionId: string;
  sectionTitle: string;
  itemId: string;
  taskText: string;
  status: string;
  priority: string;
}

export type MyItem = MentionItem | TaskAssignment;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively walk comment threads and collect all flat comments. */
function flattenThreads(threads: CommentThread[]): CommentThread[] {
  const result: CommentThread[] = [];
  for (const thread of threads) {
    result.push(thread);
    if (thread.replies && thread.replies.length > 0) {
      result.push(...flattenThreads(thread.replies));
    }
  }
  return result;
}

/** Check if text contains @displayName (case-insensitive). */
function textMentionsUser(text: string, displayName: string): boolean {
  const escaped = displayName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`@${escaped}(?=\\s|$|[.!?,;:])`, 'i');
  return pattern.test(text);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UseMyMentionsAndTasksArgs {
  sections: Section[];
  comments: Record<string, CommentThread[]>;
  displayName: string;
  userId: string;
}

export function useMyMentionsAndTasks({
  sections,
  comments,
  displayName,
  userId,
}: UseMyMentionsAndTasksArgs): MyItem[] {
  return useMemo(() => {
    const mentions: MentionItem[] = [];
    const tasks: TaskAssignment[] = [];

    // --- Mentions ---
    //
    // Driven by the COMMENT MAP, not by the section list. A page-shaped
    // (canvas) document has no sections at all — its comments are anchored to
    // text ranges and filed under an empty section id — so walking `sections`
    // examined nothing, and My Items was permanently empty on every canvas
    // document. The section is looked up only for its TITLE, and its absence
    // is not a reason to drop a comment that mentions you.
    for (const [sectionId, threads] of Object.entries(comments)) {
      if (!threads) continue;
      const section = sections.find((s) => s.id === sectionId);

      const allComments = flattenThreads(threads);
      for (const comment of allComments) {
        // Skip self-authored comments
        if (comment.userId === userId) continue;

        if (textMentionsUser(comment.text, displayName)) {
          mentions.push({
            kind: 'mention',
            sectionId,
            sectionTitle: section?.title ?? '',
            commentId: comment.id,
            authorName: comment.displayName,
            authorColor: comment.color,
            commentText: comment.text,
            timestamp: comment.timestamp,
          });
        }
      }
    }

    // --- Tasks ---
    for (const section of sections) {
      for (const item of section.items) {
        const assigneeLower = (item.assignee ?? '').toLowerCase();
        if (
          assigneeLower === displayName.toLowerCase() ||
          assigneeLower === userId.toLowerCase()
        ) {
          tasks.push({
            kind: 'task',
            sectionId: section.id,
            sectionTitle: section.title,
            itemId: item.id,
            taskText: item.text,
            status: item.status,
            priority: item.priority,
          });
        }
      }
    }

    // Sort: mentions newest-first, then tasks
    mentions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return [...mentions, ...tasks];
  }, [sections, comments, displayName, userId]);
}
