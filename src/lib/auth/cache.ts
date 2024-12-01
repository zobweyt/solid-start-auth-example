import { query } from "@solidjs/router";
import { getSession } from "./session";

export const getUsername = query(async () => {
  "use server";

  const session = await getSession();

  return session.data.credentials?.username;
}, "username");

export const getIsLoggedIn = query(async () => {
  "use server";

  const session = await getSession();

  // TODO: You can also check for session expiration here.
  return session.data.credentials !== undefined;
}, "isLoggedIn");
