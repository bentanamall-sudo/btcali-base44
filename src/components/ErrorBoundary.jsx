import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">Something went wrong</h2>
            <p className="text-sm font-body text-muted-foreground mb-6">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = window.location.origin + '/'; }}
              className="px-6 py-3 rounded-xl font-heading font-bold text-sm text-primary-foreground"
              style={{ background: 'linear-gradient(135deg, #6FB8FF 0%, #4F9DFF 40%, #3B7DD8 100%)' }}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}