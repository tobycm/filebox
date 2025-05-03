import { createTransport } from "nodemailer";
import { yes } from "./utils";

const smtp = yes(process.env.SMTP_ENABLED)
  ? createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

export default smtp;
