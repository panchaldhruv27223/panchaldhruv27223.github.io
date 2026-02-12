import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://panchaldhruv27223.github.io';
const OUT_DIR = path.resolve(__dirname, '../dist');

// Define routes (should match your App.tsx routes)
const routes = [
    '/',
    '/blog',
    '/gallery',
    '/consultation',
    '/contact'
];

function generateSitemap() {
    console.log('Generating sitemap.xml...');

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `    <url>
        <loc>${DOMAIN}${route}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('\n')}
</urlset>`;

    // Ensure dist directory exists
    if (!fs.existsSync(OUT_DIR)) {
        console.warn(`Warning: Output directory ${OUT_DIR} does not exist. Creating it...`);
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemapContent);
    console.log('sitemap.xml generated successfully.');
}

function generateRobots() {
    console.log('Generating robots.txt...');
    const robotsContent = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;
    fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robotsContent);
    console.log('robots.txt generated successfully.');
}

// Check if we are running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    try {
        generateSitemap();
        generateRobots();
    } catch (e) {
        console.error('Error generating SEO files:', e);
        process.exit(1);
    }
}
