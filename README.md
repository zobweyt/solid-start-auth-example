# solid-start-auth-example

Open your terminal and run the following command to create a `.env` file and generate a `SESSION_SECRET`:

```bash
echo "SESSION_SECRET=\"$(head -c32 /dev/urandom | base64)\"" > .env
```

After creating the `.env` file, install the necessary project dependencies by running:

```
pnpm i
```

Finally, start the development server and open it in your default web browser with the following command:

```
pnpm dev -- --open
```
