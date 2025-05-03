import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .post(
    "/upload",
    async ({ body }) => {
      const files = body.files as File[];

      return { files };
    },
    { body: t.Object({ files: t.Files() }) }
  )
  .listen(3456);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type FileboxAPI = typeof app;
