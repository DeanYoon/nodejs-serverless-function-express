import type { VercelRequest, VercelResponse } from "@vercel/node";
import { User } from "../models/User";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username, newData } = req.body;

  try {
    const user = await User.exists({ username });
    if (user) {
      res.status(500).send("User Exists");
    } else if (!user) {
      const user = await User.findOneAndUpdate({ username }, newData, {
        upsert: true,
        new: true, // returns the updated document
      });
      res.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}
