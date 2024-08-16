import { action, redirect, useParams, useSearchParams } from "@solidjs/router";
import { Show } from "solid-js";
import { getRequestEvent } from "solid-js/web";
import { updateSession } from "vinxi/http";
import { SESSION_COOKIE_OPTIONS } from "~/lib/auth";

const $login = async (username: string, password: string) => {
  "use server";
  const event = getRequestEvent();

  if (event) {
    await updateSession(event.nativeEvent, SESSION_COOKIE_OPTIONS, () => ({
      auth: {
        username: username,
        password: password,
      },
    }));
  }
};

const login = action(async (form: FormData) => {
  "use server";

  const username = String(form.get("username"));
  const password = String(form.get("password"));
  const pathname = form.get("redirect") ?? "/";

  await $login(username, password);

  throw redirect(String(pathname));
});

export default function Auth() {
  const [params] = useSearchParams();

  return (
    <form action={login} method="post" class="max-w-md mx-auto my-8">
      <div class="flex flex-col gap-4">
        <input
          required
          type="username"
          name="username"
          placeholder="Enter your username..."
          class="border rounded-md py-2 px-4"
        />

        <input
          required
          type="password"
          name="password"
          placeholder="Enter your password..."
          class="border rounded-md py-2 px-4"
        />

        <Show when={params.redirect}>
          <input type="hidden" name="redirect" value={params.redirect} />
        </Show>

        <button
          type="submit"
          class="py-2 px-8 rounded-md bg-violet-600 text-white"
        >
          Login
        </button>
      </div>
    </form>
  );
}
