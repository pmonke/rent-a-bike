import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold">Bike Demand Predictor — Study Portal</h1>
      <p className="max-w-xl text-center">
        Thank you for participating! Choose the study version assigned to you (A = Human Only, B = Human + AI, C = Human + AI + Explanation).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['A','B','C'].map(c => (
          <Link key={c} to={`/examples/${c}`} className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-center">Version {c}</h2>
            <p className="text-center mt-2">Start ➔</p>
          </Link>
        ))}
      </div>
    </div>
  )
}