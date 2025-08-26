import { Client } from "minio";
import { NextResponse } from "next/server";
import { ResponseError } from "../../../../../error/response-error";
import { bucketNameRTLH, minioClientRTLH, parentFolderRTLH } from "../../../../../lib/minio";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const folderName = slug[0];
    const images = [];
    const folderPath = `${parentFolderRTLH}/${folderName}/`;

    await new Promise((resolve, reject) => {
      const stream = minioClientRTLH.listObjectsV2(bucketNameRTLH, folderPath, true);

      stream.on("data", (obj) => {
        if (obj.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          images.push(obj.name.replace(folderPath, ""));
        }
      });

      stream.on("end", resolve);
      stream.on("error", reject);
    });

    if (images.length < 1) {
      return NextResponse.json({ message: "Folder is not exist or empty" }, { status: 404 });
    }

    const { searchParams } = request.nextUrl;
    const imageName = searchParams.get("imageName");

    if (!imageName) {
      return NextResponse.json({ folder: folderName, images }, { status: 200 });
    }

    const imagePath = `${folderPath}${imageName}`;

    try {
      const imageStream = await minioClientRTLH.getObject(bucketNameRTLH, imagePath);

      const imageBuffer = await new Promise((resolve, reject) => {
        const chunks = [];
        imageStream.on("data", (chunk) => chunks.push(chunk));
        imageStream.on("end", () => resolve(Buffer.concat(chunks)));
        imageStream.on("error", reject);
      });

      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition": `inline; filename="${imageName}"`
        }
      });
    } catch (error) {
      return NextResponse.json({ errors: "Image not found." }, { status: 404 });
    }

  } catch (error) {
    if (error instanceof ResponseError) {
      return new NextResponse(JSON.stringify({ errors: error.message }), {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ errors: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}
