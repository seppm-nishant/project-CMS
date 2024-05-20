import { Request, Response } from "express";
import { db } from "../db/connection";
import { Tables } from "../db/schema";

const getTables = async (req: Request, res: Response) => {
  let tables = await db.select().from(Tables);

  return res.status(200).json({ tables });
};

export default getTables;
