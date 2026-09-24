import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { nextWorkCardInDirection } from '../WorkActivityCanvas';
import { WorkNodePane } from '../WorkNodePane';
import type { WorkGraphNodeData } from '../types';

const rect = (left: number, top: number, width = 200, height = 80) => ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) }) as DOMRect;
const card = (name: string, left: number, top: number) => ({ element: Object.assign(document.createElement('article'), { id: name }), rect: rect(left, top) });

describe('arrow keys between Activity cards', () => {
  const from = rect(0, 0);
  const right = card('right', 260, 10);
  const farRightAligned = card('far-right', 520, 0);
  const below = card('below', 10, 200);
  const diagonal = card('diagonal', 260, 300);
  const cards = [right, farRightAligned, below, diagonal];

  it('moves to the nearest card ahead, preferring the one on the axis', () => {
    expect(nextWorkCardInDirection(from, cards, [1, 0])?.id).toBe('right');
    expect(nextWorkCardInDirection(from, cards, [0, 1])?.id).toBe('below');
  });

  it('stays put at an edge', () => {
    expect(nextWorkCardInDirection(from, cards, [-1, 0])).toBeNull();
    expect(nextWorkCardInDirection(from, cards, [0, -1])).toBeNull();
  });
});

describe('WorkNodePane keyboard', () => {
  const node: WorkGraphNodeData = { id: 'n1', kind: 'document', title: 'Release plan', status: 'completed', disclosure: 'details', capabilities: [], updatedAt: '2026-09-20T13:45:00Z' };

  it('closes on Escape from anywhere inside it', () => {
    const onClose = vi.fn();
    render(<WorkNodePane node={node} selection={{ kind: 'node', id: 'n1' }} onSelectionChange={() => {}} onClose={onClose} data-testid="pane" />);
    fireEvent.keyDown(screen.getByTestId('pane'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
