import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../db/connection";
import { Feilds, Tables } from "../db/schema";

const removeTable = async (req: Request, res: Response) => {
  let tableName = req.body.tableName;

  await db.transaction(async (tx) => {
    await tx.execute(sql.raw(`drop table ${tableName};`));

    const table = await tx
      .select()
      .from(Tables)
      .where(eq(Tables.name, tableName));

    await tx.delete(Feilds).where(eq(Feilds.tableId, table[0].id));

    await tx.delete(Tables).where(eq(Tables.name, tableName));
  });

  return res.status(200).json({ message: "removed table" });
};

export default removeTable;
