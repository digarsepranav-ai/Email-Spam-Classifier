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

    if (!response.ok) {
      throw new Error("Backend error");
    }

    const data = await response.json();

    if (!data.label) {
      throw new Error("Invalid response from server");
    }

    const predictionEl = document.getElementById("prediction");
    predictionEl.innerText = data.label;
    predictionEl.className = "prediction";

    const card = document.querySelector(".card");
    card.className = "card";

    if (data.label.includes("Spam")) {
      predictionEl.classList.add("spam");
      card.classList.add("spam");
    } else if (data.label.includes("Suspicious")) {
      predictionEl.classList.add("suspicious");
      card.classList.add("suspicious");
    } else {
      predictionEl.classList.add("ham");
      card.classList.add("ham");
    }

    document.getElementById("spamProb").innerText = data.spam_probability;
    document.getElementById("hamProb").innerText = data.ham_probability;

    document.getElementById("spamBar").style.width =
      data.spam_probability + "%";
    document.getElementById("hamBar").style.width =
      data.ham_probability + "%";

    document.getElementById("accuracy").innerText =
      data.metrics.accuracy.toFixed(3);
    document.getElementById("precision").innerText =
      data.metrics.precision.toFixed(3);
    document.getElementById("recall").innerText =
      data.metrics.recall.toFixed(3);
    document.getElementById("f1").innerText =
      data.metrics.f1_score.toFixed(3);

  } catch (err) {
    console.error(err);
    alert("Backend is waking up or unavailable. Please try again in a few seconds.");
  }
}
