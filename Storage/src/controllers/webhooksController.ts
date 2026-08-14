/* 
  When a new user signup on clerk on my app , user.created it receives the 
  webhook susbcription messages(Just Stay Url Updated While in Development Phase)
 */
import { Webhook } from "svix";
import { User } from "../models/userModel.js";
import type { Request, Response } from "express";
import { CLERK_WEBHOOK_SECRET_KEY } from "../config/index.js";
import type { UserJSON, WebhookEvent } from "@clerk/express";

interface ReceivedDataType {
  id: string;
  username: any;
  first_name: string;
  last_name: string;
  primary_email_address_id: string;
  created_at: number;
}

export const handleClerWebhook = async (req: Request, res: Response) => {
  //verify the signature
  console.log("request came");
  const headersPayload = req.headers;
  const svix_id = headersPayload["svix-id"] as string;
  const svix_timestamp = headersPayload["svix-timestamp"] as string;
  const svix_signature = headersPayload["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_timestamp) {
    console.log("i am if -else running");
    return res.json({ msg: "Svix Values Are missing" });
  }
  const payload = JSON.stringify(req.body); //this holds data
  // console.log(`payload: ${payload},headersPayload: ${headersPayload} `);
  const wh = new Webhook(CLERK_WEBHOOK_SECRET_KEY!);

  let evt: WebhookEvent;

  try {
    //wh.verify that is that request(dumb data) came from clerk , through signature (matching signature)
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    // wh.verify dumb data becomes WebhookEvent Type Object and ready to use event(eve)
  } catch (error) {
    console.error("Got Error While Verfying svix creds from clerk req", error);
    return res.status(400).json({ error: "Invalid signature" });
  }

  //5. act on verified datam & handle the "user.created" event
  if (evt.type === "user.created") {
    const data: UserJSON = evt.data;
    const { id, username, first_name, last_name, email_addresses, created_at } = data;

    // console.log("email_addresses:", email_addresses);

    // const emails = email_addresses.map((e) => e.email_address);
    const email = email_addresses[0]?.email_address;

    //   //storing the data
    if (!id || !email || !created_at) {
      console.log("id, email_addresses, created_at does not present from if-else");
      return res.status(400).json({
        error: "Missing required user fields",
      });
    }

    //apply indopentency by string svix id so double request could not make to db
    const isDataStored = await User.create({
      id: id,
      email: email,
      created_at: created_at,
    });

    

    return res.status(200).json({
      error: "Successfully user fields stored",
    });
  }
};
