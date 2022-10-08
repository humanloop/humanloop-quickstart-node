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

function CopyButton({handleCopy }) {
  return (
    <button
      className={styles.copy}
      onClick={() => handleCopy("📋")}
    >
      📋
    </button>
  );
}

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
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
      body: JSON.stringify({ question: questionInput }),
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
      body: JSON.stringify({ label: feedback, group: "feedback", logId: logId }),
    });
    setFeedback(feedback);
  }

    async function handleCopy(label) {
    event.preventDefault();
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: label, group: "implicit", logId: logId }),
    });
    alert("Copied to clipboard")
  }

  return (
    <div>

      <main className={styles.main}>
        <img src="/pg.jpeg" className={styles.img} />
        <h3>Ask PG</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Ask a question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Generate advice" />
        </form>

        {result && (
          <div className={styles.result}>
            <div className={styles.text}>
              {result}
              <div className={styles.text}>
                <CopyButton
                  handleCopy={handleCopy}
                />
              </div>
            </div>
            <div className={styles.buttons}>
              <ThumbsUpButton
                feedback={feedback}
                handleFeedback={handleFeedback}
              />
              <ThumbsDownButton
                feedback={feedback}
                handleFeedback={handleFeedback}
              />
           </div>
          </div>
        )}
      </main>
    </div>
  );
}
