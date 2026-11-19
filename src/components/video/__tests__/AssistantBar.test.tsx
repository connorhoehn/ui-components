import { render, screen } from '@testing-library/react';
import { AssistantBar, assistantFloorWords } from '../AssistantBar';
import { ParticipantTile } from '../ParticipantTile';
import { CallTileRow } from '../CallTileRow';

const hold = { onStart: vi.fn(), onEnd: vi.fn(), onCancel: vi.fn() };

describe('AssistantBar', () => {
  it('says who has the ear for a viewer who may not hold', () => {
    render(<AssistantBar assistantName="Milo" floor={{ userId: 'u-hugo', name: 'Hugo' }} selfId="u-ann" />);
    expect(screen.getByTestId('assistant-bar-floor').textContent).toBe('Hugo is talking to Milo');
    expect(screen.queryByTestId('assistant-bar-hold')).toBeNull();
    expect(screen.getByTestId('assistant-bar').getAttribute('data-floor')).toBe('u-hugo');
  });

  it('makes the hold button busy while someone else holds, without a second chip', () => {
    render(<AssistantBar assistantName="Milo" floor={{ userId: 'u-hugo', name: 'Hugo' }} selfId="u-ann" hold={hold} />);
    expect((screen.getByTestId('assistant-bar-hold') as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByTestId('assistant-bar-floor')).toBeNull();
    expect(screen.getByText('Hugo is talking to Milo')).toBeTruthy();
  });

  it('reads "You" for the holder, draws the status mark and the refusal', () => {
    render(<AssistantBar assistantName="Milo" statusLabel="Milo is listening" selfId="u-ann" hold={{ ...hold, holding: true }} refusal="Not now" />);
    expect(screen.getByTestId('assistant-bar-floor').textContent).toBe('You are talking to Milo');
    expect(screen.getByTestId('assistant-bar-status').textContent).toContain('Milo is listening');
    expect(screen.getByTestId('assistant-bar-refused').textContent).toBe('Not now');
    expect(screen.getByTestId('assistant-bar').getAttribute('data-holding')).toBe('true');
  });

  it('assistantFloorWords', () => {
    expect(assistantFloorWords('Milo', null, 'a')).toBeNull();
    expect(assistantFloorWords('Milo', { userId: 'a', name: 'Ann' }, 'a')).toBe('You are talking to Milo');
  });
});

describe('tile highlight', () => {
  it('rings a ParticipantTile and names it', () => {
    render(<ParticipantTile id="p1" displayName="Hugo" highlight={{ label: 'Talking to Milo' }} />);
    const tile = screen.getByTestId('remote-tile');
    expect(tile.getAttribute('data-highlight')).toBe('Talking to Milo');
    expect(screen.getByTestId('tile-highlight-ring')).toBeTruthy();
  });

  it('rings a dock tile in info and adds the words to its name', () => {
    render(<CallTileRow participants={[{ id: 'p1', displayName: 'Hugo', highlight: { label: 'Talking to Milo' } }]} />);
    const el = document.querySelector('[data-highlight="Talking to Milo"]') as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute('aria-label') ?? '').toContain('talking to milo');
  });
});
