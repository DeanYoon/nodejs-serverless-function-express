import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.body;
  return res.json({
    message: `Login ${name}!`,
  });
}
