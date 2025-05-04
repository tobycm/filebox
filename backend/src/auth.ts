import { betterAuth, BetterAuthPlugin } from "better-auth";
import { anonymous, magicLink, openAPI, username } from "better-auth/plugins";

import Elysia from "elysia";
import { Pool } from "pg";
import smtp from "./email";
import { yes } from "./utils";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not set");
}

const plugins: BetterAuthPlugin[] = [];

if (yes(process.env.ALLOW_ANONYMOUS))
  plugins.push(
    anonymous({
      emailDomainName: process.env.ANONYMOUS_EMAIL_DOMAIN_NAME,
    })
  );

if (yes(process.env.BETTER_AUTH_ENABLE_USERNAME))
  plugins.push(
    username({
      minUsernameLength: 2,
      usernameValidator(username) {
        if (username === "admin") {
          return false;
        }
        return true;
      },
    })
  );

if (yes(process.env.BETTER_AUTH_ENABLE_MAGIC_LINK))
  plugins.push(
    magicLink({
      async sendMagicLink(data, request) {
        if (!smtp) {
          throw new Error("SMTP is not enabled");
        }

        const { email, url } = data;

        await smtp.sendMail({
          from: process.env.SMTP_FROM || "Filebox <filebox@localhost>",
          to: email,
          subject: "Filebox - Magic Link",
          text: `Hello ${email},\n\nTo sign in, please use the link below:\n\n${url}\n\nIf you did not request this email, please ignore it.\n\nThank you,\nFilebox`,
        });
      },
    })
  );

export const auth = betterAuth({
  plugins: [openAPI(), ...plugins],

  appName: "filebox",
  account: {
    accountLinking: {
      enabled: true,
    },
  },

  trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") || [],

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

      await smtp.sendMail({
        from: process.env.SMTP_FROM || "Filebox <filebox@localhost>",
        to: user.email,

        subject: "Filebox - Reset your password",
        text: `Hello ${user.name},\n\nTo reset your password, please use the link below:\n\n${url}\n\nIf you did not request this email, please ignore it.\n\nThank you,\nFilebox`,
      });
    },
  },
  basePath: "/auth",
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  getPaths: (prefix = "/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

export const elysiaAuthMiddleware = new Elysia({ name: "better-auth" }).mount(auth.handler).macro({
  auth: {
    async resolve({ error, request: { headers } }) {
      const session = await auth.api.getSession({ headers });

      if (!session) return error(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});
