import {NextRequest, NextResponse} from "next/server";
import {Svg} from "@/app/types";
import {db} from "@/utils/database";

export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const userid = url.searchParams.get('userid');

    try {
        const client = await db.connect();
        try {
            const result = await client.query('SELECT * FROM svg WHERE userid = $1', [userid]);
            return NextResponse.json(result.rows.map((row: Svg) => {
                return {
                    svgid: row.svgid,
                    name: row.name,
                    content: row.content,
                    userid: row.userid,
                }
            }));
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des icônes:', error);
        return NextResponse.json({message: 'Erreur lors de la récupération des icônes.'}, {status: 500});
    }
}