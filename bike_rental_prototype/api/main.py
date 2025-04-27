from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import os
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'model/linear_regression_model.pkl'
model = joblib.load(MODEL_PATH)
FEATURES = ['season', 'holiday', 'workingday', 'weather',
            'temp', 'atemp', 'humidity', 'windspeed', 'event']

@app.route('/')
def home():
    """
    Render a simple HTML form for manual input.
    """
    return render_template('index.html', features=FEATURES)

SURVEY_RESULTS_PATH = 'results.json'

@app.route('/survey', methods=['POST'])
def receive_survey():
    """
    Accepts any JSON format and appends it to results.json
    """
    data = request.get_json(force=True)

    # Load existing results (if any)
    if os.path.exists(SURVEY_RESULTS_PATH):
        with open(SURVEY_RESULTS_PATH, 'r') as f:
            existing = json.load(f)
    else:
        existing = []

    # Append new result
    existing.append(data)

    # Save updated results
    with open(SURVEY_RESULTS_PATH, 'w') as f:
        json.dump(existing, f, indent=2)

    return jsonify({"message": "Survey response recorded.", "total_entries": len(existing)})


@app.route('/predict', methods=['POST'])
def predict():
    """
    Accept JSON payload (single object or list of objects).
    """
    data = request.get_json(force=True)

    if isinstance(data, dict):
        data = [data]  

    input_df = pd.DataFrame(data, columns=FEATURES)
    preds = model.predict(input_df)

    clean_preds = [max(0, round(p, 0)) for p in preds]

    return jsonify({"predicted_counts": clean_preds})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)