import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../db/connection";

const removeRow = async (req: Request, res: Response) => {
  const tableName = req.body.tableName;
  const condition = req.body.condition as { [k: string]: any };

  const query = `delete from ${tableName} where ${
    Object.keys(condition)[0]
  } = '${Object.values(condition)[0]}';`;

  console.log(query);

  const result = await db.execute(sql.raw(query));

  return res.status(200).json({ result });
};

export default removeRow;
