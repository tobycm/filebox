import { betterAuth } from "better-auth";

import { Pool } from "pg";
import smtp from "./email";
import { yes } from "./utils";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not set");
}

export const auth = betterAuth({
  appName: "filebox",
  account: {
    accountLinking: {
      enabled: true,
    },
  },

  database: new Pool({
    connectionString: process.env.POSTGRES_URL,
  }),

  emailAndPassword: {
    enabled: yes(process.env.BETTER_AUTH_ENABLE_EMAIL),
    autoSignIn: yes(process.env.BETTER_AUTH_AUTO_SIGN_IN),
    minPasswordLength: parseInt(process.env.BETTER_AUTH_MIN_PASSWORD_LENGTH || "6", 10),
    maxPasswordLength: parseInt(process.env.BETTER_AUTH_MAX_PASSWORD_LENGTH || "64", 10),
    requireEmailVerification: yes(process.env.BETTER_AUTH_REQUIRE_EMAIL_VERIFICATION),
    async sendResetPassword(data, request) {
      if (!smtp) {
        throw new Error("SMTP is not enabled");
      }

      const { user, url } = data;

      smtp.sendMail({
        from: process.env.SMTP_FROM || "Filebox <filebox@localhost>",
        to: user.email,
        subject: "Filebox - Reset your password",
        text: `Hello ${user.name},\n\nTo reset your password, please click the link below:\n\n${url}\n\nIf you did not request this email, please ignore it.\n\nThank you,\nFilebox`,
      });
    },
  },
});
