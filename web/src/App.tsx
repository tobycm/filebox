import { Alert, Box, FileInput, Flex, Loader, Title } from "@mantine/core";

import { FullFileBrowser } from "@aperturerobotics/chonky";
import { ChonkyIconTabler } from "./lib/chonkyIcons";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useAppContext } from "./contexts/APIContext";
import { uploadFiles } from "./lib/api";

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
        <Box w="90%" h="50vh">
          <FullFileBrowser
            files={
              files.data!.data?.map((file) => ({
                id: file.key,
                name: file.key.split("/").pop() ?? file.key,
                ext: file.key.split(".").pop(),
                thumbnailUrl: `${import.meta.env.VITE_IMAGE_THUMBNAIL_SERVER_URL}?url=${encodeURIComponent(file.url)}&format=${file.key
                  .split(".")
                  .pop()}`,
              })) || []
            }
            fileActions={[{ id: "" }]}
            darkMode={true}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            iconComponent={ChonkyIconTabler}
          />
        </Box>
      )}
    </Flex>
  );
}
