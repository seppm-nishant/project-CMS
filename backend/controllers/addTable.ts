import { Request, Response, NextFunction } from "express";
import { Tables, Feilds } from "../db/schema";
import { db } from "../db/connection";
import { sql } from "drizzle-orm";

const addTable = async (req: Request, res: Response) => {
  const tableName = req.body.tableName;
  const fields: (typeof Feilds.$inferInsert)[] = req.body.fields;

  const query = await db.transaction(async (tx) => {
    const table = await tx
      .insert(Tables)
      .values({ name: tableName })
      .returning();

    await tx
      .insert(Feilds)
      .values(fields.map((field) => ({ ...field, tableId: table[0].id })));

    // now creating sql query to create the requested table
    const attributes = fields.map((field) => {
      return (
        field.name +
        " " +
        field.type +
        " " +
        (field.isPrimary ? "primary key" : "")
      );
    });

    return `create table ${tableName} (${attributes.join(" ,")});`;
  });

  console.log(query);
  await db.execute(sql.raw(query));

  return res.status(200).json({ query });
};

export default addTable;
