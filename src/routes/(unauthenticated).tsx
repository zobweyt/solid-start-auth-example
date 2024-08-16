import {
  createAsync,
  Navigate,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { Match, Suspense, Switch } from "solid-js/web";
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
    <Suspense>
      <Switch>
        <Match when={isAuthenticated() === false}>{props.children}</Match>
        <Match when={isAuthenticated()}>
          <Navigate href="/settings" />
        </Match>
      </Switch>
    </Suspense>
  );
}
