import {
  createAsync,
  Navigate,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { onCleanup } from "solid-js";
import { Match, Switch } from "solid-js/web";
import { createEnsureIsAuthenticated } from "~/lib/auth/create";
import { $isAuthenticated } from "~/lib/auth/server";

export const route = {
  preload: () => {
    $isAuthenticated();
  },
} satisfies RouteDefinition;

export default function Authenticated(props: RouteSectionProps) {
  const isAuthenticated = createAsync(() => $isAuthenticated(), {
    deferStream: true,
  });

  console.info("<Authenticated /> body")
  onCleanup(() => console.info("<Authenticated /> cleanup"))

  return (
    <Switch>
      <Match when={isAuthenticated() === true}>{props.children}</Match>
      <Match when={isAuthenticated() === false}>
        <Navigate
          href={`/login?redirect=${encodeURIComponent(
            props.location.pathname
          )}`}
        />
      </Match>
    </Switch>
  );
}

// * This approach will temporarily display the route's contents to the user.
// export const route = {
//   preload: ({ location }) => {
//     createEnsureIsAuthenticated(
//       `/login?redirect=${encodeURIComponent(location.pathname)}`
//     );
//   },
// } satisfies RouteDefinition;

// export default function Authenticated(props: RouteSectionProps) {
//   return props.children;
// }
