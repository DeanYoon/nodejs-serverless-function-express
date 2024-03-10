import type { VercelRequest, VercelResponse } from "@vercel/node";
import { User } from "../models/User";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(201).send(user);
    } else {
      res.status(500).send("User not exists");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}
