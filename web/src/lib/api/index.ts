import { treaty } from "@elysiajs/eden";
import { FileboxAPI } from "../../../../backend/src";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const api = treaty<FileboxAPI>("localhost:3456");

export type APIClient = typeof api;

export async function uploadFiles(api: APIClient, files: File[]) {
  // request presigned S3 URLs
  const s3files = await api.upload.post(
    files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      path: "/",
    }))
  );

  if (s3files.error) {
    console.error(s3files.error);
    return;
  }
}
