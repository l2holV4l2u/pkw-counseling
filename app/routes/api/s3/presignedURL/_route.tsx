import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const fileName = url.searchParams.get("fileName");
  if (!fileName) {
    return new Response(JSON.stringify({ error: "Missing fileName" }), {
      status: 400,
    });
  }
  const signedUrl = await generatePresignedUrl(fileName);
  return new Response(JSON.stringify({ url: signedUrl }), { status: 200 });
}

// This function generates a pre-signed URL
export async function generatePresignedUrl(fileName: string) {
  const s3 = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    ContentType: "application/octet-stream",
  });
  return getSignedUrl(s3, command, { expiresIn: 600 }); // expire in 10 minutes
}
