import { desc, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { capacitaciones, files } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { generateSignedUrl } from "~/utils/s3-filemanagment";


type Image = {
  fileName: string;
  originalName: string;
  size: number;
  signedUrl: string;
};

type Capc = {
  id: number;
  name: string;
  description: string | null;
  link?: string;
  date: Date;
  time: string;
  mediaId: number;
  image: Image;
};

export async function GET(req: any) {
  try {
    // Fetch all capacitaciones
    const result = await db
      .select({
        capc: capacitaciones,
        files: files,
      })
      .from(capacitaciones)
      .innerJoin(files, eq(files.id, capacitaciones.mediaId))
      .orderBy(desc(capacitaciones.date));

      if (!result || result.length === 0) {
        return NextResponse.json({ capcs: [] }, { status: 200 });
      }

      const capcs: Capc[] = await Promise.all(
        result.map(async (row) => {
          const signedUrl = await generateSignedUrl(row.files.fileName);
          return {
            id: row.capc.id,
            name: row.capc.name,
            description: row.capc.description ?? null,
            link: row.capc.link ?? undefined,
            date: row.capc.date,
            time: row.capc.time,
            mediaId: row.capc.mediaId!,
            image: {
              fileName: row.files.fileName,
              originalName: row.files.originalName,
              size: row.files.size,
              signedUrl,
            },
          };
        })
      );

    return NextResponse.json(
      { capcs },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
