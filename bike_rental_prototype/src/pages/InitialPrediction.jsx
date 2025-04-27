
import { useParams, useNavigate, Link } from 'react-router-dom';
import { taskRows, mapping } from '../data/examples';
import TableRow from '../components/TableRow';
import { useState } from 'react';

const CONFIDENCE_LEVELS = [
  'Not at all confident',
  'Slightly confident',
  'Somewhat confident',
  'Quite confident',
  'Extremely confident'
];

export default function InitialPrediction() {
  const { condition } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(Array(taskRows.length).fill(''));
  const [conf, setConf] = useState('');

  const showPred = condition === 'C';   
  const highlightEvent = true;

  const handleChange = (idx, val, hasEvent, eventDesc) => {
    const copy = [...inputs];
    copy[idx] = val;
    setInputs(copy);

    if (hasEvent && !sessionStorage.getItem('event_popup_seen_pre_' + idx + '_' + condition)) {
      const message = eventDesc
        ? `Event – ${eventDesc}. This might influence bike demand!`
        : `Event – ${eventDesc}. This might influence bike demand!`;
      alert(message);
      sessionStorage.setItem('event_popup_seen_pre_' + idx + '_' + condition, '1');
    }
  };

  const canProceed = inputs.every(v => v !== '') && conf;

  const handleSubmit = () => {
    sessionStorage.setItem(
      'pre_predictions',
      JSON.stringify({ predictions: inputs, confidence: conf, condition })
    );
    sessionStorage.setItem('pre_q1', conf);
    navigate(`/examples/main/${condition}`);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Version {condition}: Pre‑Exposure Prediction</h2>
      <p className="mb-2 text-sm">
        Before seeing any AI estimates{condition !== 'A' && ' (or explanations)'}, please predict
        the number of available bikes for each day.
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
            {showPred && <th className="px-2 py-1 text-blue-800">AI Prediction</th>}
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

            return (
              <TableRow
                key={i}
                row={readableRow}
                showPred={showPred}
                highlightEvent={highlightEvent}
                handleChange={val => handleChange(i, val, row.event === 1, row.eventDesc)}
                userValue={inputs[i]}
              />
            );
          })}
        </tbody>
      </table>

      <div className="mt-6">
        <label className="block font-medium mb-1">
          How confident are you in your predictions?
        </label>
        <select
          value={conf}
          onChange={e => setConf(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Select</option>
          {CONFIDENCE_LEVELS.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <Link to="/" className="text-blue-600 underline">
          ← Back
        </Link>
        <button
          disabled={!canProceed}
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-lg ${
            canProceed ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}