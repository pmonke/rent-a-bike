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
  const { state } = useLocation()
  const condition = state?.condition || 'A'

  // if the participant answered Q1 earlier (B & C) we pre-fill,
  // but the question is still shown so they can adjust it.
  const preQ1 = sessionStorage.getItem('pre_q1') ?? ''
  const [q1, setQ1] = useState(preQ1)
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')

  const canSubmit =
    q1 && (condition === 'A' || q2) && (condition === 'A' || q3)

  const handleFinish = () => {
    const key = `survey_${Date.now()}`
    localStorage.setItem(
      key,
      JSON.stringify({
        condition,
        q1,
        q2,
        q3,
        timestamp: Date.now()
      })
    )
    alert('Thank you! Your responses have been recorded.')
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Post-Task Survey</h2>

      {/* Q1 – always shown now */}
      <label className="w-full">
        <span className="block font-medium mb-1">
          1. How confident are you in the <em>final</em> predictions you made?
        </span>
        <select
          className="w-full border rounded p-2"
          value={q1}
          onChange={e => setQ1(e.target.value)}
        >
          <option value="">Select</option>
          {CONFIDENCE_LEVELS.map(label => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </label>

      {condition !== 'A' && (
        <>
          {/* Q2 */}
          <label className="w-full">
            <span className="block font-medium mb-1">
              2. How confident are you in the AI model&rsquo;s prediction?
            </span>
            <select
              className="w-full border rounded p-2"
              value={q2}
              onChange={e => setQ2(e.target.value)}
            >
              <option value="">Select</option>
              {CONFIDENCE_LEVELS.map(label => (
                <option key={label}>{label}</option>
              ))}
            </select>
          </label>

          {/* Q3 */}
          <label className="w-full">
            <span className="block font-medium mb-1">
              3. How helpful&nbsp;
              {condition === 'C'
                ? 'were the AI predictions and weights table'
                : 'was the AI prediction'}
              &nbsp;in helping you make your final prediction?
            </span>
            <select
              className="w-full border rounded p-2"
              value={q3}
              onChange={e => setQ3(e.target.value)}
            >
              <option value="">Select</option>
              {HELPFULNESS_LEVELS.map(label => (
                <option key={label}>{label}</option>
              ))}
            </select>
          </label>
        </>
      )}

      <div className="flex gap-8 mt-4">
        <Link to="/" className="text-blue-600 underline">
          Exit
        </Link>
        <button
          disabled={!canSubmit}
          onClick={handleFinish}
          className={`px-4 py-2 rounded-lg ${
            canSubmit
              ? 'bg-blue-600 text-white'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          Submit Survey
        </button>
      </div>
    </div>
  )
}