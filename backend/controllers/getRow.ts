import { Request, Response } from "express";
import { db } from "../db/connection";
import { Tables, Feilds } from "../db/schema";
import { sql } from "drizzle-orm";

const getRow = async (req: Request, res: Response) => {
  const tableName = req.body.tableName;
  const condition = req.body.condition as { [k: string]: any };

  const query = `select * from ${tableName} where ${
    Object.keys(condition)[0]
  }='${Object.values(condition)[0]}';`;

  const result = await db.execute(sql.raw(query));

  return res.status(200).json({
    row: result.rows[0],
  });
};

export default getRow;
