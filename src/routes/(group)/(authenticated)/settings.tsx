import { createAsync, RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { getUser } from "~/lib/app";
import { unauthenticate } from "~/lib/auth/actions";

export const route = {
  preload: () => {
    getUser();
  },
} satisfies RouteDefinition;

export default function Settings() {
  const user = createAsync(() => getUser(), { deferStream: true });

  return (
    <main class="max-w-md mx-auto my-8 text-center">
      <Show when={user()}>
        {(user) => (
          <>
            <h1>{user().name}</h1>
            <form action={unauthenticate} method="post">
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
