import { action, redirect } from "@solidjs/router";
import { $authenticate, $unauthenticate } from "./server";

export const authenticate = action(async (form: FormData) => {
  "use server";

  const username = String(form.get("username"));
  const password = String(form.get("password"));
  const pathname = form.get("redirect") ?? "/";

  await $authenticate(username, password);

  throw redirect(String(pathname));
});

export const unauthenticate = action(async () => {
  "use server";

  await $unauthenticate();

  throw redirect("/");
});
