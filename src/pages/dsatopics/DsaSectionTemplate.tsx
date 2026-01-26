import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../../components/animations';
import { ConfirmationModal } from '../../components/ui';
import { LogicCodingQuestion } from '../../components/dsa/LogicCodingQuestion';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

// Types
import type { Topic, CodingQuestionData, SectionInfo } from '../../types/dsa';

interface DsaSectionTemplateProps {
    sectionId: string; // e.g., 'arrays', 'linked-list'
    sectionInfo: SectionInfo;
    topics: Topic[];
    codingQuestions?: CodingQuestionData[];
}

// Helper to resolve asset paths locally or in production
const getAssetUrl = (path: string) => {
    // Remove leading slash if present to avoid double slashes with BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};

// Topic Content Component
const TopicContent = ({
    topic,
    isUnlocked,
    onComplete,
}: {
    topic: Topic;
    isUnlocked: boolean;
    onComplete: () => void;
}) => {
    const [step, setStep] = useState<'concept' | 'video' | 'pdf' | 'quiz'>('concept');
    const [videoWatched, setVideoWatched] = useState(false);
    const [pdfViewed, setPdfViewed] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<number[]>(() => Array(topic.quiz.length).fill(-1));
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizPassed, setQuizPassed] = useState(false);

    const handleQuizSubmit = () => {
        const correctCount = topic.quiz.reduce(
            (count, q, i) => count + (quizAnswers[i] === q.correct ? 1 : 0),
            0
        );
        setQuizSubmitted(true);
        // Pass if >= 2 correct, or majority if < 3 questions (just in case)
        const minPass = Math.min(2, Math.ceil(topic.quiz.length * 0.6));
        if (correctCount >= minPass) {
            setQuizPassed(true);
            setTimeout(onComplete, 1000);
        }
    };

    const resetQuiz = () => {
        setQuizAnswers(Array(topic.quiz.length).fill(-1));
        setQuizSubmitted(false);
    };

    if (!isUnlocked) {
        return (
            <div className="topic-locked">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p>Complete previous topics to unlock</p>
            </div>
        );
    }

    return (
        <div className="topic-content">
            {/* Step Navigation */}
            <div className="step-nav">
                {['concept', 'video', 'pdf', 'quiz'].map((s, i) => (
                    <button
                        key={s}
                        className={`step-btn ${step === s ? 'active' : ''} ${(s === 'video' && !videoWatched && step !== 'video') ||
                            (s === 'pdf' && !pdfViewed && step !== 'pdf') ||
                            (s === 'quiz' && !pdfViewed)
                            ? 'locked'
                            : ''
                            }`}
                        onClick={() => {
                            if (s === 'concept') setStep('concept');
                            else if (s === 'video') setStep('video');
                            else if (s === 'pdf' && videoWatched) setStep('pdf');
                            else if (s === 'quiz' && pdfViewed) setStep('quiz');
                        }}
                    >
                        <span className="step-num">{i + 1}</span>
                        <span className="step-label">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                    </button>
                ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                {step === 'concept' && (
                    <motion.div
                        key="concept"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="step-content"
                    >
                        <h3>Concept Overview</h3>
                        <div className="concept-text">
                            {topic.concept.split('\n\n').map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                        <button className="btn btn-primary" onClick={() => setStep('video')}>
                            Continue to Video
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </motion.div>
                )}

                {step === 'video' && (
                    <motion.div
                        key="video"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="step-content"
                    >
                        <h3>Video Explanation</h3>
                        <div className="video-container">
                            {topic.video.src && (topic.video.src.includes('youtube.com') || topic.video.src.includes('youtu.be')) ? (
                                <iframe
                                    className="video-player"
                                    src={`https://www.youtube.com/embed/${topic.video.src.split('/').pop()?.split('?')[0].replace('watch', '')}`} // Simple extraction, better to be robust
                                    title={topic.video.title}
                                    style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : topic.video.src ? (
                                <video
                                    className="video-player"
                                    controls
                                    onEnded={() => setVideoWatched(true)}
                                    onTimeUpdate={(e) => {
                                        const video = e.currentTarget;
                                        if (video.currentTime / video.duration > 0.9) {
                                            setVideoWatched(true);
                                        }
                                    }}
                                >
                                    <source src={getAssetUrl(topic.video.src)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="video-placeholder">
                                    <div className="video-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <h4>{topic.video.title}</h4>
                                    <p>Duration: {topic.video.duration}</p>
                                    <p className="video-note">Video content will be uploaded</p>
                                </div>
                            )}
                        </div>
                        {!videoWatched ? (
                            <button className="btn btn-primary" onClick={() => setVideoWatched(true)}>
                                Mark as Watched
                            </button>
                        ) : (
                            <div className="completed-badge">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Video Completed
                            </div>
                        )}
                        {videoWatched && (
                            <button className="btn btn-primary" onClick={() => setStep('pdf')}>
                                Continue to Notes
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </motion.div>
                )}

                {step === 'pdf' && (
                    <motion.div
                        key="pdf"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="step-content"
                    >
                        <h3>Study Notes</h3>
                        <div className="pdf-container">
                            <div className="pdf-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                <div>
                                    <h4>{topic.pdf.filename}</h4>
                                    <p>{topic.pdf.src ? 'Click to view or download' : 'PDF will be uploaded'}</p>
                                </div>
                                {topic.pdf.src ? (
                                    <a href={getAssetUrl(topic.pdf.src)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" download>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download
                                    </a>
                                ) : (
                                    <button className="btn btn-secondary btn-sm" disabled>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download
                                    </button>
                                )}
                            </div>
                            {topic.pdf.src && (
                                <div className="pdf-preview">
                                    <iframe src={getAssetUrl(topic.pdf.src)} title={topic.pdf.filename} />
                                </div>
                            )}
                            <div className="pdf-contents">
                                <h5>Contents:</h5>
                                <ul>
                                    {topic.pdf.contents.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {!pdfViewed ? (
                            <button className="btn btn-primary" onClick={() => setPdfViewed(true)}>
                                Mark as Read
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setStep('quiz')}>
                                Continue to Quiz
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </motion.div>
                )}

                {step === 'quiz' && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="step-content"
                    >
                        <h3>Quiz</h3>
                        <p className="quiz-instruction">Answer all 3 questions to complete this topic. You need at least 2 correct answers.</p>
                        <div className="quiz-questions">
                            {topic.quiz.map((q, qIndex) => (
                                <div key={qIndex} className={`quiz-question ${quizSubmitted ? (quizAnswers[qIndex] === q.correct ? 'correct' : 'incorrect') : ''}`}>
                                    <p className="question-text">{qIndex + 1}. {q.question}</p>
                                    <div className="options">
                                        {q.options.map((opt, oIndex) => (
                                            <label
                                                key={oIndex}
                                                className={`option ${quizAnswers[qIndex] === oIndex ? 'selected' : ''} ${quizSubmitted && oIndex === q.correct ? 'correct-answer' : ''
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`q${topic.id}-${qIndex}`}
                                                    checked={quizAnswers[qIndex] === oIndex}
                                                    onChange={() => {
                                                        if (!quizSubmitted) {
                                                            const newAnswers = [...quizAnswers];
                                                            newAnswers[qIndex] = oIndex;
                                                            setQuizAnswers(newAnswers);
                                                        }
                                                    }}
                                                    disabled={quizSubmitted}
                                                />
                                                <span className="option-letter">{String.fromCharCode(97 + oIndex)})</span>
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!quizSubmitted ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleQuizSubmit}
                                disabled={quizAnswers.includes(-1)}
                            >
                                Submit Answers
                            </button>
                        ) : quizPassed ? (
                            <div className="quiz-result success">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Great job! Topic completed!
                            </div>
                        ) : (
                            <div className="quiz-result error">
                                <p>You need at least 2 correct answers. Try again!</p>
                                <button className="btn btn-secondary" onClick={resetQuiz}>
                                    Retry Quiz
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const DsaSectionTemplate = ({ sectionId, sectionInfo, topics, codingQuestions = [] }: DsaSectionTemplateProps) => {
    // LocalStorage key for progress
    const PROGRESS_KEY = `dsa_${sectionId}_completed`;
    const CODING_PROGRESS_KEY = `dsa_${sectionId}_coding_completed`;

    const loadProgress = (): number[] => {
        try {
            const saved = localStorage.getItem(PROGRESS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    };

    const loadCodingProgress = (): number[] => {
        try {
            const saved = localStorage.getItem(CODING_PROGRESS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    };

    const [completedTopics, setCompletedTopics] = useState<number[]>(loadProgress());
    const [completedCodingQuestions, setCompletedCodingQuestions] = useState<number[]>(loadCodingProgress());
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [expandedTopic, setExpandedTopic] = useState<number | null>(() => {
        const saved = loadProgress();
        for (let i = 1; i <= topics.length; i++) {
            if (!saved.includes(i)) return i;
        }
        return null;
    });

    // Auto-expand first if nothing completed and not set - Handled by useState initializer
    // useEffect removed to avoid redundant logic and lint errors

    const { user } = useAuth();
    const { markTopicComplete: markTopicCompleteCtx, resetSection, progress } = useProgress();

    // Sync from Firestore/Context to Local State on load
    useEffect(() => {
        if (!user || !progress?.dsa?.[sectionId]) return;

        const sectionProgress = progress.dsa[sectionId];
        const ctxCompletedIds: number[] = [];

        // Map context progress (string/slug keys) back to numeric IDs
        topics.forEach(topic => {
            const key = topic.slug || topic.id.toString();
            // @ts-ignore
            if (sectionProgress[key]?.completed) {
                ctxCompletedIds.push(topic.id);
            }
        });

        // Merge with local storage
        if (ctxCompletedIds.length > 0) {
            setCompletedTopics(prev => {
                const unique = new Set([...prev, ...ctxCompletedIds]);
                return unique.size > prev.length ? [...unique] : prev;
            });
        }
    }, [user, progress, sectionId, topics]);

    // Persist to local storage
    useEffect(() => {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedTopics));
    }, [completedTopics, PROGRESS_KEY]);

    useEffect(() => {
        localStorage.setItem(CODING_PROGRESS_KEY, JSON.stringify(completedCodingQuestions));
    }, [completedCodingQuestions, CODING_PROGRESS_KEY]);

    const progress_display = completedTopics.length;
    const allTopicsCompleted = completedTopics.length === topics.length;

    const handleTopicComplete = async (topicId: number) => {
        if (!completedTopics.includes(topicId)) {
            const newCompleted = [...completedTopics, topicId];
            setCompletedTopics(newCompleted); // Immediate UI update

            // Sync to Context/Firestore
            const topic = topics.find(t => t.id === topicId);
            if (topic) {
                const key = topic.slug || topic.id.toString();
                // @ts-ignore
                await markTopicCompleteCtx('dsa', sectionId, key);
            }

            if (topicId < topics.length) {
                setExpandedTopic(topicId + 1);
            }
        }
    };

    const handleCodingComplete = (questionId: number) => {
        if (!completedCodingQuestions.includes(questionId)) {
            const newCompleted = [...completedCodingQuestions, questionId];
            setCompletedCodingQuestions(newCompleted);
        }
    };

    const isTopicUnlocked = (topicId: number) => {
        if (topicId === 1) return true;
        return completedTopics.includes(topicId - 1);
    };

    return (
        <div className="dsa-section-template">
            <ConfirmationModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={async () => {
                    localStorage.removeItem(PROGRESS_KEY);
                    localStorage.removeItem(CODING_PROGRESS_KEY);
                    setCompletedTopics([]);
                    setCompletedCodingQuestions([]);
                    setExpandedTopic(1);
                    if (user) {
                        // @ts-ignore
                        await resetSection('dsa', sectionId);
                    }
                    window.location.reload();
                }}
                title="Reset Section Progress?"
                message="Are you sure you want to reset your progress? This cannot be undone."
                confirmText="Yes, Reset"
                cancelText="Cancel"
                isDangerous={true}
            />

            <div className="container">
                <FadeInUp>
                    <div className="section-header">
                        <Link to="/courses/dsa" className="back-link">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to DSA Course
                        </Link>
                        <h1>{sectionInfo.title}</h1>
                        <p className="section-description">{sectionInfo.description}</p>
                        <div className="section-progress">
                            <span>{progress_display} / {sectionInfo.totalTopics} completed</span>
                            <div className="progress-bar">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(progress_display / sectionInfo.totalTopics) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>
                    </div>
                </FadeInUp>

                <div className="topics-list">
                    {topics.map((topic) => {
                        const isCompleted = completedTopics.includes(topic.id);
                        const isUnlocked = isTopicUnlocked(topic.id);
                        const isExpanded = expandedTopic === topic.id;

                        return (
                            <motion.div
                                key={topic.id}
                                className={`topic-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: topic.id * 0.1 }}
                            >
                                <button
                                    className="topic-header"
                                    onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                                    disabled={!isUnlocked}
                                >
                                    <div className="topic-info">
                                        <div className={`topic-status ${isCompleted ? 'completed' : isUnlocked ? 'available' : 'locked'}`}>
                                            {isCompleted ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : isUnlocked ? (
                                                <span>{topic.id}</span>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <h3>Topic {topic.id}: {topic.title}</h3>
                                            {isCompleted && <span className="completed-label">Completed</span>}
                                        </div>
                                    </div>
                                    <motion.svg
                                        className="expand-icon"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                    >
                                        <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                </button>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            className="topic-body"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <TopicContent
                                                topic={topic}
                                                isUnlocked={isUnlocked}
                                                onComplete={() => handleTopicComplete(topic.id)}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Coding Section (only if questions exist) */}
                {codingQuestions.length > 0 && (
                    <>
                        {allTopicsCompleted ? (
                            <motion.div
                                className="coding-section"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <ScrollReveal>
                                    <div className="coding-header-section">
                                        <h2>Section Coding Questions</h2>
                                        <p className="coding-philosophy">"Think first. Code later. Understand deeply."</p>
                                        <p>Complete these coding exercises using the logic-first approach.</p>

                                        <div className="coding-progress">
                                            <span>{completedCodingQuestions.length} / {codingQuestions.length} completed</span>
                                            <div className="progress-bar">
                                                <motion.div
                                                    className="progress-fill"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(completedCodingQuestions.length / codingQuestions.length) * 100}%` }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <div className="coding-questions-list">
                                    {codingQuestions.map((q, i) => (
                                        <LogicCodingQuestion
                                            key={q.id}
                                            question={q}
                                            index={i}
                                            sectionId={sectionId}
                                            isUnlocked={i === 0 || completedCodingQuestions.includes(codingQuestions[i - 1].id)}
                                            onComplete={() => handleCodingComplete(q.id)}
                                            isCompleted={completedCodingQuestions.includes(q.id)}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="coding-locked">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <p>Complete all topics to unlock coding questions</p>
                                <span className="progress-text">{progress_display} / {sectionInfo.totalTopics} topics completed</span>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
                .dsa-section-template {
                    min-height: 100vh;
                    padding: 2rem 0 4rem;
                }
                .section-header { margin-bottom: 2.5rem; }
                .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-accent); text-decoration: none; font-size: 0.875rem; margin-bottom: 1rem; }
                .back-link:hover { text-decoration: underline; }
                .section-header h1 { font-size: 2rem; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
                .section-description { color: var(--color-text-secondary); line-height: 1.7; max-width: 700px; margin-bottom: 1.5rem; }
                .section-progress { display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; color: var(--color-text-secondary); }
                .progress-bar { flex: 1; max-width: 300px; height: 8px; background: var(--color-bg-secondary); border-radius: 4px; overflow: hidden; }
                .progress-fill { height: 100%; background: var(--color-accent); border-radius: 4px; }
                .topics-list { display: flex; flex-direction: column; gap: 1rem; max-width: 800px; }
                .topic-card { background: white; border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; }
                .topic-card.completed { border-color: var(--color-success); }
                .topic-card.locked { opacity: 0.7; }
                .topic-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: none; border: none; cursor: pointer; text-align: left; }
                .topic-header:disabled { cursor: not-allowed; }
                .topic-header:hover:not(:disabled) { background: var(--color-bg-secondary); }
                .topic-info { display: flex; align-items: center; gap: 1rem; }
                .topic-status { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 600; font-size: 0.875rem; }
                .topic-status.completed { background: var(--color-success-light); color: var(--color-success); }
                .topic-status.available { background: var(--color-accent-lighter); color: var(--color-accent); }
                .topic-status.locked { background: var(--color-bg-secondary); color: var(--color-text-muted); }
                .topic-status svg { width: 18px; height: 18px; }
                .topic-info h3 { font-size: 1rem; color: var(--color-text-primary); margin-bottom: 0.125rem; }
                .completed-label { font-size: 0.75rem; color: var(--color-success); }
                .expand-icon { width: 20px; height: 20px; color: var(--color-text-muted); }
                .topic-body { overflow: hidden; border-top: 1px solid var(--color-border-light); }
                .topic-content { padding: 1.5rem; }
                .topic-locked { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2rem; color: var(--color-text-muted); }
                .topic-locked svg { width: 32px; height: 32px; }
                .step-nav { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border-light); }
                .step-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--color-bg-secondary); border: none; border-radius: 8px; cursor: pointer; font-size: 0.875rem; color: var(--color-text-secondary); transition: all 0.2s; }
                .step-btn.active { background: var(--color-accent); color: #ffffff; }
                .step-btn.locked { opacity: 0.5; cursor: not-allowed; }
                .step-num { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.1); border-radius: 50%; font-size: 0.75rem; font-weight: 600; }
                .step-btn.active .step-num { background: rgba(255,255,255,0.25); color: #ffffff; }
                .step-btn.active .step-label { color: #ffffff; }
                .step-content h3 { font-size: 1.25rem; margin-bottom: 1rem; }
                .concept-text p { color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 1rem; }
                .step-content .btn { margin-top: 1.5rem; }
                .video-container { margin-bottom: 1.5rem; }
                .video-player { width: 100%; max-height: 450px; border-radius: 12px; background: #000; }
                .pdf-preview { margin: 1rem 0; border-radius: 8px; overflow: hidden; border: 1px solid var(--color-border); }
                .pdf-preview iframe { width: 100%; height: 500px; border: none; }
                .video-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 2rem; background: var(--color-bg-secondary); border-radius: 12px; border: 1px solid var(--color-border); text-align: center; }
                .video-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: var(--color-accent); color: white; border-radius: 50%; margin-bottom: 1rem; }
                .video-icon svg { width: 22px; height: 22px; }
                .video-placeholder h4 { margin-bottom: 0.25rem; }
                .video-placeholder p { color: var(--color-text-muted); font-size: 0.875rem; }
                .video-note { font-style: italic; margin-top: 0.5rem; }
                .completed-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--color-success-light); color: var(--color-success); border-radius: 2rem; font-size: 0.875rem; font-weight: 500; margin-bottom: 1rem; }
                .completed-badge svg { width: 16px; height: 16px; }
                .pdf-container { background: var(--color-bg-secondary); border-radius: 12px; border: 1px solid var(--color-border); padding: 1.5rem; margin-bottom: 1.5rem; }
                .pdf-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
                .pdf-header svg { width: 32px; height: 32px; color: var(--color-accent); }
                .pdf-header h4 { flex: 1; margin-bottom: 0.125rem; }
                .pdf-header p { color: var(--color-text-muted); font-size: 0.8125rem; }
                .pdf-contents { padding-top: 1rem; border-top: 1px solid var(--color-border-light); }
                .pdf-contents h5 { font-size: 0.875rem; margin-bottom: 0.5rem; }
                .pdf-contents ul { list-style: none; padding: 0; }
                .pdf-contents li { padding: 0.375rem 0; padding-left: 1rem; position: relative; color: var(--color-text-secondary); font-size: 0.9375rem; }
                .pdf-contents li::before { content: '•'; position: absolute; left: 0; color: var(--color-accent); }
                .quiz-instruction { color: var(--color-text-secondary); margin-bottom: 1.5rem; }
                .quiz-questions { display: flex; flex-direction: column; gap: 1.5rem; }
                .quiz-question { padding: 1.25rem; background: var(--color-bg-secondary); border-radius: 10px; border: 2px solid transparent; }
                .quiz-question.correct { border-color: var(--color-success); background: var(--color-success-light); }
                .quiz-question.incorrect { border-color: #dc2626; background: #fef2f2; }
                .question-text { font-weight: 500; margin-bottom: 1rem; }
                .options { display: flex; flex-direction: column; gap: 0.5rem; }
                .option { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: white; border-radius: 8px; cursor: pointer; border: 1px solid var(--color-border-light); transition: all 0.2s; }
                .option:hover { border-color: var(--color-accent); }
                .option.selected { background: var(--color-accent-lighter); border-color: var(--color-accent); }
                .option.correct-answer { background: var(--color-success-light); border-color: var(--color-success); }
                .option input { display: none; }
                .option-letter { font-weight: 600; color: var(--color-text-muted); }
                .quiz-result { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; font-weight: 500; }
                .quiz-result.success { background: var(--color-success-light); color: #065f46; }
                .quiz-result.success svg { width: 24px; height: 24px; }
                .quiz-result.error { flex-direction: column; align-items: flex-start; background: #fef2f2; color: #b91c1c; }
                /* Coding Section */
                .coding-section { margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--color-border); }
                .coding-header-section { margin-bottom: 2rem; }
                .coding-header-section h2 { margin-bottom: 0.5rem; }
                .coding-philosophy { font-style: italic; color: var(--color-accent); font-weight: 500; margin-bottom: 0.5rem; }
                .coding-header-section p { color: var(--color-text-secondary); }
                .coding-progress { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; font-size: 0.875rem; }
                .coding-questions-list { display: flex; flex-direction: column; gap: 1.5rem; }
                .coding-locked { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2rem; color: var(--color-text-muted); }
                .coding-locked svg { width: 32px; height: 32px; }
                .progress-text { font-size: 0.875rem; color: var(--color-text-secondary); }
                .coding-question { background: white; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.5rem; position: relative; }
                .coding-question.completed { border-color: var(--color-success); }
                .coding-question.locked { opacity: 0.6; pointer-events: none; }
                .locked-overlay { position: absolute; inset: 0; background: rgba(255, 255, 255, 0.8); display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 12px; z-index: 10; color: var(--color-text-muted); }
                .locked-overlay svg { width: 32px; height: 32px; margin-bottom: 0.5rem; }
                .step-indicator { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border); }
                .step-dot { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
                .step-dot span { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 600; background: var(--color-bg-secondary); color: var(--color-text-muted); border: 2px solid var(--color-border); }
                .step-dot.active span { background: var(--color-accent); color: white; border-color: var(--color-accent); }
                .step-dot.done span { background: var(--color-success); color: white; border-color: var(--color-success); }
                .step-dot label { font-size: 0.75rem; color: var(--color-text-muted); }
                .step-dot.active label, .step-dot.done label { color: var(--color-text-primary); font-weight: 500; }
                .step-indicator .step-line { width: 60px; height: 2px; background: var(--color-border); margin: 0 0.5rem; margin-bottom: 1.25rem; }
                .coding-question .coding-header { margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; }
                .completed-badge-inline { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; color: var(--color-success); font-weight: 600; padding: 0.25rem 0.75rem; background: var(--color-success-light); border-radius: 20px; margin-left: auto; }
                .completed-badge-inline svg { width: 14px; height: 14px; }
                .coding-num { font-size: 0.75rem; color: var(--color-accent); font-weight: 600; text-transform: uppercase; }
                .coding-question h4 { font-size: 1.125rem; margin-top: 0.25rem; }
                .problem-statement { background: var(--color-bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
                .problem-statement h5 { font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 0.5rem; }
                .problem-statement p { color: var(--color-text-primary); line-height: 1.6; }
                .info-box { display: flex; gap: 0.75rem; padding: 1rem; background: #f0f7ff; border: 1px solid #c3dafe; border-radius: 8px; margin-bottom: 1.5rem; }
                .info-box svg { width: 20px; height: 20px; color: var(--color-accent); flex-shrink: 0; margin-top: 2px; }
                .info-box p { color: #1e40af; font-size: 0.875rem; line-height: 1.5; }
                .logic-section h5 { font-size: 1rem; margin-bottom: 0.5rem; }
                .logic-instruction { color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: 1rem; }
                .logic-input { width: 100%; padding: 1rem; border: 1px solid var(--color-border); border-radius: 8px; font-size: 0.9375rem; line-height: 1.6; resize: vertical; font-family: inherit; }
                .logic-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
                .logic-meta { display: flex; gap: 1.5rem; margin-top: 0.75rem; margin-bottom: 1rem; font-size: 0.75rem; color: var(--color-text-muted); }
                .logic-meta .valid { color: var(--color-success); }
                .logic-meta .warning { color: #dc2626; }
                .feedback-box { display: flex; gap: 1rem; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
                .feedback-box.error { background: #fef2f2; border: 1px solid #fecaca; }
                .feedback-box.success { background: var(--color-success-light); border: 1px solid #a7f3d0; }
                .feedback-icon svg { width: 24px; height: 24px; }
                .feedback-box.error .feedback-icon svg { color: #dc2626; }
                .feedback-box.success svg { width: 20px; height: 20px; color: var(--color-success); }
                .feedback-content h5 { color: #dc2626; margin-bottom: 0.5rem; }
                .feedback-content p { color: #7f1d1d; font-size: 0.875rem; }
                .missing-list { list-style: none; padding: 0; margin-top: 0.75rem; }
                .missing-list li { color: #7f1d1d; font-size: 0.875rem; padding: 0.25rem 0; }
                .code-editor-section { margin-bottom: 1rem; }
                .editor-header { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: var(--color-bg-secondary); }
                
                /* Completion Box */
                .completion-box { text-align: center; padding: 2rem; }
                .completion-icon { width: 64px; height: 64px; background: var(--color-success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
                .completion-icon svg { width: 32px; height: 32px; }
                .completion-box h5 { font-size: 1.25rem; margin-bottom: 0.5rem; }
                .completion-box > p { color: var(--color-text-secondary); margin-bottom: 1rem; }

                /* Section Complete Banner */
                .section-complete-banner { text-align: center; padding: 3rem 2rem; background: linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); border: 2px solid var(--color-success); border-radius: 16px; margin-top: 2rem; }
                .banner-icon { width: 72px; height: 72px; background: var(--color-success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
                .banner-icon svg { width: 40px; height: 40px; }
                .section-complete-banner h3 { font-size: 1.5rem; margin-bottom: 0.75rem; }
                .section-complete-banner p { color: var(--color-text-secondary); margin-bottom: 1.5rem; }

                /* Run Section */
                .run-section { margin: 1rem 0; }
                .run-input-container { background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 1rem; }
                .input-header { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--color-border); font-size: 0.875rem; font-weight: 500; color: var(--color-text-secondary); }
                .input-hint { margin-left: auto; font-size: 0.75rem; color: var(--color-text-muted); }
                .user-input { width: 100%; padding: 0.75rem; background: transparent; border: none; resize: vertical; font-family: 'Fira Code', monospace; font-size: 0.875rem; color: var(--color-text-primary); }
                .user-input:focus { outline: none; }
                .run-btn { width: 100%; justify-content: center; margin-bottom: 1rem; }
                
                .output-container { background: #1e1e1e; border-radius: 8px; overflow: hidden; margin-top: 1rem; border: 1px solid #333; }
                .output-container.error { border-color: #ef4444; }
                .output-header { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: #2d2d2d; border-bottom: 1px solid #333; font-size: 0.875rem; font-weight: 500; color: #e5e5e5; }
                .output-content { padding: 1rem; margin: 0; font-family: 'Fira Code', monospace; font-size: 0.875rem; color: #e5e5e5; white-space: pre-wrap; }
                .output-container.error .output-content { color: #fca5a5; }
                
                .spinner { width: 16px; height: 16px; border: 2px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; margin-right: 0.5rem; }
                .spinner.dark { border-color: rgba(0, 0, 0, 0.3); border-top-color: var(--color-text-primary); }
                @keyframes spin { to { transform: rotate(360deg); } }
                
                .btn-icon { background: none; border: none; cursor: pointer; padding: 0.25rem; color: var(--color-text-muted); border-radius: 4px; }
                .btn-icon:hover { background: var(--color-bg-tertiary); color: var(--color-text-primary); }
            `}</style>
        </div>
    );
};
