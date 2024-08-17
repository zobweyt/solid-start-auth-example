import {
  createAsync,
  Navigate,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { $isAuthenticated } from "~/lib/auth/server";

export const route = {
  preload: () => {
    $isAuthenticated();
  },
} satisfies RouteDefinition;

export default function Unauthenticated(props: RouteSectionProps) {
  const isAuthenticated = createAsync(() => $isAuthenticated(), {
    deferStream: true,
  });

  return (
    <Switch>
      <Match when={isAuthenticated() === false}>{props.children}</Match>
      <Match when={isAuthenticated() === true}>
        <Navigate href="/settings" />
      </Match>
    </Switch>
  );
}

// * This approach will temporarily display the route's contents to the user.
// export const route = {
//   preload: () => {
//     $isAuthenticated();
//     $ensureIsUnauthenticated(`/settings`);
//   },
// } satisfies RouteDefinition;

// export default function Authenticated(props: RouteSectionProps) {
//   return props.children;
// }
