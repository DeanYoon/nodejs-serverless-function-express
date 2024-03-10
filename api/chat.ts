import type { VercelRequest, VercelResponse } from "@vercel/node";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { data, category } = req.body;

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: category },
      { role: "user", content: data },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 100,
  });

  res.send(response.choices[0].message.content);
}
