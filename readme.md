# 📧 Email Spam Classifier

A machine learning–based email spam classifier that predicts whether a message is **Spam** or **Ham** with confidence probabilities and detailed evaluation metrics.

---

## 🚀 Features
- Spam / Ham classification
- Probability confidence (Spam vs Ham)
- Model evaluation metrics (Accuracy, Precision, Recall, F1-score)
- Flask-based backend API
- Clean and animated frontend UI
- End-to-end ML integration

---

## 🧠 Tech Stack
**Machine Learning**
- Python
- Scikit-learn
- TF-IDF Vectorizer
- Multinomial Naive Bayes

**Backend**
- Flask
- Joblib

**Frontend**
- HTML
- CSS
- JavaScript (Animated UI)

---

## 📂 Project Structure
Email Spam Classifier/
├── backend/
│ ├── app.py
│ ├── model/
│ │ └── spam_model.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── spam_classifier.ipynb
├── spam.csv
├── .gitignore
└── README.md


---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/digarsepranav-ai/email-spam-classifier.git
cd email-spam-classifier

### 2️⃣ Run Backend (Flask API)
cd backend
pip install -r requirements.txt
python app.py

### 3️⃣ Run Frontend
frontend/index.html

### 🔁 API Endpoint
POST /predict

Request Body
{
  "message": "Congratulations! You won a free prize"
}
Response
{
  "prediction": "Spam",
  "spam_probability": 97.23,
  "ham_probability": 2.77,
  "metrics": {
    "accuracy": 0.98,
    "precision": 0.97,
    "recall": 0.96,
    "f1_score": 0.965
  }
}
### 📊 Model Performance

High accuracy on the test dataset

Balanced precision and recall

F1-score used as the primary quality metric

Probabilistic output improves interpretability

### 🧪 Sample Input & Output

Input

Congratulations! You have won a free prize.


Output

Prediction: Spam

Spam Probability: 97%

Ham Probability: 3%

⭐ If you found this useful, consider starring the repository!