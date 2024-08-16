import { cache } from "@solidjs/router";
import { getSession } from "./auth/session";

export const getUser = cache(async () => {
  "use server";

  const session = await getSession();

  return {
    name: session.data.auth?.username,
  };
}, "getUser");
