import { mapping } from '../data/examples'

export default function TableRow({row, showPred, showTips, handleChange, userValue}) {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-2 py-2">{row.date}</td>
      <td className="px-2 py-2" title={mapping.season[row.season]}>{row.season}</td>
      <td className="px-2 py-2" title={mapping.holiday[row.holiday]}>{row.holiday}</td>
      <td className="px-2 py-2" title={mapping.weathersit[row.weathersit]}>{row.weathersit}</td>
      <td className="px-2 py-2">{row.temp}°C</td>
      <td className="px-2 py-2">{row.humidity}%</td>
      <td className="px-2 py-2">{row.windspeed} km/h</td>
      <td className="px-2 py-2" title={mapping.event[row.event]}>{row.event}</td>
      {showPred && (
        <td className="px-2 py-2 font-semibold text-blue-800 bg-blue-50 border-l-2 border-blue-300">
          {row.pred}
        </td>
      )}
      {showTips && (
        <td className="px-2 py-2 italic text-yellow-900 bg-yellow-50 border-l-2 border-yellow-300">
          {row.tips}
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