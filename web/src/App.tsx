import "./App.css";
import { useAppContext } from "./contexts/APIContext";

export default function App() {
  const { api } = useAppContext();

  return (
    <>
      <h1>Welcome to the React App</h1>
      <p>This is a simple React application.</p>
      <p>It is designed to demonstrate a basic structure.</p>
      <p>Feel free to modify and expand it as needed!</p>
      <p>Happy coding!</p>

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
