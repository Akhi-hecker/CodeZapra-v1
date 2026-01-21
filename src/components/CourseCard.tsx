import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

export interface CourseSection {
  id: string;
  topics: number;
}

export interface CourseData {
  id: string;
  name: string;
  description: string;
  badge: string;
  bgColor: string;
  avatarUrl: string;
  link?: string;

  // Stats
  tasks?: number; // Used for "Tasks" or "Topics"
  projects?: number; // Optional 2nd stat
  totalModules?: number; // Total count display

  // Progress Data
  sections?: CourseSection[];
}

interface CourseCardProps {
  course: CourseData;
  index: number;
  showProjects?: boolean; // Toggle for second stat if needed
  taskLabel?: string; // "tasks" or "topics"
}

export const CourseCard = ({ course, index, showProjects = true, taskLabel = "tasks" }: CourseCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Get real progress from context
  const { user } = useAuth();
  const { progress } = useProgress();

  // Calculate actual course progress
  const getCourseProgress = (): { percent: number; completed: number; total: number } => {
    // If no sections provided, try to use totalModules as a fallback or return 0
    if (!user || !progress || !course.sections) {
      return { percent: 0, completed: 0, total: course.totalModules || 0 };
    }

    const courseProgress = progress[course.id];
    if (!courseProgress) {
      // Calculate total topics from sections even if no progress
      const total = course.sections.reduce((acc, curr) => acc + curr.topics, 0);
      return { percent: 0, completed: 0, total: total || course.totalModules || 0 };
    }

    let completedTopics = 0;
    let totalTopics = 0;

    for (const section of course.sections) {
      totalTopics += section.topics;
      const sectionProgress = courseProgress[section.id];
      if (sectionProgress) {
        completedTopics += Object.values(sectionProgress).filter(
          (t): t is { completed: boolean } => typeof t === 'object' && t !== null && (t as { completed?: boolean }).completed === true
        ).length;
      }
    }

    const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    return { percent, completed: completedTopics, total: totalTopics };
  };

  const courseProgress = getCourseProgress();

  const CardContent = (
    <motion.div
      ref={ref}
      className="course-card-outer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      {/* Colored Top Section */}
      <div className="course-card-colored" style={{ backgroundColor: course.bgColor }}>
        <div className="course-card-content">
          {/* Darker Grey Badge */}
          <span className="course-card-badge">{course.badge}</span>

          {/* Title */}
          <h2 className="course-card-title">{course.name}</h2>

          {/* Description */}
          <p className="course-card-desc">{course.description}</p>

          {/* Stats Row */}
          <div className="course-card-stats">
            <div className="course-stat">
              <ClipboardList size={16} />
              <span>{course.tasks || 0} {taskLabel}</span>
            </div>
            {showProjects && course.projects !== undefined && (
              <>
                <span className="course-stat-dot">•</span>
                <div className="course-stat">
                  <Briefcase size={16} />
                  <span>{course.projects} projects</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Avatar/Icon on Right */}
        <div className="course-card-avatar">
          <img
            src={course.avatarUrl}
            alt={course.name}
          />
        </div>

        {/* Progress Bar */}
        <div className="course-progress-wrap">
          <div className="course-progress-info">
            <span className="course-progress-label">Progress</span>
            <span className="course-progress-pct">{courseProgress.percent}%</span>
          </div>
          <div className="course-progress-track">
            <div
              className="course-progress-bar"
              style={{ width: `${courseProgress.percent}%` }}
            />
            {courseProgress.percent === 0 && (
              <div className="course-progress-dot" />
            )}
          </div>
        </div>
      </div>

      {/* White Footer Section */}
      <div className="course-card-footer">
        <div className="course-footer-text">
          <span className="course-footer-label">Modules: </span>
          <span className="course-footer-value">{courseProgress.completed}/{courseProgress.total}</span>
        </div>
        <button className="course-cta-btn">
          {courseProgress.percent > 0 ? 'Continue' : 'Start'}
        </button>
      </div>

      <style>{`
        /* Course Card Styles */
         .course-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        /* Outer Card - White Background */
        .course-card-outer {
          background: #ffffff;
          border-radius: 24px;
          padding: 0.4rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: transform 0.15s, box-shadow 0.15s;
          height: 100%; /* Ensure full height in grid */
        }

        .course-card-outer:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        /* Colored Section */
        .course-card-colored {
          border-radius: 20px;
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          flex: 1; /* Grow to fill space */
        }

        .course-card-content {
          position: relative;
          z-index: 10;
          flex: 1;
        }

        /* Darker Grey Badge */
        .course-card-badge {
          display: inline-block;
          background: rgba(55, 65, 81, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.3rem 0.7rem;
          border-radius: 50px;
          font-size: 0.675rem;
          font-weight: 500;
          color: #1f2937;
        }

        .course-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-top: 0.75rem;
          margin-bottom: 0;
        }

        .course-card-desc {
          font-size: 0.75rem;
          color: #4b5563;
          line-height: 1.5;
          margin-top: 0.375rem;
          max-width: 180px;
        }

        /* Stats Row */
        .course-card-stats {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
          font-size: 0.75rem;
          color: #374151;
        }

        .course-stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .course-stat svg {
          width: 14px;
          height: 14px;
          opacity: 0.7;
        }

        .course-stat-dot {
          color: #9ca3af;
        }

        /* Avatar on Right - Centered Vertically */
        .course-card-avatar {
          position: absolute;
          top: 40%;
          right: 2.5rem;
          transform: translateY(-50%);
          width: 115px;
          height: 115px;
        }

        .course-card-avatar img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
        }

        /* Progress Bar */
        .course-progress-wrap {
          margin-top: auto;
          padding-top: 0.75rem;
        }

        .course-progress-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 0.375rem;
        }

        .course-progress-label {
          font-size: 0.675rem;
          font-weight: 500;
          color: #6b7280;
        }

        .course-progress-pct {
          font-size: 0.675rem;
          font-weight: 700;
          color: #111827;
        }

        .course-progress-track {
          height: 6px;
          width: 100%;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 50px;
          overflow: hidden;
          position: relative;
        }

        .course-progress-bar {
          height: 100%;
          background: #111827;
          border-radius: 50px;
          transition: width 0.3s ease;
        }

        .course-progress-dot {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: #111827;
          border-radius: 50%;
        }

        /* White Footer */
        .course-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.2rem 0.4rem;
        }

        .course-footer-text {
          font-size: 0.8125rem;
        }

        .course-footer-label {
          color: #6b7280;
        }

        .course-footer-value {
          font-weight: 700;
          color: #111827;
        }

        .course-cta-btn {
          background: #111827;
          color: #ffffff;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .course-cta-btn:hover {
          background: #374151;
        }

        /* Responsive Adjustments inherited from previous implementation */
        @media (max-width: 768px) {
          .course-card-avatar {
            width: 72px;
            height: 72px;
          }
          .course-card-colored {
            min-height: 200px;
          }
          .course-card-desc {
            max-width: 160px;
          }
        }

        @media (max-width: 480px) {
          .course-card-avatar {
            width: 56px;
            height: 56px;
            top: 0.625rem;
            right: 0.625rem;
          }
          .course-card-colored {
            padding: 1rem;
            min-height: 180px;
          }
          .course-card-title {
            font-size: 1.125rem;
          }
          .course-card-desc {
            font-size: 0.7rem;
            max-width: 140px;
          }
          .course-cta-btn {
            padding: 0.5rem 1.25rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </motion.div>
  );

  return course.link ? (
    <Link to={course.link} className="course-card-link" style={{ height: '100%' }}>
      {CardContent}
    </Link>
  ) : CardContent;
};
