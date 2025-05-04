import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { s3 } from "bun";
import { Elysia, t } from "elysia";
import { OpenAPI as AuthOpenAPI, elysiaAuthMiddleware } from "./auth";
import config from "./config";
import { FileModel } from "./models";

// console.log(s3.accessKeyId);

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Filebox API",
          description: "API documentation for Filebox",
          version: "1.0.0",
        },
        components: await AuthOpenAPI.components,
        paths: await AuthOpenAPI.getPaths(),
      },
    })
  )
  .get("/", () => "Hello Elysia and Filebox!")
  .get("/favicon.ico", () => Bun.file("./assets/favicon.ico"))
  .get(
    "/config/:keysString",
    ({ params }) => {
      const { keysString } = params;

      if (keysString === "all") {
        return config;
      }

      const keys = keysString.split(",");

      return Object.fromEntries(Object.entries(config).filter(([key]) => keys.includes(key)));
    },
    {
      params: t.Object({
        keysString: t.String(),
      }),
    }
  )

  .use(elysiaAuthMiddleware)
  .use(FileModel)

  .post(
    "/upload",
    async ({ body, error, user }) => {
      return body.map((file) => ({
        url: s3.presign(`/data/${user.id}/${file.path}/${file.name}`, {
          method: "PUT",
          expiresIn: 60 * 60 * 24 * 7,
        }),
        ...file,
      }));
    },
    {
      auth: true,

      body: "File[]",
      response: "S3File[]",
    }
  )

  .get(
    "/list",
    async ({ user }) => {
      const files = await s3.list({ prefix: `/data/${user.id}/` });

      return files.contents;
    },
    {
      auth: true,
    }
  )

  .listen(3456);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type FileboxAPI = typeof app;
