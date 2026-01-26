// Main Logic Code Interface
// Orchestrates the Think → Verify → Code flow

import { useState, useCallback } from 'react';
import './logic-code.css';
import { logicCodeQuestions } from './questions';
import type { LogicCodeQuestion } from './questions';
import { QuestionPanel } from './QuestionPanel';
import { LogicExplanationPanel } from './LogicExplanationPanel';
import { VerificationDisplay } from './VerificationDisplay';
import { CodeEditor } from './CodeEditor';
import { useLogicVerification } from './useLogicVerification';
import type { VerificationResult } from './useLogicVerification';

type Stage = 'question' | 'logic' | 'verification' | 'code';

interface StepIndicatorProps {
    currentStage: Stage;
}

const StepIndicator = ({ currentStage }: StepIndicatorProps) => {
    const stages: Stage[] = ['question', 'logic', 'verification', 'code'];
    const stageLabels = {
        question: 'Think',
        logic: 'Explain',
        verification: 'Verify',
        code: 'Code'
    };

    const getCurrentIndex = () => stages.indexOf(currentStage);

    return (
        <div className="step-indicator">
            {stages.map((stage, idx) => (
                <div key={stage} style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        className={`step ${currentStage === stage ? 'active' :
                            idx < getCurrentIndex() ? 'completed' : ''
                            }`}
                    >
                        <span className="step-number">
                            {idx < getCurrentIndex() ? '✓' : idx + 1}
                        </span>
                        <span className="step-label">{stageLabels[stage]}</span>
                    </div>
                    {idx < stages.length - 1 && (
                        <div className={`step-divider ${idx < getCurrentIndex() ? 'passed' : ''}`} />
                    )}
                </div>
            ))}
        </div>
    );
};

export const LogicCodeInterface = () => {
    const [currentQuestion] = useState<LogicCodeQuestion>(logicCodeQuestions[0]);
    const [stage, setStage] = useState<Stage>('question');
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

    const { reset } = useLogicVerification();

    const handleStartThinking = useCallback(() => {
        setStage('logic');
    }, []);

    // Gemini verification handler
    const handleLogicSubmit = useCallback(async (logic: string) => {
        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            setVerificationResult({
                score: 0,
                feedback: 'API key not configured',
                reasoning: 'Please configure your Gemini API key in .env file',
                isApproved: false
            });
            setStage('verification');
            return;
        }

        setStage('verification');
        setVerificationResult(null);

        const prompt = `You are an expert coding tutor evaluating a student's problem-solving logic.

PROBLEM:
Title: "${currentQuestion.title}"
Description: "${currentQuestion.description}"
Available Hints: ${currentQuestion.hints.join(', ')}

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

            const cleanJson = textResponse
                .replace(/^```json\s*/, '')
                .replace(/\s*```$/, '')
                .trim();

            const parsed = JSON.parse(cleanJson);

            setVerificationResult({
                score: parsed.score,
                feedback: parsed.feedback,
                reasoning: parsed.reasoning,
                isApproved: parsed.score >= 75,
                missingConcepts: parsed.missingConcepts
            });

        } catch (err) {
            setVerificationResult({
                score: 0,
                feedback: 'Verification failed',
                reasoning: err instanceof Error ? err.message : 'Unknown error occurred',
                isApproved: false
            });
        }
    }, [currentQuestion]);

    const handleRetry = useCallback(() => {
        setVerificationResult(null);
        setStage('logic');
        reset();
    }, [reset]);

    const handleProceed = useCallback(() => {
        setStage('code');
    }, []);

    const isCodeUnlocked = stage === 'code';

    return (
        <div className={`logic-code-interface ${isCodeUnlocked ? 'code-mode' : ''}`}>
            <div className="logic-code-container">
                {/* Step Indicator */}
                <StepIndicator currentStage={stage} />

                {/* Question Panel - Always visible */}
                <QuestionPanel
                    question={currentQuestion}
                    onStartThinking={handleStartThinking}
                    isActive={stage === 'question'}
                />

                {/* Logic Panel - Shows after clicking Start Thinking */}
                {(stage === 'logic' || stage === 'verification') && !verificationResult && (
                    <LogicExplanationPanel
                        onSubmit={handleLogicSubmit}
                        isLoading={stage === 'verification' && !verificationResult}
                    />
                )}

                {/* Loading State */}
                {stage === 'verification' && !verificationResult && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Analyzing your logic with AI...</p>
                    </div>
                )}

                {/* Verification Result */}
                {verificationResult && stage === 'verification' && (
                    <VerificationDisplay
                        result={verificationResult}
                        onRetry={handleRetry}
                        onProceed={handleProceed}
                    />
                )}

                {/* Code Editor - Always rendered, locked until verification passes */}
                {(stage === 'code' || stage === 'logic' || stage === 'verification') && (
                    <CodeEditor isLocked={!isCodeUnlocked} />
                )}
            </div>
        </div>
    );
};

export default LogicCodeInterface;
