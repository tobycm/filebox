import Elysia, { t } from "elysia";

export const FileInfo = t.Object({
  path: t.String({
    pattern: "^(?!.*\\.\\.)(?!.*\\.$)[a-z0-9._-]+(?:\\.[a-z0-9]{1,10})?$",
    minLength: 1,
    maxLength: 175,
  }),
  name: t.String({
    pattern: "^(?!.*\\.\\.)(?!.*\\.$)[a-z0-9._-]+(?:\\.[a-z0-9]{1,10})?$",
    minLength: 1,
    maxLength: 175,
  }),
  size: t.Number({
    minimum: 0,
    maximum: 1024 * 1024 * 1024 * 1024, // 1TB
  }),
  type: t.String({
    pattern: "^[a-z0-9]+/[a-z0-9+.-]+$",
    minLength: 1,
    maxLength: 255,
  }),
  lastModified: t.Number({
    minimum: 0,
    maximum: 2 ** 53 - 1,
  }),
});

export const FileModel = new Elysia()
  .model({ File: FileInfo })
  .model({ "File[]": t.Array(FileInfo) })
  .model({ S3File: t.Intersect([FileInfo, t.Object({ url: t.String() })]) })
  .model({ "S3File[]": t.Array(t.Intersect([FileInfo, t.Object({ url: t.String() })])) });
