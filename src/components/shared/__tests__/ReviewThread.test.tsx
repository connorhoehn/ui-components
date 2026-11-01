import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewThread } from '../ReviewThread';
import type { ReviewPostData } from '../ReviewThread';

const posts: ReviewPostData[] = [
  { id: 'p1', authorKind: 'agent', authorName: 'auth-bot', kind: 'problem', body: 'The problem, restated.' },
  { id: 'p2', authorKind: 'agent', authorName: 'auth-bot', kind: 'question', body: 'Which window?', resolved: false },
  { id: 'p3', authorKind: 'human', authorName: 'Vera Green', kind: 'answer', body: '60 seconds.' },
  { id: 'p4', authorKind: 'agent', authorName: 'auth-bot', kind: 'artifact', body: 'Flow diagram.',
    artifact: { name: 'flow.png', type: 'browser screenshot', url: null } },
];

describe('ReviewThread', () => {
  it('preserves the supplied person photo', () => {
    render(<ReviewThread posts={[{ id: "p", authorName: "Vera", authorKind: "human", kind: "answer", body: "Confirmed", avatarUrl: "/vera.jpg" }]} />);
    expect(screen.getByRole('img', { name: 'Vera' })).toHaveAttribute('src', '/vera.jpg');
  });

  it('renders posts with their kind vocabulary', () => {
    render(<ReviewThread posts={posts} />);
    expect(screen.getByText('problem statement')).toBeInTheDocument();
    expect(screen.getByText('The problem, restated.')).toBeInTheDocument();
    expect(screen.getByText('flow.png')).toBeInTheDocument();
  });

  it('highlights an open question and submits an answer through the inline composer', () => {
    const onAnswer = vi.fn();
    render(<ReviewThread posts={posts} onAnswer={onAnswer} />);
    expect(screen.getByText('needs a human')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Answer this question'), { target: { value: '60s, SOC2.' } });
    fireEvent.click(screen.getByText('Answer & continue the loop'));
    expect(onAnswer).toHaveBeenCalledWith('p2', '60s, SOC2.');
  });

  it('renders read-only without onAnswer — no composer on a terminal thread', () => {
    render(<ReviewThread posts={posts} />);
    expect(screen.queryByLabelText('Answer this question')).not.toBeInTheDocument();
  });

  it('a resolved question is marked, not highlighted', () => {
    render(<ReviewThread posts={[{ ...posts[1]!, resolved: true }]} onAnswer={vi.fn()} />);
    expect(screen.getByText('resolved')).toBeInTheDocument();
    expect(screen.queryByText('needs a human')).not.toBeInTheDocument();
  });

  it('says so when the thread is empty', () => {
    render(<ReviewThread posts={[]} />);
    expect(screen.getByText(/No posts yet/)).toBeInTheDocument();
  });
});
