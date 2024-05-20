import { NextFunction, Request, Response } from "express";
import { Tables, Feilds } from "../db/schema";
import { db } from "../db/connection";
import { eq, sql } from "drizzle-orm";

const getRows = async (req: Request, res: Response, next: NextFunction) => {
  const tableName = req.params.tableName;

  try {
    const records = (await db.execute(sql.raw(`select * from ${tableName};`)))
      .rows;

    const tableStructure = await db
      .select({
        id: Feilds.id,
        name: Feilds.name,
        title: Feilds.title,
        isPrimary: Feilds.isPrimary,
        type: Feilds.type,
        tableId: Feilds.tableId,
      })
      .from(Tables)
      .leftJoin(Feilds, eq(Tables.id, Feilds.tableId))
      .where(eq(Tables.name, tableName));

    return res.status(200).json({ records, tableStructure });
  } catch (error) {
    next(error);
  }
};

export default getRows;
