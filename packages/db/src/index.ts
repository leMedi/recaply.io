import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { dbCreds } from "./config";
import * as auth from "./schema/auth";
import * as contexts from "./schema/contexts";
import * as providers from "./schema/providers";

export * from "drizzle-orm/sql";

export const schema = { ...auth, ...providers, ...contexts };

const client = createClient({
	...dbCreds,
});
export const db = drizzle(client, { schema });
export type Database = typeof db;

export default { ...providers, ...contexts };
