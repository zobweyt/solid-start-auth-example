import { cache } from "@solidjs/router";

export const getUser = cache(async () => {
  "use server";

  return {
    name: "John Doe",
  };
}, "getUser");
