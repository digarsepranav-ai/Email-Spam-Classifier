async function predict() {
    const message = document.getElementById("message").value;

    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("prediction").innerText =
        data.prediction === "Spam" ? "🚨 Spam Message" : "✅ Not Spam";

    // Animate bars
    document.getElementById("spam-bar").style.width = data.spam_probability + "%";
    document.getElementById("ham-bar").style.width = data.ham_probability + "%";

    // Metrics
    document.getElementById("accuracy").innerText = data.metrics.accuracy.toFixed(3);
    document.getElementById("precision").innerText = data.metrics.precision.toFixed(3);
    document.getElementById("recall").innerText = data.metrics.recall.toFixed(3);
    document.getElementById("f1").innerText = data.metrics.f1_score.toFixed(3);
}
