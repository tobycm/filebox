import { Alert, Anchor, FileInput, Flex, Loader, Title } from "@mantine/core";
import { useAppContext } from "./contexts/APIContext";
import { uploadFiles } from "./lib/api";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./css/center.css";

export default function App() {
  const { api } = useAppContext();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({
    loaded: 0,
    total: 0,
  });

  const files = useQuery({
    queryKey: ["files"],
    queryFn: () => api.list.get(),
  });

  return (
    <Flex className="center" direction="column" gap="lg">
      <Title order={1}>Filebox</Title>

      {uploadError && (
        <Alert variant="light" color="red" title="Error!" mt="xl">
          {uploadError}
        </Alert>
      )}

      {!uploading && (
        <FileInput
          name="files"
          placeholder="Select files to upload"
          accept="*/*"
          multiple
          onChange={async (files) => {
            if (!files) return;

            setUploading(true);

            try {
              await uploadFiles(api, files, {
                onProgress: (progress) =>
                  setUploadProgress((prev) => ({
                    loaded: progress,
                    total: prev.total,
                  })),
              });
            } catch (error) {
              console.error(error);

              if (error instanceof Error) setUploadError(error.message ?? "Unknown error");
            }

            setUploading(false);
          }}
        />
      )}

      {uploading && (
        <Flex direction="column" align="center">
          <Loader />
          <Title order={3}>
            Uploading {uploadProgress.loaded}/{uploadProgress.total} files ...
          </Title>
        </Flex>
      )}

      {files.isFetched && (
        <Flex direction="column" gap="sm">
          {(files.data!.data || []).map((file) => (
            <Title order={4} key={file.key}>
              <Anchor href={file.url} target="_blank" rel="noopener noreferrer" download={file.key.split("/").pop()} size="sm">
                {file.key.split("/").pop()}
              </Anchor>
              - {file.size} bytes -{" "}
              <Anchor
                href={`${import.meta.env.VITE_IMAGE_THUMBNAIL_SERVER_URL}?url=${encodeURIComponent(file.url)}&format=${file.key.split(".").pop()}`}
                target="_blank"
                rel="noopener noreferrer">
                Thumbnail
              </Anchor>
            </Title>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
