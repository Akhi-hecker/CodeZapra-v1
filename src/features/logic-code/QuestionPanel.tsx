// Question Panel Component
// Clean, focused display for the coding problem

import { useState } from 'react';
import type { LogicCodeQuestion } from './questions';

interface QuestionPanelProps {
    question: LogicCodeQuestion;
    onStartThinking: () => void;
    isActive: boolean;
}

export const QuestionPanel = ({ question, onStartThinking, isActive }: QuestionPanelProps) => {
    const [showHints, setShowHints] = useState(false);

    return (
        <div className="question-panel">
            <div className="question-header">
                <span className="question-category">{question.category}</span>
                <span className="question-difficulty">{question.difficulty}</span>
            </div>

            <h2 className="question-title">{question.title}</h2>

            <p className="question-description">{question.description}</p>

            {question.hints.length > 0 && (
                <div className="hints-section">
                    <button
                        className="hints-toggle"
                        onClick={() => setShowHints(!showHints)}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                transform: showHints ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        {showHints ? 'Hide Hints' : 'Show Hints'} ({question.hints.length})
                    </button>

                    {showHints && (
                        <ol className="hints-list">
                            {question.hints.map((hint, idx) => (
                                <li key={idx}>{hint}</li>
                            ))}
                        </ol>
                    )}
                </div>
            )}

            {isActive && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button className="submit-logic-btn" onClick={onStartThinking}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        Explain Your Logic
                    </button>
                </div>
            )}
        </div>
    );
};
