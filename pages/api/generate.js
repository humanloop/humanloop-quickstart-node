
export default async function (req, res) {
  const completion = await fetch(
    "https://api.humanloop.com/models/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.HUMANLOOP_API_KEY,
      },
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt_template: `Answer the question like Paul Graham from YCombinator.
Question: How do I know if I am ready for launch?
Answer: You should have launched already###
Question: How quickly should I scale my team? 
Answer: Spend little and get Ramen profitable before scaling the team###
Question: {{question}}
Answer:`,
        parameters: {
          temperature: 0.6,
          n: 1,
          max_tokens: 100,
          stop: "###"
        },
        inputs: { question: req.body.question },
        source: "test-app",
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
