import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { useAppContext } from "./contexts/APIContext";

export default function App() {
  const { api } = useAppContext();

  const config = useQuery({
    queryKey: ["config", "allowAnonymous"],
    queryFn: () => api.config({ keysString: "allowAnonymous" }).get(),
  });

  return (
    <>
      <h1>Welcome to the React App</h1>
      {!config.isFetched && <p>Loading...</p>}
      {config.isFetched && (
        <>
          <p>Config: </p>
          <pre>
            <code>{JSON.stringify(config.data!.data, null, 2)}</code>
          </pre>
        </>
      )}
      <input
        type="file"
        id="files"
        name="files"
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (!files) return;

          api.upload.post({ files });
        }}
      />
      <br />
      <br />
    </>
  );
}
