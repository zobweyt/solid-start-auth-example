import { action, redirect } from "@solidjs/router";
import { clearSession, updateSession } from "./session";

export const login = action(async (form: FormData) => {
  "use server";

  const username = String(form.get("username"));
  const password = String(form.get("password"));
  const pathname = String(form.get("redirect") ?? "/");

  await updateSession({ username, password });

  throw redirect(pathname);
});

export const logout = action(async () => {
  "use server";

  await clearSession();

  throw redirect("/");
});
