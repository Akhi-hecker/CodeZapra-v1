// Logic Explanation Panel
// Plain text input for thinking stage

import { useState } from 'react';

interface LogicExplanationPanelProps {
    onSubmit: (logic: string) => void;
    isLoading: boolean;
}

export const LogicExplanationPanel = ({ onSubmit, isLoading }: LogicExplanationPanelProps) => {
    const [logic, setLogic] = useState('');
    const minChars = 50;

    const handleSubmit = () => {
        if (logic.trim().length >= minChars) {
            onSubmit(logic.trim());
        }
    };

    return (
        <div className="logic-panel">
            <div className="logic-panel-header">
                <div className="logic-panel-icon">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div>
                    <h3 className="logic-panel-title">Logic Explanation</h3>
                    <p className="logic-panel-subtitle">
                        Describe your approach in plain English before writing code
                    </p>
                </div>
            </div>

            <textarea
                className="logic-textarea"
                value={logic}
                onChange={(e) => setLogic(e.target.value)}
                placeholder="Explain step by step how you would solve this problem...

For example:
1. First, I would initialize a variable to track...
2. Then iterate through the array...
3. For each element, I would check..."
                disabled={isLoading}
            />

            <div className="logic-footer">
                <span className="char-count">
                    {logic.length} characters
                    {logic.length < minChars && (
                        <span style={{ color: 'var(--logic-warning)' }}>
                            {' '}(min {minChars})
                        </span>
                    )}
                </span>

                <button
                    className="submit-logic-btn"
                    onClick={handleSubmit}
                    disabled={logic.trim().length < minChars || isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2, margin: 0 }} />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Verify Logic
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
