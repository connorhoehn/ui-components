import { render, screen, fireEvent } from '@testing-library/react';
import { CallSidePanel } from '../CallSidePanel';

const onClose = vi.fn();
beforeEach(() => onClose.mockClear());

describe('CallSidePanel', () => {
  it('renders nothing when closed', () => {
    render(
      <CallSidePanel open={false} onClose={onClose} title="Chat">
        <div data-testid="panel-body">body</div>
      </CallSidePanel>,
    );
    expect(screen.queryByTestId('call-side-panel')).toBeNull();
    expect(screen.queryByTestId('panel-body')).toBeNull();
  });

  it('renders the title and the children slot when open', () => {
    render(
      <CallSidePanel open onClose={onClose} title="Chat">
        <div data-testid="panel-body">body</div>
      </CallSidePanel>,
    );
    const panel = screen.getByTestId('call-side-panel');
    expect(panel).toHaveTextContent('Chat');
    expect(screen.getByTestId('panel-body')).toBeInTheDocument();
    expect(panel.getAttribute('aria-label')).toBe('Chat');
  });

  it('fires onClose from the ✕ button', () => {
    render(
      <CallSidePanel open onClose={onClose} title="Chat">
        <div>body</div>
      </CallSidePanel>,
    );
    fireEvent.click(screen.getByTestId('call-side-panel-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies the width override and custom testid', () => {
    render(
      <CallSidePanel
        open
        onClose={onClose}
        title="Roster"
        widthClassName="w-96"
        data-testid="roster-panel"
      >
        <div>body</div>
      </CallSidePanel>,
    );
    const panel = screen.getByTestId('roster-panel');
    expect(panel.className).toContain('w-96');
    expect(screen.queryByTestId('call-side-panel')).toBeNull();
  });

  it('gives the body the scrollable flex classes', () => {
    render(
      <CallSidePanel open onClose={onClose} title="Chat">
        <div data-testid="panel-body">body</div>
      </CallSidePanel>,
    );
    const body = screen.getByTestId('panel-body').parentElement!;
    expect(body.className).toContain('min-h-0');
    expect(body.className).toContain('flex-1');
    expect(body.className).toContain('overflow-y-auto');
  });
});
