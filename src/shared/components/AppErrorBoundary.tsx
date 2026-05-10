import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

interface State {
  error: Error | null;
}

/** Prevents unexpected render errors from leaving operators with a blank production console. */
export class AppErrorBoundary extends Component<PropsWithChildren, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Keep this as console.error so production platforms can capture it without adding a logging dependency.
    console.error('Unhandled UI error', error, errorInfo);
  }

  override render(): ReactNode {
    if (this.state.error) {
      return (
        <main className="fatal-error" role="alert">
          <h1>Console error</h1>
          <p>The UI hit an unexpected error. Refresh the page or contact support with the browser console details.</p>
          <button type="button" onClick={() => {
              window.location.reload();
            }}>
            Reload console
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
