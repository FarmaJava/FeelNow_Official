export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Sé un amigo empático y responde de forma amigable." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ output: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando respuesta" });
  }
}
