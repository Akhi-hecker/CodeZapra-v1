// Logic Verification Hook - Gemini Integration
// Adapts existing gemini.ts for logic scoring

import { useState, useCallback } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface VerificationResult {
    score: number; // 0-100
    feedback: string;
    reasoning: string;
    isApproved: boolean;
    missingConcepts?: string[];
}

interface UseLogicVerificationReturn {
    result: VerificationResult | null;
    isLoading: boolean;
    error: string | null;
    verify: (logic: string, questionTitle: string, questionDescription: string, hints: string[]) => Promise<void>;
    reset: () => void;
}

export const useLogicVerification = (): UseLogicVerificationReturn => {
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = useCallback(() => {
        setResult(null);
        setError(null);
        setIsLoading(false);
    }, []);

    const verify = useCallback(async (
        logic: string,
        questionTitle: string,
        questionDescription: string,
        hints: string[] = []
    ) => {
        if (!GEMINI_API_KEY) {
            setError('API key not configured');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        const prompt = `You are an expert coding tutor evaluating a student's problem-solving logic.

PROBLEM:
Title: "${questionTitle}"
Description: "${questionDescription}"
Available Hints: ${hints.join(', ')}

STUDENT'S LOGIC EXPLANATION:
"${logic}"

EVALUATION CRITERIA:
1. Does the logic describe a valid algorithmic approach?
2. Is the approach specific enough to implement?
3. Would this logic lead to a correct solution?

SCORING GUIDE:
- 90-100: Excellent - Clear, specific, correct approach with good reasoning
- 75-89: Good - Valid approach, minor details missing but implementable
- 50-74: Partial - Some understanding but key steps unclear or missing
- 25-49: Weak - Very vague or partially incorrect reasoning
- 0-24: Insufficient - No meaningful approach described

BE STRICT:
- Reject vague answers like "use a loop" or "iterate and solve"
- Require SPECIFIC steps (e.g., "track max value, update when current > max")
- Reward clear algorithmic thinking

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "score": number,
  "feedback": "short encouraging or corrective message",
  "reasoning": "detailed explanation of score",
  "missingConcepts": ["concept1", "concept2"]
}`;

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!textResponse) {
                throw new Error('Empty response from AI');
            }

            // Clean JSON response
            const cleanJson = textResponse
                .replace(/^```json\s*/, '')
                .replace(/\s*```$/, '')
                .trim();

            const parsed = JSON.parse(cleanJson);

            setResult({
                score: parsed.score,
                feedback: parsed.feedback,
                reasoning: parsed.reasoning,
                isApproved: parsed.score >= 75,
                missingConcepts: parsed.missingConcepts
            });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { result, isLoading, error, verify, reset };
};
