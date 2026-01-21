import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

// Array for sorting
const initialArray = [5, 2, 8, 1, 9, 3];

// Sorting Visualizer
const SortingVisualizer = () => {
  const [array, setArray] = useState([...initialArray]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState('');
  const isMountedRef = useRef(true);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runBubbleSort = useCallback(async () => {
    setArray([...initialArray]);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
    setCurrentStep('Starting...');
    await sleep(1500);

    const arr = [...initialArray];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isMountedRef.current) return;

        setComparing([j, j + 1]);
        setSwapping([]);
        setCurrentStep(`Comparing ${arr[j]} and ${arr[j + 1]}`);
        await sleep(1400);

        if (arr[j] > arr[j + 1]) {
          setComparing([]);
          setSwapping([j, j + 1]);
          setCurrentStep(`${arr[j]} > ${arr[j + 1]} → Swap`);
          await sleep(1200);

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(800);
          setSwapping([]);
        } else {
          setCurrentStep(`${arr[j]} ≤ ${arr[j + 1]} → OK`);
          await sleep(700);
        }
        setComparing([]);
      }
      if (isMountedRef.current) {
        setSorted(prev => [...prev, n - 1 - i]);
        await sleep(400);
      }
    }

    if (isMountedRef.current) {
      setSorted(prev => [...prev, 0]);
      setCurrentStep('✓ Sorted!');
      await sleep(3000);
      if (isMountedRef.current) runBubbleSort();
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => runBubbleSort(), 1200);
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [runBubbleSort]);

  return (
    <div className="sort-card">
      <div className="sort-header">
        <div>
          <span className="sort-title">Bubble Sort</span>
          <span className="sort-sub">Sorting visualization</span>
        </div>
        <span className="live-badge">
          <span className="live-dot"></span>
          Live
        </span>
      </div>

      <div className="sort-body">
        <AnimatePresence>
          {swapping.length === 2 && (
            <motion.svg
              className="arrow-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ left: `${swapping[0] * 60 + 30}px` }}
              width="60" height="20" viewBox="0 0 60 20"
            >
              <path d="M6 18 Q6 4 30 4 Q54 4 54 18" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M50 14 L54 18 L58 14" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>

        <div className="box-row">
          {array.map((value, index) => {
            const isComparing = comparing.includes(index);
            const isSwapping = swapping.includes(index);
            const isSorted = sorted.includes(index);

            let cls = 'box';
            if (isSorted) cls += ' sorted';
            else if (isSwapping) cls += ' swap';
            else if (isComparing) cls += ' compare';

            return (
              <motion.div
                key={index}
                className={cls}
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                animate={{ y: isSwapping ? -6 : 0 }}
              >
                {value}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {swapping.length === 2 && (
            <motion.svg
              className="arrow-bottom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ left: `${swapping[0] * 60 + 30}px` }}
              width="60" height="20" viewBox="0 0 60 20"
            >
              <path d="M54 2 Q54 16 30 16 Q6 16 6 2" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M10 6 L6 2 L2 6" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>

        <div className="idx-row">
          {array.map((_, i) => <span key={i}>{i}</span>)}
        </div>
      </div>

      <div className="sort-status">{currentStep || '...'}</div>

      <div className="legend">
        <div><span className="leg compare"></span>Comparing</div>
        <div><span className="leg swap"></span>Swapping</div>
        <div><span className="leg sorted"></span>Sorted</div>
      </div>
    </div>
  );
};

// Main Hero Component
export const Hero = () => {
  const ref = useRef(null);

  return (
    <section className="hero-section" ref={ref}>
      <div className="container">
        <div className="hero-grid">
          {/* Left Content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge-wrapper">
              <span className="hero-badge">
                <span className="badge-dot"></span>
                Logic-First Learning Platform
              </span>
            </div>

            <h1 className="hero-title">
              Think First.
              <br />
              <span className="title-accent">Code Later.</span>
            </h1>

            <p className="hero-desc">
              Master programming through <strong>visualization</strong>, logic validation, and guided implementation. Build real problem-solving skills, not just syntax memory.
            </p>

            <div className="hero-cta">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/courses" className="btn-primary">
                  Start Learning
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/how-it-works" className="btn-ghost">
                  See How It Works
                </Link>
              </motion.div>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">5+</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">100+</span>
                <span className="stat-label">Topics</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">Free</span>
                <span className="stat-label">To Start</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Visualizer */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SortingVisualizer />
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 7rem 0 6rem;
          background: #f9fafb;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-content { max-width: 560px; }
        .hero-badge-wrapper { margin-bottom: 1.75rem; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1.25rem 0.5rem 0.75rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .badge-dot {
          width: 8px; height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .hero-title {
          font-size: 4rem;
          line-height: 1.05;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .title-accent { color: #4f46e5; }
        .hero-desc {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #64748b;
          margin-bottom: 2.25rem;
        }
        .hero-desc strong { color: #334155; }
        .hero-cta { display: flex; gap: 1rem; margin-bottom: 2.5rem; }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.75rem;
          background: #4f46e5;
          color: white;
          font-weight: 600;
          border-radius: 12px;
          box-shadow: 0 8px 20px -4px rgba(79,70,229,0.4);
          transition: all 0.2s;
        }
        .btn-primary:hover {
          box-shadow: 0 12px 28px -4px rgba(79,70,229,0.5);
          transform: translateY(-2px);
        }
        .btn-ghost {
          display: inline-flex;
          padding: 1rem 1.75rem;
          background: white;
          color: #374151;
          font-weight: 600;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .btn-ghost:hover { background: #f8fafc; border-color: #d1d5db; }
        .hero-stats { display: flex; align-items: center; gap: 2rem; }
        .stat { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.75rem; font-weight: 800; color: #0f172a; }
        .stat-label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; }
        .stat-divider { width: 1px; height: 36px; background: #e2e8f0; }

        /* Sorting Card */
        .sort-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.04), 0 16px 40px -8px rgba(0,0,0,0.08);
          max-width: 420px;
          margin: 0 auto;
        }
        .sort-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .sort-title {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: #4f46e5;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.125rem;
        }
        .sort-sub { font-size: 0.85rem; color: #64748b; }
        .live-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #10b981;
        }
        .live-dot {
          width: 6px; height: 6px;
          background: #10b981;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        .sort-body { position: relative; padding: 1.5rem 0; }
        .arrow-top, .arrow-bottom { position: absolute; z-index: 5; }
        .arrow-top { top: 0; }
        .arrow-bottom { bottom: 24px; }
        
        .box-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 24px 0;
        }
        .box {
          width: 52px; height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          font-size: 1.15rem;
          font-weight: 700;
          color: #475569;
          transition: all 0.15s;
        }
        .box.compare {
          background: #eef2ff;
          border-color: #6366f1;
          color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .box.swap {
          background: #fffbeb;
          border-color: #f59e0b;
          color: #d97706;
          box-shadow: 0 4px 12px -2px rgba(245,158,11,0.25);
        }
        .box.sorted {
          background: #ecfdf5;
          border-color: #10b981;
          color: #059669;
        }

        .idx-row { display: flex; justify-content: center; gap: 12px; }
        .idx-row span {
          width: 52px;
          text-align: center;
          font-size: 0.7rem;
          font-family: 'SF Mono', monospace;
          color: #94a3b8;
        }

        .sort-status {
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .legend { display: flex; justify-content: center; gap: 1.25rem; font-size: 0.7rem; color: #64748b; }
        .legend div { display: flex; align-items: center; gap: 0.35rem; }
        .leg { width: 12px; height: 12px; border-radius: 4px; border: 2px solid; }
        .leg.compare { background: #eef2ff; border-color: #6366f1; }
        .leg.swap { background: #fffbeb; border-color: #f59e0b; }
        .leg.sorted { background: #ecfdf5; border-color: #10b981; }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
          .hero-content { text-align: center; max-width: 100%; margin: 0 auto; }
          .hero-cta, .hero-stats { justify-content: center; }
          .hero-title { font-size: 3rem; }
          .sort-card { max-width: 100%; }
        }
      `}</style>
    </section>
  );
};
