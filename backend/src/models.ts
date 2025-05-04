import Elysia, { t } from "elysia";

const FilenameSchema = t.String({
  pattern: "^(?!.*\\.\\.)(?!.*\\.$)[a-z0-9._-]+(?:\\.[a-z0-9]{1,10})?$",
  minLength: 1,
  maxLength: 175,
});

const FolderPathSchema = t.String({
  pattern: "^\\/(?:[a-z0-9._-]+(?<!\\.)\\/)*$",
  maxLength: 200,
});

const MimeTypeSchema = t.String({
  pattern: "^[a-z0-9]+/[a-z0-9+.-]+$",
  minLength: 1,
  maxLength: 255,
});

const FileSizeSchema = t.Number({
  minimum: 0,
  maximum: 1024 * 1024 * 1024 * 1024, // 1TB
});

const FileUnixTimeSchema = t.Number({
  minimum: 0,
  maximum: 2 ** 53 - 1,
});

export const FileSchema = t.Object({
  path: FolderPathSchema,
  name: FilenameSchema,
  size: FileSizeSchema,
  type: MimeTypeSchema,
  lastModified: FileUnixTimeSchema,
});

export const FileModel = new Elysia()
  .model({ File: FileSchema })
  .model({ "File[]": t.Array(FileSchema) })
  .model({ S3File: t.Intersect([FileSchema, t.Object({ url: t.String() })]) })
  .model({ "S3File[]": t.Array(t.Intersect([FileSchema, t.Object({ url: t.String() })])) });
