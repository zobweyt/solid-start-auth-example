import {
  createAsync,
  Navigate,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { Show } from "solid-js/web";
import { $isLoggedIn } from "~/lib/auth";

export const route = {
  preload: () => {
    $isLoggedIn();
  },
} satisfies RouteDefinition;

export default function Unauthenticated(props: RouteSectionProps) {
  const isLoggedIn = createAsync(() => $isLoggedIn());

  return (
    <Show when={!isLoggedIn()} fallback={<Navigate href={`/settings`} />}>
      {props.children}
    </Show>
  );
}
