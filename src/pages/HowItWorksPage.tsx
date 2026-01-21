import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../components/animations';
import { LogicFirstDemo } from '../components/sections';

// Step data for the learning flow
const learningSteps = [
  {
    id: 1,
    title: 'Select a Course',
    description: 'Choose from Python, Java, JavaScript, C, and more',
    color: '#6366F1', // Indigo Accent
    bgColor: '#EEF2FF', // Indigo Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Pick a Topic',
    description: 'Browse the curriculum and start with any topic',
    color: '#10B981', // Emerald Accent
    bgColor: '#ECFDF5', // Emerald Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Read the Logic',
    description: 'Understand the concept in plain English first',
    color: '#EC4899', // Pink Accent
    bgColor: '#FDF2F8', // Pink Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Video & Study Notes',
    description: 'Deep dive with curated content and examples',
    color: '#F59E0B', // Amber Accent
    bgColor: '#FFFBEB', // Amber Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Interactive Code',
    description: 'Run, modifying, and test code directly in browser',
    color: '#3B82F6', // Blue Accent
    bgColor: '#EFF6FF', // Blue Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Take the Quiz',
    description: 'Test your understanding to unlock the next topic',
    color: '#8B5CF6', // Violet Accent
    bgColor: '#F5F3FF', // Violet Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    id: 7,
    title: 'Move to Next Topic',
    description: 'Progress through the curriculum systematically',
    color: '#EF4444', // Red Accent
    bgColor: '#FEF2F2', // Red Light BG
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const progressItems = [
  { label: 'Python Basics', progress: 100 },
  { label: 'Control Flow', progress: 85 },
  { label: 'Functions', progress: 60 },
  { label: 'Data Structures', progress: 25 },
];

// Timeline Step Component - Redesigned
const TimelineStep = ({ step, index, totalSteps }: { step: typeof learningSteps[0]; index: number; totalSteps: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
  const isLast = index === totalSteps - 1;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div ref={ref} className="timeline-step">
      {/* Left Column: Icon and Line */}
      <div className="timeline-marker-col">
        <motion.div
          className="timeline-icon-wrapper"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
          style={{
            borderColor: `${step.color}40`, // 25% opacity for border
            color: step.color,
            backgroundColor: step.bgColor // Match icon bg to card bg for consistency or keep white? Let's keep white for pop
          }}
        >
          {step.icon}
        </motion.div>

        {!isLast && (
          <div className="timeline-line-track">
            <motion.div
              className={`timeline-line-progress ${isHovered ? 'active' : ''}`}
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
              style={{ backgroundColor: step.color }}
            />
          </div>
        )}
      </div>

      {/* Right Column: Content Card */}
      <motion.div
        className="timeline-content-wrapper"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className="journey-card"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate={{
            backgroundColor: step.bgColor, // Apply pastel BG
            scale: isHovered ? 1.02 : 1,
            boxShadow: isHovered
              ? `0 20px 25px -5px ${step.color}15, 0 10px 10px -5px ${step.color}05`
              : "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            borderColor: "transparent" // Remove border to match course card style (usually borderless with bg)
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="step-number">
            Step {step.id < 10 ? `0${step.id}` : step.id}
          </span>

          <h3>{step.title}</h3>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 4 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <p>{step.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ label, progress, index }: { label: string; progress: number; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="progress-item"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{progress}%</span>
      </div>
      <div className="progress-bar-bg">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
        />
      </div>
      {progress === 100 && (
        <motion.div
          className="progress-check"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Page Component
export const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page">
      {/* Intro Section */}
      <section className="intro-section">
        <div className="container">
          <FadeInUp>
            <h1>How It Works</h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="intro-subtitle">
              A structured, logic-first approach to learning programming.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Learning Flow Section */}
      <section className="flow-section section-divider">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Your Learning Journey</h2>
              <p>Follow a proven path from concept to mastery</p>
            </div>
          </ScrollReveal>

          <div className="timeline">
            {learningSteps.map((step, index) => (
              <TimelineStep
                key={step.id}
                step={step}
                index={index}
                totalSteps={learningSteps.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Logic First Section */}
      <section className="logic-section section-divider">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-badge">Core Philosophy</span>
              <h2>Why Logic Comes Before Code</h2>
              <p>
                We believe that understanding the problem is more important than
                writing the solution. By explaining your approach first, you build
                lasting problem-solving skills.
              </p>
            </div>
          </ScrollReveal>

          <div className="logic-visual">
            <ScrollReveal>
              <div className="philosophy-cards">
                <div className="philosophy-card">
                  <div className="philosophy-card-icon brain">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a9 9 0 0 1 9 9c0 3.9-2.5 7.2-6 8.4V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.6C5.5 18.2 3 14.9 3 11a9 9 0 0 1 9-9z" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <h4>Think First</h4>
                  <p>Understand the problem deeply</p>
                </div>

                <motion.div
                  className="logic-arrow"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <svg viewBox="0 0 100 20" fill="none">
                    <path d="M0 10h90M80 5l10 5-10 5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                <div className="philosophy-card">
                  <div className="philosophy-card-icon code">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <h4>Code Later</h4>
                  <p>Write with clarity and purpose</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Logic to Code Demo Section */}
      <LogicFirstDemo
        badge="Live Demo"
        title="Experience the Methodology"
        subtitle="Watch how logical planning transforms into clean, effective code"
      />

      {/* Progress Section */}
      <section className="progress-section section-divider">
        <div className="container">
          <div className="progress-layout">
            <div className="progress-content">
              <ScrollReveal>
                <h2>Learn with Direction and Progress</h2>
                <p className="progress-description">
                  Track your journey through each course with clear milestones
                  and meaningful progress indicators.
                </p>
                <ul className="progress-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Topic-wise progress tracking
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Mastery before advancement
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Clear learning milestones
                  </li>
                </ul>
              </ScrollReveal>
            </div>

            <div className="progress-demo">
              <div className="progress-card">
                <h4>Python Fundamentals</h4>
                {progressItems.map((item, index) => (
                  <ProgressBar key={item.label} {...item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-content">
              <h2>Learn coding the way it's meant to be learned.</h2>
              <p>Build strong foundations with structured, logic-first learning.</p>
              <div className="cta-buttons">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/courses" className="btn btn-primary">
                    Start Learning
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '0.5rem' }}>
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/courses" className="btn btn-secondary-outline">
                    Explore Courses
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .how-it-works-page {
          min-height: 100vh;
          background-color: white;
        }

        /* Override Logic Demo Background for this page only */
        .how-it-works-page .lfd-section {
            background: #ffffff !important;
        }

        /* Intro Section */
        .intro-section {
          padding: 6rem 0 4rem;
          text-align: center;
          background: #f9fafb;
        }

        /* ... (keep other styles if they existed, but I will append the CTA styles here at the end of the style block or verify) */
        
        /* I will replace the whole style block start to ensure I don't lose previous styles, 
           but actually I should just add the CTA styles at the end. 
           However, I need to make sure I don't delete the other styles I just added in previous steps. 
           The previous step updated the progress section styles. 
           I should append CTA styles or replace the media query block to include CTA styles.
        */


        .intro-section h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .intro-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        /* Section Header */
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
          max-width: 600px;
          margin: 0 auto;
        }

        .section-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: var(--color-accent-lighter);
          color: var(--color-accent);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 1rem;
          margin-bottom: 1rem;
        }

        /* Timeline Section - Redesigned */
        .flow-section {
          padding: 5rem 0;
          position: relative;
        }

        .timeline {
          max-width: 500px; /* Micro-scaled width */
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .timeline-step {
          display: flex;
          gap: 1rem; /* Micro-gap */
          min-height: 60px; /* Micro-height */
        }

        .timeline-marker-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 40px; /* Micro-col width */
        }

        .timeline-icon-wrapper {
          width: 40px; /* Micro-icon */
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--color-accent-lighter);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 2;
        }

        .timeline-icon-wrapper svg {
          width: 18px; /* Micro-svg */
          height: 18px;
        }

        .timeline-line-track {
          width: 2px;
          flex-grow: 1;
          background: var(--color-border-light);
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .timeline-line-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: var(--color-accent);
          border-radius: 2px;
        }

        .timeline-content-wrapper {
          flex-grow: 1;
          padding-bottom: 2rem; /* Micro-spacing */
        }

        .journey-card {
          background: white;
          border-radius: 12px; /* Micro-radius */
          padding: 1rem 1.25rem; /* Micro-padding */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid var(--color-border-light);
          /* cursor: pointer; removed to avoid confusion if not whole card clickable, but fine */
        }

         .journey-card h3 {
           font-size: 0.9rem; /* Reduced from 1rem */
           margin-bottom: 0;
           font-weight: 600;
           color: #111827;
        }

        .journey-card p {
           font-size: 0.8rem; /* Reduced from 0.875rem */
           color: #6b7280;
           line-height: 1.4;
           margin-top: 0.25rem;
        }

         .journey-card:hover {
           transform: translateY(-2px);
           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
           border-color: var(--color-accent-lighter);
         }

        .step-number {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 600; /* Reduced from 700 to match course badge */
          color: #1f2937; /* Dark Grey */
          background: rgba(55, 65, 81, 0.15); /* Grey Pill BG */
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          margin-bottom: 0.25rem;
          letter-spacing: 0.05em;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 640px) {
          .timeline-step {
            gap: 1rem;
          }
          
          .timeline-content-wrapper {
             padding-bottom: 2rem;
          }

          .journey-card {
            padding: 1.5rem;
          }
        }

        /* Logic Section */
        .logic-section {
          padding: 5rem 0;
          background: #f9fafb;
        }
        .philosophy-cards {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .philosophy-card {
          flex: 1;
          max-width: 240px;
          padding: 2rem;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          text-align: center;
        }

        .philosophy-card-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          margin: 0 auto 1rem;
        }

        .philosophy-card-icon.brain {
          background: #fef3c7;
          color: #d97706;
        }

        .philosophy-card-icon.code {
          background: var(--color-accent-lighter);
          color: var(--color-accent);
        }

        .philosophy-card-icon svg {
          width: 28px;
          height: 28px;
        }

        .philosophy-card h4 {
          font-size: 1.0625rem;
          margin-bottom: 0.25rem;
        }

        .philosophy-card p {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        .logic-arrow {
          width: 80px;
          transform-origin: left center;
        }

        .logic-arrow svg {
          width: 100%;
          height: auto;
        }

        /* Progress Section */
        .progress-section {
          padding: 6rem 0;
          background-color: #f9fafb;
        }

        .progress-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .progress-content h2 {
           font-size: 2.5rem;
           margin-bottom: 1.5rem;
           letter-spacing: -0.02em;
           color: #111827;
        }

        .progress-description {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 2.5rem;
          max-width: 480px;
          line-height: 1.6;
        }

        .progress-features {
          list-style: none;
          padding: 0;
        }

        .progress-features li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          color: #374151;
          font-weight: 500;
          font-size: 1.0625rem;
        }

        .progress-features li svg {
          width: 20px;
          height: 20px;
          color: #4f46e5; /* Indigo checkmarks */
          flex-shrink: 0;
        }

        .progress-card {
          background: white;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 20px 40px -4px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0,0,0,0.02);
        }

        .progress-card h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 2.5rem;
          padding-bottom: 0;
          border-bottom: none;
        }

        .progress-item {
          margin-bottom: 1.75rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .progress-label {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #6b7280;
        }

        .progress-value {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #4f46e5;
        }

        .progress-bar-bg {
          height: 8px;
          background: #f3f4f6;
          border-radius: 100px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: #4f46e5;
          border-radius: 100px;
        }

        .progress-check {
          position: absolute;
          right: -2rem;
          top: 0;
          color: #10b981;
          width: 20px;
          height: 20px;
        }

        @media (max-width: 900px) {
          .progress-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          
          .progress-features li {
             justify-content: center;
          }
          
          .progress-description {
             margin: 0 auto 2.5rem;
          }
        }

        /* CTA Section - Redesigned */
        .cta-section {
          padding: 6rem 0;
          background: white;
          border-top: 1px solid rgba(0,0,0,0.03);
        }

        .cta-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .cta-content p {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 2.5rem;
        }

        .cta-buttons {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          align-items: center;
          justify-content: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9375rem;
          transition: all 0.2s;
        }

        .btn-primary {
          background: hsla(214, 92%, 47%, 1);
          background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: none;
        }
        
        .btn-primary:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .btn-secondary-outline {
          background-color: white;
          color: #374151;
          border: 1px solid #e5e7eb;
          padding: 0.875rem 2rem; /* slightly wider visual balance */
        }
        
        .btn-secondary-outline:hover {
          background-color: #f9fafb;
          border-color: #d1d5db;
          color: #111827;
        }
        
        .btn-spacer {
            height: 0.5rem; /* Additional optical spacing if generic gap isn't enough */
        }

        @media (max-width: 640px) {
          .cta-content {
             text-align: center;
             margin: 0 auto;
          }
          
          .cta-buttons {
             align-items: center;
          }
          
          .cta-content h2 {
             font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};
