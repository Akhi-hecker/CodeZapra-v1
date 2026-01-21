import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ScrollReveal } from '../animations';

const steps = [
  {
    id: 1,
    title: 'Choose a Course',
    description: 'Select from Python, Java, JavaScript, and more structured learning paths',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    color: '#3b82f6',
    bgColor: '#eff6ff',
  },
  {
    id: 2,
    title: 'Visual Explanations',
    description: 'Watch complex concepts come alive through smooth, interactive animations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
  },
  {
    id: 3,
    title: 'Explain Your Logic',
    description: 'Describe your problem-solving approach before writing any code',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: '#10b981',
    bgColor: '#ecfdf5',
  },
  {
    id: 4,
    title: 'Write & Evaluate',
    description: 'Unlock the code editor and test your solution with instant feedback',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: '#f59e0b',
    bgColor: '#fffbeb',
  },
  {
    id: 5,
    title: 'Track Progress',
    description: 'See your growth with detailed analytics and achievement milestones',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: '#ef4444',
    bgColor: '#fef2f2',
  },
];

export const HowItWorks = () => {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setIsPaused] = useState(false);

  // Auto-advance carousel - always running
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;

    // Handle wrap-around for smooth infinite feel
    let adjustedDiff = diff;
    if (diff > 2) adjustedDiff = diff - steps.length;
    if (diff < -2) adjustedDiff = diff + steps.length;

    const isCenter = adjustedDiff === 0;

    const isVisible = Math.abs(adjustedDiff) <= 1;

    return {
      x: adjustedDiff * 280,
      scale: isCenter ? 1 : 0.85,
      opacity: isVisible ? (isCenter ? 1 : 0.6) : 0,
      zIndex: isCenter ? 10 : isVisible ? 5 : 0,
      filter: isCenter ? 'blur(0px)' : 'blur(3px)',
      rotateY: adjustedDiff * -5,
    };
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="hiw-section">
      <div className="container">
        <ScrollReveal>
          <div className="hiw-header">
            <span className="hiw-badge">How it works</span>
            <h2 className="hiw-title">How the Learning Works</h2>
            <p className="hiw-subtitle">A structured approach to build real programming skills</p>
          </div>
        </ScrollReveal>

        <div
          className="carousel-container"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button className="nav-arrow nav-prev" onClick={goPrev} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="nav-arrow nav-next" onClick={goNext} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="cards-viewport">
            <div className="cards-track">
              {steps.map((step, index) => {
                const style = getCardStyle(index);
                return (
                  <motion.div
                    key={step.id}
                    className="carousel-card"
                    animate={style}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }}
                    onClick={() => goToSlide(index)}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-140px',
                    }}
                  >
                    <div
                      className="card-inner"
                      style={{
                        background: step.bgColor,
                        borderColor: index === activeIndex ? step.color : 'rgba(0,0,0,0)'
                      }}
                    >
                      {/* Step Badge */}
                      <div className="step-badge" style={{ background: step.color }}>
                        Step {step.id}
                      </div>

                      {/* Icon */}
                      <div className="card-icon" style={{ color: step.color }}>
                        {step.icon}
                      </div>

                      {/* Content */}
                      <h3 className="card-title">{step.title}</h3>
                      <p className="card-desc">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="carousel-dots">
            {steps.map((step, index) => (
              <button
                key={step.id}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                style={{
                  background: index === activeIndex ? step.color : '#d1d5db'
                }}
              />
            ))}
          </div>

          {/* Step Counter */}
          <div className="step-counter">
            <span className="current">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="separator">/</span>
            <span className="total">{String(steps.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <style>{`
        .hiw-section {
          padding: 5rem 0;
          background: #ffffff;
          overflow: hidden;
        }

        .hiw-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .hiw-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
          color: #4f46e5;
          font-size: 0.8125rem;
          font-weight: 600;
          border-radius: 100px;
          margin-bottom: 1rem;
        }

        .hiw-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .hiw-subtitle {
          font-size: 1.0625rem;
          color: #6b7280;
        }

        .carousel-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        /* Navigation Arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.2s;
          color: #374151;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .nav-arrow:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: translateY(-50%) scale(1.05);
        }

        .nav-prev {
          left: 0;
        }

        .nav-next {
          right: 0;
        }

        /* Cards Viewport */
        .cards-viewport {
          position: relative;
          height: 360px;
          perspective: 1000px;
        }

        .cards-track {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Card Styles */
        .carousel-card {
          width: 280px;
          cursor: pointer;
        }

        .card-inner {
          padding: 2rem 1.5rem;
          border-radius: 24px;
          border: 2px solid transparent;
          text-align: center;
          height: 320px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s;
        }

        .step-badge {
          display: inline-block;
          align-self: center;
          padding: 0.375rem 1rem;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 50px;
          margin-bottom: 1.25rem;
        }

        .card-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .card-icon svg {
          width: 28px;
          height: 28px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .card-desc {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.6;
          flex: 1;
        }

        /* Dots */
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dot:hover {
          transform: scale(1.2);
        }

        .dot.active {
          width: 28px;
          border-radius: 5px;
        }

        /* Step Counter */
        .step-counter {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .step-counter .current {
          font-weight: 700;
          color: #111827;
          font-size: 1.125rem;
        }

        .step-counter .separator {
          margin: 0 0.25rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hiw-title {
            font-size: 1.875rem;
          }

          .nav-arrow {
            width: 40px;
            height: 40px;
          }

          .nav-prev {
            left: -0.5rem;
          }

          .nav-next {
            right: -0.5rem;
          }

          .carousel-card {
            width: 260px;
          }

          .card-inner {
            height: 300px;
            padding: 1.5rem 1.25rem;
          }

          .cards-viewport {
            height: 340px;
          }
        }

        @media (max-width: 480px) {
          .carousel-container {
            padding: 1rem 2.5rem;
          }

          .carousel-card {
            width: 240px;
          }

          .card-inner {
            height: 280px;
          }

          .cards-viewport {
            height: 320px;
          }

          .nav-arrow {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
