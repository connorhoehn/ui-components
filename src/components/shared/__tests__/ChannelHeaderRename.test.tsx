// Renaming a conversation from its own title.
//
// IN PLACE rather than in a dialog: the thing being renamed is right there
// and it is one field. A centred modal makes you look away from the title to
// type its new value and then look back to see whether it took.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChannelHeader } from '../ChannelHeader';

afterEach(cleanup);

const setup = (onRename?: (next: string) => void) =>
  render(<ChannelHeader name="Design Guild" onRename={onRename} data-testid="hdr" />);

const title = () => screen.getByTestId('hdr-name');
const input = () => screen.getByTestId('hdr-name-input') as HTMLInputElement;

describe('opening the editor', () => {
  it('turns the title into a field on double-click', () => {
    setup(vi.fn());
    fireEvent.doubleClick(title());
    expect(input().value).toBe('Design Guild');
  });

  it('stays a heading for a viewer who may not rename it', () => {
    // The affordance should not exist where the action would be refused.
    setup(undefined);
    fireEvent.doubleClick(title());
    expect(screen.queryByTestId('hdr-name-input')).toBeNull();
  });

  it('does not open on a single click — that is how you select text', () => {
    setup(vi.fn());
    fireEvent.click(title());
    expect(screen.queryByTestId('hdr-name-input')).toBeNull();
  });
});

describe('committing', () => {
  it('renames on Enter', () => {
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.change(input(), { target: { value: 'Design Council' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onRename).toHaveBeenCalledWith('Design Council');
  });

  it('trims what it sends', () => {
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.change(input(), { target: { value: '  Design Council  ' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onRename).toHaveBeenCalledWith('Design Council');
  });

  it('commits on blur rather than losing the typing', () => {
    // Blur-abandons loses work for anyone who clicks away expecting a save.
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.change(input(), { target: { value: 'Design Council' } });
    fireEvent.blur(input());
    expect(onRename).toHaveBeenCalledWith('Design Council');
  });

  it('treats an unchanged name as nothing to do', () => {
    // Nobody double-clicks a title, changes nothing, and means "save that".
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onRename).not.toHaveBeenCalled();
  });

  it('refuses to rename a conversation to nothing', () => {
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.change(input(), { target: { value: '   ' } });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onRename).not.toHaveBeenCalled();
    expect(title()).toHaveTextContent('Design Guild');
  });
});

describe('abandoning', () => {
  it('puts the old name back on Escape', () => {
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.change(input(), { target: { value: 'Something else' } });
    fireEvent.keyDown(input(), { key: 'Escape' });
    expect(onRename).not.toHaveBeenCalled();
    expect(title()).toHaveTextContent('Design Guild');
  });

  it('does not keep a stale draft for next time', () => {
    const onRename = vi.fn();
    setup(onRename);
    fireEvent.doubleClick(title());
    fireEvent.change(input(), { target: { value: 'Abandoned' } });
    fireEvent.keyDown(input(), { key: 'Escape' });
    fireEvent.doubleClick(title());
    expect(input().value).toBe('Design Guild');
  });
});

describe('a rename that arrives from elsewhere', () => {
  it('shows the new name rather than a stale draft', () => {
    // Another tab, or the rail's own Rename row, while this sits closed.
    const { rerender } = render(<ChannelHeader name="Design Guild" onRename={vi.fn()} data-testid="hdr" />);
    rerender(<ChannelHeader name="Design Council" onRename={vi.fn()} data-testid="hdr" />);
    fireEvent.doubleClick(title());
    expect(input().value).toBe('Design Council');
  });
});
