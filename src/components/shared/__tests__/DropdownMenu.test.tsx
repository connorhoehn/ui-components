import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu } from '../DropdownMenu';
import type { DropdownMenuSection } from '../DropdownMenu';

function makeSections(): DropdownMenuSection[] {
  return [
    {
      label: 'Content',
      items: [
        { label: 'Document Types', icon: '📋', active: true, onSelect: vi.fn() },
        { label: 'Data Types', icon: '🧩', onSelect: vi.fn() },
      ],
    },
    {
      label: 'Developer',
      items: [
        { label: 'Dev Tools', icon: '🔧', onSelect: vi.fn() },
        { label: 'Delete Workspace', danger: true, onSelect: vi.fn() },
      ],
    },
  ];
}

describe('DropdownMenu', () => {
  it('renders the trigger button with aria-label and haspopup', () => {
    render(<DropdownMenu trigger="☰" triggerLabel="Open app menu" sections={makeSections()} />);
    const trigger = screen.getByLabelText('Open app menu');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not render the menu until the trigger is clicked', () => {
    render(<DropdownMenu trigger="☰" sections={makeSections()} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens on trigger click and renders sections + items', () => {
    render(<DropdownMenu trigger="☰" triggerLabel="Open app menu" sections={makeSections()} />);
    fireEvent.click(screen.getByLabelText('Open app menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Open app menu', { selector: 'button' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(4);
  });

  it('marks the active item with aria-current', () => {
    render(<DropdownMenu trigger="☰" sections={makeSections()} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByRole('menuitem', { name: /Document Types/ })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('menuitem', { name: /Data Types/ })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('calls onSelect and closes when an item is clicked', () => {
    const sections = makeSections();
    render(<DropdownMenu trigger="☰" sections={sections} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    fireEvent.click(screen.getByRole('menuitem', { name: /Data Types/ }));
    expect(sections[0].items[1].onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(<DropdownMenu trigger="☰" sections={makeSections()} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on outside click', () => {
    render(
      <div>
        <DropdownMenu trigger="☰" sections={makeSections()} />
        <div data-testid="outside">Outside</div>
      </div>,
    );
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('moves focus with ArrowDown / ArrowUp / Home / End', () => {
    render(<DropdownMenu trigger="☰" sections={makeSections()} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    const items = screen.getAllByRole('menuitem');
    const menu = screen.getByRole('menu');

    items[0].focus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(items[1]).toHaveFocus();

    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(items[0]).toHaveFocus();

    // ArrowUp from the first item wraps to the last.
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(items[3]).toHaveFocus();

    // ArrowDown from the last item wraps to the first.
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(items[0]).toHaveFocus();

    fireEvent.keyDown(menu, { key: 'End' });
    expect(items[3]).toHaveFocus();

    fireEvent.keyDown(menu, { key: 'Home' });
    expect(items[0]).toHaveFocus();
  });

  it('uses bottom-end placement when align="end"', () => {
    render(<DropdownMenu trigger="☰" align="end" sections={makeSections()} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByTestId('dropdown-menu')).toHaveAttribute(
      'data-placement',
      'bottom-end',
    );
  });

  it('uses bottom-start placement by default', () => {
    render(<DropdownMenu trigger="☰" sections={makeSections()} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByTestId('dropdown-menu')).toHaveAttribute(
      'data-placement',
      'bottom-start',
    );
  });

  it('renders items without a section label', () => {
    render(
      <DropdownMenu
        trigger="☰"
        sections={[{ items: [{ label: 'Lone item', onSelect: vi.fn() }] }]}
      />,
    );
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByRole('menuitem', { name: 'Lone item' })).toBeInTheDocument();
  });
});
