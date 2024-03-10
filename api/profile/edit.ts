import type { VercelRequest, VercelResponse } from "@vercel/node";

import bcrypt from "bcrypt";
import { User } from "../../models/User";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { prevUsername, edittedUserData } = req.body;

  if (prevUsername !== edittedUserData.username) {
    const alreadyExists = await User.exists({
      username: edittedUserData.username,
    });
    if (alreadyExists) {
      return res.status(400).send("User Already Exists");
    }
  }

  try {
    await User.findOneAndUpdate({ username: prevUsername }, edittedUserData, {
      upsert: true,
      new: true, // returns the updated document
    });
    res.send("updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}
