import type { Request, Response } from "express";
import { s3Client } from "../utils/s3client.js";
import { ListBucketsCommand, PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET_NAME } from "../config/index.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

import { subscriptionConfirmedFn } from "../config/callbacks.js";
import { FileStore } from "../models/snsModels.js";

/* 1. GET THE FILE NAME ,
2. make uniqure filename(id/file_name+uuid)  */

// const getUniqueStoredName = () => {};
// type paramsTypes = {
//   id: string;
//   original_name: string;
// };

// //get presigned url to show files to user
// const preSignedUrlFn = async (storageUniqueName: string) => {
//   const command = new PutObjectCommand({
//     Bucket: `${BUCKET_NAME}`,
//     Key: `${storageUniqueName}`,
//   });
//   return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//   console.log("generate name : ", storageUniqueName);
//   // return { preSignedUrl, storageUniqueName };
// };

const s3SnsReceiver = async (req: Request, res: Response) => {
  const jsonBody = JSON.parse(req.body);
  console.log("jsonpare", jsonBody);
  //sometimes required to parse inner data again and again untill don't get
  if (jsonBody.Type === "SubscriptionConfirmation") {
    await subscriptionConfirmedFn(jsonBody.SubscribeURL);
  }

//   console.log("From outSite Notification.1", jsonBody.Type);

  if (jsonBody.Type === "Notification") {
    console.log("From inside Notification");
    const { MessageId, TopicArn, Subject, Message, Timestamp, Signature } = jsonBody;
    const parsedMessage = JSON.parse(Message);
    const records = parsedMessage.Records[0];
    // const parseMessage = Message;
    const { eventName, eventTime, s3 } = records;
    const { configurationId, bucket, object } = s3;
    const { key, size, eTag } = object;
    const { name, arn } = bucket;

    console.log(`eventName: ${eventName}, eventTime:${eventTime}`);
    console.log(`object['key']: ${key}, object_size:${size}, object_eTag:${eTag}`);
    console.log(`bucketName: ${name}, bucketArn:${arn}`);

    const storageUniqueName = key;

    await FileStore.findOneAndUpdate(
      { storageUniqueName },
      {
        $set: {
          MessageId,
          Timestamp,
          eventName,
          eventTime,
            // snsName: configu
          bucketName: name,
          objSize: size,
          objName: key,
          objPath: key,
          status: "success",
        },
      },
      { new: true },
    );
  }
  //   console.log(body.Type);
  //confirming using axios

  return res.status(200).json({ msg: "working guyes" });
  //send updated file url to see changes to user
  //   return res.status(200).json({ msg: `Upload ${storageUniqueName}`, preSignedUrl: preSignedUrl });
};

export default s3SnsReceiver;
