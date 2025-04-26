from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import os
from flask_cors import CORS  # ✅ ADD THIS

# Initialize Flask app
app = Flask(__name__) # ✅ ADD THIS
CORS(app)

# Load the trained linear regression model
MODEL_PATH = 'model/linear_regression_model.pkl'
model = joblib.load(MODEL_PATH)

# Define expected features
FEATURES = ['season', 'holiday', 'workingday', 'weather',
            'temp', 'atemp', 'humidity', 'windspeed', 'event']

@app.route('/')
def home():
    """
    Render a simple HTML form for manual input.
    """
    return render_template('index.html', features=FEATURES)

import json

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


# @app.route('/predict', methods=['POST'])
# def predict():
#     """
#     Accept JSON payload or form data to predict bike demand.
#     JSON format:
#     {
#       "season": 1,
#       "holiday": 0,
#       ...
#     }
#     """
#     # Determine data source
#     data = request.get_json(silent=True)
#     if data is None:
#         # Fallback to form data
#         data = {feat: request.form.get(feat, type=float) for feat in FEATURES}
#     # Create DataFrame from input
#     input_df = pd.DataFrame([data], columns=FEATURES)
#     # Generate prediction
#     pred = model.predict(input_df)[0]
#     # Return as JSON
#     return jsonify({"predicted_count": float(pred)})



# @app.route('/predict', methods=['POST'])
# def predict():
#     """
#     Accept JSON payload (single object or list of objects).
#     """
#     data = request.get_json(force=True)

#     if isinstance(data, dict):
#         data = [data]  # wrap into list if it's single

#     input_df = pd.DataFrame(data, columns=FEATURES)
#     preds = model.predict(input_df)

#     # Return list of predictions
#     return jsonify({"predicted_counts": preds.tolist()})

@app.route('/predict', methods=['POST'])
def predict():
    """
    Accept JSON payload (single object or list of objects).
    """
    data = request.get_json(force=True)

    if isinstance(data, dict):
        data = [data]  # wrap into list if it's single

    input_df = pd.DataFrame(data, columns=FEATURES)
    preds = model.predict(input_df)

    # Sanitize: remove negatives + round
    clean_preds = [max(0, round(p, 0)) for p in preds]

    return jsonify({"predicted_counts": clean_preds})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
