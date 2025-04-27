import { useParams, Link, useNavigate } from 'react-router-dom'
import { exampleRows, mapping } from '../data/examples'
import TableRow from '../components/TableRow'
import CoeffTable from '../components/CoeffTable'

export default function ExampleList() {
  const { stage, condition } = useParams()
  
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
    const parts = [];
    let total = 0;
    const fields = ['season','holiday','weathersit','temp','humidity','windspeed','event'];
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
const navigate = useNavigate()
  const showPred = stage === 'main' ? (condition !== 'A') : (condition === 'C')
  const showTips = stage === 'main' && condition === 'C'
  const highlightEvent = condition !== 'A'

  const handleContinue = () => {
    if(stage === 'intro'){
      if(condition === 'A'){
        navigate(`/task/${condition}`);
      }else{
        navigate(`/initial/${condition}`);
      }
    }else{
      navigate(`/task/${condition}`);
    }
  };
return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Version {condition}: Guided Examples</h2>
      <h2 className="text-1 mb-2">Take a look at the data for available bikes at a rental</h2>
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
            <th className="px-2 py-1 bg-indigo-200 text-indigo-900">Available Bikes</th>
          </tr>
        </thead>
        <tbody>

          {exampleRows.map((row, i) => {
            const readableRow = {
              ...row,
              season: mapping.season[row.season] || row.season,
              holiday: mapping.holiday[row.holiday] || row.holiday,
              weathersit: mapping.weathersit[row.weathersit] || row.weathersit,
              event: mapping.event[row.event] || row.event,
            };
            if(showTips) readableRow.tips = computeExplanation(row);

            return (
              <TableRow
                key={i}
                row={readableRow}
                showPred={showPred}
                showTips={showTips}
                showActual={true}
                highlightEvent={highlightEvent}
              />
            );
          })}

        </tbody>
      </table>

      {stage === 'main' && condition === 'C' && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Model Feature Weights</h3>
          <CoeffTable />
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Link to="/" className="text-blue-600 underline">← Back</Link>
        <button onClick={handleContinue} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Continue →
        </button>
      </div>
    </div>
  )
}