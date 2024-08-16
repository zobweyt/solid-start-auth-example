import {
  action,
  createAsync,
  redirect,
  RouteDefinition,
} from "@solidjs/router";
import { Show } from "solid-js";
import { getRequestEvent } from "solid-js/web";
import { updateSession } from "vinxi/http";
import { getUser } from "~/lib/app";
import { SESSION_COOKIE_OPTIONS } from "~/lib/auth";

const $logout = async () => {
  "use server";
  const event = getRequestEvent();

  if (event) {
    await updateSession(event.nativeEvent, SESSION_COOKIE_OPTIONS, () => ({
      auth: undefined,
    }));
  }

  throw redirect("/");
};

const logout = action(async () => {
  "use server";

  await $logout();
});

export const route = {
  preload: () => {
    getUser();
  },
} satisfies RouteDefinition;

export default function Settings() {
  const user = createAsync(() => getUser());

  return (
    <main class="max-w-md mx-auto my-8 text-center">
      <Show when={user()}>
        {(user) => (
          <>
            <h1>{user().name}</h1>
            <form action={logout} method="post">
              <button
                type="submit"
                class="py-2 px-8 rounded-md bg-violet-600 text-white"
              >
                Logout
              </button>
            </form>
          </>
        )}
      </Show>
    </main>
  );
}
