import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as auth from "./schema/auth";
import * as post from "./schema/post";
import { dbCreds } from "./config";

export * from "drizzle-orm/sql";

export const schema = { ...auth, ...post };

const client = createClient({
	...dbCreds,
});
export const db = drizzle(client, { schema });
export type Database = typeof db;
