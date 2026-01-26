import { ScrollReveal } from '../animations';
import { CourseCard, type CourseData } from '../CourseCard';
import dsaIcon from '../../assets/dsa-icon.png';
import { useProgress } from '../../context/ProgressContext';
import { DSA_COURSE_DATA, PYTHON_COURSE_DATA } from '../../data/courseData';

// Helper to count total topics
const countTopics = (sections: any[]) => sections.reduce((acc, sec) => acc + sec.topics.length, 0);
const courses: CourseData[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'Master principles of programming.',
    tasks: countTopics(PYTHON_COURSE_DATA),
    projects: 3,
    taskLabel: 'videos',
    projectLabel: 'coding problems',
    totalModules: 16,
    badge: 'Student',
    bgColor: '#FCE4EC',
    avatarUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    link: '/courses/python',
    sections: PYTHON_COURSE_DATA.map(section => ({
      id: section.id,
      topics: section.topics.length
    })),
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Learn object-oriented programming.',
    tasks: 38,
    projects: 24,
    totalModules: 24,
    badge: 'Recommended',
    bgColor: '#E0F2FE',
    avatarUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    link: '/courses/java',
    visible: false,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Build modern responsive websites.',
    tasks: 45,
    projects: 20,
    totalModules: 20,
    badge: 'Popular',
    bgColor: '#FEF9C3',
    avatarUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    link: '/courses/javascript',
    visible: false,
  },
  {
    id: 'dsa',
    name: 'DSA',
    description: 'Master Data Structures & Algorithms (DSA) through clear, interactive visualizations.',
    tasks: countTopics(DSA_COURSE_DATA),
    projects: 52,
    taskLabel: 'videos',
    projectLabel: 'coding problems',
    totalModules: 30,
    badge: 'Student',
    bgColor: '#DCFCE7',
    avatarUrl: dsaIcon,
    link: '/courses/dsa',
    sections: DSA_COURSE_DATA.map(section => ({
      id: section.id,
      topics: section.topics.length
    })),
  },
];

export const Courses = () => {
  const { isTopicCompleted } = useProgress();

  return (
    <section className="courses-section">
      <div className="container">
        <ScrollReveal>
          <div className="courses-header">
            <span className="courses-badge">Courses</span>
            <h2 className="courses-title">Explore Courses</h2>
            <p className="courses-subtitle">Start your journey with structured, logic-first learning paths</p>
          </div>
        </ScrollReveal>

        <div className="courses-grid">
          {courses.filter(c => c.visible !== false).map((course, i) => {
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

            return <CourseCard key={course.id} course={course} index={i} explicitProgress={explicitProgress} />;
          })}
        </div>
      </div>

      <style>{`
        .courses-section {
          padding: 5rem 0;
          background: #ffffff;
        }

        .courses-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .courses-badge {
          display: inline-block;
          padding: 0.35rem 0.875rem;
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 50px;
          margin-bottom: 0.875rem;
        }

        .courses-title {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.4rem;
        }

        .courses-subtitle {
          font-size: 0.9375rem;
          color: #6b7280;
          margin-bottom: 0;
        }

        /* Two-column Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 820px;
          margin: 0 auto;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Courses;
