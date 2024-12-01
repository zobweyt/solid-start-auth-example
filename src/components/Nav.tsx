import { A } from "@solidjs/router";

export default function Nav() {
  return (
    <nav class="bg-sky-800">
      <ul class="container mx-auto flex items-center px-4 pt-3 pb-4 text-gray-200 gap-8">
        <li>
          <A
            end
            href="/"
            class="hover:underline underline-offset-8"
            activeClass="underline"
          >
            Home
          </A>
        </li>
        <li>
          <A
            end
            href="/settings"
            class="hover:underline underline-offset-8"
            activeClass="underline"
          >
            Settings
          </A>
        </li>
        <li>
          <A
            end
            href="/login"
            class="hover:underline underline-offset-8"
            activeClass="underline"
          >
            Login
          </A>
        </li>
      </ul>
    </nav>
  );
}
