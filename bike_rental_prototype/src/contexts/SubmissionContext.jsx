import { createContext, useContext, useState } from 'react';

const SubmissionContext = createContext();

export function SubmissionProvider({ children }) {
    const [initialPredictions, setInitialPredictions] = useState({
        predictions: [],
        confidence: '',
        condition: ''
    });
    const [predictions, setPredictions] = useState([]);
    const [surveyResults, setSurveyResults] = useState([]);

    return (
        <SubmissionContext.Provider value={{
            initialPredictions,
            setInitialPredictions,
            predictions,
            setPredictions,
            surveyResults,
            setSurveyResults
        }}>
            {children}
        </SubmissionContext.Provider>
    );
}

export function useSubmission() {
    return useContext(SubmissionContext);
}