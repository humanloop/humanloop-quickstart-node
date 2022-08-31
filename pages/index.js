import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

function ThumbsUpButton({ feedback, handleFeedback }) {
  return (
    <button
      className={styles.feedback}
      style={{ backgroundColor: feedback === "👍" && "#10a37fbb" }}
      onClick={() => handleFeedback("👍")}
    >
      👍
    </button>
  );
}
function ThumbsDownButton({ feedback, handleFeedback }) {
  return (
    <button
      className={styles.feedback}
      style={{ backgroundColor: feedback === "👎" && "#ff5252bb" }}
      onClick={() => handleFeedback("👎")}
    >
      👎
    </button>
  );
}

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [logId, setLogId] = useState();
  const [feedback, setFeedback] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result.output);
    setLogId(data.result.id);
    setFeedback(null);
  }

  async function handleFeedback(feedback) {
    event.preventDefault();
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback: feedback, logId: logId }),
    });
    setFeedback(feedback);
  }

  return (
    <div>
      <Head>
        <title>OpenAI + Humanloop Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>

        {result && (
          <div className={styles.result}>
            {result}
            <ThumbsUpButton
              feedback={feedback}
              handleFeedback={handleFeedback}
            />
            <ThumbsDownButton
              feedback={feedback}
              handleFeedback={handleFeedback}
            />
          </div>
        )}
      </main>
    </div>
  );
}
