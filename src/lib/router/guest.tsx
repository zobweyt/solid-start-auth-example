import {
  createAsync,
  Navigate,
  RouteSectionProps,
  useSearchParams,
} from "@solidjs/router";
import { JSX, Match, Switch } from "solid-js";
import { getIsLoggedIn } from "~/lib/auth/cache";

export function guest(
  children: (props: RouteSectionProps) => JSX.Element,
  fallback: string = "/settings"
) {
  return (props: RouteSectionProps) => {
    const [params] = useSearchParams();

    const isLoggedIn = createAsync(() => getIsLoggedIn(), {
      deferStream: true,
    });

    return (
      <Switch>
        <Match when={isLoggedIn() === false}>{children(props)}</Match>
        <Match when={isLoggedIn() === true}>
          <Switch>
            <Match when={typeof params.redirect === "string"}>
              <Navigate href={params.redirect as string} />
            </Match>
            <Match when={typeof params.redirect !== "string"}>
              <Navigate href={fallback} />
            </Match>
          </Switch>
        </Match>
      </Switch>
    );
  };
}
