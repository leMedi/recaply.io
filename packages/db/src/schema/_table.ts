import { integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM.
 * Use the same database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mySqlLiteTable = sqliteTableCreator((name) => `recaply_${name}`);
export const idStr = (name: string) => text(name, { length: 255 });
export const idNumber = (name: string) => integer(name, { mode: "number" });

export const idStrPrimaryKey = (name: string) =>
	idStr(name).primaryKey().notNull();
export const idAutoIncrementPrimaryKey = (name: string) =>
	idNumber(name).primaryKey({ autoIncrement: true }).notNull();

export const sqlDateCol = (name: string) =>
	integer(name, { mode: "timestamp" });
export const sqlBooleanCol = (name: string) =>
	integer(name, { mode: "boolean" });
export const sqlJsonCol = (name: string) => text(name, { mode: "json" });

export const sqlCreatedAtCol = (name = "created_at") =>
	sqlDateCol(name)
		.notNull()
		.$defaultFn(() => new Date());
export const sqlUpdatedAtCol = (name = "updated_at") =>
	sqlDateCol(name)
		.notNull()
		.$defaultFn(() => new Date());

export const timestampColumns = {
	deletedAt: sqlDateCol("deleted_at"),
	createdAt: sqlCreatedAtCol(),
	updatedAt: sqlUpdatedAtCol(),
};
