import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const courseInfo: Record<string, {
  name: string;
  icon: string;
  color: string;
  isEmoji?: boolean;
  description: string;
  features: { icon: string; title: string; desc: string }[];
  gradient: string;
}> = {
  java: {
    name: 'Java Masterclass',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    color: '#f89820',
    description: 'Master the language of enterprise. From basics to advanced OOP, learn to build robust, scalable applications.',
    gradient: 'linear-gradient(135deg, rgba(248, 152, 32, 0.1) 0%, rgba(248, 152, 32, 0.05) 100%)',
    features: [
      { icon: '☕', title: 'OOP Mastery', desc: 'Deep dive into Object-Oriented paradigms' },
      { icon: '🚀', title: 'Spring Boot', desc: 'Build modern enterprise backends' },
      { icon: '🔒', title: 'Robust Systems', desc: 'Error handling & memory management' }
    ]
  },
  c: {
    name: 'C Programming',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    color: '#a8b9cc',
    description: 'The mother of all languages. Understand how computers really work, logic, and memory management.',
    gradient: 'linear-gradient(135deg, rgba(168, 185, 204, 0.1) 0%, rgba(168, 185, 204, 0.05) 100%)',
    features: [
      { icon: '💾', title: 'Memory Mgmt', desc: 'Pointers & manual allocation' },
      { icon: '⚙️', title: 'Low Level', desc: 'System architecture fundamentals' },
      { icon: '⚡', title: 'High Performance', desc: 'Write optimized, fast code' }
    ]
  },
  javascript: {
    name: 'Modern JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    color: '#f7df1e',
    description: 'The language of the web. Master ES6+, async programming, and the DOM to build interactive experiences.',
    gradient: 'linear-gradient(135deg, rgba(247, 223, 30, 0.1) 0%, rgba(247, 223, 30, 0.05) 100%)',
    features: [
      { icon: '🌐', title: 'DOM Manipulation', desc: 'Create dynamic web pages' },
      { icon: '⚡', title: 'Async Patterns', desc: 'Promises, Async/Await mastery' },
      { icon: '📦', title: 'Modern Ecosystem', desc: 'NPM, Webpack & Frameworks' }
    ]
  },
  dsa: {
    name: 'Data Structures & Algorithms',
    icon: '🧮',
    color: '#6366f1',
    isEmoji: true,
    description: 'Crack coding interviews. Learn to solve complex problems with optimized time and space complexity.',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
    features: [
      { icon: '🌳', title: 'Core Structures', desc: 'Trees, Graphs, Maps & Heaps' },
      { icon: '⚡', title: 'Algorithms', desc: 'Sorting, Searching & DP' },
      { icon: '💼', title: 'Interview Prep', desc: 'Pattern recognition & solving' }
    ]
  },
};

export const ComingSoonPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? courseInfo[courseId] : null;

  return (
    <div className="coming-soon-page">
      <div className="background-glow" style={{
        background: course ? `radial-gradient(circle at 50% 50%, ${course.color}20 0%, transparent 70%)` : ''
      }} />

      <div className="container">
        <motion.div
          className="content-card glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <motion.div
            className="badge-wrapper"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="status-badge">
              <span className="badge-dot" style={{ background: course?.color }} />
              Coming Soon
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            className="course-icon-container"
            style={{ background: course?.gradient || 'var(--color-bg-secondary)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            {course?.isEmoji ? (
              <span className="emoji-icon">{course.icon}</span>
            ) : course ? (
              <img src={course.icon} alt={course.name} className="icon-img" />
            ) : (
              <span className="emoji-icon">🚀</span>
            )}
          </motion.div>

          {/* Title & Desc */}
          <div className="text-content">
            <motion.h1
              className="page-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {course ? course.name : 'New Course'}
            </motion.h1>

            <motion.p
              className="page-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {course ? course.description : "We're crafting an exceptional learning experience for you. Stay tuned for something amazing."}
            </motion.p>
          </div>

          {/* Specific Features Grid */}
          {course && (
            <motion.div
              className="features-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {course.features.map((feature, idx) => (
                <div key={idx} className="feature-card">
                  <span className="feature-card-icon">{feature.icon}</span>
                  <div className="feature-card-content">
                    <div className="feature-card-title">{feature.title}</div>
                    <div className="feature-card-desc">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div className="divider" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7 }} />

          {/* CTA Buttons */}
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/courses/python" className="btn-primary-filled">
              Explore Python Course
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/courses" className="btn-secondary-outline">
              View All Courses
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .coming-soon-page {
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--color-bg);
          position: relative;
          overflow: hidden;
        }
        
        .background-glow {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            pointer-events: none;
            opacity: 0.6;
            z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 800px;
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 32px;
            padding: 3rem;
            box-shadow: 
                0 20px 40px -10px rgba(0,0,0,0.1),
                0 0 0 1px rgba(255,255,255,0.5) inset;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .badge-wrapper {
            margin-bottom: 2rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #F1F5F9;
          color: #64748B;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid #E2E8F0;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #64748B;
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
        }

        .course-icon-container {
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.5);
        }

        .emoji-icon {
          font-size: 3rem;
        }

        .icon-img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .text-content {
            max-width: 500px;
            margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #1E293B;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .page-description {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #64748B;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            width: 100%;
            margin-bottom: 2.5rem;
        }
        
        .feature-card {
            background: #FFFFFF;
            padding: 1.25rem;
            border-radius: 16px;
            border: 1px solid #F1F5F9;
            text-align: left;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            display:flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .feature-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05);
            border-color: #E2E8F0;
        }

        .feature-card-icon {
            font-size: 1.5rem;
            background: #F8FAFC;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
        }

        .feature-card-title {
            font-weight: 700;
            color: #334155;
            font-size: 0.95rem;
        }
        
        .feature-card-desc {
            font-size: 0.8rem;
            color: #94A3B8;
            line-height: 1.4;
        }

        .divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, #E2E8F0, transparent);
            margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          width: 100%;
        }

        .btn-primary-filled {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: hsla(214, 92%, 47%, 1);
          background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .btn-primary-filled:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        }
        
        .arrow-icon {
            transition: transform 0.2s ease;
        }
        .btn-primary-filled:hover .arrow-icon {
            transform: translateX(3px);
        }

        .btn-secondary-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2rem;
          background: transparent;
          color: #475569;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 50px;
          border: 2px solid #E2E8F0;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-secondary-outline:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
          color: #1E293B;
        }

        @media (max-width: 640px) {
            .glass-panel {
                padding: 2rem 1.5rem;
            }
            .page-title {
                font-size: 1.75rem;
            }
            .course-icon-container {
                width: 80px; height: 80px;
            }
            .cta-buttons {
                flex-direction: column;
            }
            .btn-primary-filled, .btn-secondary-outline {
                width: 100%;
            }
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;
