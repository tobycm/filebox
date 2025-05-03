import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { auth, OpenAPI as AuthOpenAPI } from "./auth";
import config from "./config";

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
  .get("/", () => "Hello Elysia")
  .get("/favicon.ico", () => {
    return new Response(Bun.file("./assets/favicon.ico"));
  })
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

  .mount(auth.handler)
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
