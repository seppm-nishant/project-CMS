import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../db/connection";

const addRow = async (req: Request, res: Response) => {
  const tableName = req.body.tableName;
  const values = req.body.values as {};

  console.log(values);

  let query = `insert into ${tableName} (${Object.keys(values).join(
    " ,"
  )}) values ('${Object.values(values).join("' ,'")}');`;

  console.log(query);

  let result = await db.execute(sql.raw(query));

  return res.status(200).json({
    message: query,
    result,
  });
};

export default addRow;
