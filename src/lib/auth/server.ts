import { cache, redirect } from "@solidjs/router";
import { changeSession, getSession } from "./session";

export const $authenticate = async (username: string, password: string) => {
  "use server";

  const data = {
    auth: {
      username: username,
      password: password,
    },
  };

  await changeSession(data);
};

export const $unauthenticate = async () => {
  "use server";

  const data = {
    auth: undefined,
  };

  await changeSession(data);

  throw redirect("/");
};

export const $isAuthenticated = cache(async () => {
  "use server";

  const session = await getSession();

  return session.data.auth !== undefined;
}, "isAuthenticated");

export const $ensureIsAuthenticated = cache(async (pathname: string) => {
  "use server";

  if (!(await $isAuthenticated())) {
    throw redirect(pathname || "/");
  }
}, "ensureIsAuthenticated");

export const $ensureIsUnauthenticated = cache(async (pathname: string) => {
  "use server";

  if (await $isAuthenticated()) {
    throw redirect(pathname || "/");
  }
}, "ensureIsAuthenticated");
