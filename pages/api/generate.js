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
        prompt_template: `Suggest three names for an animal that is a superhero.
        Animal: Cat
        Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
        Animal: Dog
        Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
        Animal: {{animal}}
        Names:`,
        parameters: {
          temperature: 0.6,
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
  res.status(200).json({ result: data.logs[0].output });
}
