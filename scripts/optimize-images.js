import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'images');

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

const processDirectory = async (directory) => {
    if (!fs.existsSync(directory)) {
        console.log(`Directory not found: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (/\.(png|jpe?g)$/i.test(file)) {
            const outputName = file.replace(/\.(png|jpe?g)$/i, '.webp');
            const outputPath = path.join(directory, outputName);

            try {
                const metadata = await sharp(fullPath).metadata();
                const originalSize = stat.size;

                let pipeline = sharp(fullPath);
                if (metadata.width && metadata.width > MAX_WIDTH) {
                    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
                }

                await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

                if (fs.existsSync(outputPath)) {
                    const newSize = fs.statSync(outputPath).size;
                    fs.unlinkSync(fullPath);
                    const savedKB = Math.round((originalSize - newSize) / 1024);
                    console.log(`✓ ${file} (${Math.round(originalSize / 1024)}KB) → ${outputName} (${Math.round(newSize / 1024)}KB) saved ${savedKB}KB`);
                }
            } catch (err) {
                console.error(`Error converting ${file}:`, err.message);
            }
        }
    }
};

console.log('Starting image optimization...');
console.log(`Max width: ${MAX_WIDTH}px, WebP quality: ${WEBP_QUALITY}`);
processDirectory(imagesDir).then(() => {
    console.log('Image optimization complete!');
}).catch(err => {
    console.error('Optimization failed:', err);
});
