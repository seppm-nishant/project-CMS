import { Request, Response, NextFunction } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Hello I got your request! ${req.method} ${req.path}`);
  next();
};

export default logMiddleware;
