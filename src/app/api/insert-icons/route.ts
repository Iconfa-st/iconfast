import { NextResponse } from 'next/server';
import {Svg} from "@/app/types";

export async function POST(req: any) {
    try {
        const formData = await req.formData();
        const svgFile = formData.get('svg');

        if (!svgFile) {
            return NextResponse.json({ message: 'Aucun fichier SVG fourni.' }, { status: 400 });
        }

        // Vérification du type MIME
        if (svgFile.type !== 'image/svg+xml') {
            return NextResponse.json({ message: 'Le fichier doit être un SVG valide.' }, { status: 400 });
        }

        const svgArrayBuffer = await svgFile.arrayBuffer();
        const svgBuffer = Buffer.from(svgArrayBuffer);
        const svgString = svgBuffer.toString();
        const svgName = svgFile.name;

        const { Pool } = require('pg');
        const pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: 5432,
        });
        const client = await pool.connect();
        try{
            const result = await client.query(
                'INSERT INTO svg (name, content, userid) VALUES ($1, $2, $3) RETURNING *',
                [svgName, svgString, 1]
            );

            return NextResponse.json(result.rows[0]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors de la génération des icônes:', error);
        return NextResponse.json({ message: 'Erreur lors de la génération des icônes.' }, { status: 500 });
    }
}
