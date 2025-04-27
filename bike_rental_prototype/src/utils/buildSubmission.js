export function buildSubmission({ fullName, testType, rows, surveyResults }) {
    const predictions = rows.map(row => ({
        feats: {
            date: row.date,
            season: row.season,
            holiday: row.holiday,
            weather: row.weather,
            temp: row.temp,
            humidity: row.humidity,
            wind: row.wind,
            event: row.event,
        },
        user_prediction: row.userPrediction
    }));

    return {
        full_name: fullName,
        test_type: testType,
        predictions,
        surveyResults
    };
}