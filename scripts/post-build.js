import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const NOT_FOUND_HTML = path.join(DIST_DIR, '404.html');

function create404() {
    console.log('Creating 404.html from index.html...');

    if (!fs.existsSync(INDEX_HTML)) {
        console.error('Error: dist/index.html not found. Run build first.');
        process.exit(1);
    }

    fs.copyFileSync(INDEX_HTML, NOT_FOUND_HTML);
    console.log('404.html created successfully.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    create404();
}
