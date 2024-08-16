import { cache } from "@solidjs/router";
import { useSession } from "vinxi/http";

export const SESSION_COOKIE_OPTIONS = {
  password: "thisisadummysessionsecretverylongbutnotgood",
  maxAge: 24 * 60 * 60,
};

export type SessionData = {
  auth?: {
    username: string;
    password: string;
  };
};

export const getSession = async () => {
  return await useSession<SessionData>(SESSION_COOKIE_OPTIONS);
};

export const $isLoggedIn = cache(async () => {
  "use server";

  return (await getSession()).data.auth !== undefined;
}, "isLoggedIn");
