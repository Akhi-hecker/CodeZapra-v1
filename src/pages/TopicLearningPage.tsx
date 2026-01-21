import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { FadeInUp, ScrollReveal } from '../components/animations';

// Mock topic data
const topicData = {
  id: 'variables',
  title: 'Variables and Data Types',
  number: 2,
  totalTopics: 21,
  conceptExplanation: `Variables in Python are containers that store data values. Unlike other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

Python is dynamically typed, meaning you don't need to declare the type of a variable when you create it. The type is determined automatically based on the value you assign.

**Key Concepts:**
- Variables are created using the assignment operator (=)
- Variable names must start with a letter or underscore
- Variable names are case-sensitive
- Python has several built-in data types: int, float, str, bool, list, tuple, dict, set`,
  practiceQuestion: `Write a Python function called \`create_profile\` that takes three parameters: name (string), age (integer), and is_student (boolean). The function should return a dictionary containing these values with keys "name", "age", and "is_student".

**Example:**
\`\`\`python
create_profile("Alice", 25, False)
# Returns: {"name": "Alice", "age": 25, "is_student": False}
\`\`\``,
  functionSignature: `def create_profile(name: str, age: int, is_student: bool) -> dict:
    # Write your code here
    pass`,
  testCases: [
    { input: '("Alice", 25, False)', expected: '{"name": "Alice", "age": 25, "is_student": False}' },
    { input: '("Bob", 18, True)', expected: '{"name": "Bob", "age": 18, "is_student": True}' },
    { input: '("Charlie", 30, False)', expected: '{"name": "Charlie", "age": 30, "is_student": False}' },
  ],
  studyNotes: `## Variables in Python

### What is a Variable?
A variable is a name that refers to a value stored in memory. Think of it as a labeled container.

### Naming Rules
1. Must start with a letter (a-z, A-Z) or underscore (_)
2. Can contain letters, numbers, and underscores
3. Case-sensitive (age and Age are different)
4. Cannot be a Python keyword

### Data Types
- **int**: Whole numbers (42, -17, 0)
- **float**: Decimal numbers (3.14, -0.5)
- **str**: Text strings ("Hello", 'World')
- **bool**: True or False
- **list**: Ordered, mutable collection [1, 2, 3]
- **dict**: Key-value pairs {"name": "Alice"}

### Type Checking
Use \`type()\` to check a variable's type:
\`\`\`python
x = 42
print(type(x))  # <class 'int'>
\`\`\``,
};

// Logic validation keywords
const logicKeywords = ['first', 'then', 'next', 'because', 'step', 'create', 'return', 'dictionary', 'assign', 'parameter'];

// Topic Header Component
const TopicHeader = ({ title, number, totalTopics }: { title: string; number: number; totalTopics: number }) => {
  const progress = (number / totalTopics) * 100;

  return (
    <div className="topic-header">
      <FadeInUp>
        <div className="topic-breadcrumb">
          <Link to="/courses/python">Python</Link>
          <span>/</span>
          <span>Topic {number}</span>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.1}>
        <h1>{title}</h1>
      </FadeInUp>
      <FadeInUp delay={0.15}>
        <div className="topic-progress">
          <span>Topic {number} of {totalTopics}</span>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      </FadeInUp>
    </div>
  );
};

// Concept Explanation Component
const ConceptExplanation = ({ content }: { content: string }) => {
  return (
    <section className="section-block">
      <ScrollReveal>
        <h2>Concept Overview</h2>
        <div className="concept-content">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: paragraph
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br />')
            }} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

// Video Section Component
const VideoSection = ({ onComplete }: { onComplete: () => void }) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Simulate video completion for demo
  const handleVideoEnd = () => {
    setVideoCompleted(true);
    onComplete();
  };

  // Mock video progress
  useEffect(() => {
    if (!videoCompleted) {
      const timer = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            handleVideoEnd();
            return 100;
          }
          return prev + 1;
        });
      }, 100); // Fast for demo, would be slower in production
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoCompleted]);

  return (
    <section className="section-block">
      <ScrollReveal>
        <h2>Video Explanation</h2>
        <div className="video-container">
          <div className="video-placeholder">
            <div className="video-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            </div>
            <p>Video content will be available here</p>
            <div className="video-progress">
              <div className="video-progress-bar">
                <motion.div
                  className="video-progress-fill"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <span>{videoProgress}% watched</span>
            </div>
          </div>
        </div>
        {videoCompleted && (
          <motion.div
            className="completion-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Video completed
          </motion.div>
        )}
      </ScrollReveal>
    </section>
  );
};

// Study Notes Component
const StudyNotes = ({ notes }: { notes: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="section-block">
      <ScrollReveal>
        <h2>Study Notes</h2>
        <div className="notes-actions">
          <button className="btn btn-secondary btn-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse Notes' : 'Expand Notes'}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="16"
              height="16"
              animate={{ rotate: isExpanded ? 180 : 0 }}
            >
              <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="notes-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="notes-text" dangerouslySetInnerHTML={{
                __html: notes
                  .replace(/## (.*)/g, '<h3>$1</h3>')
                  .replace(/### (.*)/g, '<h4>$1</h4>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                  .replace(/```python\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                  .replace(/\n- /g, '<br />• ')
                  .replace(/\n\d\. /g, (match) => `<br />${match.trim()} `)
                  .replace(/\n\n/g, '<br /><br />')
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollReveal>
    </section>
  );
};

// Practice Question Component
const PracticeQuestion = ({ question }: { question: string }) => {
  return (
    <section className="section-block">
      <ScrollReveal>
        <h2>Practice Question</h2>
        <div className="question-content" dangerouslySetInnerHTML={{
          __html: question
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```python\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n\n/g, '<br /><br />')
        }} />
      </ScrollReveal>
    </section>
  );
};

// Logic Explanation Component
const LogicExplanation = ({ onApprove }: { onApprove: () => void }) => {
  const [logic, setLogic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const minWords = 30;

  const wordCount = logic.trim().split(/\s+/).filter(w => w.length > 0).length;

  const validateLogic = () => {
    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      // Check minimum word count
      if (wordCount < minWords) {
        setFeedback({
          type: 'error',
          message: `Please provide a more detailed explanation. You need at least ${minWords} words. Current: ${wordCount} words.`
        });
        setIsSubmitting(false);
        return;
      }

      // Check for reasoning keywords
      const lowerLogic = logic.toLowerCase();
      const foundKeywords = logicKeywords.filter(k => lowerLogic.includes(k));

      if (foundKeywords.length < 3) {
        setFeedback({
          type: 'error',
          message: 'Please include more specific steps in your explanation. Describe what you will do first, then next, and why.'
        });
        setIsSubmitting(false);
        return;
      }

      // Approved!
      setFeedback({
        type: 'success',
        message: 'Your logic explanation has been approved! You can now write your code.'
      });
      setIsApproved(true);
      setIsSubmitting(false);
      onApprove();
    }, 1500);
  };

  return (
    <section className="section-block">
      <ScrollReveal>
        <h2>Explain Your Logic Before Coding</h2>
        <p className="section-description">
          Before writing code, explain <strong>how</strong> you would solve this problem step by step.
          This helps build strong problem-solving skills.
        </p>

        <div className="logic-input-container">
          <textarea
            className="logic-textarea"
            value={logic}
            onChange={(e) => setLogic(e.target.value)}
            placeholder="Explain your approach step by step...

For example:
1. First, I will...
2. Then, I need to...
3. Next, I will...
4. Finally, I will return..."
            disabled={isApproved}
          />
          <div className="logic-footer">
            <span className={`word-count ${wordCount >= minWords ? 'sufficient' : ''}`}>
              {wordCount} / {minWords} words minimum
            </span>
            {!isApproved && (
              <button
                className="btn btn-primary"
                onClick={validateLogic}
                disabled={isSubmitting || wordCount < 10}
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Checking...
                  </>
                ) : 'Submit Logic'}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`feedback-message ${feedback.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {feedback.type === 'success' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
                  <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
                </svg>
              )}
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollReveal>
    </section>
  );
};

// Code Editor Component
const CodeEditor = ({
  isUnlocked,
  initialCode,
  onSubmit
}: {
  isUnlocked: boolean;
  initialCode: string;
  onSubmit: (code: string) => void;
}) => {
  const [code, setCode] = useState(initialCode);
  const editorRef = useRef<unknown>(null);

  const handleEditorMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const handleRun = () => {
    // console.log('Running code:', code);
  };

  return (
    <section className="section-block">
      <ScrollReveal>
        <div className="editor-header">
          <h2>Write Your Code</h2>
          {!isUnlocked && (
            <div className="locked-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Complete logic explanation to unlock
            </div>
          )}
        </div>

        <motion.div
          className={`editor-container ${!isUnlocked ? 'locked' : ''}`}
          animate={{ opacity: isUnlocked ? 1 : 0.5 }}
        >
          <AnimatePresence>
            {!isUnlocked && (
              <motion.div
                className="editor-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p>Explain your logic first</p>
              </motion.div>
            )}
          </AnimatePresence>

          <Editor
            height="300px"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorMount}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              readOnly: !isUnlocked,
              padding: { top: 16 },
            }}
          />
        </motion.div>

        <div className="editor-actions">
          <button
            className="btn btn-secondary"
            onClick={handleRun}
            disabled={!isUnlocked}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
            Run Code
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSubmit(code)}
            disabled={!isUnlocked}
          >
            Submit Solution
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
};

// Code Evaluation Component
const CodeEvaluation = ({
  isVisible,
  testCases,
  isSuccess
}: {
  isVisible: boolean;
  testCases: typeof topicData.testCases;
  isSuccess: boolean;
}) => {
  if (!isVisible) return null;

  return (
    <motion.section
      className="section-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Code Evaluation</h2>
      <div className={`evaluation-result ${isSuccess ? 'success' : 'error'}`}>
        <div className="result-header">
          {isSuccess ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>All test cases passed!</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" />
                <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" />
              </svg>
              <span>Some test cases failed</span>
            </>
          )}
        </div>

        <div className="test-cases">
          {testCases.map((tc, i) => (
            <div key={i} className={`test-case ${isSuccess ? 'passed' : i === 0 ? 'passed' : 'failed'}`}>
              <div className="test-case-header">
                <span>Test Case {i + 1}</span>
                {(isSuccess || i === 0) ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="pass">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="fail">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div className="test-case-details">
                <div><strong>Input:</strong> <code>{tc.input}</code></div>
                <div><strong>Expected:</strong> <code>{tc.expected}</code></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Next Topic Navigation Component
const NextTopicNav = ({ isEnabled, currentTopic, totalTopics }: { isEnabled: boolean; currentTopic: number; totalTopics: number }) => {
  if (!isEnabled) return null;

  return (
    <motion.section
      className="section-block next-topic-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="next-topic-content">
        <div className="completion-message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h3>Topic Completed!</h3>
            <p>Great job! You've mastered this topic.</p>
          </div>
        </div>

        <div className="progress-update">
          <span>Progress: {currentTopic} / {totalTopics} topics</span>
          <div className="progress-bar large">
            <motion.div
              className="progress-fill"
              initial={{ width: `${((currentTopic - 1) / totalTopics) * 100}%` }}
              animate={{ width: `${(currentTopic / totalTopics) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="next-topic-actions">
          <Link to="/courses/python" className="btn btn-secondary">
            Back to Course
          </Link>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="#" className="btn btn-primary">
              Next Topic
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Main Topic Learning Page
export const TopicLearningPage = () => {
  // const { topicId } = useParams();
  const [, setVideoCompleted] = useState(false);
  const [logicApproved, setLogicApproved] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [evaluationSuccess, setEvaluationSuccess] = useState(false);

  const handleCodeSubmit = () => {
    setCodeSubmitted(true);
    // Simulate evaluation - for demo, assume success
    setTimeout(() => {
      setEvaluationSuccess(true);
    }, 500);
  };

  return (
    <div className="topic-learning-page">
      <div className="container">
        <TopicHeader
          title={topicData.title}
          number={topicData.number}
          totalTopics={topicData.totalTopics}
        />

        <ConceptExplanation content={topicData.conceptExplanation} />

        <VideoSection onComplete={() => setVideoCompleted(true)} />

        <StudyNotes notes={topicData.studyNotes} />

        <PracticeQuestion question={topicData.practiceQuestion} />

        <LogicExplanation onApprove={() => setLogicApproved(true)} />

        <CodeEditor
          isUnlocked={logicApproved}
          initialCode={topicData.functionSignature}
          onSubmit={handleCodeSubmit}
        />

        <CodeEvaluation
          isVisible={codeSubmitted}
          testCases={topicData.testCases}
          isSuccess={evaluationSuccess}
        />

        <NextTopicNav
          isEnabled={evaluationSuccess}
          currentTopic={topicData.number}
          totalTopics={topicData.totalTopics}
        />
      </div>

      <style>{`
        .topic-learning-page {
          min-height: 100vh;
          padding: 2rem 0 4rem;
        }

        /* Topic Header */
        .topic-header {
          margin-bottom: 3rem;
        }

        .topic-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
        }

        .topic-breadcrumb a {
          color: var(--color-accent);
          text-decoration: none;
        }

        .topic-breadcrumb a:hover {
          text-decoration: underline;
        }

        .topic-header h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .topic-progress {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .progress-bar {
          flex: 1;
          max-width: 200px;
          height: 6px;
          background: var(--color-bg-secondary);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar.large {
          max-width: 300px;
          height: 8px;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-accent);
          border-radius: 3px;
        }

        /* Section Blocks */
        .section-block {
          padding: 2rem 0;
          border-bottom: 1px solid var(--color-border-light);
        }

        .section-block:last-child {
          border-bottom: none;
        }

        .section-block h2 {
          font-size: 1.375rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
        }

        .section-description {
          color: var(--color-text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        /* Concept Content */
        .concept-content p {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
        }

        .concept-content strong {
          color: var(--color-text-primary);
        }

        /* Video Section */
        .video-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }

        .video-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: var(--color-bg-secondary);
          text-align: center;
        }

        .video-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent);
          color: white;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .video-icon svg {
          width: 24px;
          height: 24px;
        }

        .video-placeholder p {
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }

        .video-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          max-width: 300px;
        }

        .video-progress-bar {
          width: 100%;
          height: 4px;
          background: var(--color-border);
          border-radius: 2px;
          overflow: hidden;
        }

        .video-progress-fill {
          height: 100%;
          background: var(--color-accent);
          transition: width 0.1s;
        }

        .video-progress span {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .completion-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-success-light);
          color: var(--color-success);
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 1rem;
        }

        .completion-badge svg {
          width: 16px;
          height: 16px;
        }

        /* Study Notes */
        .notes-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .btn-ghost {
          background: transparent;
          color: var(--color-text-secondary);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-ghost:hover {
          color: var(--color-text-primary);
        }

        .notes-content {
          overflow: hidden;
        }

        .notes-text {
          padding: 1.5rem;
          background: var(--color-bg-secondary);
          border-radius: 12px;
          font-size: 0.9375rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        .notes-text h3 {
          font-size: 1.125rem;
          color: var(--color-text-primary);
          margin: 1.5rem 0 0.75rem;
        }

        .notes-text h3:first-child {
          margin-top: 0;
        }

        .notes-text h4 {
          font-size: 1rem;
          color: var(--color-text-primary);
          margin: 1rem 0 0.5rem;
        }

        .notes-text code {
          background: var(--color-bg);
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
        }

        .notes-text pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .notes-text pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        /* Practice Question */
        .question-content {
          padding: 1.5rem;
          background: var(--color-bg-secondary);
          border-radius: 12px;
          font-size: 1rem;
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        .question-content code {
          background: var(--color-bg);
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.875rem;
          color: var(--color-accent);
        }

        .question-content pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .question-content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        /* Logic Explanation */
        .logic-input-container {
          border: 1px solid var(--color-border);
          border-radius: 12px;
          overflow: hidden;
        }

        .logic-textarea {
          width: 100%;
          min-height: 200px;
          padding: 1rem;
          border: none;
          resize: vertical;
          font-family: inherit;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-text-primary);
        }

        .logic-textarea:focus {
          outline: none;
        }

        .logic-textarea:disabled {
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
        }

        .logic-textarea::placeholder {
          color: var(--color-text-muted);
        }

        .logic-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border-light);
        }

        .word-count {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        .word-count.sufficient {
          color: var(--color-success);
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          margin-right: 0.5rem;
        }

        .feedback-message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          font-size: 0.9375rem;
          line-height: 1.5;
        }

        .feedback-message svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .feedback-message.error {
          background: #fef2f2;
          color: #b91c1c;
        }

        .feedback-message.success {
          background: var(--color-success-light);
          color: #065f46;
        }

        /* Code Editor */
        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .editor-header h2 {
          margin-bottom: 0;
        }

        .locked-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          background: var(--color-bg-secondary);
          border-radius: 2rem;
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        .locked-badge svg {
          width: 14px;
          height: 14px;
        }

        .editor-container {
          position: relative;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          overflow: hidden;
        }

        .editor-container.locked {
          pointer-events: none;
        }

        .editor-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          z-index: 10;
          gap: 0.75rem;
        }

        .editor-overlay svg {
          width: 32px;
          height: 32px;
          color: var(--color-text-muted);
        }

        .editor-overlay p {
          color: var(--color-text-muted);
          font-size: 0.9375rem;
        }

        .editor-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        /* Code Evaluation */
        .evaluation-result {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }

        .result-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          font-weight: 600;
        }

        .result-header svg {
          width: 24px;
          height: 24px;
        }

        .evaluation-result.success .result-header {
          background: var(--color-success-light);
          color: #065f46;
        }

        .evaluation-result.error .result-header {
          background: #fef2f2;
          color: #b91c1c;
        }

        .test-cases {
          padding: 1rem;
        }

        .test-case {
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          background: var(--color-bg-secondary);
        }

        .test-case:last-child {
          margin-bottom: 0;
        }

        .test-case-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 500;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .test-case-header svg {
          width: 16px;
          height: 16px;
        }

        .test-case-header .pass {
          color: var(--color-success);
        }

        .test-case-header .fail {
          color: #dc2626;
        }

        .test-case-details {
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
        }

        .test-case-details code {
          background: var(--color-bg);
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
        }

        /* Next Topic */
        .next-topic-section {
          background: var(--color-bg-secondary);
          border-radius: 12px;
          padding: 2rem !important;
          margin-top: 2rem;
          border: none !important;
        }

        .next-topic-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .completion-message {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .completion-message svg {
          width: 48px;
          height: 48px;
          color: var(--color-success);
        }

        .completion-message h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .completion-message p {
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
        }

        .progress-update {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .next-topic-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .topic-header h1 {
            font-size: 1.75rem;
          }

          .topic-progress {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .progress-bar {
            max-width: 100%;
            width: 100%;
          }

          .notes-actions {
            flex-direction: column;
          }

          .editor-actions {
            flex-direction: column;
          }

          .next-topic-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default TopicLearningPage;
