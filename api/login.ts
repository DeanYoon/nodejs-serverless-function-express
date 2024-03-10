import type { VercelRequest, VercelResponse } from "@vercel/node";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      if (password && user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        isMatch
          ? res.status(200).send(user)
          : res.status(500).send("Wrong Password");
      }
    } else {
      res.status(500).send("User not exists");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}
