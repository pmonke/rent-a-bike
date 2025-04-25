
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ExampleList from './pages/ExampleList'
import PredictionTask from './pages/PredictionTask'
import Survey from './pages/Survey'
import InitialPrediction from './pages/InitialPrediction'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/initial/:condition" element={<InitialPrediction />} />
      <Route path="/examples/:condition" element={<ExampleList />} />
      <Route path="/task/:condition" element={<PredictionTask />} />
      <Route path="/survey/:condition" element={<Survey />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
