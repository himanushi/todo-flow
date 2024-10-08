export const t2t = async (text: string): Promise<string> => {
  const apiKey = localStorage.getItem("openai-api-key");
  if (!apiKey) {
    throw new Error("API key is not set");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: text }],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from OpenAI API");
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
