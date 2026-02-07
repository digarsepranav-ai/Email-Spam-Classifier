async function predict() {
  const message = document.getElementById("message").value;

  if (!message.trim()) {
    alert("Please enter a message");
    return;
  }

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Prediction text
    document.getElementById("prediction").innerText =
      data.prediction === "Spam" ? "🚨 SPAM MESSAGE" : "✅ NOT SPAM";

    // Probabilities
    document.getElementById("spamProb").innerText =
      data.spam_probability + "%";

    document.getElementById("hamProb").innerText =
      data.ham_probability + "%";

    // Metrics
    document.getElementById("accuracy").innerText =
      data.metrics.accuracy.toFixed(3);

    document.getElementById("precision").innerText =
      data.metrics.precision.toFixed(3);

    document.getElementById("recall").innerText =
      data.metrics.recall.toFixed(3);

    document.getElementById("f1").innerText =
      data.metrics.f1_score.toFixed(3);

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Check console.");
  }
}
