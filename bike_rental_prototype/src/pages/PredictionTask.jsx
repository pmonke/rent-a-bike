import { useParams, useNavigate, Link } from 'react-router-dom'
import { taskRows } from '../data/examples'
import TableRow from '../components/TableRow'
import { useState } from 'react'

export default function PredictionTask() {
  const { condition } = useParams()
  const navigate = useNavigate()
  const [inputs,setInputs] = useState(Array(taskRows.length).fill(''))
  const handleChange = (idx,val)=> {
    const copy=[...inputs]; copy[idx]=val; setInputs(copy)
  }
  const canProceed = inputs.every(v=>v!=='')

  const handleSubmit = ()=>{
    const key = `responses_${Date.now()}`
    localStorage.setItem(key, JSON.stringify({condition, predictions:inputs, timestamp:Date.now()}))
    navigate(`/survey/${condition}`, {state:{condition}})
  }

  const showPred = condition!=='A'
  const showTips = condition==='C'

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Version {condition}: Main Prediction Task</h2>
      <p className="mb-4 text-sm">Enter your prediction for available bikes for each day. {showPred && 'You may adjust the AI estimate.'}</p>
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
            {showTips && <th className="px-2 py-1 bg-yellow-100">AI Tip</th>}
            <th className="px-2 py-1">Your Prediction</th>
          </tr>
        </thead>
        <tbody>
        {taskRows.map((row,i)=>(
          <TableRow
            key={i}
            row={row}
            showPred={showPred}
            showTips={showTips}
            handleChange={(val)=>handleChange(i,val)}
            userValue={inputs[i]}
          />
        ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-6">
        <Link to={`/examples/${condition}`} className="text-blue-600 underline">← Back</Link>
        <button
          disabled={!canProceed}
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-lg ${canProceed?'bg-blue-600 hover:bg-blue-700 text-white':'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
        >
          Submit Predictions →
        </button>
      </div>
    </div>
  )
}