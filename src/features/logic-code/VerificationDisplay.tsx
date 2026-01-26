// Verification Display Component
// Shows AI feedback with score circle and actions

import type { VerificationResult } from './useLogicVerification';

interface VerificationDisplayProps {
    result: VerificationResult;
    onRetry: () => void;
    onProceed: () => void;
}

export const VerificationDisplay = ({ result, onRetry, onProceed }: VerificationDisplayProps) => {
    const { score, feedback, reasoning, isApproved, missingConcepts } = result;

    // Calculate stroke dashoffset for circular progress
    const circumference = 2 * Math.PI * 54; // radius = 54
    const dashOffset = circumference - (score / 100) * circumference;

    const getScoreColor = () => {
        if (score >= 75) return 'success';
        if (score >= 50) return 'warning';
        return 'error';
    };

    return (
        <div className={`verification-result ${isApproved ? 'unlock-celebrate' : ''}`}>
            {/* Score Circle */}
            <div className="score-circle">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle
                        className="score-track"
                        cx="70"
                        cy="70"
                        r="54"
                    />
                    <circle
                        className={`score-progress ${getScoreColor()}`}
                        cx="70"
                        cy="70"
                        r="54"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                    />
                </svg>
                <div className="score-value">
                    {score}%
                    <div className="score-label">Logic Score</div>
                </div>
            </div>

            {/* Feedback */}
            <h3 className="verification-feedback">{feedback}</h3>
            <p className="verification-reasoning">{reasoning}</p>

            {/* Missing Concepts */}
            {missingConcepts && missingConcepts.length > 0 && (
                <div className="missing-concepts">
                    {missingConcepts.map((concept, idx) => (
                        <span key={idx} className="missing-tag">{concept}</span>
                    ))}
                </div>
            )}

            {/* Actions */}
            {isApproved ? (
                <button className="proceed-btn" onClick={onProceed}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginRight: 8 }}
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                    Proceed to Code Editor
                </button>
            ) : (
                <button className="retry-btn" onClick={onRetry}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginRight: 8 }}
                    >
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 16h5v5" />
                    </svg>
                    Try Again
                </button>
            )}
        </div>
    );
};
