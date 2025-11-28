export default async function handler(req, res) {
    const apiKey = process.env.GROQ_API_KEY;

  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { text } = req.body;

  if (!text || text.trim().length < 100) {
    return res.status(400).json({ error: "Escribe más de 100 caracteres" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        input: [
          { role: "system", content: "Eres un asistente amable y motivador." },
          { role: "user", content: text }
        ],
        temperature: 0.7,
        max_output_tokens: 300
      })
    });

    const data = await response.json();

    res.status(200).json({ output: data.output_text || "No se recibió respuesta de la IA" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
