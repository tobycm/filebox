import { Hono } from "hono/quick";

type Bindings = {
  BUCKET: R2Bucket;
  ALLOWED_DOMAINS: string;
};

/**
 * Supported image formats:
    JPEG
    PNG
    GIF (including animations)
    WebP (including animations)
    SVG
 */

const okFormats = ["jpeg", "png", "gif", "webp", "svg"];

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", async (c) => {
  const options = { cf: { image: {} } };

  const url = c.req.query("url");
  if (!url) return c.notFound();

  const format = c.req.query("format") ?? "";

  if (!okFormats.includes(format)) return c.json({ error: "Unsupported file type" }, 415);

  const parsedUrl = new URL(url);

  if (!c.env.ALLOWED_DOMAINS.split(",").includes(parsedUrl.hostname)) return c.json({ error: "Domain not allowed" }, 403);

  options.cf.image = {
    width: 200,
    height: 200,
    quality: 75,
    fit: "cover",
    format,
  };

  return fetch(
    new Request(url, {
      headers: c.req.header(),
    }),
    options
  );
});

export default app;
