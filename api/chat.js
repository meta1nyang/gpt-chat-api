export default async function handler(req, res) {
  const { message, characterName, characterDesc } = req.body;

  const prompt = `너는 ${characterName}라는 캐릭터야. 성격은 ${characterDesc}야. 아래는 유저와의 대화야:\n\n유저: ${message}\n${characterName}:`;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.8
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices?.[0]?.text?.trim() || "..." });
}
