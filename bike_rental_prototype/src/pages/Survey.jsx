import { useLocation, Link } from 'react-router-dom'
import { useState } from 'react'

const CONFIDENCE_LEVELS = [
  'Not at all confident',
  'Barely confident',
  'Somewhat confident',
  'Moderately confident',
  'Very confident',
  'Super confident'
]

const HELPFULNESS_LEVELS = [
  'Not helpful at all',
  'Slightly helpful',
  'Somewhat helpful',
  'Moderately helpful',
  'Very helpful',
  'Extremely helpful'
]

export default function Survey() {
  const location = useLocation()
  const condition = location.state?.condition || 'A'
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const canSubmit = q1 && q2 && (condition==='A' || q3)

  const handleFinish = ()=>{
    const key = `survey_${Date.now()}`
    localStorage.setItem(key, JSON.stringify({condition,q1,q2,q3,timestamp:Date.now()}))
    alert('Thank you! Your responses have been recorded.')
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Post‑Task Survey</h2>
      {/* Q1 */}
      <label className="w-full">
        <span className="block font-medium mb-1">1. How confident are you in the final predictions you made?</span>
        <select className="w-full border rounded p-2" value={q1} onChange={e=>setQ1(e.target.value)}>
          <option value="">Select</option>
          {CONFIDENCE_LEVELS.map(label=>(
            <option key={label}>{label}</option>
          ))}
        </select>
      </label>

      {condition!=='A' && (
        <>
          {/* Q2 */}
          <label className="w-full">
            <span className="block font-medium mb-1">2. How confident are you in the AI model&#39;s prediction?</span>
            <select className="w-full border rounded p-2" value={q2} onChange={e=>setQ2(e.target.value)}>
              <option value="">Select</option>
              {CONFIDENCE_LEVELS.map(label=>(
                <option key={label}>{label}</option>
              ))}
            </select>
          </label>

          {/* Q3 */}
          <label className="w-full">
            <span className="block font-medium mb-1">
              3. How helpful {condition==='C'?'were the AI prediction and explainable tips':'was the AI prediction'} in helping you make your final prediction?
            </span>
            <select className="w-full border rounded p-2" value={q3} onChange={e=>setQ3(e.target.value)}>
              <option value="">Select</option>
              {HELPFULNESS_LEVELS.map(label=>(
                <option key={label}>{label}</option>
              ))}
            </select>
          </label>
        </>
      )}

      {condition==='A' && (
        <label className="w-full">
          <span className="block font-medium mb-1">2. Overall, how challenging did you find making these predictions?</span>
          <select className="w-full border rounded p-2" value={q2} onChange={e=>setQ2(e.target.value)}>
            <option value="">Select</option>
            {HELPFULNESS_LEVELS.map(label=>(
              <option key={label}>{label}</option>
            ))}
          </select>
        </label>
      )}

      <button
        disabled={!canSubmit}
        onClick={handleFinish}
        className={`px-6 py-2 rounded-lg ${canSubmit?'bg-blue-600 hover:bg-blue-700 text-white':'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
      >
        Submit Survey
      </button>
      <Link to="/" className="text-blue-600 underline">Back to Home</Link>
    </div>
  )
}