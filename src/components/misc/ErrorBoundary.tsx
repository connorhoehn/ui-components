// frontend/src/components/ErrorBoundary.tsx
//
// Reusable React error boundary that catches render errors in children,
// logs them, and displays a user-friendly fallback UI with a retry button.

import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  /** Identifier for which boundary caught the error (logged to console). */
  name: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary:${this.props.name}]`, error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans">
          <p className="m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg">
            Something went wrong
          </p>
          <p className="m-0 mb-4 text-[0.8rem] text-danger-fg">
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <button
            data-ui-part=""
            onClick={this.handleRetry}
            className="bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
