import type { Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { User } from "../models/userModel.js";
import { FileStore } from "../models/snsModels.js";
const getDashboardController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

        if (!userId) {
          return res.json({ msg: `Please Sign-in First` });
        }

        const user = await clerkClient.users.getUser(userId);

        const fileData = await FileStore.find(
          { userId: userId },
          {
            originalObjName: 1,
            objUniqueName: 1,
            objFileType: 1,
            objSize: 1,
          },
        );
        console.log("user", fileData);
        // return res.json({ msg: `Dashboard Data : ${user}`, userData: user });
    return res.json({ userDataObj: user, fileData });
};
export default getDashboardController;
