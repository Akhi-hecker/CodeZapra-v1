
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface LogicFeedback {
    approved: boolean;
    message: string;
    missing?: string[];
}

const callGeminiModel = async (model: string, prompt: string): Promise<any> => {
    console.log(`Attempting Gemini Logic Check with model: ${model}`);
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || response.statusText || `Status ${response.status}`;
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
};

export const verifyLogicWithGemini = async (
    logicText: string,
    problemTitle: string,
    problemDescription: string,
    hints: string[] = []
): Promise<LogicFeedback> => {
    if (!GEMINI_API_KEY) {
        console.warn('Gemini API Key missing. Falling back to heuristic.');
        throw new Error('API_KEY_MISSING');
    }

    const prompt = `
    You are a strict coding tutor. A student is trying to solve a coding problem.
    
    Problem Title: "${problemTitle}"
    Problem Description: "${problemDescription}"
    Hints available: ${hints.join(', ')}

    Student's Logic Explanation:
    "${logicText}"

    Your Task:
    Evaluate if their logic is valid and would correctly solve the problem.
    - BE STRICT. Do not approve vague answers like "I will solve it" or "I will use a loop".
    - They must explain *how* they solve it (e.g. "Iterate array, update max if current > max").
    - If Approved: Provide a specific compliment referencing their actual approach (e.g., "Good use of the two-pointer technique!").
    - If Rejected: Explain exactly *why* it fails or what specific part is missing.

    Format your response as valid JSON:
    {
        "approved": boolean,
        "message": "string", // rigorous feedback
        "missing": ["string"] // specific missing concepts if rejected
    }
    `;

    // Strategy: Use gemini-2.5-flash directly as requested
    const modelsToTry = [
        'gemini-2.5-flash'
    ];

    let lastError: any;

    for (const model of modelsToTry) {
        try {
            const data = await callGeminiModel(model, prompt);
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!textResponse) {
                throw new Error('No text response from Gemini');
            }

            const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            return JSON.parse(cleanJson);

        } catch (error: any) {
            console.warn(`Gemini Check Failed on ${model}:`, error.message);
            lastError = error;

            // If it's not a server error (e.g., just invalid JSON), maybe don't retry? 
            // For now, retry on everything to be safe.

            if (model === modelsToTry[modelsToTry.length - 1]) {
                // If it was the last model, throw the error
                console.error('All Gemini models failed.');
                throw new Error(`Gemini API Error: ${lastError.message}`);
            }
            // Otherwise loop continues to next model
        }
    }

    throw lastError;
};
