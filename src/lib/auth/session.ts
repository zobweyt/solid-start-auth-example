import { getRequestEvent } from "solid-js/web";
import { updateSession, useSession } from "vinxi/http";

export const SESSION_COOKIE_OPTIONS = {
  password: "thisisadummysessionsecretverylongbutnotgood",
  maxAge: 24 * 60 * 60,
};

export type SessionData = {
  auth?: {
    username: string;
    password: string;
  };
};

export const getSession = async () => {
  return await useSession<SessionData>(SESSION_COOKIE_OPTIONS);
};

export const changeSession = async (data: SessionData) => {
  const event = getRequestEvent();

  if (event) {
    await updateSession(event.nativeEvent, SESSION_COOKIE_OPTIONS, () => data);
  }
};
