import type { Request, Response } from "express";
import { s3Client } from "../utils/s3client.js";
import { ListBucketsCommand, PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET_NAME } from "../config/index.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { FileStore } from "../models/snsModels.js";
import path from "path";
import { getAuth } from "@clerk/express";

/* 1. GET THE FILE NAME ,
2. make uniqure filename(id/file_name+uuid)  */

// const getUniqueStoredName = () => {};
type paramsTypes = {
  id: string;
  original_name: string;
};

const preSignedUrlFn = async (objPath: string) => {
  const command = new PutObjectCommand({
    Bucket: `${BUCKET_NAME}`,
    Key: `${objPath}`,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  console.log("generate name : ", objPath);
  // return { preSignedUrl, objPath };
};

const s3StoreDataInit = async (req: Request, res: Response) => {
  console.log("triggerend by frontend", req.userId);
  const file = await req.body;
  // console.log("file", file);
  const { name, type, size } = file;
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ msg: "Please SignIn" });
  }
  // const { mime } = await req.body; //id, original name , description
  // const { id, original_name } = mime;

  // const objExtension = path.extname(original_name);
  // const objType = original_name.type;

  // console.log("original_name:", original_name);
  //make unique names
  const objUniqueName = uuid(); //store also this unique name
  const objPath = `${userId}/${objUniqueName}`;

  const preSignedUrl = await preSignedUrlFn(objPath);
  // console.log('presignedurl', preSignedUrl);

  await FileStore.create({  
    userId,
    objPath,
    objUniqueName,
    originalObjName: name,
    objFileType: type,
    objSize: size,
    status: "pending",
  });

  return res.status(200).json({ preSignedUrl: preSignedUrl });
};

export default s3StoreDataInit;
