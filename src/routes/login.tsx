import { useSearchParams } from "@solidjs/router";
import { Show } from "solid-js";
import { login } from "~/lib/auth";
import { guest } from "~/lib/router";

export default guest(() => {
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
          class="py-2 px-8 rounded-md bg-violet-600 hover:bg-violet-700 text-white"
        >
          Login
        </button>
      </div>
    </form>
  );
});
