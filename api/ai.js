import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { text } = req.body;

    if (!text || text.length < 20) {
      return res.status(400).json({ error: "Texto inválido" });
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
            "Escribe respuestas empáticas, breves y cercanas que ayuden al usuario a reflexionar.",
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
    console.error("API error:", error);
    res.status(500).json({ error: "Error generando respuesta" });
  }
}
