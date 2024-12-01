import { createAsync } from "@solidjs/router";
import { getUsername, logout } from "~/lib/auth";
import { protect } from "~/lib/router";

export default protect(() => {
  const username = createAsync(() => getUsername());

  return (
    <main class="max-w-md mx-auto my-8 text-center">
      <h1 class="mb-4">{username()}</h1>
      <form action={logout} method="post">
        <button
          type="submit"
          class="py-2 px-8 rounded-md bg-violet-600 hover:bg-violet-700 text-white"
        >
          Logout
        </button>
      </form>
    </main>
  );
});
