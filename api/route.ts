import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function GET(req: VercelRequest, res: VercelResponse) {
  const { name } = req.query;
  return res.json({
    message: `Hello ${name}!`,
  });
}
