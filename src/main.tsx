import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('#root element not found');

// Clear the SEO fallback before React renders, so the static HTML doesn't flash through React's tree on first paint.
rootEl.innerHTML = '';

ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>,
);

// Hide the splash on the next frame, after React has committed its first paint.
requestAnimationFrame(() => {
    const splash = document.getElementById('app-splash');
    if (!splash) return;
    splash.classList.add('is-hidden');
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
    // Safety net in case the transitionend never fires (e.g., reduced-motion).
    setTimeout(() => splash.remove(), 1000);
});
