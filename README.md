# Recaply

## Beat Notification Overload

In the fast-paced world of digital communication, staying on top of important messages can be overwhelming. Introducing Recaply, your AI-powered assistant designed to distill the chaos into clarity.

Recaply seamlessly integrates with your favorite communication platforms such as Slack, Microsoft Teams, and others. Its advanced artificial intelligence scans through your messages, intelligently picking out the most crucial updates, decisions, and discussions.

Each day, Recaply compiles these key points into a concise, easy-to-read recap and delivers it straight to your inbox. Whether it's critical project updates, significant team decisions, or important announcements, Recaply ensures you never miss a beat. Say goodbye to information overload and hello to effortless productivity.

Stay informed, stay connected, and stay ahead with Recaply.

## Quick Start

> **Note**
> The [db](./packages/db) package is preconfigured to use Sqlite (hosted on Turso) with the [libsql](https://github.com/tursodatabase/libsql-client-ts) driver. If you're using something else, make the necessary modifications to the [schema](./packages/db/src/schema) as well as the [client](./packages/db/src/index.ts) and the [drizzle config](./packages/db/config.ts).

To get it running, follow the steps below:

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```

### 2a. When it's time to add a new UI component

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
pnpm ui-add
```

When the component(s) has been installed, you should be good to go and start using it in your app.

### 2b. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## References

The code base originates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).
