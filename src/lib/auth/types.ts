declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
    }
  }
}

export type SessionDataCredentials = {
  username: string;
  password: string;
};

export type SessionData = {
  credentials?: SessionDataCredentials;
};
