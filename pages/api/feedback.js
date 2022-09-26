export default async function (req, res) {
  const response = await fetch("https://api.humanloop.com/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.HUMANLOOP_API_KEY,
    },
    body: JSON.stringify({
      log_id: req.body.logId,
      label: req.body.label,
      group: req.body.group,
      project: req.body.project,
    }),
  });
  console.log(
    JSON.stringify({
      log_id: req.body.logId,
      label: req.body.label,
      group: req.body.group,
      project: req.body.project,
    })
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  res.status(200).json({ result: data });
}
