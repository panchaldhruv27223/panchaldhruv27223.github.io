import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Catches uncaught render-time errors in any descendant component and shows a branded fallback
 * instead of a blank white screen. React error boundaries do NOT catch errors in event handlers,
 * async callbacks, or during SSR — those need their own try/catch.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log so the error shows up in the dev console and any production error tracker.
        console.error('[ErrorBoundary]', error, info.componentStack);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        const message = this.state.error?.message ?? 'Unknown error';

        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-brand-dark text-white text-center">
                <div className="max-w-xl">
                    <p className="text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                        System fault
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none">
                        Something{' '}
                        <span
                            className="text-brand-gold lowercase"
                            style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1em' }}
                        >
                            broke
                        </span>
                    </h1>
                    <p className="text-zinc-400 mb-8 text-sm md:text-base">
                        An unexpected error occurred. You can try again, or head back to the home page.
                    </p>

                    <details className="mb-8 text-left text-xs text-zinc-500 bg-white/[0.02] border border-white/5 rounded p-4">
                        <summary className="cursor-pointer font-bold uppercase tracking-widest text-zinc-400">
                            Technical details
                        </summary>
                        <pre className="mt-3 whitespace-pre-wrap break-words text-zinc-500">{message}</pre>
                    </details>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            type="button"
                            onClick={this.handleReset}
                            className="px-8 py-3 bg-brand-gold text-black font-black text-xs tracking-widest uppercase hover:bg-brand-amber transition-colors"
                        >
                            Try again
                        </button>
                        <a
                            href="/"
                            className="px-8 py-3 border border-white/20 text-white font-black text-xs tracking-widest uppercase hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
                        >
                            Go home
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorBoundary;
