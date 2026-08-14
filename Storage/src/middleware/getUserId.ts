import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export const getUserIdFn = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  req.userId = userId;
  next();
};
// import { getAuth } from "@clerk/express";
// import type { Request, Response, NextFunction } from "express";

// export const getUserIdFn = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId } = getAuth(req);

//   req.userId = userId;

//   next();
// };
