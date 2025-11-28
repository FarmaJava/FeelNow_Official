// /api/generate.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.responses.create({
      model: "openai/gpt-oss-120b",
      input: text,
    });

    res.status(200).json({ output: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando respuesta" });
  }
}
