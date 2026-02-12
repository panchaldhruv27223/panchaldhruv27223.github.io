import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const imagesDir = path.join(rootDir, 'images');

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

            console.log(`Converting: ${file} -> ${outputName}`);

            try {
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                // Verify the new file exists before deleting old
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(fullPath);
                    console.log(`✓ Optimized & Replaced: ${file}`);
                }
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
};

console.log('Starting image optimization...');
processDirectory(publicImagesDir).then(() => {
    console.log('Image optimization complete!');
}).catch(err => {
    console.error('Optimization failed:', err);
});
