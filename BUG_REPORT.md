# Portfolio Bug Report

**Site:** http://localhost:5173 (Vite dev server)
**Tested on:** Chrome on Windows, viewport 1536×674 (DPR 1.25)
**Date:** 2026-05-03
**Routes tested:** `/`, `/blog`, `/gallery`, `/consultation`, `/contact`, `/blog/supervised-learning`

Bugs are grouped by severity. Each entry includes the symptom, the file/line where it lives (when known), and a suggested fix.

---

## P0 — Critical (visible breakage)

### 1. Homepage `<title>` is duplicated in the browser tab
**Symptom:** Tab title reads `Dhruv Panchal | AI/ML Researcher & Engineer | Dhruv Panchal | AI/ML Researcher` (the brand string appears twice).

**Cause:** [src/components/SEO.tsx:21-22](src/components/SEO.tsx) compares the passed `title` against `siteTitle` with strict equality:
```ts
const siteTitle = 'Dhruv Panchal | AI/ML Researcher';
const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
```
But [src/pages/HomePage.tsx:19](src/pages/HomePage.tsx) passes `"Dhruv Panchal | AI/ML Researcher & Engineer"` — close but not equal — so the suffix gets appended, yielding the doubled tail.

**Fix:** Either change the home page to pass the exact `siteTitle`, or detect the suffix using `title.endsWith(siteTitle)` instead of `===`.

---

### 2. Blog post pages have no SEO metadata (default site title only)
**Symptom:** Visiting `/blog/supervised-learning` shows the tab title `Dhruv Panchal | AI/ML Researcher & Engineer` — the static fallback from `index.html`. The H1 on the page is `Supervised Learning with Scikit-learn`, but neither `<title>`, `<meta description>`, nor OG tags are post-specific.

**Cause:** None of the blog post pages import or render `<SEO>`. Only `HomePage`, `BlogPage`, `GalleryPage`, `ConsultationPage`, and `ContactPage` use it.
Affected files:
- [src/pages/SupervisedLearningBlog.tsx](src/pages/SupervisedLearningBlog.tsx)
- [src/pages/SklearnEssentialsBlog.tsx](src/pages/SklearnEssentialsBlog.tsx)
- [src/pages/ProGANBlog.tsx](src/pages/ProGANBlog.tsx)
- [src/pages/UNetBlog.tsx](src/pages/UNetBlog.tsx)
- [src/pages/UNetFineTuningBlog.tsx](src/pages/UNetFineTuningBlog.tsx)
- [src/pages/TensorBoardBlog.tsx](src/pages/TensorBoardBlog.tsx)
- [src/pages/CollectionsBlog.tsx](src/pages/CollectionsBlog.tsx)
- [src/pages/BlogPostPage.tsx](src/pages/BlogPostPage.tsx)

**Impact:** Bad search rankings, poor link previews on LinkedIn/Twitter/WhatsApp — every shared blog URL renders identical OG cards.

**Fix:** Add `<SEO title="..." description="..." />` to each blog post page.

---

### 3. Navbar text is invisible over the white footer
**Symptom:** When scrolled to the bottom of any page, the fixed navbar (centered "DHRUV Panchal" and the MENU button) is white text on a white background — effectively invisible. Verified on `/`, screenshot showed only the gold "Let's Talk" pill remained legible.

**Cause:**
- [src/components/Footer.tsx:31](src/components/Footer.tsx) — the footer uses `bg-white text-black`.
- [src/components/Navbar.tsx:62-101](src/components/Navbar.tsx) — the navbar uses white text and a white-tinted blur background. Its scrolled state (`scrolled` after 50px) is `bg-brand-dark/50`, which over a white footer becomes a translucent gray that still hides white text.

**Fix:** Either (a) change the footer back to a dark background, (b) make the navbar adapt (invert text color) when over light sections, or (c) drop `bg-white` and use the dark theme everywhere for consistency.

---

### 4. Gallery page freezes the renderer (massive image payload)
**Symptom:** Scrolling on `/gallery` repeatedly causes Chrome to stop responding — screenshots time out after 30s, page becomes janky. Same symptom appears in lesser form on the homepage and blog pages.

**Cause:** [public/images/gallery_images/](public/images/gallery_images/) (or `images/gallery_images/`) contains 18 unoptimized phone JPGs totaling **~12 MB**, with the largest being **1.75 MB** (`IMG_20250616_230731.jpg`). Each loads at native phone resolution (likely 4000×3000+) with no lazy-loading, `srcset`, or `width/height` attributes — so the browser decodes and rasterizes ~50–100MP at once when those images come on-screen.

**Fix (in priority order):**
1. Run a build-time image pipeline (`sharp` is already in devDependencies) to produce 800w / 1200w / 1600w `.webp` or `.avif` variants.
2. Use `<img loading="lazy" decoding="async" srcset="..." sizes="..." width="..." height="...">` so layout doesn't shift and idle images stay decoded only when scrolled to.
3. Cap on-disk size to ~200KB per image as a budget.

---

## P1 — Major UX problems

### 5. Massive empty space between every section (looks broken on desktop)
**Symptom:** While scrolling the homepage, large stretches of the page are completely blank — at one point a full viewport scrolls past with nothing but the watermark eagle. On a 1440×900 desktop, the page is **11,195 px tall**, with each section padded to ~1700–2400 px.

**Cause:** Every section uses `py-32 md:py-48 lg:py-64` (= 256 px top + 256 px bottom on large screens). Footer adds `pt-24 md:pt-64 lg:pt-80` (= 320 px) on top of that, plus `mb-48 lg:mb-64` (= 256 px) under its own headline. Files:
- [src/components/About.tsx](src/components/About.tsx), [Projects.tsx](src/components/Projects.tsx), [Experience.tsx](src/components/Experience.tsx), [Skills.tsx](src/components/Skills.tsx), [Certificates.tsx](src/components/Certificates.tsx)
- [src/components/Footer.tsx:31, 34](src/components/Footer.tsx)

**Fix:** Halve the `lg:py-*` values (e.g., `lg:py-32` instead of `lg:py-64`), or use a max-height constraint. As a sanity check, the section-to-section transitions should not require more than ~80–120 px of breathing room.

---

### 6. Blog grid clips the last card on the right
**Symptom:** On `/blog` the third column ("Mastering TensorBoard with PyTorch") visually overflows the viewport — its right edge is cut off. Confirmed via JS: one element's `right` is at 1632 px while viewport `innerWidth` is 1536 px (96 px overflow). `body { overflow-x: hidden }` masks the scrollbar but the clipping is still visible.

**Cause:** Likely a transform/hover state on a card extending past its parent's right boundary, combined with a section that lacks an inner `max-w-7xl mx-auto` clamp on this particular grid.

**Fix:** Inspect [src/pages/BlogPage.tsx](src/pages/BlogPage.tsx) for the offending element and add a constraining wrapper or reduce the hover-translate amount. Also consider removing `body { overflow-x: hidden }` — it hides bugs rather than fixing them.

---

### 7. CTA outline text becomes barely visible / inconsistent
**Symptom:** The "Let's Build INTELLIGENCE." CTA appears twice in the user journey:
- On `/` it sits over the dark background — the hollow "INTELLIGENCE" outline reads as faint dark-on-dark.
- On `/blog` and other pages the same component appears against the white footer with thin gray outline — readable but the contrast vs. the all-black "Let's Build" above it is jarring.

**Cause:** [src/components/Footer.tsx:35-43](src/components/Footer.tsx) uses `WebkitTextStroke: '2px black'` over the footer's `bg-white`, but that same footer is rendered after dark sections without the dark-to-light transition being designed.

**Fix:** Either:
- Remove the `bg-white` on the footer (keep the dark theme), or
- Add an explicit visual divider between the dark page content and the white footer so the white surface doesn't read as "broken section".

---

### 8. Featured Works section: empty right column
**Symptom:** On `/`, the "FEATURED works" section shows a single project card on the left ("QuanvolutionNet") with a giant empty right half of the screen.

**Cause:** Likely a `grid lg:grid-cols-2` layout where one project has no paired item, so the second column collapses to whitespace inside the section's already-huge `lg:py-64` container.

**Fix:** Either render projects in a single column with a centered max-width, or fill both columns (e.g., a static "see all projects" tile).

---

## P2 — Polish / SEO / dead code

### 9. Mismatched site title used as the "siteTitle" constant
**Symptom:** The `<title>` brand suffix is `Dhruv Panchal | AI/ML Researcher` (no "& Engineer"), while the homepage explicitly declares the title as `Dhruv Panchal | AI/ML Researcher & Engineer`. These should be one canonical brand.

**Cause:** [src/components/SEO.tsx:21](src/components/SEO.tsx) and [src/pages/HomePage.tsx:19](src/pages/HomePage.tsx) disagree.

**Fix:** Pick one canonical brand string and use it everywhere.

---

### 10. Dead component `Mentorship.tsx`
**Symptom:** [src/components/Mentorship.tsx](src/components/Mentorship.tsx) exists but is never imported anywhere (only string mentions of "Mentorship" in `ConsultationPage` and `ContactPage`).

**Fix:** Delete the file or wire it into the consultation page if it was supposed to render there.

---

### 11. No real contact form
**Symptom:** `/contact` page has no `<form>`, no `<input>`, no submit. It only lists email/LinkedIn/GitHub/Medium with copy-able text.

**Status:** May be intentional (some portfolios prefer this), but worth confirming. If a form is desired, integrate something like Formspree / Resend / EmailJS.

---

### 12. React Router future-flag warnings in console
**Symptom:** Two warnings on every page load:
> ⚠️ React Router will begin wrapping state updates in `React.startTransition` in v7…
> ⚠️ Relative route resolution within Splat routes is changing in v7…

**Fix:** In [src/App.tsx](src/App.tsx) pass the future flags to `BrowserRouter`:
```tsx
<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

---

### 13. CTA / footer button labels use ALL_CAPS_SNAKE_CASE
**Symptom:** The button on the dark footer reads `INITIATE_CONTACT`. Stylistic, but it reads as a placeholder/dev string. Same with `BACK TO HOME`, `READ FULL ARTICLE →`, `// ` bullet markers.

**Status:** Cosmetic — flag for a designer review only.

---

### 14. Status block hard-coded "Open for Collaboration"
**Symptom:** The footer "System Status" pill is always green / always "OPEN FOR COLLABORATION". Same on the contact page. If you ever close to new work this needs to be edited in two places.

**Fix:** Move to a single constant in [src/data/constants.ts](src/data/constants.ts).

---

### 15. Viewport meta allows zoom up to 5x but disables nothing
**Status:** Not a bug — note that [index.html:6](index.html) uses `maximum-scale=5.0` which is fine. Just confirming this isn't blocking accessibility.

---

## What was tested OK

- Console: no JS errors, only React Router future-flag warnings.
- All blog cards link to valid routes (`/blog/mastering-classification`, `/blog/supervised-learning`, …, all 8 wired in `App.tsx`).
- Navbar menu opens, closes (X button + Esc + click backdrop), and scroll-locks the body.
- Hero typewriter-style word swap works ("BUILDING intelligence" → "BUILDING language" → …).
- All `<img>` elements have non-zero `naturalWidth` (no broken images).
- HelmetProvider is correctly wrapped at root.

## Recommended fix order

1. **P0 #4 (gallery image weights)** — biggest win for everyone.
2. **P0 #3 (navbar invisible over white footer)** — visible on every page.
3. **P0 #1 + #2 + P2 #9 (SEO/title fixes)** — fix together, one PR.
4. **P1 #5 (kill the giant section padding)** — the page will feel ~3× shorter.
5. **P1 #6 (blog grid clipping)** and **P1 #8 (featured works empty column)** — layout cleanup.
6. The rest as polish.
