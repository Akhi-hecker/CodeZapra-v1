import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '../animations';

const exampleLogic = `1. First, I'll check if the array is empty
2. Then iterate through each element
3. Compare current element with next
4. Swap if current > next
5. Repeat until no swaps needed`;

const exampleCode = `function bubbleSort(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}`;

interface LogicFirstDemoProps {
  badge?: string;
  title?: string;
  subtitle?: string;
}

export const LogicFirstDemo = ({
  badge = "Key Feature",
  title = "Logic-First Learning",
  subtitle = "Master the thinking process before writing any code"
}: LogicFirstDemoProps) => {
  const [typedText, setTypedText] = useState('');
  const [typedCode, setTypedCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCodeTyping, setIsCodeTyping] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    // ... (rest of animation logic remains unchanged)
    if (!isInView) return;

    let mounted = true;
    let typeInterval: ReturnType<typeof setInterval>;
    let codeInterval: ReturnType<typeof setInterval>;
    let sequenceTimeout: ReturnType<typeof setTimeout>;

    const runAnimation = () => {
      // Reset state
      setTypedText('');
      setTypedCode('');
      setIsUnlocked(false);
      setIsCodeTyping(false);
      setShowCheck(false);

      let currentIndex = 0;
      typeInterval = setInterval(() => {
        if (!mounted) return;

        if (currentIndex < exampleLogic.length) {
          setTypedText(exampleLogic.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);

          // Logic completed, show check
          sequenceTimeout = setTimeout(() => {
            if (!mounted) return;
            setShowCheck(true);

            // Unlock code
            sequenceTimeout = setTimeout(() => {
              if (!mounted) return;
              setIsUnlocked(true);

              // Start typing code
              sequenceTimeout = setTimeout(() => {
                if (!mounted) return;
                setIsCodeTyping(true);
                let codeIndex = 0;

                codeInterval = setInterval(() => {
                  if (!mounted) return;

                  if (codeIndex < exampleCode.length) {
                    setTypedCode(exampleCode.slice(0, codeIndex + 1));
                    codeIndex++;
                  } else {
                    clearInterval(codeInterval);
                    setIsCodeTyping(false);

                    // Restart loop after delay
                    sequenceTimeout = setTimeout(() => {
                      if (mounted) runAnimation();
                    }, 3000); // Wait 3 seconds before restarting
                  }
                }, 20);
              }, 300);
            }, 500);
          }, 800);
        }
      }, 30);
    };

    runAnimation();

    return () => {
      mounted = false;
      clearInterval(typeInterval);
      clearInterval(codeInterval);
      clearTimeout(sequenceTimeout);
    };
  }, [isInView]);

  return (
    <section className="lfd-section" ref={containerRef}>
      <div className="container">
        <ScrollReveal>
          <div className="lfd-header">
            <span className="lfd-badge">{badge}</span>
            <h2 className="lfd-title">{title}</h2>
            <p className="lfd-subtitle">{subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="lfd-demo">
          {/* Logic Panel */}
          <motion.div
            className="demo-card logic-card"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-header">
              <div className="header-left">
                <span className="status-dot active" />
                <span className="header-title">Describe your approach</span>
              </div>
              {showCheck && (
                <motion.div
                  className="check-badge"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </div>
            <div className="card-body">
              <div className="logic-content">
                {typedText}
                {!showCheck && <span className="typing-cursor" />}
              </div>
            </div>
          </motion.div>

          {/* Connection Arrow */}
          <div className="demo-connector">
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </div>

          {/* Code Panel */}
          <motion.div
            className={`demo-card code-card ${!isUnlocked ? 'locked' : ''}`}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-header">
              <div className="header-left">
                <div className="window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="header-title">editor.js</span>
              </div>
              {!isUnlocked && (
                <span className="lock-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              )}
            </div>
            <div className="card-body code-body">
              <pre className="code-content">
                <code>
                  {isUnlocked ? typedCode : exampleCode}
                  {isCodeTyping && <span className="typing-cursor" />}
                </code>
              </pre>

              {/* Lock Overlay */}
              <motion.div
                className="lock-overlay"
                initial={{ opacity: 1 }}
                animate={{ opacity: isUnlocked ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: isUnlocked ? 'none' : 'auto' }}
              >
                <div className="lock-content">
                  <div className="lock-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <span className="lock-text">Explain your logic to unlock</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .lfd-section {
          padding: 6rem 0;
          background: #f9fafb;
        }

        .lfd-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .lfd-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
          color: #4f46e5;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 100px;
          margin-bottom: 1rem;
        }

        .lfd-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .lfd-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
        }

        .lfd-demo {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1.5rem;
          max-width: 1000px;
          margin: 0 auto;
          align-items: center;
        }

        .demo-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981; /* Green color */
          width: 48px;
          height: 48px;
        }
        
        .demo-connector svg {
          width: 100%;
          height: 100%;
        }

        .demo-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .demo-card.locked {
          position: relative;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1.25rem;
          background: #fafafa;
          border-bottom: 1px solid #f3f4f6;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
        }

        .status-dot.active {
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .window-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .header-title {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #6b7280;
        }

        .check-badge {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          color: white;
        }

        .check-badge svg {
          width: 14px;
          height: 14px;
        }

        .lock-badge {
          width: 20px;
          height: 20px;
          color: #9ca3af;
        }

        .lock-badge svg {
          width: 100%;
          height: 100%;
        }

        .card-body {
          padding: 1.5rem;
          min-height: 280px;
        }

        .code-body {
          position: relative;
          padding: 0;
        }

        .logic-content {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 0.9375rem;
          line-height: 2;
          color: #374151;
          white-space: pre-wrap;
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #4f46e5;
          margin-left: 2px;
          animation: blink 1s infinite;
          vertical-align: text-bottom;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Code Card Dark Theme */
        .code-card {
          background: #1e293b;
          border-color: #334155;
        }

        .code-card .card-header {
          background: #0f172a;
          border-bottom-color: #1e293b;
        }

        .code-card .header-title {
          color: #94a3b8;
        }

        .code-content {
          margin: 0;
          padding: 1.5rem;
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 0.8125rem;
          line-height: 1.7;
          color: #e2e8f0;
          background: transparent;
          min-height: 280px;
          transition: filter 0.5s ease;
        }

        .demo-card.locked .code-content {
          filter: blur(4px);
        }

        .lock-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
        }

        .lock-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
        }

        .lock-icon-wrapper {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #334155;
          border-radius: 50%;
          color: #94a3b8;
        }

        .lock-icon-wrapper svg {
          width: 24px;
          height: 24px;
        }

        .lock-text {
          font-size: 0.9375rem;
          font-weight: 500;
          color: #cbd5e1;
        }

        @media (max-width: 768px) {
          .lfd-section {
            padding: 4rem 0;
          }

          .lfd-title {
            font-size: 2rem;
          }

          .lfd-demo {
            grid-template-columns: 1fr;
          }
          
          .demo-connector {
             transform: rotate(90deg);
             margin: 1rem 0;
          }

          .card-body,
          .code-content {
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default LogicFirstDemo;
