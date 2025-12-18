# NextCash

## Clerk

[site](clerk.com)

```sh
pnpm add @clerk/nextjs
```

## Drizzle

[docs](https://orm.drizzle.team/docs/get-started/neon-new)

```sh
npx drizzle-kit push
```

```ts
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```
