export default async function (req, res) {
  const completion = await fetch(
    "https://neostaging.humanloop.ml/models/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.HUMANLOOP_API_KEY,
      },
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt_template: `Suggest a name for an animal that is a superhero.
        Animal: Cat
        Name: Captain Sharpclaw
        Animal: Dog
        Name: Ruff the Protector
        Animal: {{animal}}
        Name:`,
        parameters: {
          temperature: 0.6,
          n: 1,
        },
        inputs: { animal: req.body.animal },
        source: "default",
        project: "openai-quickstart",
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
