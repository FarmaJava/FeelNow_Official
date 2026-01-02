export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const response = await fetch(
      "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom,life,inspirational",
      {
        headers: {
          "X-Api-Key": process.env.NINJA_API_KEY,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo la frase" });
  }
}
