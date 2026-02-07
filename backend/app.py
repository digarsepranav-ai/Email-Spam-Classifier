from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import os


app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "spam_model.pkl")

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "spam_model.pkl")

saved = joblib.load(MODEL_PATH)

model = saved["model"]
metrics = saved["metrics"]

def clean_txt(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

app = Flask(__name__)
CORS(app)
