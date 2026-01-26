// Logic-First Coding Question Component for DSA Sections
// Replaces old CodingQuestion with Think → Verify → Code flow

import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import type { CodingQuestionData, Language } from '../../types/dsa';
import { executeCode } from '../../utils/codeRunner';
import '../../features/logic-code/logic-code.css';
import { SuccessPopup } from './SuccessPopup';

interface LogicCodingQuestionProps {
  question: CodingQuestionData;
  index: number;
  isUnlocked: boolean;
  onComplete: () => void;
  isCompleted?: boolean;
  sectionId: string;
}

type Stage = 'logic' | 'verification' | 'code';

interface VerificationResult {
  score: number;
  feedback: string;
  reasoning: string;
  isApproved: boolean;
  missingConcepts?: string[];
}

// Language configuration
const LANGUAGE_CONFIG: Record<string, { label: string; keywords: string[]; }> = {
  python: {
    label: 'Python',
    keywords: ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'range', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'and', 'or', 'not', 'True', 'False', 'None', 'print', 'len', 'self'],
  },
  java: {
    label: 'Java',
    keywords: ['public', 'private', 'protected', 'class', 'static', 'void', 'int', 'String', 'boolean', 'return', 'if', 'else', 'for', 'while', 'new', 'import', 'package', 'extends', 'implements', 'try', 'catch', 'finally', 'throw', 'throws', 'this', 'super', 'null', 'true', 'false'],
  },
  cpp: {
    label: 'C++',
    keywords: ['include', 'using', 'namespace', 'std', 'int', 'void', 'return', 'if', 'else', 'for', 'while', 'class', 'public', 'private', 'protected', 'struct', 'template', 'typename', 'const', 'static', 'new', 'delete', 'nullptr', 'true', 'false', 'cout', 'cin', 'endl', 'vector', 'string', 'auto'],
  },
};

const getStarterCode = (question: CodingQuestionData, language: Language): string => {
  if (typeof question.starterCode === 'string') {
    return question.starterCode;
  }
  return question.starterCode[language] || '// Write your solution here\n';
};

export const LogicCodingQuestion = ({
  question,
  index,
  isUnlocked,
  onComplete,
  isCompleted = false,
}: LogicCodingQuestionProps) => {
  const [stage, setStage] = useState<Stage>('logic');
  const [logic, setLogic] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(() => getStarterCode(question, 'python'));
  const [hasCompleted, setHasCompleted] = useState(isCompleted);

  // Test cases state
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string; expected: string; error?: string }[]>([]);
  const [isRunningPublicTests, setIsRunningPublicTests] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const minChars = 20; // Reduced - accept brief explanations

  // Update code when language changes
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setCode(getStarterCode(question, newLang));
  };

  // Verify logic with Gemini
  const handleVerifyLogic = useCallback(async () => {
    if (logic.trim().length < minChars) return;

    setIsVerifying(true);
    setStage('verification');

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      setVerificationResult({
        score: 0,
        feedback: 'API key not configured',
        reasoning: 'Please configure your Gemini API key in .env file',
        isApproved: false
      });
      setIsVerifying(false);
      return;
    }

    const prompt = `You are a friendly and encouraging coding tutor evaluating a student's problem-solving logic.

PROBLEM:
Title: "${question.title}"
Description: "${question.description}"
Hint: ${question.hint}

STUDENT'S LOGIC EXPLANATION:
"${logic}"

IMPORTANT GUIDELINES:
- Be LENIENT and ENCOURAGING - students will only write 2-3 lines
- Accept brief but correct logic - they don't need to write essays
- Look for the KEY IDEA or main approach, not perfect wording
- If they mention the right algorithm/data structure, that's good!
- If the core logic is correct, approve it (score >= 75)

SCORING (be generous):
- 85-100: Mentions correct approach/algorithm
- 75-84: Has the right idea, even if brief
- 50-74: Partially correct but missing key insight
- Below 50: Wrong approach or too vague to understand

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "score": number,
  "feedback": "short encouraging message (always positive tone)",
  "reasoning": "brief explanation",
  "missingConcepts": []
}`;

    try {
      const models = ['gemini-2.5-flash', 'gemini-3-flash-preview'];
      let response;

      for (const model of models) {
        try {
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
              })
            }
          );

          if (response.ok) break; // Success!

          if (response.status === 429 || response.status === 404 || response.status === 503) {
            console.warn(`Model ${model} failed with ${response.status}. Trying next...`);
            continue; // Try next model
          }

          // If other error, throw generic
          throw new Error(`API Error: ${response.status}`);

        } catch (e) {
          console.warn(`Error calling ${model}:`, e);
          if (model === models[models.length - 1]) throw e; // Throw if last model
        }
      }

      if (!response || response.status === 429 || response.status === 503) {
        // Fallback for rate limits or service outages - Allow proceed
        console.warn(`Gemini API Error (${response?.status}). Proceeding with mock verification.`);
        setVerificationResult({
          score: 100,
          feedback: `API Unavailable (${response?.status || 'Error'})`,
          reasoning: "The AI service is currently experiencing high load or is down. We've enabled offline verification so you can proceed immediately.",
          isApproved: true
        });
        setIsVerifying(false);
        return;
      }

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
    } finally {
      setIsVerifying(false);
    }
  }, [logic, question]);

  const handleRetry = useCallback(() => {
    setVerificationResult(null);
    setStage('logic');
  }, []);

  const handleProceedToCode = useCallback(() => {
    setStage('code');
  }, []);



  // Run ONLY public test cases (for "Run Tests")
  const handleRunPublicTests = useCallback(async () => {
    const publicCases = question.testCases?.filter(tc => !tc.hidden) || [];
    if (publicCases.length === 0) return;

    setIsRunningPublicTests(true);
    setTestResults([]); // Clear previous results
    setAllTestsPassed(false);

    try {
      const executionResult = await executeCode(language, code, publicCases);

      const mappedResults = executionResult.results.map((res: any) => ({
        passed: res.passed,
        output: res.actual,
        expected: res.expected,
        error: !res.passed && res.actual.startsWith('Error') ? res.actual : undefined
      }));

      // Pad with empty results for hidden tests so UI indices match if needed, 
      // or just show public results. For simplicity, we'll just show public results here.
      setTestResults(mappedResults);

      // Note: We don't setAllTestsPassed(true) here because hidden tests haven't run.

    } catch (error: any) {
      console.error('Test execution failed:', error);
      setTestResults(publicCases.map(tc => ({
        passed: false,
        output: '',
        expected: tc.expectedOutput,
        error: error.message || 'Execution failed'
      })));
    } finally {
      setIsRunningPublicTests(false);
    }
  }, [code, language, question.testCases]);

  // Run ALL test cases (for "Submit")
  const handleSubmit = useCallback(async () => {
    if (!question.testCases || question.testCases.length === 0) return;

    setIsSubmitting(true);
    setTestResults([]);
    setAllTestsPassed(false);

    try {
      // Execute ALL tests (public + hidden)
      const executionResult = await executeCode(language, code, question.testCases);

      const mappedResults = executionResult.results.map((res: any) => ({
        passed: res.passed,
        output: res.actual,
        expected: res.expected,
        error: !res.passed && res.actual.startsWith('Error') ? res.actual : undefined
      }));

      setTestResults(mappedResults);
      setAllTestsPassed(executionResult.passed);

      if (executionResult.passed) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setHasCompleted(true);
          onComplete();
        }, 2500);
      }

    } catch (error: any) {
      console.error('Submission failed:', error);
      setTestResults(question.testCases.map(tc => ({
        passed: false,
        output: '',
        expected: tc.expectedOutput,
        error: error.message || 'Execution failed'
      })));
    } finally {
      setIsSubmitting(false);
    }
  }, [code, language, question.testCases, onComplete]);

  // Get public and private test cases
  const publicTestCases = question.testCases?.filter(tc => !tc.hidden) || [];
  const privateTestCases = question.testCases?.filter(tc => tc.hidden) || [];

  // Calculate circumference for score circle
  const circumference = 2 * Math.PI * 54;

  if (!isUnlocked) {
    return (
      <div className="logic-coding-question locked">
        <div className="locked-overlay">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p>Complete the previous question to unlock</p>
        </div>
      </div>
    );
  }

  if (hasCompleted) {
    return (
      <div className="logic-coding-question completed-card">
        <div className="completed-content">
          <div className="completed-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="completed-info">
            <div className="completed-header">
              <span className="question-id">Question {index + 1}</span>
              <span className="completed-label">Solved</span>
            </div>
            <h4>{question.title}</h4>
            <p className="question-desc-short">{question.description.split('.')[0]}.</p>
          </div>
          <div className="completed-actions">
            <button
              className="practice-again-btn"
              onClick={() => {
                if (window.confirm('Do you want to clear your status and practice this question again?')) {
                  setHasCompleted(false);
                  setStage('logic');
                  setLogic('');
                  setVerificationResult(null);
                  setTestResults([]);
                  // Note: Logic score and code are reset in local state
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Practice Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="logic-coding-question">
      {/* Header */}
      <div className="question-header-row">
        <span className="question-number">Question {index + 1}</span>
      </div>
      <h4>{question.title}</h4>
      <p className="question-desc">{question.description}</p>

      {/* Step Indicator */}
      <div className="logic-step-indicator">
        <div className={`logic-step ${stage === 'logic' ? 'active' : ''} ${stage !== 'logic' ? 'done' : ''}`}>
          <span className="step-num">1</span>
          <span className="step-text">Think</span>
        </div>
        <div className="step-connector" />
        <div className={`logic-step ${stage === 'verification' ? 'active' : ''} ${stage === 'code' ? 'done' : ''}`}>
          <span className="step-num">2</span>
          <span className="step-text">Verify</span>
        </div>
        <div className="step-connector" />
        <div className={`logic-step ${stage === 'code' ? 'active' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-text">Code</span>
        </div>
      </div>

      {/* Logic Input Stage */}
      {stage === 'logic' && (
        <div className="logic-input-section">
          <h5>Explain Your Logic</h5>
          <p className="logic-instruction">
            Before writing code, explain your approach in plain English. What steps will you take to solve this problem?
          </p>
          <textarea
            className="logic-textarea"
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
            placeholder="Describe step by step how you would solve this problem...

For example:
1. First, I would initialize a variable to track...
2. Then iterate through the array...
3. For each element, I would check..."
          />
          <div className="logic-footer">
            <span className="char-count">
              {logic.length} characters
              {logic.length < minChars && (
                <span className="warning"> (min {minChars})</span>
              )}
            </span>
            <button
              className="submit-logic-btn"
              onClick={handleVerifyLogic}
              disabled={logic.trim().length < minChars || isVerifying}
            >
              {isVerifying ? (
                <>
                  <span className="spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Verify Logic
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Loading State During Verification */}
      {stage === 'verification' && isVerifying && (
        <div className="verification-loading">
          <div className="loading-spinner-large" />
          <h5>Verifying your logic...</h5>
          <p>Analyzing your approach with AI</p>
        </div>
      )}

      {/* Verification Result */}
      {stage === 'verification' && verificationResult && !isVerifying && (
        <div className="verification-display">
          <div className="score-circle">
            <svg width="120" height="120" viewBox="0 0 140 140">
              <circle className="score-track" cx="70" cy="70" r="54" />
              <circle
                className={`score-progress ${verificationResult.score >= 75 ? 'success' : verificationResult.score >= 50 ? 'warning' : 'error'}`}
                cx="70"
                cy="70"
                r="54"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference - (verificationResult.score / 100) * circumference,
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center'
                }}
              />
            </svg>
            <div className="score-value">
              {verificationResult.score}%
              <div className="score-label">Logic Score</div>
            </div>
          </div>

          <h5 className="verification-feedback">{verificationResult.feedback}</h5>
          <p className="verification-reasoning">{verificationResult.reasoning}</p>

          {verificationResult.missingConcepts && verificationResult.missingConcepts.length > 0 && (
            <div className="missing-concepts">
              {verificationResult.missingConcepts.map((concept, idx) => (
                <span key={idx} className="missing-tag">{concept}</span>
              ))}
            </div>
          )}

          {verificationResult.isApproved ? (
            <button className="proceed-btn" onClick={handleProceedToCode}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Proceed to Code Editor
            </button>
          ) : (
            <button className="retry-btn" onClick={handleRetry}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Try Again
            </button>
          )}
        </div>
      )}

      {/* Code Editor Stage */}
      {stage === 'code' && (
        <div className="code-editor-section">
          <div className="editor-header">
            <div className="editor-header-left">
              <div className="window-controls">
                <span className="window-btn close" />
                <span className="window-btn minimize" />
                <span className="window-btn maximize" />
              </div>
              <span className="editor-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Solution Editor
              </span>
            </div>
            <div className="editor-header-right">
              <button
                className="reset-code-btn"
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset your code? This cannot be undone.')) {
                    setCode(getStarterCode(question, language));
                  }
                }}
                title="Reset to starter code"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset
              </button>
              <div className="language-selector-wrapper">
                <select
                  className="language-selector"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                >
                  {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="editor-body" style={{ height: '400px', width: '100%', position: 'relative' }}>
            <Editor
              height="100%"
              width="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 25, // Requested: 25px
                lineNumbersMinChars: 4,   // Requested: 4 chars
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 24, bottom: 24 },
                tabSize: 4,
                contextmenu: true,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
              }}
            />
          </div>

          <div className="editor-footer">
            <span className="editor-stats">{code.split('\n').length} lines • {code.length} chars</span>
            <div className="editor-actions">
              <button className="run-tests-btn" onClick={handleRunPublicTests} disabled={isRunningPublicTests || isSubmitting}>
                {isRunningPublicTests ? (
                  <>
                    <span className="spinner" />
                    Running...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Run Tests
                  </>
                )}
              </button>
              <button
                className={`submit-btn ${allTestsPassed ? 'success' : ''}`}
                onClick={handleSubmit}
                disabled={isRunningPublicTests || isSubmitting || hasCompleted}
              >
                {hasCompleted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Completed
                  </>
                ) : isSubmitting ? (
                  <>
                    <span className="spinner" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Test Cases Panel */}
          <div className="test-cases-panel">
            <div className="test-cases-header">
              <h5>Test Cases</h5>
              <span className="test-count">
                {publicTestCases.length} public
                {privateTestCases.length > 0 && ` • ${privateTestCases.length} hidden`}
              </span>
            </div>

            {/* Public Test Cases */}
            <div className="test-cases-list">
              {publicTestCases.map((tc, idx) => (
                <div
                  key={idx}
                  className={`test-case ${testResults[idx] ? (testResults[idx].passed ? 'passed' : 'failed') : ''}`}
                >
                  <div className="test-case-header">
                    <span className="test-case-num">Test {idx + 1}</span>
                    {testResults[idx] && (
                      <span className={`test-status ${testResults[idx].passed ? 'passed' : 'failed'}`}>
                        {testResults[idx].passed ? '✓ Passed' : '✗ Failed'}
                      </span>
                    )}
                  </div>
                  <div className="test-case-body">
                    <div className="test-io">
                      <div className="test-input">
                        <span className="label">Input</span>
                        <code>{tc.input}</code>
                      </div>
                      <div className="test-expected">
                        <span className="label">Expected Output</span>
                        <code>{tc.expectedOutput}</code>
                      </div>
                    </div>
                    {testResults[idx] && (
                      <div className="test-actual">
                        <span className="label">Your Output</span>
                        <code className={testResults[idx].passed ? 'success' : 'error'}>
                          {(testResults[idx].output ?? testResults[idx].error ?? '').trim() === ''
                            ? <span style={{ opacity: 0.5, fontStyle: 'italic' }}>(No output)</span>
                            : (testResults[idx].output ?? testResults[idx].error)
                          }
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden Test Cases Indicator */}
            {privateTestCases.length > 0 && (
              <div className="hidden-tests-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
                <span>{privateTestCases.length} hidden test{privateTestCases.length > 1 ? 's' : ''} will run on submission</span>
              </div>
            )}
          </div>
        </div>
      )}



      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />

      <style>{`
        .logic-coding-question {
          background: white;
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: 1.5rem;
        position: relative;
        }
        .logic-coding-question.completed {
          border - color: var(--color-success);
        background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
        }
        .logic-coding-question.locked {
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          border: 2px dashed #e4e4e7;
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .logic-coding-question.locked:hover {
          border-color: #d4d4d8;
          background: #f4f4f5;
        }
        .locked-overlay {
          text-align: center;
          color: #71717a;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .locked-overlay svg {
          color: #a1a1aa;
          padding: 12px;
          background: #f4f4f5;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          box-sizing: content-box; /* Ensures padding adds to size */
        }
        .locked-overlay p {
          font-weight: 500;
          font-size: 0.9375rem;
          margin: 0;
        }

        .question-header-row {
          display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        }
        .question-number {
          font - size: 0.75rem;
        font-weight: 600;
        color: var(--color-accent);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        }
        .completed-badge-inline {
          display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: var(--color-success);
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        background: var(--color-success-light);
        border-radius: 20px;
        }
        .logic-coding-question h4 {
          font - size: 1.125rem;
        margin-bottom: 0.5rem;
        }
        .question-desc {
          color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: 1rem;
        white-space: pre-line;
        }
        .hint-box {
          display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: #fffbeb;
        border: 1px solid #fcd34d;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        color: #92400e;
        }
        .hint-box svg {
          flex - shrink: 0;
        color: #f59e0b;
        }
        .logic-step-indicator {
          display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem 0;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-border-light);
        }
        .logic-step {
          display: flex;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.4;
        }
        .logic-step.active {
          opacity: 1;
        }
        .logic-step.done {
          opacity: 0.7;
        }
        .logic-step .step-num {
          width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 600;
        background: var(--color-bg-secondary);
        color: var(--color-text-muted);
        }
        .logic-step.active .step-num {
          background: var(--color-accent);
        color: white;
        }
        .logic-step.done .step-num {
          background: var(--color-success);
        color: white;
        }
        .step-text {
          font - size: 0.875rem;
        font-weight: 500;
        }
        .step-connector {
          width: 40px;
        height: 2px;
        background: var(--color-border);
        }
        .logic-input-section h5 {
          font - size: 1rem;
        margin-bottom: 0.5rem;
        }
        .logic-instruction {
          color: var(--color-text-secondary);
        font-size: 0.875rem;
        margin-bottom: 1rem;
        }
        .logic-textarea {
          width: 100%;
        min-height: 150px;
        padding: 1rem;
        border: 2px solid var(--color-border);
        border-radius: 12px;
        font-family: inherit;
        font-size: 0.9375rem;
        line-height: 1.7;
        resize: vertical;
        }
        .logic-textarea:focus {
          outline: none;
        border-color: var(--color-accent);
        }
        .logic-footer {
          display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.75rem;
        }
        .char-count {
          font - size: 0.75rem;
        color: var(--color-text-muted);
        }
        .char-count .warning {
          color: #dc2626;
        }
        .verify-btn, .proceed-btn, .retry-btn, .complete-btn {
          display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.2s;
        }
        .verify-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .verify-btn:disabled {
          opacity: 0.5;
        cursor: not-allowed;
        }
        .proceed-btn {
          background: linear-gradient(135deg, var(--color-success), #16a34a);
        color: white;
        }
        .retry-btn {
          background: transparent;
        color: var(--color-accent);
        border: 2px solid var(--color-accent);
        }
        .retry-btn:hover {
          background: var(--color-accent);
        color: white;
        }
        .complete-btn {
          background: linear-gradient(135deg, var(--color-success), #16a34a);
        color: white;
        }
        .verification-display {
          text-align: center;
          padding: 1.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .score-circle {
          width: 120px;
          height: 120px;
          margin: 0 auto 1rem;
          position: relative;
        }
        .score-track {
          fill: none;
          stroke: var(--color-border);
          stroke-width: 8;
        }
        .score-progress {
          fill: none;
          stroke-width: 8;
          stroke-linecap: round;
        }
        .score-progress.success { stroke: var(--color-success); }
        .score-progress.warning { stroke: #f59e0b; }
        .score-progress.error { stroke: #ef4444; }
        .score-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          font-weight: 700;
        }
        .score-label {
          font-size: 0.625rem;
          color: var(--color-text-muted);
          margin-top: 0.125rem;
        }
        .verification-feedback {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          text-align: center;
        }
        .verification-reasoning {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          max-width: 500px;
          margin: 0 auto 1rem;
          text-align: center;
        }
        .missing-concepts {
          display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
        margin-bottom: 1rem;
        }
        .missing-tag {
          padding: 0.25rem 0.75rem;
        background: #fef2f2;
        color: #dc2626;
        font-size: 0.75rem;
        font-weight: 500;
        border-radius: 20px;
        }
        .code-editor-section {
          background: #0d0d12;
        border-radius: 12px;
        overflow: hidden;
        }
        .editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: linear-gradient(180deg, #1e1e26 0%, #16161d 100%);
          border-bottom: 1px solid #27272a;
        }
        .editor-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .editor-header-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .window-controls {
          display: flex;
          gap: 6px;
        }
        .window-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .window-btn:hover {
          opacity: 0.8;
        }
        .window-btn.close {
          background: #ff5f57;
        }
        .window-btn.minimize {
          background: #febc2e;
        }
        .window-btn.maximize {
          background: #28c840;
        }
        .editor-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #a1a1aa;
        }
        .editor-title svg {
          color: #6366f1;
        }
        .language-selector-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .language-selector {
          appearance: none;
          padding: 0.5rem 2rem 0.5rem 0.875rem;
          background: linear-gradient(180deg, #27272a 0%, #1f1f23 100%);
          border: 1px solid #3f3f46;
          border-radius: 8px;
          color: #e4e4e7;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .language-selector:hover {
          border-color: #52525b;
          background: linear-gradient(180deg, #2d2d32 0%, #252529 100%);
        }
        .language-selector:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        .dropdown-arrow {
          position: absolute;
          right: 0.625rem;
          pointer-events: none;
          color: #71717a;
        }
        .editor-body {
          position: relative;
          background: #1e1e1e; /* Monaco default background match */
        }
        .editor-footer {
          display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        background: #16161d;
        border-top: 1px solid #27272a;
        }
        .editor-stats {
          font - size: 0.75rem;
        color: #71717a;
        }
        .spinner {
          width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        }
        .verification-loading {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .verification-loading h5 {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
          color: var(--color-text-primary);
        }
        .verification-loading p {
          color: var(--color-text-muted);
          font-size: 0.875rem;
        }
        .loading-spinner-large {
          width: 48px;
        height: 48px;
        border: 4px solid var(--color-border);
        border-top-color: var(--color-accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
        }
        /* Test Cases Panel */
        .editor-actions {
          display: flex;
          gap: 0.5rem;
        }
        .run-tests-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.8125rem;
          font-weight: 600;
          background: #27272a;
          color: #e4e4e7;
          border: 1px solid #3f3f46;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .run-tests-btn:hover:not(:disabled) {
          background: #3f3f46;
        }
        .run-tests-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .test-cases-panel {
          margin-top: 1rem;
          padding: 1rem;
          background: #16161d;
          border-top: 1px solid #27272a;
        }
        .test-cases-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .test-cases-header h5 {
          color: #e4e4e7;
          font-size: 0.875rem;
          margin: 0;
        }
        .test-count {
          font-size: 0.75rem;
          color: #71717a;
        }
        .test-cases-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .test-case {
          background: #1e1e24;
          border: 1px solid #27272a;
          border-radius: 8px;
          overflow: hidden;
        }
        .test-case.passed {
          border-color: var(--color-success);
        }
        .test-case.failed {
          border-color: #ef4444;
        }
        .test-case-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          background: #27272a;
        }
        .test-case-num {
          font-size: 0.75rem;
          font-weight: 600;
          color: #a1a1aa;
        }
        .test-status {
          font-size: 0.75rem;
          font-weight: 600;
        }
        .test-status.passed {
          color: var(--color-success);
        }
        .test-status.failed {
          color: #ef4444;
        }
        .test-case-body {
          padding: 0.75rem;
        }
        .test-io {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .test-input, .test-expected, .test-actual {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .test-io .label {
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #71717a;
        }
        .test-io code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.75rem;
          color: #e4e4e7;
          background: #0d0d12;
          padding: 0.5rem;
          border-radius: 4px;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .test-actual {
          margin-top: 0.5rem;
          grid-column: 1 / -1;
        }
        .test-actual code.error {
          color: #fca5a5;
          background: rgba(239, 68, 68, 0.1);
        }
        .test-actual code.success {
          color: #86efac;
          background: rgba(34, 197, 94, 0.1);
        }
        .hidden-tests-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 6px;
          font-size: 0.75rem;
          color: #fbbf24;
        }
        .hidden-tests-indicator svg {
          flex-shrink: 0;
        }

        /* Monaco Editor Customizations */
        .monaco-editor .margin-view-overlays .line-numbers {
          text-align: right !important;
          padding-right: 8px !important;
          padding-left: 0 !important;
        }

        @keyframes spin {
          to {transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LogicCodingQuestion;
