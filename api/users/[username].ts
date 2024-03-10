import type { VercelRequest, VercelResponse } from "@vercel/node";
import { User } from "../../models/User";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;
  const newData = req.body;

  try {
    const user = await User.findOneAndUpdate({ username }, newData, {
      upsert: true,
      new: true, // returns the updated document
    });

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
  return res.send(username);
}
