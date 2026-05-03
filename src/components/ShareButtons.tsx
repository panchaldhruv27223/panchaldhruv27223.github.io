import React, { useState } from 'react';

interface ShareButtonsProps {
    title: string;
    /** Defaults to current page URL. */
    url?: string;
}

const SITE_DOMAIN = 'https://panchaldhruv27223.github.io';

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
    const [copied, setCopied] = useState(false);

    // Resolve the share URL once per render. window.location is safe in a SPA after hydration.
    const shareUrl =
        url ?? (typeof window !== 'undefined' ? window.location.href : SITE_DOMAIN);
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    const twitterText = encodeURIComponent(`${title} — by @DhruvPanchal`);

    const twitterHref = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodedUrl}`;
    const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    const emailHref = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`Thought you'd like this: ${shareUrl}`)}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fall back silently — clipboard can be blocked in non-secure contexts.
        }
    };

    const baseBtn =
        'group inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.02] hover:border-brand-gold/50 hover:bg-brand-gold/10 hover:text-brand-gold focus-visible:border-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 transition-colors text-zinc-400 interactive';

    return (
        <div className="flex items-center gap-3" aria-label="Share this article">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
                Share
            </span>
            <a
                href={twitterHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                title="Share on Twitter"
                className={baseBtn}
                data-cursor="Twitter"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>
            <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                className={baseBtn}
                data-cursor="LinkedIn"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.356V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.555V9h3.559v11.452z" />
                </svg>
            </a>
            <a
                href={emailHref}
                aria-label="Share via email"
                title="Share via email"
                className={baseBtn}
                data-cursor="Email"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            </a>
            <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? 'Link copied' : 'Copy link'}
                title={copied ? 'Copied!' : 'Copy link'}
                className={baseBtn}
                data-cursor={copied ? 'Copied' : 'Copy'}
            >
                {copied ? (
                    <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ShareButtons;
