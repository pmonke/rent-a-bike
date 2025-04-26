export async function submitSurvey(surveyData: any) {
    const response = await fetch('http://localhost:5000/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
    });

    if (!response.ok) {
        throw new Error('Failed to submit survey');
    }

    return await response.json();
}
