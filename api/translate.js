import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Texto requerido" });
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-safeguard-20b",
      messages: [
        {
          role: "system",
          content:
            "Eres un traductor experto que traduce textos al español de forma clara y natural.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 1,
    });

    res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al traducir" });
  }
}
