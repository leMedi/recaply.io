import { sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/mysql-core";

import {
	idAutoIncrementPrimaryKey,
	mySqlLiteTable,
	timestampColumns,
} from "./_table";
import { text } from "drizzle-orm/sqlite-core";

export const post = mySqlLiteTable("post", {
	id: idAutoIncrementPrimaryKey("id"),
	title: text("name", { length: 256 }).notNull(),
	content: text("content", { length: 256 }).notNull(),

	...timestampColumns,
});
