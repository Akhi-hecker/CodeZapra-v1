import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../components/animations';
import { ConfirmationModal } from '../components/ui';
import { useProgress } from '../context/ProgressContext';

// LocalStorage key for progress (same as PythonBasicsSection)
const PROGRESS_KEY = 'python_basics_completed';

// Helper function to load progress
const loadProgress = (): number[] => {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Topic ID to section ID mapping
// const topicIdToName: Record<number, string> = {
//   1: 'intro',
//   2: 'variables',
//   3: 'operators',
//   4: 'strings',
//   5: 'input-output',
// };

// Course data
const courseInfo = {
  title: 'Python Programming',
  subtitle: 'Learn Python through visualization, logic-first thinking, and guided coding practice.',
  difficulty: 'Beginner to Intermediate',
  topicsCount: 21,
  duration: 'Self-paced',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
};

const learningOutcomes = [
  'Python fundamentals and syntax',
  'Logical problem-solving skills',
  'Clean coding practices',
  'Translating logic into implementation',
  'Confidence in solving real problems',
];

// Base course topics structure
const baseCourseTopics = [
  {
    id: 'basics',
    title: 'Python Basics',
    topics: [
      { id: 'intro', name: 'Introduction to Python', topicNum: 1 },
      { id: 'variables', name: 'Variables and Data Types', topicNum: 2 },
      { id: 'operators', name: 'Operators and Expressions', topicNum: 3 },
      { id: 'strings', name: 'Working with Strings', topicNum: 4 },
      { id: 'input-output', name: 'Input and Output', topicNum: 5 },
    ],
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    topics: [
      { id: 'conditions', name: 'Conditional Statements', topicNum: 6 },
      { id: 'loops', name: 'Loops (for and while)', topicNum: 7 },
      { id: 'break-continue', name: 'Break and Continue', topicNum: 8 },
      { id: 'nested', name: 'Nested Structures', topicNum: 9 },
    ],
  },
  {
    id: 'functions',
    title: 'Functions',
    topics: [
      { id: 'def', name: 'Defining Functions', topicNum: 10 },
      { id: 'params', name: 'Parameters and Arguments', topicNum: 11 },
      { id: 'return', name: 'Return Values', topicNum: 12 },
      { id: 'scope', name: 'Scope and Lifetime', topicNum: 13 },
      { id: 'lambda', name: 'Lambda Functions', topicNum: 14 },
    ],
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    topics: [
      { id: 'lists', name: 'Lists', topicNum: 15 },
      { id: 'tuples', name: 'Tuples', topicNum: 16 },
      { id: 'dicts', name: 'Dictionaries', topicNum: 17 },
      { id: 'sets', name: 'Sets', topicNum: 18 },
    ],
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    topics: [
      { id: 'approach', name: 'Problem-Solving Approach', topicNum: 19 },
      { id: 'patterns', name: 'Common Patterns', topicNum: 20 },
      { id: 'practice', name: 'Practice Problems', topicNum: 21 },
    ],
  },
];

// Function to get status based on progress
const getTopicStatus = (topicNum: number, completed: number[]): string => {
  if (completed.includes(topicNum)) return 'completed';
  // Next topic after last completed is available
  const lastCompleted = Math.max(0, ...completed);
  if (topicNum === lastCompleted + 1) return 'available';
  return 'locked';
};

const learningSteps = [
  { step: 1, title: 'Visual Explanation', description: 'Watch animated concept breakdowns' },
  { step: 2, title: 'Video & Notes', description: 'Deep dive with curated content' },
  { step: 3, title: 'Logic-First Question', description: 'Explain your approach first' },
  { step: 4, title: 'Code Editor Unlock', description: 'Write code after logic approval' },
  { step: 5, title: 'Code Evaluation', description: 'Get instant feedback' },
  { step: 6, title: 'Progress Forward', description: 'Move to the next topic' },
];

// Topic Item Component
const TopicItem = ({ topic }: { topic: { id: string; name: string; status: string } }) => {
  const getStatusIcon = () => {
    switch (topic.status) {
      case 'completed':
        return (
          <svg className="topic-status completed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'available':
        return (
          <svg className="topic-status available" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="topic-status locked" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
    }
  };

  return (
    <div className={`topic-item ${topic.status}`}>
      {getStatusIcon()}
      <span className="topic-name">{topic.name}</span>
    </div>
  );
};

// Topic Section Component
const TopicSection = ({
  section,
  index,
  completedProgress
}: {
  section: typeof baseCourseTopics[0];
  index: number;
  completedProgress: number[];
}) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const completedCount = section.topics.filter(t => completedProgress.includes(t.topicNum)).length;
  const sectionUrl = section.id === 'basics' ? '/courses/python/section/basics' : '#';

  return (
    <div className="topic-section">
      <div className="section-header-row">
        <Link to={sectionUrl} className="section-link">
          <div className="section-info">
            <h4>{section.title}</h4>
            <span className="section-progress">{completedCount}/{section.topics.length} completed</span>
          </div>
        </Link>
        <button className="expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
          <motion.svg
            className="expand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="section-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {section.topics.map((topic, i) => {
              const status = getTopicStatus(topic.topicNum, completedProgress);
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <TopicItem topic={{ ...topic, status }} />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Learning Step Component
const LearningStep = ({ step, index }: { step: typeof learningSteps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isLast = index === learningSteps.length - 1;

  return (
    <motion.div
      ref={ref}
      className="learning-step"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="step-marker">
        <div className="step-number">{step.step}</div>
        {!isLast && (
          <motion.div
            className="step-line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          />
        )}
      </div>
      <div className="step-content">
        <h4>{step.title}</h4>
        <p>{step.description}</p>
      </div>
    </motion.div>
  );
};

// Main Python Course Page
export const PythonCoursePage = () => {
  const [completedProgress, setCompletedProgress] = useState<number[]>(loadProgress());
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { resetSection } = useProgress();

  const handleReset = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem('python_basics_coding_completed');

      // Clear Firestore context
      await resetSection('python', 'basics');

      setCompletedProgress([]);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Failed to reset course:', error);
    }
  };

  // Reload progress when page becomes visible (e.g., user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setCompletedProgress(loadProgress());
      }
    };

    const handleFocus = () => {
      setCompletedProgress(loadProgress());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const totalTopics = baseCourseTopics.reduce((sum, s) => sum + s.topics.length, 0);
  const completedTopics = completedProgress.length;
  const progressPercent = Math.round((completedTopics / totalTopics) * 100);

  // Determine which section to continue from based on progress
  const getContinueRoute = (): string => {
    const lastCompleted = Math.max(0, ...completedProgress);

    // Find which section contains the next topic
    for (const section of baseCourseTopics) {
      const firstTopicNum = section.topics[0].topicNum;
      const lastTopicNum = section.topics[section.topics.length - 1].topicNum;

      // If the next topic is in this section, navigate here
      if (lastCompleted + 1 >= firstTopicNum && lastCompleted + 1 <= lastTopicNum) {
        // Only basics has a route for now
        if (section.id === 'basics') {
          return '/courses/python/section/basics';
        }
        // Other sections are coming soon
        return '/coming-soon';
      }

      // If we haven't completed the first topic of basics, start there
      if (lastCompleted === 0 && section.id === 'basics') {
        return '/courses/python/section/basics';
      }
    }

    // Default to basics or coming soon for later sections
    return '/courses/python/section/basics';
  };

  const continueRoute = getContinueRoute();

  return (
    <div className="python-course-page">
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={() => {
          localStorage.removeItem(PROGRESS_KEY);
          localStorage.removeItem('python_basics_coding_completed');
          setCompletedProgress([]);
          window.location.reload();
        }}
        title="Reset Full Course Progress?"
        message="Are you sure you want to reset your COMPLETELY FULL course progress? This includes all topics and coding questions. This cannot be undone."
        confirmText="Yes, Reset Everything"
        cancelText="No, Keep Progress"
        isDangerous={true}
      />
      {/* Course Header */}
      <section className="course-header">
        <div className="container">
          <div className="header-content">
            <FadeInUp>
              <div className="course-icon-wrapper">
                <img src={courseInfo.icon} alt="Python" className="course-icon" />
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1>{courseInfo.title}</h1>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <p className="course-subtitle">{courseInfo.subtitle}</p>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="course-meta">
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {courseInfo.difficulty}
                </span>
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {totalTopics} Topics
                </span>
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {courseInfo.duration}
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.25}>
              <div className="header-buttons">
                <Link to="/courses/python/section/basics" className="btn btn-primary">
                  Start Course
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="#topics" className="btn btn-secondary">View Topics</a>
              </div>
            </FadeInUp>
            {progressPercent > 0 && (
              <FadeInUp delay={0.3}>
                <div className="progress-indicator">
                  <div className="progress-header">
                    <span>Your Progress</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </div>
              </FadeInUp>
            )}
          </div>
        </div >
      </section >

      {/* Course Overview */}
      < section className="overview-section section-divider" >
        <div className="container">
          <ScrollReveal>
            <div className="overview-content">
              <h2>About This Course</h2>
              <p>
                This course builds strong Python foundations through a structured, logic-first approach.
                Instead of jumping straight into code, you'll first understand concepts visually,
                then explain your thinking before writing any code.
              </p>
              <p>
                Each topic follows our proven learning process: <strong>visualize → explain logic → code → evaluate</strong>.
                This ensures you're not just memorizing syntax, but truly understanding how to solve problems.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section >

      {/* Learning Outcomes */}
      < section className="outcomes-section section-divider" >
        <div className="container">
          <ScrollReveal>
            <h2>What You Will Learn</h2>
          </ScrollReveal>
          <ul className="outcomes-list">
            {learningOutcomes.map((outcome, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <li className="outcome-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {outcome}
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section >

      {/* Course Structure */}
      < section className="structure-section section-divider" id="topics" >
        <div className="container">
          <ScrollReveal>
            <h2>Course Content</h2>
            <p className="section-subtitle">
              {totalTopics} topics across {baseCourseTopics.length} modules
            </p>
          </ScrollReveal>
          <div className="topics-container">
            {baseCourseTopics.map((section, index) => (
              <TopicSection key={section.id} section={section} index={index} completedProgress={completedProgress} />
            ))}
          </div>
        </div>
      </section >

      {/* How Learning Works */}
      < section className="learning-section section-divider" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>How Learning Works in This Course</h2>
              <p>Each topic follows this structured approach</p>
            </div>
          </ScrollReveal>
          <div className="learning-steps">
            {learningSteps.map((step, index) => (
              <LearningStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section >

      {/* Final CTA */}
      < section className="cta-section section-divider" >
        <div className="container">
          <ScrollReveal>
            <div className="cta-content">
              <h2>Start building strong Python fundamentals.</h2>
              <p>Learn at your own pace with structured, logic-first lessons.</p>
              <div className="cta-buttons">

                {progressPercent > 0 && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link to={continueRoute} className="btn btn-secondary">Continue Learning</Link>
                  </motion.div>
                )}
              </div>
            </div>
            {/* Reset Progress Section */}
            <div style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid var(--color-border-light)', paddingTop: '2rem' }}>
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="btn btn-danger"
                style={{ fontSize: '0.875rem' }}
              >
                Reset Full Course Progress
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section >

      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Course Progress"
        message="Are you sure you want to reset your entire Python course progress? This action cannot be undone and will clear all topic completions and coding progress."
        confirmText="Reset Progress"
        cancelText="Cancel"
        isDangerous={true}
      />

      <style>{`
        .python-course-page {
          min-height: 100vh;
        }

        /* Course Header */
        .course-header {
          padding: 4rem 0 5rem;
          text-align: center;
        }

        .header-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .course-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          padding: 1rem;
          background: #3776ab15;
          border-radius: 20px;
        }

        .course-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .course-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .course-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .course-meta {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .meta-item svg {
          width: 18px;
          height: 18px;
        }

        .header-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .progress-indicator {
          max-width: 300px;
          margin: 0 auto;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          height: 6px;
          background: var(--color-bg-secondary);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-accent);
          border-radius: 3px;
        }

        /* Overview Section */
        .overview-section {
          padding: 5rem 0;
        }

        .overview-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .overview-content h2 {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .overview-content p {
          font-size: 1.0625rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }

        .overview-content strong {
          color: var(--color-text-primary);
        }

        /* Outcomes Section */
        .outcomes-section {
          padding: 5rem 0;
          text-align: center;
        }

        .outcomes-section h2 {
          margin-bottom: 2rem;
        }

        .outcomes-list {
          max-width: 500px;
          margin: 0 auto;
          list-style: none;
          text-align: left;
        }

        .outcome-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          font-size: 1rem;
          color: var(--color-text-secondary);
          border-bottom: 1px solid var(--color-border-light);
        }

        .outcome-item:last-child {
          border-bottom: none;
        }

        .outcome-item svg {
          width: 20px;
          height: 20px;
          color: var(--color-success);
          flex-shrink: 0;
        }

        /* Structure Section */
        .structure-section {
          padding: 5rem 0;
        }

        .structure-section h2 {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          text-align: center;
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
        }

        .topics-container {
          max-width: 700px;
          margin: 0 auto;
        }

        .topic-section {
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
        }

        .section-link {
          flex: 1;
          text-decoration: none;
        }

        .section-link:hover .section-info h4 {
          color: var(--color-accent);
        }

        .expand-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .expand-btn:hover {
          background: var(--color-bg-secondary);
        }

        .section-info h4 {
          font-size: 1rem;
          color: var(--color-text-primary);
          margin-bottom: 0.25rem;
        }

        .section-progress {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .expand-icon {
          width: 20px;
          height: 20px;
          color: var(--color-text-muted);
        }

        .section-content {
          padding: 0 1.25rem 1rem;
          overflow: hidden;
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--color-border-light);
        }

        .topic-item:last-child {
          border-bottom: none;
        }

        .topic-status {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .topic-status.completed {
          color: var(--color-success);
        }

        .topic-status.available {
          color: var(--color-accent);
        }

        .topic-status.locked {
          color: var(--color-text-muted);
        }

        .topic-name {
          font-size: 0.9375rem;
          color: var(--color-text-secondary);
        }

        .topic-item.completed .topic-name {
          color: var(--color-text-primary);
        }

        .topic-item.locked .topic-name {
          color: var(--color-text-muted);
        }

        /* Learning Section */
        .learning-section {
          padding: 5rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--color-text-secondary);
        }

        .learning-steps {
          max-width: 500px;
          margin: 0 auto;
        }

        .learning-step {
          display: flex;
          gap: 1.25rem;
        }

        .step-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-number {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-accent);
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 50%;
        }

        .step-line {
          width: 2px;
          flex: 1;
          background: var(--color-border);
          margin: 0.5rem 0;
          transform-origin: top;
        }

        .step-content {
          flex: 1;
          padding-bottom: 2rem;
        }

        .step-content h4 {
          font-size: 1rem;
          color: var(--color-text-primary);
          margin-bottom: 0.25rem;
        }

        .step-content p {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        /* CTA Section */
        .cta-section {
          padding: 5rem 0;
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .cta-content p {
          font-size: 1.0625rem;
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .course-header h1 {
            font-size: 2rem;
          }

          .course-meta {
            gap: 1rem;
          }

          .cta-content h2 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .header-buttons,
          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div >
  );
};

export default PythonCoursePage;
