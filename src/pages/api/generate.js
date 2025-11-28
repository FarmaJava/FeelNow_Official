import OpenAI from "openai";

export default async function handler(req, res) {
      console.log("Método recibido:", req.method); // <--- log
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text provided" });
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY, // ✅ Tu key en Vercel
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.responses.create({
      model: "openai/gpt-oss-20b", // puedes cambiar al modelo que tengas disponible
      input: text,
    });

    // Devuelve siempre JSON válido
    res.status(200).json({ output: response.output_text || "" });
  } catch (error) {
    console.error("Error en serverless:", error);

    // Enviar JSON incluso si hay error
    res.status(500).json({
      error: "Error generando respuesta",
      message: error.message,
    });
  }
}
