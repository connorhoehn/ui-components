import { Profiler } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChannelBindingStrip } from '../ChannelBindingStrip';
import { CallLogList, type CallLogEntry } from '../CallLogList';
import { AddPeoplePicker } from '../AddPeoplePicker';

describe('ChannelBindingStrip', () => {
  it('bound: shows channel, latest, open and unbind', () => {
    const onOpen = vi.fn(); const onUnbind = vi.fn();
    render(<ChannelBindingStrip label="Discussion" channel={{ name: 'auth' }} latest="Mira: hi" onOpen={onOpen} onUnbind={onUnbind} />);
    expect(screen.getByTestId('channel-binding-channel')).toHaveTextContent('#auth');
    expect(screen.getByTestId('channel-binding-latest')).toHaveTextContent('Mira: hi');
    fireEvent.click(screen.getByTestId('channel-binding-open'));
    fireEvent.click(screen.getByTestId('channel-binding-unbind'));
    expect(onOpen).toHaveBeenCalled(); expect(onUnbind).toHaveBeenCalled();
  });
  it('unbound: bind is disabled until a choice is made', () => {
    const onBind = vi.fn();
    render(<ChannelBindingStrip label="Discussion" choices={[{ value: 'c1', label: '#one' }]} onBind={onBind} />);
    expect(screen.getByTestId('channel-binding-bind')).toBeDisabled();
    fireEvent.change(screen.getByTestId('channel-binding-choice'), { target: { value: 'c1' } });
    fireEvent.click(screen.getByTestId('channel-binding-bind'));
    expect(onBind).toHaveBeenCalledWith('c1');
  });
  it('shows an error alert', () => {
    render(<ChannelBindingStrip label="D" error="nope" />);
    expect(screen.getByRole('alert')).toHaveTextContent('nope');
  });
});

const rows: CallLogEntry[] = [
  { id: '1', who: 'Mira', direction: 'Incoming', outcome: 'Missed', missed: true, startedAt: '2026-10-01T10:00:00Z', duration: '0s' },
  { id: '2', who: 'Lena', direction: 'Outgoing', outcome: 'Answered', missed: false, startedAt: '2026-10-01T11:00:00Z', duration: '4m' },
];

describe('CallLogList', () => {
  it('filters to missed and calls back', () => {
    const onCallBack = vi.fn();
    render(<CallLogList rows={rows} onCallBack={onCallBack} />);
    expect(screen.getByText('Lena')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Missed \(1\)/));
    expect(screen.queryByText('Lena')).toBeNull();
    fireEvent.click(screen.getByTestId('call-log-call-back'));
    expect(onCallBack).toHaveBeenCalledWith(rows[0]);
  });
});

describe('AddPeoplePicker', () => {
  const cands = [{ userId: 'a', displayName: 'Ann Lee', subtitle: 'Design' }, { userId: 'b', displayName: 'Bo Kim' }];
  it('searches, selects into chips and confirms ids', () => {
    const onAdd = vi.fn();
    render(<AddPeoplePicker open onClose={() => {}} candidates={cands} onAdd={onAdd} />);
    fireEvent.change(screen.getByPlaceholderText('Find a person'), { target: { value: 'bo' } });
    expect(screen.queryByText('Ann Lee')).toBeNull();
    fireEvent.click(screen.getByText('Bo Kim'));
    expect(screen.getByTestId('add-people-selected')).toHaveTextContent('Bo Kim');
    fireEvent.click(screen.getByTestId('add-people-confirm'));
    expect(onAdd).toHaveBeenCalledWith(['b']);
  });
  it('equal-content new candidate arrays cause no extra commits across 50 renders', () => {
    let commits = 0;
    const ui = (list: typeof cands) => (
      <Profiler id="p" onRender={() => { commits += 1; }}>
        <AddPeoplePicker open onClose={() => {}} candidates={list} onAdd={() => {}} />
      </Profiler>
    );
    const { rerender } = render(ui([...cands]));
    fireEvent.click(screen.getByText('Bo Kim'));
    commits = 0;
    for (let i = 0; i < 50; i += 1) rerender(ui(cands.map((c) => ({ ...c }))));
    expect(commits).toBeLessThanOrEqual(51);
    expect(screen.getByTestId('add-people-selected')).toHaveTextContent('Bo Kim');
  });
  it('confirm disabled with nothing picked; empty message', () => {
    render(<AddPeoplePicker open onClose={() => {}} candidates={[]} onAdd={() => {}} emptyMessage="Everyone is here." />);
    expect(screen.getByTestId('add-people-confirm')).toBeDisabled();
    expect(screen.getByText('Everyone is here.')).toBeInTheDocument();
  });
});
