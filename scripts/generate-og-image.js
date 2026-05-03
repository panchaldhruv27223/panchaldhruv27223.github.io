/**
 * Generates a 1200×630 Open Graph image at public/og-image.png from an SVG template.
 * Run via `npm run build` (post-build step). Sharp is already a dev dependency, so no extra install needed.
 *
 * To tweak the look, edit the SVG below — the layout uses the same gold/dark palette as the site.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DIST_DIR = path.resolve(__dirname, '../dist');

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0A0A0A"/>
            <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
        <radialGradient id="glow" cx="85%" cy="20%" r="60%">
            <stop offset="0%" stop-color="#C9A227" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#C9A227" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
        </pattern>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>

    <!-- Top eyebrow -->
    <text x="80" y="120" font-family="Inter, sans-serif" font-size="16" font-weight="700"
                font-style="italic" fill="#C9A227" letter-spacing="6">
        AI / ML  RESEARCHER  ·  ENGINEER
    </text>

    <!-- Name -->
    <text x="80" y="290" font-family="Outfit, Inter, sans-serif" font-size="180" font-weight="900"
                fill="#FFFFFF" letter-spacing="-6">DHRUV</text>
    <text x="80" y="430" font-family="Outfit, Inter, sans-serif" font-size="180" font-weight="900"
                fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2" letter-spacing="-6">PANCHAL</text>

    <!-- Tagline -->
    <line x1="80" y1="500" x2="180" y2="500" stroke="#C9A227" stroke-width="2"/>
    <text x="200" y="508" font-family="Inter, sans-serif" font-size="22" font-weight="700"
                fill="#FFFFFF" letter-spacing="2">BUILDING</text>
    <text x="335" y="510" font-family="Brush Script MT, cursive" font-size="40" font-weight="700"
                font-style="italic" fill="#C9A227">intelligence</text>

    <!-- Footer line -->
    <text x="80" y="580" font-family="Inter, sans-serif" font-size="14" font-weight="700"
                fill="#888888" letter-spacing="4">M.TECH @ DA-IICT  ·  GOLD MEDALIST B.E.  ·  AHMEDABAD</text>

    <!-- URL pill -->
    <rect x="940" y="552" width="200" height="40" rx="20" fill="rgba(201, 162, 39, 0.12)" stroke="#C9A227" stroke-opacity="0.4"/>
    <text x="1040" y="578" font-family="Inter, sans-serif" font-size="13" font-weight="800"
                fill="#C9A227" text-anchor="middle" letter-spacing="2">PANCHALDHRUV27223.GITHUB.IO</text>

    <!-- Top-right accent dot -->
    <circle cx="1100" cy="80" r="6" fill="#C9A227"/>
    <text x="1140" y="86" font-family="Inter, sans-serif" font-size="12" font-weight="800"
                fill="#FFFFFF" letter-spacing="3" text-anchor="end">PORTFOLIO</text>
</svg>
`;

async function generate(outputDir) {
        const outPath = path.join(outputDir, 'og-image.png');
        await sharp(Buffer.from(svg))
                .resize(W, H)
                .png({ compressionLevel: 9, palette: false })
                .toFile(outPath);
        console.log(`og-image.png generated → ${outPath}`);
}

async function main() {
        if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
        await generate(PUBLIC_DIR);
        // Also drop into dist/ if it exists so a build that already ran picks up the new asset.
        if (fs.existsSync(DIST_DIR)) await generate(DIST_DIR);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
        main().catch((err) => {
                console.error('Error generating og-image.png:', err);
                process.exit(1);
        });
}

export { main as generateOgImage };
