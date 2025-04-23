# Bike Demand Predictor – Human‑AI Teaming Study

This React prototype implements three study conditions:

* **A – Human Only:** Participants view historical examples and make their own demand predictions.
* **B – Human + AI Prediction:** Participants see AI baseline estimates they can adjust.
* **C – Human + AI Prediction + Explainability:** Participants see AI estimates **and** tips explaining each feature’s impact.

The app records participant predictions and survey responses to `localStorage` for later export.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser and choose your assigned version.

## Tech Stack

* Vite + React 18
* React Router 6
* Tailwind CSS

## Data Export

Open the browser console and run:

```js
Object.entries(localStorage)
```

to copy logs for analysis.