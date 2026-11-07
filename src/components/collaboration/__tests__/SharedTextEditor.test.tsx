import { render, screen, fireEvent } from '@testing-library/react';
import { SharedTextEditor } from '../SharedTextEditor';

describe('SharedTextEditor', () => {
  it('renders the toolbar buttons', () => {
    render(<SharedTextEditor content="" applyLocalEdit={() => {}} />);
    expect(screen.getByTitle('Bold')).toBeInTheDocument();
    expect(screen.getByTitle('Italic')).toBeInTheDocument();
    expect(screen.getByTitle('Bullet list')).toBeInTheDocument();
  });

  it('shows the disconnected hint and disabled state when disabled', () => {
    render(<SharedTextEditor content="" applyLocalEdit={() => {}} disabled />);
    expect(screen.getByText(/Disconnected/i)).toBeInTheDocument();
    expect(screen.getByTitle('Bold')).toBeDisabled();
  });

  it('shows the conflict banner with a dismiss button when hasConflict', () => {
    const onDismiss = vi.fn();
    render(
      <SharedTextEditor
        content=""
        applyLocalEdit={() => {}}
        hasConflict
        onDismissConflict={onDismiss}
      />,
    );
    expect(screen.getByText(/Edits merged/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Dismiss conflict indicator'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('seeds the editor surface with the initial content', () => {
    const { container } = render(
      <SharedTextEditor content="hello" applyLocalEdit={() => {}} />,
    );
    const surface = container.querySelector('[contenteditable]') as HTMLDivElement;
    expect(surface).not.toBeNull();
    expect(surface.textContent).toBe('hello');
  });

  it('renders collaborator content as text, with no event-handler attributes', () => {
    const { container } = render(
      <SharedTextEditor content="<img src=x onerror=alert(1)>" applyLocalEdit={() => {}} />,
    );
    expect(container.querySelector('[onerror]')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(container.innerHTML).not.toMatch(/onerror=(?!.*&gt;)/);
    expect(container.textContent).toContain('<img src=x onerror=alert(1)>');
  });
});
