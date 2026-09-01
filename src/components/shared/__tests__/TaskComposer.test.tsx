// TaskComposer — the composite that turns an empty prompt box into somewhere
// to start. The suggestions are the point; the two fields are not interesting.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskComposer, type ComposerSuggestion } from '../TaskComposer';

const SUGGESTIONS: ComposerSuggestion[] = [
  {
    id: 's1', reason: 'Blocked on Observability Platform', title: 'Roll out the collector fleet',
    prompt: 'Work out what it is waiting on.', label: 'blocked', tone: 'danger',
    context: 'Observability Platform',
  },
  {
    id: 's2', reason: 'Waiting in review on Auth Migration', title: 'Session epoch rollout',
    prompt: 'Summarise what is left before it can merge.', label: 'in review', tone: 'warning',
  },
];

function setup(props: Partial<React.ComponentProps<typeof TaskComposer>> = {}) {
  const onSubmit = vi.fn();
  render(<TaskComposer title="Queue a job" onSubmit={onSubmit} {...props} />);
  return { onSubmit, user: userEvent.setup() };
}

describe('TaskComposer', () => {
  it('will not submit an empty task', async () => {
    const { onSubmit } = setup();
    expect(screen.getByRole('button', { name: /queue/i })).toBeDisabled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('needs both a title and a prompt', async () => {
    const { user } = setup();
    await user.type(screen.getByPlaceholderText('Title'), 'Something');
    // A job with a name and no instruction is a job a worker cannot run.
    expect(screen.getByRole('button', { name: /queue/i })).toBeDisabled();
    await user.type(screen.getByPlaceholderText('What should it do?'), 'Do the thing');
    expect(screen.getByRole('button', { name: /queue/i })).toBeEnabled();
  });

  it('submits trimmed text and clears the fields', async () => {
    const { onSubmit, user } = setup();
    await user.type(screen.getByPlaceholderText('Title'), '  Audit deps  ');
    await user.type(screen.getByPlaceholderText('What should it do?'), '  npm audit  ');
    await user.click(screen.getByRole('button', { name: /queue/i }));

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Audit deps', prompt: 'npm audit' });
    expect(screen.getByPlaceholderText('Title')).toHaveValue('');
  });

  describe('suggestions', () => {
    it('renders none when there are none, rather than an empty shelf', () => {
      setup();
      expect(screen.queryByText(/suggested next/i)).toBeNull();
    });

    it('fills the fields rather than dispatching', async () => {
      const { onSubmit, user } = setup({ suggestions: SUGGESTIONS });
      await user.click(screen.getByTestId('suggestion-s1'));

      // A card that dispatched an agent on one click would make the strip a
      // minefield. It loads the gun and hands it over.
      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByPlaceholderText('Title')).toHaveValue('Roll out the collector fleet');
      expect(screen.getByPlaceholderText('What should it do?'))
        .toHaveValue('Work out what it is waiting on.');
    });

    it('leaves the filled text editable before sending', async () => {
      const { onSubmit, user } = setup({ suggestions: SUGGESTIONS });
      await user.click(screen.getByTestId('suggestion-s2'));
      await user.type(screen.getByPlaceholderText('What should it do?'), ' Also check the tests.');
      await user.click(screen.getByRole('button', { name: /queue/i }));

      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        prompt: 'Summarise what is left before it can merge. Also check the tests.',
        suggestionId: 's2',
      }));
    });

    it('reports which suggestion was used, so the host can measure them', async () => {
      const { onSubmit, user } = setup({ suggestions: SUGGESTIONS });
      await user.click(screen.getByTestId('suggestion-s1'));
      await user.click(screen.getByRole('button', { name: /queue/i }));
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ suggestionId: 's1' }));
    });

    it('claims no attribution for a freely typed task', async () => {
      const { onSubmit, user } = setup({ suggestions: SUGGESTIONS });
      await user.type(screen.getByPlaceholderText('Title'), 'Mine');
      await user.type(screen.getByPlaceholderText('What should it do?'), 'My own idea');
      await user.click(screen.getByRole('button', { name: /queue/i }));
      expect(onSubmit).toHaveBeenCalledWith({ title: 'Mine', prompt: 'My own idea' });
    });

    it('drops the attribution when the suggestion goes away underneath it', async () => {
      // The list polls. Work moves on. The text is still the operator's to
      // send — it just is not that suggestion any more.
      const onSubmit = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <TaskComposer title="Queue a job" onSubmit={onSubmit} suggestions={SUGGESTIONS} />,
      );
      await user.click(screen.getByTestId('suggestion-s1'));
      rerender(
        <TaskComposer title="Queue a job" onSubmit={onSubmit} suggestions={[SUGGESTIONS[1]!]} />,
      );
      await user.click(screen.getByRole('button', { name: /queue/i }));
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Roll out the collector fleet',
        prompt: 'Work out what it is waiting on.',
      });
    });

    it('shows placeholders while they are still being fetched', () => {
      setup({ suggestionsLoading: true });
      expect(screen.getByText(/suggested next/i)).toBeInTheDocument();
      expect(document.querySelector('[aria-busy="true"]')).toBeTruthy();
    });
  });

  it('submits on the modifier, not on Enter — a prompt is prose', async () => {
    const { onSubmit, user } = setup();
    await user.type(screen.getByPlaceholderText('Title'), 'T');
    const prompt = screen.getByPlaceholderText('What should it do?');
    await user.type(prompt, 'line one{Enter}line two');
    expect(onSubmit).not.toHaveBeenCalled();

    await user.click(prompt);
    await user.keyboard('{Meta>}{Enter}{/Meta}');
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ prompt: 'line one\nline two' }));
  });
});
