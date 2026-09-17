import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { NewChatDialog } from '../NewChatDialog';

const candidates = [
  { userId: 'u-alice', name: 'Alice Chen', online: true },
  { userId: 'u-bob', name: 'Bob Martinez', online: false },
];

describe('NewChatDialog', () => {
  it('opens AT the control that asked for it rather than over a dimmed page', () => {
    // The whole point of the change: "Create a channel" beside it in the same
    // rail was already anchored, and two adjacent acts should not feel like
    // different applications.
    const anchor = createRef<HTMLElement>();
    render(<div><button ref={anchor as never}>+</button>
      <NewChatDialog open candidates={candidates} anchor={anchor} onStart={vi.fn()} onClose={vi.fn()} />
    </div>);
    expect(screen.getByTestId('new-chat-popover')).toBeInTheDocument();
    expect(screen.queryByTestId('new-chat-backdrop')).toBeNull();
  });

  it('hands back everyone picked, not just the first', () => {
    // A group conversation is reachable only if the confirm is a multi-select;
    // a one-click picker could produce nothing but a two-person DM.
    const onStart = vi.fn();
    render(<NewChatDialog open candidates={candidates} onStart={onStart} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText('Alice Chen'));
    fireEvent.click(screen.getByText('Bob Martinez'));
    fireEvent.click(screen.getByTestId('new-chat-people-confirm'));
    expect(onStart).toHaveBeenCalledWith(['u-alice', 'u-bob']);
  });

  it('puts the list\'s own confirm in the footer instead of the shell\'s button', () => {
    // The count lives on the button because the selection lives in the list.
    render(<NewChatDialog open candidates={candidates} onStart={vi.fn()} onClose={vi.fn()} />);
    expect(screen.queryByTestId('new-chat-submit')).toBeNull();
    expect(screen.getByTestId('new-chat-people-confirm')).toBeInTheDocument();
  });

  it('shows a refusal in place and still offers a way out', () => {
    render(<NewChatDialog open candidates={candidates} error="Could not start that chat" onStart={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByTestId('new-chat-error')).toHaveTextContent('Could not start that chat');
    expect(screen.getByTestId('new-chat-cancel')).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    render(<NewChatDialog open={false} candidates={candidates} onStart={vi.fn()} onClose={vi.fn()} />);
    expect(screen.queryByTestId('new-chat')).toBeNull();
  });
});
