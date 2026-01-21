import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '../animations';

// Bento grid feature cards with programming-related illustrations
const BentoCard = ({
    title,
    description,
    illustration,
    className = '',
    index
}: {
    title: string;
    description: string;
    illustration: React.ReactNode;
    className?: string;
    index: number;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className={`bento-card ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            <div className="bento-content">
                <h3 className="bento-title">{title}</h3>
                <p className="bento-desc">{description}</p>
            </div>
            <div className="bento-illustration">
                {illustration}
            </div>
        </motion.div>
    );
};

// Logic Before Implementation - Flowchart/Pseudocode
const LogicIllustration = () => (
    <div className="illustration-logic">
        <div className="logic-step">
            <div className="step-icon think">💭</div>
            <span>Think First</span>
        </div>
        <div className="logic-arrow">→</div>
        <div className="logic-step">
            <div className="step-icon plan">📝</div>
            <span>Write Steps</span>
        </div>
        <div className="logic-arrow">→</div>
        <div className="logic-step">
            <div className="step-icon code">💻</div>
            <span>Then Code</span>
        </div>
        <div className="logic-pseudo">
            <div className="pseudo-line"><span className="keyword">Step 1:</span> Understand the problem</div>
            <div className="pseudo-line"><span className="keyword">Step 2:</span> Break into smaller parts</div>
            <div className="pseudo-line"><span className="keyword">Step 3:</span> Write code for each</div>
        </div>
    </div>
);

// Visual Concept Clarity - Animation/Diagram
const VisualIllustration = () => (
    <div className="illustration-visual">
        <div className="visual-diagram">
            <div className="diagram-title">Sorting Animation</div>
            <div className="diagram-bars">
                <div className="bar bar-1" style={{ height: '60%' }}></div>
                <div className="bar bar-2 active" style={{ height: '30%' }}></div>
                <div className="bar bar-3" style={{ height: '80%' }}></div>
                <div className="bar bar-4 active" style={{ height: '45%' }}></div>
                <div className="bar bar-5" style={{ height: '70%' }}></div>
            </div>
            <div className="diagram-label">
                <span className="swap-icon">↔️</span>
                <span>Swapping elements...</span>
            </div>
        </div>
    </div>
);

// Meaningful Progress Tracking - Course Progress
const ProgressIllustration = () => (
    <div className="illustration-progress">
        <div className="progress-course">
            <div className="course-header">
                <span className="course-icon">🐍</span>
                <span className="course-name">Python Basics</span>
                <span className="course-pct">72%</span>
            </div>
            <div className="course-bar">
                <div className="bar-fill" style={{ width: '72%' }}></div>
            </div>
        </div>
        <div className="progress-topics">
            <div className="topic-item completed">
                <span className="topic-check">✓</span>
                <span>Variables & Data Types</span>
            </div>
            <div className="topic-item completed">
                <span className="topic-check">✓</span>
                <span>Control Flow</span>
            </div>
            <div className="topic-item current">
                <span className="topic-dot"></span>
                <span>Functions</span>
            </div>
            <div className="topic-item">
                <span className="topic-lock">🔒</span>
                <span>Data Structures</span>
            </div>
        </div>
    </div>
);

// Guided Structured Practice - Step-by-step
const GuidedIllustration = () => (
    <div className="illustration-guided">
        <div className="guided-steps">
            <div className="guide-step done">
                <div className="step-num">1</div>
                <div className="step-content">
                    <span className="step-title">Watch Video</span>
                    <span className="step-status">✓ Completed</span>
                </div>
            </div>
            <div className="guide-step done">
                <div className="step-num">2</div>
                <div className="step-content">
                    <span className="step-title">Explain Logic</span>
                    <span className="step-status">✓ Completed</span>
                </div>
            </div>
            <div className="guide-step active">
                <div className="step-num">3</div>
                <div className="step-content">
                    <span className="step-title">Write Code</span>
                    <span className="step-status active-badge">In Progress</span>
                </div>
            </div>
            <div className="guide-step">
                <div className="step-num">4</div>
                <div className="step-content">
                    <span className="step-title">Submit</span>
                </div>
            </div>
        </div>
    </div>
);

// Real Coding Practice - Code Editor
const CodingIllustration = () => (
    <div className="illustration-coding">
        <div className="code-editor">
            <div className="editor-header">
                <div className="editor-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <span className="editor-title">main.py</span>
            </div>
            <div className="editor-body">
                <div className="code-line"><span className="line-num">1</span><span className="keyword">def</span> <span className="func">fibonacci</span>(n):</div>
                <div className="code-line"><span className="line-num">2</span>    <span className="keyword">if</span> n &lt;= <span className="num">1</span>:</div>
                <div className="code-line"><span className="line-num">3</span>        <span className="keyword">return</span> n</div>
                <div className="code-line"><span className="line-num">4</span>    <span className="keyword">return</span> <span className="func">fibonacci</span>(n-<span className="num">1</span>) + ...</div>
            </div>
            <div className="editor-output">
                <span className="output-label">Output:</span>
                <span className="output-text">0, 1, 1, 2, 3, 5, 8...</span>
            </div>
        </div>
    </div>
);

export const WhyThisPlatform = () => {
    return (
        <section className="why-section">
            <div className="container">
                <ScrollReveal>
                    <div className="why-header">
                        <h2>Why This Platform</h2>
                        <p>A different approach to learning programming that actually works</p>
                    </div>
                </ScrollReveal>

                <div className="bento-grid">
                    {/* Row 1: 3 columns */}
                    <BentoCard
                        title="Logic Before Implementation"
                        description="Build problem-solving skills by explaining your approach first."
                        illustration={<LogicIllustration />}
                        className="bento-normal"
                        index={0}
                    />
                    <BentoCard
                        title="Visual Concept Clarity"
                        description="Watch algorithms come alive with smooth animations."
                        illustration={<VisualIllustration />}
                        className="bento-center"
                        index={1}
                    />
                    <BentoCard
                        title="Meaningful Progress Tracking"
                        description="See your growth with detailed analytics."
                        illustration={<ProgressIllustration />}
                        className="bento-normal"
                        index={2}
                    />

                    {/* Row 2: 2 columns */}
                    <BentoCard
                        title="Guided Structured Practice"
                        description="Follow a proven step-by-step learning path."
                        illustration={<GuidedIllustration />}
                        className="bento-wide"
                        index={3}
                    />
                    <BentoCard
                        title="Real Coding Practice"
                        description="Write and test code with instant feedback."
                        illustration={<CodingIllustration />}
                        className="bento-wide"
                        index={4}
                    />
                </div>
            </div>

            <style>{`
                .why-section {
                    padding: 5rem 0;
                    background: #f9fafb;
                }

                .why-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .why-header h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.5rem;
                }

                .why-header p {
                    font-size: 1rem;
                    color: #6b7280;
                }

                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .bento-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    min-height: 300px;
                    border: 1px solid #e5e7eb;
                    transition: box-shadow 0.2s, transform 0.2s;
                }

                .bento-card:hover {
                    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
                    transform: translateY(-2px);
                }

                .bento-card:nth-child(4) {
                    grid-column: span 1;
                }

                .bento-card:nth-child(5) {
                    grid-column: span 2;
                }

                .bento-content {
                    margin-bottom: 1rem;
                }

                .bento-title {
                    font-size: 1.0625rem;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 0.375rem;
                    line-height: 1.3;
                }

                .bento-desc {
                    font-size: 0.875rem;
                    color: #6b7280;
                    line-height: 1.5;
                }

                .bento-illustration {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                }

                /* Logic Illustration - Think -> Plan -> Code */
                .illustration-logic {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    width: 100%;
                }

                .logic-step {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    color: #374151;
                }

                .step-icon {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    font-size: 1rem;
                }

                .step-icon.think { background: #fef3c7; }
                .step-icon.plan { background: #dbeafe; }
                .step-icon.code { background: #d1fae5; }

                .illustration-logic {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: flex-start;
                }

                .logic-arrow {
                    color: #9ca3af;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                }

                .logic-pseudo {
                    width: 100%;
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 0.75rem;
                    margin-top: 0.5rem;
                }

                .pseudo-line {
                    font-size: 0.6875rem;
                    color: #6b7280;
                    padding: 0.25rem 0;
                    font-family: monospace;
                }

                .pseudo-line .keyword {
                    color: #6366f1;
                    font-weight: 600;
                }

                /* Visual Illustration - Sorting Animation */
                .illustration-visual {
                    width: 100%;
                }

                .visual-diagram {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 1rem;
                }

                .diagram-title {
                    font-size: 0.6875rem;
                    font-weight: 600;
                    color: #6366f1;
                    margin-bottom: 0.75rem;
                    text-align: center;
                }

                .diagram-bars {
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    gap: 0.375rem;
                    height: 80px;
                    padding: 0 1rem;
                }

                .bar {
                    width: 24px;
                    background: #e5e7eb;
                    border-radius: 4px 4px 0 0;
                    transition: all 0.3s;
                }

                .bar.active {
                    background: #6366f1;
                }

                .diagram-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.375rem;
                    margin-top: 0.75rem;
                    font-size: 0.6875rem;
                    color: #6b7280;
                }

                /* Progress Illustration */
                .illustration-progress {
                    width: 100%;
                }

                .progress-course {
                    background: #f8fafc;
                    border-radius: 10px;
                    padding: 0.75rem;
                    margin-bottom: 0.75rem;
                }

                .course-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .course-icon {
                    font-size: 1rem;
                }

                .course-name {
                    flex: 1;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #111827;
                }

                .course-pct {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #10b981;
                }

                .course-bar {
                    height: 6px;
                    background: #e5e7eb;
                    border-radius: 3px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #10b981, #34d399);
                    border-radius: 3px;
                }

                .progress-topics {
                    display: flex;
                    flex-direction: column;
                    gap: 0.375rem;
                }

                .topic-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.6875rem;
                    color: #9ca3af;
                    padding: 0.375rem 0.5rem;
                    background: #f8fafc;
                    border-radius: 6px;
                }

                .topic-item.completed {
                    color: #10b981;
                }

                .topic-item.current {
                    color: #6366f1;
                    background: #eef2ff;
                }

                .topic-check {
                    font-size: 0.625rem;
                }

                .topic-dot {
                    width: 6px;
                    height: 6px;
                    background: #6366f1;
                    border-radius: 50%;
                }

                .topic-lock {
                    font-size: 0.625rem;
                    opacity: 0.5;
                }

                /* Guided Illustration */
                .illustration-guided {
                    width: 100%;
                }

                .guided-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .guide-step {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.625rem;
                    background: #f8fafc;
                    border-radius: 10px;
                    border-left: 3px solid #e5e7eb;
                }

                .guide-step.done {
                    border-left-color: #10b981;
                }

                .guide-step.active {
                    border-left-color: #6366f1;
                    background: #eef2ff;
                }

                .step-num {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #e5e7eb;
                    color: #6b7280;
                    border-radius: 50%;
                    font-size: 0.6875rem;
                    font-weight: 600;
                }

                .guide-step.done .step-num {
                    background: #d1fae5;
                    color: #10b981;
                }

                .guide-step.active .step-num {
                    background: #6366f1;
                    color: white;
                }

                .step-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .step-title {
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: #374151;
                }

                .step-status {
                    font-size: 0.625rem;
                    color: #10b981;
                }

                .step-status.active-badge {
                    color: #6366f1;
                }

                /* Coding Illustration */
                .illustration-coding {
                    width: 100%;
                }

                .code-editor {
                    background: #1e293b;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .editor-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.625rem 0.75rem;
                    background: #334155;
                }

                .editor-dots {
                    display: flex;
                    gap: 0.375rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .dot.red { background: #ef4444; }
                .dot.yellow { background: #f59e0b; }
                .dot.green { background: #10b981; }

                .editor-title {
                    font-size: 0.6875rem;
                    color: #94a3b8;
                    margin-left: auto;
                }

                .editor-body {
                    padding: 0.75rem;
                }

                .code-line {
                    font-family: 'Fira Code', 'SF Mono', monospace;
                    font-size: 0.6875rem;
                    color: #e2e8f0;
                    padding: 0.125rem 0;
                    display: flex;
                    gap: 0.5rem;
                }

                .line-num {
                    color: #64748b;
                    min-width: 16px;
                }

                .code-line .keyword { color: #f472b6; }
                .code-line .func { color: #60a5fa; }
                .code-line .num { color: #fbbf24; }

                .editor-output {
                    padding: 0.625rem 0.75rem;
                    background: #0f172a;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .output-label {
                    font-size: 0.625rem;
                    color: #10b981;
                    font-weight: 500;
                }

                .output-text {
                    font-size: 0.625rem;
                    color: #94a3b8;
                    font-family: monospace;
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .bento-card:nth-child(5) {
                        grid-column: span 2;
                    }
                }

                @media (max-width: 640px) {
                    .bento-grid {
                        grid-template-columns: 1fr;
                    }

                    .bento-card:nth-child(5) {
                        grid-column: span 1;
                    }

                    .bento-card {
                        min-height: 260px;
                    }
                }
            `}</style>
        </section>
    );
};

export default WhyThisPlatform;
