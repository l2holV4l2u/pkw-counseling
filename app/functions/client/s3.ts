export async function fileUpload(
  file: File,
  fileName: string
): Promise<string> {
  const presignRes = await fetch(
    `/api/s3/presignedURL?fileName=${encodeURIComponent(fileName)}`
  );
  if (!presignRes.ok) {
    throw new Error("Failed to get pre-signed URL");
  }
  const { url } = await presignRes.json();
  const s3UploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!s3UploadRes.ok) {
    throw new Error("File upload to S3 failed");
  }
  return url.split("?")[0];
}
