from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import os
import re

# Create Flask app and serve static files
app = Flask(__name__, static_folder="static")
CORS(app)

# Absolute path to model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "spam_model.pkl")

# Load model and metrics
saved = joblib.load(MODEL_PATH)
model = saved["model"]
metrics = saved["metrics"]

# Text cleaning function
def clean_txt(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

# Serve frontend
@app.route("/", methods=["GET"])
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

# Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    message = data.get("message", "")

    cleaned = clean_txt(message)
    pred = model.predict([cleaned])[0]
    proba = model.predict_proba([cleaned])[0]

    return jsonify({
        "prediction": "Spam" if pred == 1 else "Ham",
        "spam_probability": round(float(proba[1]) * 100, 2),
        "ham_probability": round(float(proba[0]) * 100, 2),
        "metrics": metrics
    })

# Run app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
