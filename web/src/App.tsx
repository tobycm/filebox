import { FileInput, Flex, Loader, Title } from "@mantine/core";
import { useAppContext } from "./contexts/APIContext";
import { uploadFiles } from "./lib/api";

import { useState } from "react";
import "./css/center.css";

export default function App() {
  const { api } = useAppContext();

  const [uploading, setUploading] = useState(false);

  return (
    <Flex className="center" direction="column" gap="lg">
      <Title order={1}>Filebox</Title>
      {!uploading && (
        <FileInput
          name="files"
          placeholder="Select files to upload"
          accept="*/*"
          multiple
          onChange={async (files) => {
            if (!files) return;

            setUploading(true);

            await uploadFiles(api, files);

            setUploading(false);
          }}
        />
      )}

      {uploading && (
        <Flex direction="column" align="center">
          <Loader />
          <Title order={3}>Uploading...</Title>
        </Flex>
      )}
    </Flex>
  );
}
