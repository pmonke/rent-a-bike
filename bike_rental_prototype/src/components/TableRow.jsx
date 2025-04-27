import { mapping } from '../data/examples'

export default function TableRow({
  row,
  showPred = false,
  showTips = false,
  showActual = false,
  highlightEvent = false,
  handleChange,
  userValue
}) {
  const trClass =
    highlightEvent && row.event === 1
      ? 'bg-red-100 hover:bg-red-200'
      : 'hover:bg-gray-100'
const formatTips = tipsStr => {
  if (!tipsStr) return null;
  const parts = tipsStr.split(/(-?\d+\.\d+|-?\d+)/g);
  return parts.map((part, idx) => {
    if (/^-?\d+(?:\.\d+)?$/.test(part)) {
      const num = parseFloat(part);
      const rounded = Math.round(num);
      const colorClass = num >= 0 ? 'text-green-600' : 'text-red-600';
      return <span key={idx} className={colorClass}>{rounded}</span>;
    }
    return <span key={idx}>{part}</span>;
  });
};

  return (
    <tr className={trClass}>
      <td className="px-2 py-2">{row.date}</td>
      <td className="px-2 py-2" title={mapping.season[row.season]}>
        {row.season}
      </td>
      <td className="px-2 py-2" title={mapping.holiday[row.holiday]}>
        {row.holiday}
      </td>
      <td className="px-2 py-2" title={mapping.weathersit[row.weathersit]}>
        {row.weathersit}
      </td>
      <td className="px-2 py-2">{row.temp}°C</td>
      <td className="px-2 py-2">{row.humidity}%</td>
      <td className="px-2 py-2">{row.windspeed} km/h</td>
      <td className="px-2 py-2" title={mapping.event[row.event]}>
        {row.event}
      </td>

      {showPred && (
        <td className="px-2 py-2 font-semibold text-blue-800 bg-blue-50 border-l-2 border-blue-300">
          {row.pred}
        </td>
      )}

      {showTips && (
        <td className="px-2 py-2 font-semibold text-yellow-900 bg-yellow-50 border-l-2 border-yellow-300">
          {formatTips(row.tips)}
        </td>
      )}

      {showActual && (
        <td
        className="px-2 py-2 font-semibold text-indigo-900 bg-indigo-100 border-l-2 border-indigo-300">
          {row.actual}
        </td>
      
      )}

      {handleChange && (
        <td className="px-2 py-2">
          <input
            type="number"
            value={userValue ?? ''}
            onChange={e => handleChange(e.target.value)}
            className="w-28 p-1 border rounded"
          />
        </td>
      )}
    </tr>
  )
}