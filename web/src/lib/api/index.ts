import { treaty } from "@elysiajs/eden";
import { FileboxAPI } from "../../../../backend/src";
import { promisesProgress } from "../../utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const api = treaty<FileboxAPI>("http://localhost:3456", {
  fetch: { credentials: "include" },
});

export type APIClient = typeof api;

export async function uploadFiles(api: APIClient, files: File[], options: { onProgress?: (progress: number) => void } = {}) {
  const { onProgress } = options;

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

  // upload files to S3
  const uploadPromises = s3files.data.map(async (s3file, index) => {
    const file = files[index];
    const url = s3file.url;

    if (!url) {
      console.error("No URL returned for file", file.name);
      return;
    }

    return await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
  });

  promisesProgress(uploadPromises, onProgress);

  await Promise.all(uploadPromises);
}
