export interface PredictionInput {
    season: number;
    holiday: number;
    workingday: number;
    weather: number;
    temp: number;
    atemp: number;
    humidity: number;
    windspeed: number;
    event: number;
}

export async function predictBikes(inputs: PredictionInput[]): Promise<number[]> {
    const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
    });

    if (!response.ok) {
        throw new Error('Prediction request failed');
    }

    const data = await response.json();
    return data.predicted_counts; // list of numbers
}
