import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { checkAndUpdateQuota } from "~/lib/quota";
import { SageMakerRuntimeClient } from "@aws-sdk/client-sagemaker-runtime";

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

    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Key is Required" }, { status: 400 });
    }

    const file = await db.videoFile.findUnique({
      where: {
        key,
      },
      select: {
        userId: true,
        analyzed: true,
      },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.userId !== quota.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (file.analyzed) {
      return NextResponse.json(
        { error: "File already analysed" },
        { status: 400 },
      );
    }

    const hasQuota = checkAndUpdateQuota(quota.userId, true);

    if (!hasQuota) {
      return NextResponse.json(
        { error: "Monthly quota exceeded" },
        { status: 429 },
      );
    }

    //Call Sagemaker endpoint
    const sagemakerClient = new SageMakerRuntimeClient({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error("Upload error: ", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 },
    );
  }
}
