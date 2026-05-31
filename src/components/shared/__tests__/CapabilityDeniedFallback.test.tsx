import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CapabilityDeniedFallback from '../CapabilityDeniedFallback';

describe('CapabilityDeniedFallback', () => {
  it('renders the generic title and description when no capability name is supplied', () => {
    render(<CapabilityDeniedFallback />);
    expect(screen.getByText('Feature unavailable')).toBeInTheDocument();
    expect(
      screen.getByText(/not enabled for your account/i),
    ).toBeInTheDocument();
  });

  it('uses capabilityName in the default title and description', () => {
    render(<CapabilityDeniedFallback capabilityName="Chat" />);
    expect(screen.getByText('Chat is unavailable')).toBeInTheDocument();
    expect(
      screen.getByText(/Chat is not enabled for this workspace/i),
    ).toBeInTheDocument();
  });

  it('renders the default lock icon', () => {
    render(<CapabilityDeniedFallback capabilityName="Chat" />);
    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  it('omits the icon when icon prop is null', () => {
    render(<CapabilityDeniedFallback capabilityName="Chat" icon={null} />);
    expect(screen.queryByText('🔒')).not.toBeInTheDocument();
  });

  it('honors a custom title and description override', () => {
    render(
      <CapabilityDeniedFallback
        title="Pipelines disabled"
        description="Upgrade to enable Pipelines."
      />,
    );
    expect(screen.getByText('Pipelines disabled')).toBeInTheDocument();
    expect(screen.getByText('Upgrade to enable Pipelines.')).toBeInTheDocument();
  });

  it('wires actionLabel + onAction through to EmptyState', () => {
    const onAction = vi.fn();
    render(
      <CapabilityDeniedFallback
        capabilityName="Recording"
        actionLabel="Request access"
        onAction={onAction}
      />,
    );
    const button = screen.getByRole('button', { name: 'Request access' });
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders multi-action list when actions are provided', () => {
    render(
      <CapabilityDeniedFallback
        capabilityName="AI Assistant"
        actions={[
          { label: 'Upgrade plan', href: '#' },
          { label: 'Read docs', href: '#' },
        ]}
      />,
    );
    expect(screen.getByText('Upgrade plan')).toBeInTheDocument();
    expect(screen.getByText('Read docs')).toBeInTheDocument();
  });

  it('uses the default testId so consumers can target it', () => {
    render(<CapabilityDeniedFallback />);
    expect(screen.getByTestId('capability-denied-fallback')).toBeInTheDocument();
  });
});
