import { useSession } from "vinxi/http";
import type { SessionData, SessionDataCredentials } from "./types";

export const getSession = async () => {
  "use server";

  return await useSession<SessionData>({
    name: "session",
    password: process.env.SESSION_SECRET,
  });
};

export const clearSession = async () => {
  "use server";

  const session = await getSession();

  await session.clear();
};

export const updateSession = async (credentials: SessionDataCredentials) => {
  "use server";

  const session = await getSession();

  await session.update(() => ({
    credentials: credentials,
  }));
};
