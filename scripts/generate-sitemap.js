import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://panchaldhruv27223.github.io';
const OUT_DIR = path.resolve(__dirname, '../dist');

// Define routes (should match your App.tsx routes). Update when adding new pages.
const routes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'weekly' },
    { path: '/gallery', priority: '0.7', changefreq: 'monthly' },
    { path: '/consultation', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/blog/mastering-classification', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/supervised-learning', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/sklearn-essentials', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/progan', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/unet', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/unet-finetuning', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/tensorboard', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog/collections', priority: '0.8', changefreq: 'monthly' }
];

function generateSitemap() {
    console.log('Generating sitemap.xml...');

    const today = new Date().toISOString().split('T')[0];
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(({ path, priority, changefreq }) => `    <url>
        <loc>${DOMAIN}${path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
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
    const aiBots = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Applebot-Extended'];
    const robotsContent = `# robots.txt — ${DOMAIN}/

User-agent: *
Allow: /
Disallow: /node_modules/
Disallow: /src/
Disallow: /scripts/

${aiBots.map(bot => `User-agent: ${bot}\nAllow: /`).join('\n\n')}

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
