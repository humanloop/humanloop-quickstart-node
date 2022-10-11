
export default async function (req, res) {
  const completion = await fetch(
    "https://api.humanloop.com/v1/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.HUMANLOOP_API_KEY,
      },
      body: JSON.stringify({
        inputs: { question: req.body.question },
        project: "ask-paul-graham",
        provider_api_keys: {
          OpenAI: process.env.OPENAI_API_KEY,
        },
      }),
    }
  );

  const data = await completion.json();
  console.log(JSON.stringify(data, null, 2));
  res.status(200).json({ result: data.logs[0] });
}
