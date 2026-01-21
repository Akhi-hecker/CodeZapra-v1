import { ScrollReveal } from '../animations';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <ScrollReveal>
          <div className="cta-content">
            <h2 className="cta-title">
              Start Learning Today
            </h2>
            <p className="cta-description">
              Join learners building strong programming foundations.
            </p>
            <div className="cta-buttons">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/courses" className="cta-btn-primary">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/how-it-works" className="cta-btn-secondary">
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .cta-section {
          padding: 4rem 0 5rem;
          background: #ffffff;
        }

        .cta-content {
          text-align: center;
          max-width: 480px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .cta-description {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 1.75rem;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          background: hsla(214, 92%, 47%, 1);
          background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.2s;
        }

        .cta-btn-primary:hover {
          filter: brightness(1.1);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.75rem;
          background: transparent;
          color: #374151;
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: 50px;
          border: 1px solid #e5e7eb;
          text-decoration: none;
          transition: all 0.2s;
        }

        .cta-btn-secondary:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        @media (max-width: 480px) {
          .cta-title {
            font-size: 1.625rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
