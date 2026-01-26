import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../components/animations';
import { ConfirmationModal } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
// Use the DSA icon we saw in CoursesPage.tsx (imported from assets or URL)
// Since we can't easily import the png from here without knowing exact path if it differs,
// let's use the dsaIcon logic or a placeholder initially, 
// checking CoursesPage.tsx: import dsaIcon from '../assets/dsa-icon.png';
import dsaIcon from '../assets/dsa-icon.png';



// Course data
const courseInfo = {
  title: 'Data Structures & Algorithms',
  subtitle: 'Master the foundations of computer science with visual explanations and interactive practice.',
  difficulty: 'Intermediate',
  topicsCount: 60, // Approximate total from topics
  duration: 'Self-paced',
  icon: dsaIcon,
};

const learningOutcomes = [
  'Core data structures (Arrays, Linked Lists, Trees, Graphs)',
  'Essential algorithms (Sorting, Searching, Recursion)',
  'Time and Space complexity analysis',
  'Problem-solving patterns for coding interviews',
  'Optimizing code for performance',
];

import { DSA_COURSE_DATA } from '../data/courseData';

// Dynamically generate baseCourseTopics from DSA_COURSE_DATA
let globalTopicCounter = 0;
const baseCourseTopics = DSA_COURSE_DATA.map(section => {
  return {
    id: section.id,
    title: section.title,
    topics: section.topics.map(topic => {
      globalTopicCounter++;
      return {
        id: topic.slug || String(topic.id), // Use slug for consistent ID
        name: topic.title,
        topicNum: globalTopicCounter
      };
    })
  };
});

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
  // For now, no specific section pages are linked besides placeholders, can be updated later
  // Dynamic section URL logic
  const sectionUrl = `/courses/dsa/section/${section.id}`;

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

// Main DSA Course Page
export const DsaCoursePage = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { user } = useAuth();
  const { progress, resetSection } = useProgress();

  // Sync progress from Context and LocalStorage
  const completedProgress = useMemo(() => {
    const newCompleted = new Set<number>();

    // 1. Load from Context (if available)
    if (progress?.dsa) {
      baseCourseTopics.forEach(section => {
        const sectionProgress = progress.dsa[section.id];
        if (sectionProgress) {
          section.topics.forEach(topic => {
            if (sectionProgress[topic.id]?.completed) {
              newCompleted.add(topic.topicNum);
            }
          });
        }
      });
    }

    // 2. Load from LocalStorage (fallback/guest support)
    baseCourseTopics.forEach(section => {
      // Skip strings section check removed as it should be fixed now
      // if (section.id === 'strings') return;

      try {
        const localKey = `dsa_${section.id}_completed`;
        const saved = localStorage.getItem(localKey);

        if (saved) {
          const parsed = JSON.parse(saved);

          // Ensure it's an array
          if (Array.isArray(parsed)) {
            parsed.forEach(localId => {
              // localId is expected to be a number (1-based index)
              const idx = typeof localId === 'number' ? localId - 1 : -1;

              if (idx >= 0 && idx < section.topics.length) {
                // Correct mapping: Local ID 1 -> Array Index 0 -> Global Topic Num
                const topic = section.topics[idx];
                if (topic) {
                  newCompleted.add(topic.topicNum);
                }
              } else {
                // Fallback: Check if localId matches strict equality with topicNum (in case data format changed)
                const matchedByNum = section.topics.find(t => t.topicNum === localId);
                if (matchedByNum) {
                  newCompleted.add(matchedByNum.topicNum);
                }
              }
            });
          }
        }
      } catch (e) {
        console.warn(`Error parsing local storage for section ${section.id}`, e);
      }
    });

    return Array.from(newCompleted);
  }, [progress, user]);

  const handleResetCourse = async () => {
    try {
      // Clear localStorage for individual sections (if any remains)
      // dsa_arrays_completed etc.
      baseCourseTopics.forEach(section => {
        localStorage.removeItem(`dsa_${section.id}_completed`);
        localStorage.removeItem(`dsa_${section.id}_coding_completed`);
      });

      // Clear Firestore context for all sections
      if (user) {
        const resetPromises = baseCourseTopics.map(section =>
          resetSection('dsa', section.id)
        );
        await Promise.all(resetPromises);
      }

      window.scrollTo(0, 0);
      setIsResetModalOpen(false);
    } catch (error) {
      console.error('Failed to reset course:', error);
    }
  };

  const totalTopics = baseCourseTopics.reduce((sum, s) => sum + s.topics.length, 0);
  const completedTopics = completedProgress.length;
  const progressPercent = Math.round((completedTopics / totalTopics) * 100);

  // Determine which section to continue from based on progress
  const getContinueRoute = (): string => {
    // For now, simpler logic or just point to first section if nothing completed
    // Since we don't have individual section pages yet, we can default to coming soon or a specific start page
    return '/courses/dsa/section/arrays';
  };

  const continueRoute = getContinueRoute();

  return (
    <div className="dsa-course-page">
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetCourse}
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
                <img src={courseInfo.icon} alt="DSA" className="course-icon" />
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
                {/* Point to first section or coming soon */}
                <Link to={continueRoute} className="btn btn-primary">
                  Start Course
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="#topics" className="btn btn-secondary">View Topics</a>
              </div>
            </FadeInUp>
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
                This course builds strong foundations in Data Structures and Algorithms through a structured, visual approach.
                We focus on understanding the "why" and "how" behind every data structure before diving into implementation.
              </p>
              <p>
                Perfect for interview preparation or mastering computer science fundamentals, this course takes you from
                basic arrays to complex graph algorithms using our <strong>visualize → logic → code</strong> methodology.
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
              <h2>Master Data Structures & Algorithms.</h2>
              <p>Build the confidence to crack technical interviews and write efficient code.</p>
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

      <style>{`
        .dsa-course-page {
          min-height: 100vh;
        }

        /* Reusing exact styles from PythonCoursePage for consistency */
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
          background: #3776ab15; /* Might want to change color for DSA later */
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
    </div>
  );
};


// Helper component for Learning Steps at bottom (reused from PythonCourse, but simpler here)
// Need to define LearningStructureItem or import it.
// PythonCoursePage used 'LearningStep', but the bottom section uses 'learningSteps' map with 'LearningStep'.
// Wait, I see 'LearningStep' defined above. Let's make sure it matches.
// In PythonCoursePage: LearningStep component uses step: {step, title, description}.
