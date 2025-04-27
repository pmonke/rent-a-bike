
export const COEFFS = [
  { feature: 'season', coefficient: 22.949566 },
  { feature: 'holiday', coefficient: -8.811922 },
  { feature: 'workingday', coefficient: -4.279345 },
  { feature: 'weather', coefficient: 7.431437 },
  { feature: 'temp', coefficient: 0.715318 },
  { feature: 'atemp', coefficient: 6.304548 },
  { feature: 'humidity', coefficient: -2.999312 },
  { feature: 'windspeed', coefficient: 0.807972 },
  { feature: 'event', coefficient: 32.919399 }
]

export default function CoeffTable() {
  return (
    <table className="text-sm border rounded w-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-2 py-1">Feature</th>
          <th className="px-2 py-1">Coefficient</th>
        </tr>
      </thead>
      <tbody>
        {COEFFS.map(({ feature, coefficient }) => (
          <tr key={feature}>
            <td className="px-2 py-1 font-medium">{feature}</td>
            <td className="px-2 py-1 text-right">{coefficient.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}