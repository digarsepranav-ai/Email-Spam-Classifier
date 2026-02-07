async function predict() {
  const message = document.getElementById("message").value;

  if (!message.trim()) {
    alert("Please enter some text");
    return;
  }

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    document.getElementById("prediction").innerText =
      data.prediction === "Spam" ? "🚨 Spam Message" : "✅ Not Spam";

    document.getElementById("spamProb").innerText = data.spam_probability;
    document.getElementById("hamProb").innerText = data.ham_probability;

    document.getElementById("spamBar").style.width = data.spam_probability + "%";
    document.getElementById("hamBar").style.width = data.ham_probability + "%";

    document.getElementById("accuracy").innerText = data.metrics.accuracy.toFixed(3);
    document.getElementById("precision").innerText = data.metrics.precision.toFixed(3);
    document.getElementById("recall").innerText = data.metrics.recall.toFixed(3);
    document.getElementById("f1").innerText = data.metrics.f1_score.toFixed(3);

  } catch (err) {
    console.error(err);
    alert("Error calling backend. Check console.");
  }
}
