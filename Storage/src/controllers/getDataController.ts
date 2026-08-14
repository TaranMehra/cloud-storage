import type { Request, Response } from "express";
const getDataController = async (req: Request, res: Response) => {
  return res.json({ msg: "hello contrler" });
};
export default getDataController;
