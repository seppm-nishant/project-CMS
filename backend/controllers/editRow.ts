import { Request, Response } from "express";
import { Tables, Feilds } from "../db/schema";
import { db } from "../db/connection";
import { sql } from "drizzle-orm";

const editRow = async (req: Request, res: Response) => {
  const tableName = req.body.tableName;
  const condition = req.body.condition as {}; // {primary_key_field: value}
  const updates: Record<string, any> = req.body.updates as Record<string, any>; // {field1: val1, field2: val2, ...}

  const query = `update ${tableName} set ${Object.keys(updates)
    .map((k) => `${k}='${updates[k]}'`)
    .join(" ,")} where ${Object.keys(condition)[0]} = '${
    Object.values(condition)[0]
  }';`;

  const result = await db.execute(sql.raw(query));

  res.status(200).json({ result });
};

export default editRow;
