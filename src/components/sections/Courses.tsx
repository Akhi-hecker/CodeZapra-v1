
import { ScrollReveal } from '../animations';
import { CourseCard, type CourseData } from '../CourseCard';
import dsaIcon from '../../assets/dsa-icon.png';

// Course data with sections included for progress calculation
const courses: CourseData[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'Master principles of programming.',
    tasks: 21,
    projects: 16,
    totalModules: 16,
    badge: 'Student',
    bgColor: '#FCE4EC',
    avatarUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    link: '/courses/python',
    sections: [
      { id: 'basics', topics: 5 },
      { id: 'control-flow', topics: 4 },
      { id: 'functions', topics: 5 },
      { id: 'data-structures', topics: 4 },
      { id: 'problem-solving', topics: 3 },
    ],
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
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    description: 'Master core data structures through clear, interactive visualizations.',
    tasks: 60,
    projects: 30,
    totalModules: 30,
    badge: 'Student',
    bgColor: '#DCFCE7',
    avatarUrl: dsaIcon,
    link: '/courses/dsa',
  },
];

export const Courses = () => {
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
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
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
