// src/app/api/generate-icons/route.js

import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import PNGToICO from 'png-to-ico';
import archiver from 'archiver';
import { execSync } from 'child_process';

// Désactiver le parsing automatique du body (not needed with formData())
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// Exporter la méthode POST
export async function POST(req) {
    try {
        // Utiliser formData() pour obtenir les données du formulaire
        const formData = await req.formData();
        const svgFile = formData.get('svg');

        if (!svgFile) {
            return NextResponse.json({ message: 'Aucun fichier SVG fourni.' }, { status: 400 });
        }

        // Vérification du type MIME
        if (svgFile.type !== 'image/svg+xml') {
            return NextResponse.json({ message: 'Le fichier doit être un SVG valide.' }, { status: 400 });
        }

        const tempDir = path.join(process.cwd(), 'temp', Date.now().toString());
        await fs.ensureDir(tempDir);

        const svgArrayBuffer = await svgFile.arrayBuffer();
        const svgBuffer = Buffer.from(svgArrayBuffer);
        const svgPath = path.join(tempDir, 'uploaded.svg');

        // Enregistrer le fichier SVG sur le disque
        await fs.writeFile(svgPath, svgBuffer);

        // Définir les tailles et les noms des fichiers PNG
        const pngDefinitions = [
            { size: 32, filename: '32x32.png' },
            { size: 128, filename: '128x128.png' },
            { size: 256, filename: '256x256.png' }, // Ajouté pour ICO
            // { size: 256, filename: '128x128@2x.png' }, // Optionnel, si nécessaire
            { size: 16, filename: '16x16.png' },        // Pour ICO
            { size: 512, filename: '512x512.png' },      // Pour ICNS
        ];

        // Générer les fichiers PNG
        await Promise.all(pngDefinitions.map(async (png) => {
            const outputPath = path.join(tempDir, png.filename);
            await sharp(svgPath)
                .resize(png.size, png.size)
                .png()
                .toFile(outputPath);
        }));

        // Générer le fichier ICO
        const icoSizes = [16, 32, 128, 256];
        const icoPaths = icoSizes.map(size => path.join(tempDir, `${size}x${size}.png`));

        // Vérifier que tous les PNG nécessaires pour ICO existent
        for (const icoPath of icoPaths) {
            if (!fs.existsSync(icoPath)) {
                throw new Error(`PNG manquant pour ICO : ${icoPath}`);
            }
        }

        const icoBuffer = await PNGToICO(icoPaths);
        const icoPathFinal = path.join(tempDir, 'icon.ico');
        await fs.writeFile(icoPathFinal, icoBuffer);

        // Générer le fichier ICNS (si sur macOS)
        let icnsPath = null;
        if (process.platform === 'darwin') {
            const iconsetDir = path.join(tempDir, 'icon.iconset');
            await fs.ensureDir(iconsetDir);

            const iconsetDefinitions = [
                { size: 16, filename: 'icon_16x16.png' },
                { size: 32, filename: 'icon_32x32.png' },
                { size: 128, filename: 'icon_128x128.png' },
                { size: 256, filename: 'icon_256x256.png' },
                { size: 512, filename: 'icon_512x512.png' },
            ];

            await Promise.all(iconsetDefinitions.map(async (icon) => {
                const sourcePath = path.join(tempDir, `${icon.size}x${icon.size}.png`);
                const destPath = path.join(iconsetDir, icon.filename);
                await fs.copy(sourcePath, destPath);
            }));

            // Utiliser iconutil pour convertir en ICNS
            icnsPath = path.join(tempDir, 'icon.icns');
            execSync(`iconutil -c icns "${iconsetDir}" -o "${icnsPath}"`);

            // Nettoyer le dossier icon.iconset
            await fs.remove(iconsetDir);
        } else {
            console.warn('Génération des ICNS ignorée: Non exécuté sur macOS.');
        }

        // Créer un fichier ZIP des icônes générées
        const zipPath = path.join(tempDir, 'icons.zip');
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);
        archive.file(path.join(tempDir, '32x32.png'), { name: 'icons/32x32.png' });
        archive.file(path.join(tempDir, '128x128.png'), { name: 'icons/128x128.png' });
        archive.file(path.join(tempDir, '256x256.png'), { name: 'icons/256x256.png' }); // Ajouté
        archive.file(path.join(tempDir, '16x16.png'), { name: 'icons/16x16.png' });
        archive.file(path.join(tempDir, '512x512.png'), { name: 'icons/512x512.png' });
        archive.file(icoPathFinal, { name: 'icons/icon.ico' });
        if (icnsPath) {
            archive.file(icnsPath, { name: 'icons/icon.icns' });
        }
        await archive.finalize();

        // Attendre la fin de l'archivage
        await new Promise((resolve, reject) => {
            output.on('close', resolve);
            archive.on('error', reject);
        });

        // Lire le fichier ZIP
        const zipBuffer = await fs.readFile(zipPath);

        // Envoyer le fichier ZIP au client
        const response = new NextResponse(zipBuffer, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename=icons.zip',
            },
        });

        // Nettoyer les fichiers temporaires après envoi
        await fs.remove(tempDir);

        return response;

    } catch (error) {
        console.error('Erreur lors de la génération des icônes:', error);
        return NextResponse.json({ message: 'Erreur lors de la génération des icônes.' }, { status: 500 });
    }
}
