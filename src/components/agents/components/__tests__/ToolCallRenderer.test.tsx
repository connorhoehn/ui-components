import { render, screen, fireEvent } from '@testing-library/react';
import { ToolCallRenderer } from '../ToolCallRenderer';
import type { AgUiToolCall } from '../../../../types/agents';

function makeToolCall(overrides: Partial<AgUiToolCall> = {}): AgUiToolCall {
  return {
    id: 'tc-1',
    name: 'search_kb',
    args: '',
    status: 'streaming',
    startedAt: 1_000,
    ...overrides,
  };
}

describe('ToolCallRenderer', () => {
  it('renders collapsed by default — args block is not visible', () => {
    render(<ToolCallRenderer toolCall={makeToolCall({ args: '{"q":"hi"}' })} />);
    expect(screen.getByText('search_kb')).toBeInTheDocument();
    expect(screen.queryByText('args')).not.toBeInTheDocument();
    expect(screen.queryByText(/"q"/)).not.toBeInTheDocument();
  });

  it('click toggles expand and collapse', () => {
    render(<ToolCallRenderer toolCall={makeToolCall({ args: '{"q":"hi"}' })} />);
    const toggle = screen.getByRole('button');

    fireEvent.click(toggle);
    expect(screen.getByText('args')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.queryByText('args')).not.toBeInTheDocument();
  });

  it('streaming status renders ⏳ icon with animate-pulse class', () => {
    render(<ToolCallRenderer toolCall={makeToolCall({ status: 'streaming' })} />);
    const icon = screen.getByText('⏳');
    expect(icon).toHaveClass('animate-pulse');
  });

  it('completed status renders ✓ icon with success-tone color and duration when endedAt is set', () => {
    render(
      <ToolCallRenderer
        toolCall={makeToolCall({ status: 'completed', endedAt: 1_250 })}
      />,
    );
    const icon = screen.getByText('✓');
    expect(icon).toHaveClass('text-success-fg');
    expect(screen.getByText('250ms')).toBeInTheDocument();
  });

  it('omits the duration label when endedAt is missing', () => {
    render(<ToolCallRenderer toolCall={makeToolCall({ status: 'streaming' })} />);
    expect(screen.queryByText(/ms$/)).not.toBeInTheDocument();
  });

  it('error status renders ✗ icon with danger-tone color', () => {
    render(<ToolCallRenderer toolCall={makeToolCall({ status: 'error' })} />);
    const icon = screen.getByText('✗');
    expect(icon).toHaveClass('text-danger-fg');
  });

  it('expanded with valid-JSON args renders pretty-printed JSON', () => {
    render(
      <ToolCallRenderer toolCall={makeToolCall({ args: '{"q":"hi","limit":5}' })} />,
    );
    fireEvent.click(screen.getByRole('button'));
    // Pretty-printed JSON.stringify(..., null, 2) inserts newlines and 2-space indent
    const pre = screen.getByText(/"q":\s*"hi"/);
    expect(pre.textContent).toContain('\n');
    expect(pre.textContent).toContain('  ');
  });

  it('expanded with invalid-JSON args falls back to raw string', () => {
    const raw = 'not-json-at-all';
    render(<ToolCallRenderer toolCall={makeToolCall({ args: raw })} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(raw)).toBeInTheDocument();
  });

  it('omits the args block when args is the empty string', () => {
    render(<ToolCallRenderer toolCall={makeToolCall({ args: '' })} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('args')).not.toBeInTheDocument();
  });

  it('expanded with an object result renders JSON-stringified value', () => {
    render(
      <ToolCallRenderer
        toolCall={makeToolCall({ status: 'completed', endedAt: 1_100, result: { hits: 3, ok: true } })}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('result')).toBeInTheDocument();
    const resultBlock = screen.getByText(/"hits":\s*3/);
    expect(resultBlock.textContent).toContain('"ok": true');
  });

  it('expanded with a string-shaped JSON result pretty-prints it', () => {
    render(
      <ToolCallRenderer
        toolCall={makeToolCall({ status: 'completed', endedAt: 1_050, result: '{"a":1}' })}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    const resultBlock = screen.getByText(/"a":\s*1/);
    expect(resultBlock.textContent).toContain('\n');
  });

  it('omits the result block when result is null', () => {
    render(
      <ToolCallRenderer
        toolCall={makeToolCall({ status: 'completed', endedAt: 1_050, result: null })}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('result')).not.toBeInTheDocument();
  });

  it('applies extra className to the wrapper', () => {
    const { container } = render(
      <ToolCallRenderer toolCall={makeToolCall()} className="extra-cls" />,
    );
    expect(container.firstChild).toHaveClass('extra-cls');
  });
});
