// src/integrations/realtime-modules/NetworkErrorBoundary.tsx
//
// React error boundary specialised for real-time hook surfaces. Catches
// hook-thrown errors (schema mismatch, gateway disconnect mid-render,
// adapter type errors) and renders a recoverable card with a retry
// callback. Keeps every Wrapped* adapter from re-rolling its own
// error UI.

import { Component, type ErrorInfo, type ReactNode } from 'react';
import EmptyState from '../../components/shared/EmptyState';

export interface NetworkErrorBoundaryProps {
  children: ReactNode;
  /**
   * Render override. Receives the caught error + a reset callback that
   * resets the boundary state. Use when you want a custom error UI
   * (e.g. inline alert vs. full empty-state card).
   */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /**
   * Optional callback fired when the caller clicks the retry button.
   * Use to re-run the underlying hook (e.g. gateway.reconnect()) BEFORE
   * the boundary resets so the next render has a fresh attempt.
   */
  onRetry?: () => void;
  /**
   * Logging hook called on caught errors. Defaults to `console.error`.
   * Override to forward to a telemetry sink without losing the stack.
   */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** Title shown in the default fallback. Default: "Something went wrong". */
  title?: string;
  /** Body shown in the default fallback. Defaults to the caught error message. */
  description?: string;
  /** Retry button label. Default: "Retry". */
  retryLabel?: string;
}

interface NetworkErrorBoundaryState {
  error: Error | null;
}

export class NetworkErrorBoundary extends Component<
  NetworkErrorBoundaryProps,
  NetworkErrorBoundaryState
> {
  state: NetworkErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): NetworkErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;
    if (onError) {
      onError(error, info);
    } else {
      // eslint-disable-next-line no-console
      console.error('[NetworkErrorBoundary]', error, info.componentStack);
    }
  }

  reset = (): void => {
    this.props.onRetry?.();
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error == null) return this.props.children;

    const {
      fallback,
      title = 'Something went wrong',
      description,
      retryLabel = 'Retry',
    } = this.props;

    if (fallback) return fallback(error, this.reset);

    return (
      <div data-testid="network-error-boundary-fallback">
        <EmptyState
          icon="⚠️"
          title={title}
          description={description ?? error.message}
          actionLabel={retryLabel}
          onAction={this.reset}
        />
      </div>
    );
  }
}
