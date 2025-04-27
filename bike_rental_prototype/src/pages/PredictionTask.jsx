
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskRows, mapping } from '../data/examples';
import CoeffTable from '../components/CoeffTable';
import TableRow from '../components/TableRow';
import { useState } from 'react';
import { useSubmission } from '../contexts/SubmissionContext';

export default function PredictionTask() {
  const { condition } = useParams();
  
  const computeExplanation = (row) => {
    const coeffs = {
      season: 22.949566,
      holiday: -8.811922,
      weathersit: 7.431437,
      temp: 0.715318,
      humidity: -2.999312,
      windspeed: 0.807972,
      event: 32.919399
    };
    const fields = ['season','holiday','weathersit','temp','humidity','windspeed','event'];
    const parts = [];
    let total = 0;
    fields.forEach(f => {
      const val = row[f];
      const coef = coeffs[f];
      const prod = +(coef * val).toFixed(3);
      total += prod;
      parts.push(`${coef.toFixed(3)}×${val}=${prod}`);
    });
    parts.push(`total=${total.toFixed(3)}`);
    return parts.join('; ');
  };
const navigate = useNavigate();
  const [inputs, setInputs] = useState(Array(taskRows.length).fill(''));
  const { setPredictions } = useSubmission();

  const showPred = condition !== 'A';
  const showTips = condition === 'C';
  const highlightEvent = condition !== 'A';

  const handleChange = (idx, val, hasEvent, eventDesc) => {
    const copy = [...inputs];
    copy[idx] = val;
    setInputs(copy);

    if (hasEvent && !sessionStorage.getItem('event_popup_seen_' + idx + '_' + condition)) {
      const message = eventDesc
        ? `Event – ${eventDesc}. You may want to adjust your prediction!`
        : `Event – ${eventDesc}. You may want to adjust your prediction!`;
      alert(message);
      sessionStorage.setItem('event_popup_seen_' + idx + '_' + condition, '1');
    }
  };

  const canProceed = inputs.every(v => v !== '');

  const handleSubmit = () => {
    const structuredRows = taskRows.map((row, idx) => ({
      ...row,
      userPrediction: inputs[idx]
    }));

    setPredictions(structuredRows);

    const key = `responses_${Date.now()}`;
    localStorage.setItem(
      key,
      JSON.stringify({ condition, predictions: structuredRows, timestamp: Date.now() })
    );

    navigate(`/survey/${condition}`, { state: { condition } });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Version {condition}: Main Prediction Task</h2>
      <p className="mb-4 text-sm">
        Enter your prediction for the number of available bikes on each day.&nbsp;
        {showPred && 'You may adjust based on the AI estimate.'}
      </p>

      <table className="w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1">Date</th>
            <th className="px-2 py-1">Season</th>
            <th className="px-2 py-1">Holiday</th>
            <th className="px-2 py-1">Weather</th>
            <th className="px-2 py-1">Temp</th>
            <th className="px-2 py-1">Humidity</th>
            <th className="px-2 py-1">Wind</th>
            <th className="px-2 py-1">Event</th>
            {showPred && <th className="px-2 py-1 bg-blue-100">AI Prediction</th>}
            {showTips && <th className="px-2 py-1 bg-blue-100">AI Explanation</th>}
            <th className="px-2 py-1">Your Prediction</th>
          </tr>
        </thead>
        <tbody>
          {taskRows.map((row, i) => {
            const readableRow = {
              ...row,
              season: mapping.season[row.season] || row.season,
              holiday: mapping.holiday[row.holiday] || row.holiday,
              weathersit: mapping.weathersit[row.weathersit] || row.weathersit,
              event: mapping.event[row.event] || row.event
            };
              if(showTips) readableRow.tips = `${row.tips} \n ${computeExplanation(row)}`;

            return (
              <TableRow
                key={i}
                row={readableRow}
                showPred={showPred}
                showTips={showTips}
                highlightEvent={highlightEvent}
                handleChange={val => handleChange(i, val, row.event === 1, row.eventDesc)}
                userValue={inputs[i]}
              />
            );
          })}
        </tbody>
      </table>
      {condition === 'C' && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Model Feature Weights</h3>
          <CoeffTable />
        </div>
      )}


      <div className="flex justify-between mt-6">
        <Link to={`/examples/${condition}`} className="text-blue-600 underline">
          ← Back
        </Link>
        <button
          disabled={!canProceed}
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-lg ${
            canProceed ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          Submit Predictions →
        </button>
      </div>
    </div>
  );
}