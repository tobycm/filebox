import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

export const auth = createAuthClient({
  basePath: "/auth",
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [usernameClient()],
});

export type AuthClient = typeof auth;
