import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { S3Client } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  try {
    // Get the API key from the header
    const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!apiKey) {
      return NextResponse.json({ error: "Api key required" }, { status: 401 });
    }

    //Find user by API key
    const quota = await db.apiQuota.findUnique({
      where: {
        secretKey: apiKey,
      },
      select: {
        userId: true,
      },
    });

    if (!quota) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const { fileType } = await req.json();
    if (!fileType || !fileType.match(/\.(mp4|mov|avi)$/i)) {
      return NextResponse.json(
        {
          error: "Invalid Filetype, only .mp4, .avi and .mov are supported",
        },
        {
          status: 400,
        },
      );
    }

    // Generate an upload URL
    const s3Client = new S3Client();
  } catch (error) {}
}
