import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../components/animations';
import { CourseCard } from '../components/CourseCard';
import { useProgress } from '../context/ProgressContext';
import dsaIcon from '../assets/dsa-icon.png';

import { DSA_COURSE_DATA, PYTHON_COURSE_DATA } from '../data/courseData';

// Helper to count total topics
const countTopics = (sections: any[]) => sections.reduce((acc, sec) => acc + sec.topics.length, 0);

// Course data
const courses = [
  {
    id: 'python',
    name: 'Python',
    description: 'Master principles of programming.',
    difficulty: 'Beginner',
    topics: countTopics(PYTHON_COURSE_DATA),
    projects: 3,
    taskLabel: 'videos',
    projectLabel: 'coding problems',
    category: 'Programming Languages',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    // Exact color from home page Courses.tsx
    color: '#FCE4EC',
    // Define sections and their topic counts for progress tracking (matches PythonCoursePage)
    sections: PYTHON_COURSE_DATA.map(section => ({
      id: section.id,
      topics: section.topics.length
    })),
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Learn object-oriented programming.',
    difficulty: 'Intermediate',
    topics: 38,
    category: 'Programming Languages',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    // Exact color from home page Courses.tsx
    color: '#E0F2FE',
    visible: false,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Build modern responsive websites.',
    difficulty: 'Beginner',
    topics: 45,
    category: 'Programming Languages',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    // Exact color from home page Courses.tsx
    color: '#FEF9C3',
    visible: false,
  },
  {
    id: 'dsa',
    name: 'DSA',
    description: 'Master Data Structures & Algorithms (DSA) through clear, interactive visualizations.',
    difficulty: 'Intermediate',
    topics: countTopics(DSA_COURSE_DATA),
    projects: 52,
    taskLabel: 'videos',
    projectLabel: 'coding problems',
    category: 'Data Structures & Algorithms',
    // Using Nodejs icon to match home page, or could be kept as emoji if handled by CourseCard
    icon: dsaIcon,
    // Exact color from home page Courses.tsx
    color: '#DCFCE7',
    sections: DSA_COURSE_DATA.map(section => ({
      id: section.id,
      topics: section.topics.length
    })),
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'programming', label: 'Programming Languages' },
  { id: 'dsa', label: 'DSA' }, // Updated label for consistency
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
];

const learningStructure = [
  {
    title: 'Visual explanation',
    description: 'Complex ideas come alive with smooth animations.',
    slug: 'visual-explanation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Logic-first approach',
    description: 'Explain your thinking before writing a single line of code.',
    slug: 'logic-first-approach',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Instant feedback',
    description: 'Get real-time evaluation and guidance on your solutions.',
    slug: 'instant-feedback',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Detailed progress',
    description: 'Track your growth with topic-level analytics and milestones.',
    slug: 'detailed-progress',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

// Learning Structure Item - Redesigned
const LearningStructureItem = ({ item, index }: { item: typeof learningStructure[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="structure-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="structure-card-bg"></div>
      <div className="structure-icon-wrapper">
        {item.icon}
      </div>
      <h3 className="structure-title">{item.title}</h3>
      <p className="structure-desc">{item.description}</p>
      <Link to={`/experience/${item.slug}`} className="structure-link">
        View more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  );
};

// Main Courses Page
export const CoursesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { isTopicCompleted } = useProgress();

  const filteredCourses = courses.filter(course => {
    // Hide courses with visible: false
    if (course.visible === false) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'programming') return course.category === 'Programming Languages';
    if (activeFilter === 'dsa') return course.category === 'Data Structures & Algorithms';
    if (activeFilter === 'beginner') return course.difficulty === 'Beginner';
    if (activeFilter === 'intermediate') return course.difficulty === 'Intermediate';
    return true;
  });

  return (
    <div className="courses-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <FadeInUp>
            <h1>Courses</h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="page-subtitle">
              Structured, visual, and logic-first learning paths<br />
              designed for real problem-solving skills.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-bar">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <motion.div
                    className="filter-underline"
                    layoutId="filterUnderline"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-section">
        <div className="container">
          <div className="courses-grid">
            {filteredCourses.map((course, index) => {
              // Calculate specific progress override for DSA
              let explicitProgress = undefined;
              if (course.id === 'dsa') {
                // Calculate Union of Context and LocalStorage for DSA
                let completedCount = 0;
                const totalTopics = (course.sections || []).reduce((acc, s) => acc + s.topics, 0);

                DSA_COURSE_DATA.forEach(section => {
                  let sectionCompletedTopics = new Set<string>();

                  // 1. From Context
                  section.topics.forEach(topic => {
                    const key = topic.slug || String(topic.id);
                    if (isTopicCompleted('dsa', section.id, key)) {
                      sectionCompletedTopics.add(key);
                    }
                  });

                  // 2. From LocalStorage
                  try {
                    const localKey = `dsa_${section.id}_completed`;
                    const saved = localStorage.getItem(localKey);
                    if (saved) {
                      const parsed = JSON.parse(saved);
                      if (Array.isArray(parsed)) {
                        parsed.forEach((localId: number) => {
                          const idx = localId - 1;
                          if (idx >= 0 && idx < section.topics.length) {
                            const topic = section.topics[idx];
                            const key = topic.slug || String(topic.id);
                            sectionCompletedTopics.add(key);
                          }
                        });
                      }
                    }
                  } catch (e) {
                    // ignore
                  }
                  completedCount += sectionCompletedTopics.size;
                });
                explicitProgress = { completed: completedCount, total: totalTopics };
              } else if (course.id === 'python') {
                // Calculate Union of Context and LocalStorage for Python
                let completedCount = 0;
                const totalTopics = (course.sections || []).reduce((acc, s) => acc + s.topics, 0);

                PYTHON_COURSE_DATA.forEach(section => {
                  let sectionCompletedTopics = new Set<string>();

                  // 1. From Context
                  section.topics.forEach(topic => {
                    const key = topic.slug || String(topic.id);
                    if (isTopicCompleted('python', section.id, key)) {
                      sectionCompletedTopics.add(key);
                    }
                  });

                  // 2. From LocalStorage
                  try {
                    const localKey = `python_${section.id}_completed`;
                    const saved = localStorage.getItem(localKey);
                    if (saved) {
                      const parsed = JSON.parse(saved);
                      if (Array.isArray(parsed)) {
                        parsed.forEach((localId: number) => {
                          const idx = localId - 1;
                          if (idx >= 0 && idx < section.topics.length) {
                            const topic = section.topics[idx];
                            const key = topic.slug || String(topic.id);
                            sectionCompletedTopics.add(key);
                          }
                        });
                      }
                    }
                  } catch (e) {
                    // ignore
                  }
                  completedCount += sectionCompletedTopics.size;
                });
                explicitProgress = { completed: completedCount, total: totalTopics };
              }

              return (
                <CourseCard
                  key={course.id}
                  course={{
                    id: course.id,
                    name: course.name,
                    description: course.description,
                    badge: course.difficulty,
                    // Use color directly as it is now the exact pastel color
                    bgColor: course.color,
                    avatarUrl: course.icon,
                    tasks: course.topics,
                    projects: course.projects,
                    taskLabel: course.taskLabel,
                    projectLabel: course.projectLabel,
                    sections: course.sections,
                    link: `/courses/${course.id}`
                  }}
                  showProjects={true}
                  index={index}
                  explicitProgress={explicitProgress}
                />
              );
            })}
          </div>
          {filteredCourses.length === 0 && (
            <p className="no-courses">No courses found for this filter.</p>
          )}
        </div>
      </section>

      {/* Learning Structure Section */}
      <section className="structure-section section-divider">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>What you will experience in every course</h2>
              <p>A structured approach to build real programming skills</p>
            </div>
          </ScrollReveal>

          <div className="structure-grid">
            {learningStructure.map((item, index) => (
              <LearningStructureItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section section-divider">
        <div className="container">
          <ScrollReveal>
            <div className="cta-content">
              <h2>Start learning with clarity and confidence.</h2>
              <p>Join thousands of learners building strong programming foundations.</p>
              <div className="cta-buttons">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/courses/python" className="btn btn-primary">
                    Start with Python
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/how-it-works" className="btn btn-secondary">
                    View Learning Path
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .courses-page {
          min-height: 100vh;
        }

        .page-header {
          padding: 6rem 0 3rem;
          text-align: center;
          background: #f9fafb;
        }

        .page-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* Filter Bar */
        .filter-section {
          padding: 0 0 4rem;
          background: #f9fafb;
        }

        .filter-bar {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
          padding: 0.5rem;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid var(--color-border-light);
        }

        .filter-btn {
          position: relative;
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .filter-btn:hover {
          color: var(--color-text-primary);
        }

        .filter-btn.active {
          color: var(--color-accent);
        }

        .filter-underline {
          position: absolute;
          bottom: 0;
          left: 0.5rem;
          right: 0.5rem;
          height: 2px;
          background: var(--color-accent);
          border-radius: 1px;
        }

        /* Courses Grid */
        .courses-section {
          padding-top: 5rem;
          padding-bottom: 5rem;
          background: #ffffff;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 820px;
          margin: 0 auto;
        }

        .no-courses {
          text-align: center;
          color: var(--color-text-muted);
          padding: 3rem 0;
        }

        /* Learning Structure - Redesigned */
        .structure-section {
          padding: 6rem 0;
          background: #f9fafb;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          margin-bottom: 0.75rem;
        }

        .section-header p {
          color: var(--color-text-secondary);
          font-size: 1.0625rem;
        }

        .structure-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .structure-card {
          position: relative;
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }

        .structure-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
        }

        /* Subtle grid pattern background */
        .structure-card-bg {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 100%);
        }

        .structure-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 50%;
          margin-bottom: 1.5rem;
          color: #111827;
          position: relative;
          z-index: 10;
        }

        .structure-icon-wrapper svg {
          width: 24px;
          height: 24px;
          stroke-width: 1.5px;
        }

        .structure-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 10;
        }

        .structure-desc {
          font-size: 0.9375rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          position: relative;
          z-index: 10;
        }

        .structure-link {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: #2563eb;
          font-weight: 500;
          font-size: 0.9375rem;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }

        .structure-link:hover {
          text-decoration: underline;
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 0;
          background: #ffffff;
        }

        .cta-content {
          text-align: center;
          max-width: 480px; /* Reduced from 600px to match Home Page */
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .cta-content p {
          font-size: 1rem; /* Reduced from 1.0625rem to match Home Page */
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
          .page-header h1 {
            font-size: 2rem;
          }

          .courses-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .filter-bar {
            justify-content: flex-start;
            overflow-x: auto;
            padding: 0.5rem;
            gap: 0.25rem;
          }

          .filter-btn {
            white-space: nowrap;
            padding: 0.5rem 1rem;
          }

          .structure-grid {
            grid-template-columns: 1fr;
          }

          .cta-content h2 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .courses-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default CoursesPage;
