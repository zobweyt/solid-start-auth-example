import { createAsync } from "@solidjs/router";
import { $ensureIsAuthenticated, $ensureIsUnauthenticated } from "./server";

export const createEnsureIsAuthenticated = (redirect: string) => {
  createAsync(() => $ensureIsAuthenticated(redirect), { deferStream: true });
};

export const createEnsureIsUnauthenticated = (redirect: string) => {
  createAsync(() => $ensureIsUnauthenticated(redirect), { deferStream: true });
};
