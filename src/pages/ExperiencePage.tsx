import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FadeInUp, ScrollReveal } from '../components/animations';

// Type definition for experience content
type ExperienceContent = {
    title: string;
    subtitle: string;
    description: string;
    features: {
        title: string;
        description: string;
        icon: React.ReactNode;
    }[];
    image?: string; // Placeholder for now
    demoComponent?: React.ReactNode;
};

// Maze Visualizer Component
const MazeVisualizer = () => {
    // 0: Empty, 1: Wall, 2: Start, 3: End, 4: Visited, 5: Path
    const [grid, setGrid] = useState<number[][]>([]);
    const rows = 8;
    const cols = 12;

    const resetGrid = useCallback(() => {
        const newGrid = Array(rows).fill(0).map(() => Array(cols).fill(0));
        // Add walls (simple layout)
        const walls = [
            [1, 2], [2, 2], [3, 2], [4, 2],
            [1, 6], [2, 6], [5, 6], [6, 6],
            [3, 8], [4, 8], [5, 8],
            [6, 4], [5, 4]
        ];
        walls.forEach(([r, c]) => newGrid[r][c] = 1);
        newGrid[1][1] = 2; // Start
        newGrid[6][10] = 3; // End
        setGrid(newGrid);

        setTimeout(() => runBFS(newGrid), 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        resetGrid();
    }, [resetGrid]);

    const runBFS = async (initialGrid: number[][]) => {
        const queue: [number, number][] = [[1, 1]];
        const visited = new Set(['1,1']);
        const parent = new Map<string, string>();
        const gridCopy = initialGrid.map(row => [...row]);

        let found = false;

        // BFS Animation Loop
        while (queue.length > 0) {
            const [r, c] = queue.shift()!;

            if (r === 6 && c === 10) {
                found = true;
                break;
            }

            const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // R, D, L, U

            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                    gridCopy[nr][nc] !== 1 && !visited.has(`${nr},${nc}`)) {

                    visited.add(`${nr},${nc}`);
                    parent.set(`${nr},${nc}`, `${r},${c}`);
                    queue.push([nr, nc]);

                    if (!(nr === 6 && nc === 10)) {
                        // Visualization update
                        gridCopy[nr][nc] = 4;
                        setGrid(prev => {
                            const update = prev.map(row => [...row]);
                            update[nr][nc] = 4;
                            return update;
                        });
                        await new Promise(res => setTimeout(res, 50));
                    }
                }
            }
        }

        if (found) {
            // Reconstruct path
            let curr = '6,10';
            while (curr !== '1,1') {
                const p = parent.get(curr);
                if (!p) break;
                const [pr, pc] = p.split(',').map(Number);
                if (pr !== 1 || pc !== 1) {
                    gridCopy[pr][pc] = 5;
                    setGrid(prev => {
                        const update = prev.map(row => [...row]);
                        update[pr][pc] = 5;
                        return update;
                    });
                    await new Promise(res => setTimeout(res, 50));
                }
                curr = p;
            }
        }

        // Loop animation
        setTimeout(resetGrid, 3000);
    };

    return (
        <div className="maze-container">
            {grid.map((row, i) => (
                <div key={i} className="maze-row">
                    {row.map((cell, j) => (
                        <motion.div
                            key={`${i}-${j}`}
                            className={`maze-cell type-${cell}`}
                            initial={cell === 4 ? { scale: 0.8, opacity: 0 } : false}
                            animate={cell === 4 ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.2 }}
                        />
                    ))}
                </div>
            ))}
            <style>{`
                .maze-container { display: flex; flex-direction: column; gap: 4px; padding: 20px; background: #e2e8f0; border-radius: 8px; }
                .maze-row { display: flex; gap: 4px; }
                .maze-cell {
                    width: 24px; height: 24px; border-radius: 4px;
                    transition: all 0.3s ease;
                }
                .type-0 { background: #ffffff; } /* Empty */
                .type-1 { background: #334155; } /* Wall */
                .type-2 { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; z-index: 2; } /* Start */
                .type-3 { background: #ef4444; box-shadow: 0 0 10px #ef4444; z-index: 2; } /* End */
                .type-4 { background: #93c5fd; } /* Visited */
                .type-5 { background: #22c55e; transform: scale(1.1); box-shadow: 0 0 8px #22c55e; z-index: 1; } /* Path */
                
                @media (max-width: 640px) {
                    .maze-cell { width: 16px; height: 16px; }
                }
            `}</style>
        </div>
    );
};

// Logic Flowchart Component
const LogicFlowchart = () => {
    return (
        <div className="logic-container">
            <svg viewBox="0 0 800 400" className="flow-svg">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                </defs>

                {/* Nodes */}
                <g className="flow-node" transform="translate(50, 175)">
                    <rect width="100" height="50" rx="25" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" />
                    <text x="50" y="30" textAnchor="middle" fontSize="14" fill="#0369a1">Start ATM</text>
                </g>

                <g className="flow-node" transform="translate(200, 175)">
                    <rect width="120" height="50" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" rx="8" />
                    <text x="60" y="30" textAnchor="middle" fontSize="14" fill="#334155">Insert Card</text>
                </g>

                <g className="flow-node" transform="translate(370, 160)">
                    <foreignObject width="100" height="80">
                        <div style={{ width: '100px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '12px', background: '#fffbeb', border: '2px solid #fcd34d', borderRadius: '4px', transform: 'skewX(-10deg)', color: '#d97706', fontWeight: 'bold' }}>
                            PIN Correct?
                        </div>
                    </foreignObject>
                </g>

                <g className="flow-node" transform="translate(550, 80)">
                    <rect width="140" height="50" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" rx="8" />
                    <text x="70" y="30" textAnchor="middle" fontSize="14" fill="#15803d">Show Balance</text>
                </g>

                <g className="flow-node" transform="translate(550, 270)">
                    <rect width="140" height="50" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" rx="8" />
                    <text x="70" y="30" textAnchor="middle" fontSize="14" fill="#b91c1c">Eject Card</text>
                </g>

                {/* Edges */}
                <path d="M150 200 L200 200" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <path d="M320 200 L370 200" stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Branch Yes */}
                <path d="M470 200 L510 200 L510 105 L550 105" stroke="#22c55e" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <text x="500" y="160" fontSize="12" fill="#16a34a">Yes</text>

                {/* Branch No */}
                <path d="M420 240 L420 295 L550 295" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <text x="430" y="270" fontSize="12" fill="#dc2626">No</text>

                {/* Animated Dot */}
                <circle r="6" fill="#6366f1">
                    <animateMotion
                        dur="4s"
                        repeatCount="indefinite"
                        path="M100 200 L260 200 L420 200 L510 200 L510 105 L620 105"
                    />
                </circle>
            </svg>
            <style>{`
                .logic-container { width: 100%; height: 100%; min-height: 400px; display: flex; align-items: center; justify-content: center; background: #f8fafc; }
                .flow-svg { width: 100%; height: 100%; }
            `}</style>
        </div>
    );
};

// IDE Simulation Component
const IDEVisualizer = () => {
    return (
        <div className="ide-container">
            <div className="ide-sidebar">
                <div className="file active">script.js</div>
                <div className="file">utils.js</div>
                <div className="file">tests.js</div>
            </div>
            <div className="ide-main">
                <div className="ide-code">
                    <div className="line"><span className="k">function</span> <span className="f">calculateTotal</span>(items) {'{'}</div>
                    <div className="line indent"><span className="k">let</span> total = 0;</div>
                    <div className="line indent"><span className="k">for</span> (<span className="k">let</span> item <span className="k">of</span> items) {'{'}</div>
                    <div className="line indent double">total += item.price;</div>
                    <div className="line indent">{'}'}</div>
                    <div className="line indent"><span className="k">return</span> total;</div>
                    <div className="line">{'}'}</div>
                </div>
                <div className="ide-terminal">
                    <div className="term-header">Terminal</div>
                    <div className="term-line">$ npm test</div>
                    <div className="term-line success">✓ calculateTotal adds prices correctly</div>
                    <div className="term-line success">✓ returns 0 for empty array</div>
                    <div className="term-line fail">✕ handles negative prices (Expected 0)</div>
                    <div className="term-cursor">_</div>
                </div>
            </div>
            <style>{`
                .ide-container { display: flex; width: 100%; height: 400px; background: #1e293b; color: #cbd5e1; font-family: 'JetBrains Mono', monospace; overflow: hidden; }
                .ide-sidebar { width: 150px; background: #0f172a; border-right: 1px solid #334155; padding: 10px; }
                .file { padding: 8px 12px; cursor: pointer; font-size: 0.85rem; border-radius: 4px; color: #64748b; }
                .file.active { background: #1e293b; color: #e2e8f0; }
                .ide-main { flex: 1; display: flex; flex-direction: column; }
                .ide-code { flex: 1; padding: 20px; font-size: 0.95rem; line-height: 1.6; border-bottom: 1px solid #334155; }
                .indent { padding-left: 20px; }
                .double { padding-left: 40px; }
                .k { color: #c678dd; } /* Keyword */
                .f { color: #61afef; } /* Function */
                .ide-terminal { height: 140px; background: #0f172a; padding: 15px; font-size: 0.85rem; }
                .term-header { text-transform: uppercase; font-size: 0.7rem; color: #64748b; margin-bottom: 8px; font-weight: bold; }
                .term-line { margin-bottom: 4px; }
                .success { color: #4ade80; }
                .fail { color: #f87171; }
                .term-cursor { animation: blink 1s step-end infinite; display: inline-block; }
            `}</style>
        </div>
    );
};

// Dashboard Visualizer
const DashboardVisualizer = () => {
    // Generate stable heatmap data using useMemo with deterministic seeding
    const heatmapData = useMemo(() => {
        const seededRandom = (seed: number) => {
            const x = Math.sin(seed * 9999) * 10000;
            return x - Math.floor(x);
        };
        return Array.from({ length: 52 }, (_, i) => {
            const rand = seededRandom(i + 1);
            return rand > 0.6 ? seededRandom(i + 100) * 0.8 + 0.2 : 0.1;
        });
    }, []);

    return (
        <div className="Dash-container">
            <div className="stats-grid">
                <div className="stat-card">
                    <h4>Current Streak</h4>
                    <div className="big-num">12 <span className="unit">days</span></div>
                    <div className="chart-mini">
                        <div className="bar" style={{ height: '30%' }}></div>
                        <div className="bar" style={{ height: '50%' }}></div>
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '80%' }}></div>
                        <div className="bar" style={{ height: '60%' }}></div>
                        <div className="bar active" style={{ height: '100%' }}></div>
                    </div>
                </div>
                <div className="stat-card">
                    <h4>Topics Mastered</h4>
                    <div className="big-num">8/12</div>
                    <div className="progress-ring">
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="26" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                            <circle cx="30" cy="30" r="26" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="163" strokeDashoffset="50" strokeLinecap="round" transform="rotate(-90 30 30)" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="heatmap-section">
                <h4>Activity Log</h4>
                <div className="heatmap-grid">
                    {heatmapData.map((opacity, i) => (
                        <div key={i} className="heat-cell" style={{
                            opacity,
                            backgroundColor: '#22c55e'
                        }}></div>
                    ))}
                </div>
            </div>

            <style>{`
                .Dash-container { width: 100%; height: 100%; padding: 30px; background: #f8fafc; display: flex; flex-direction: column; gap: 30px; }
                .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .stat-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .stat-card h4 { font-size: 0.85rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
                .big-num { font-size: 2.5rem; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 15px; }
                .unit { font-size: 1rem; color: #64748b; font-weight: 500; }
                .chart-mini { display: flex; align-items: flex-end; gap: 6px; height: 40px; }
                .chart-mini .bar { width: 8px; background: #cbd5e1; border-radius: 4px; }
                .chart-mini .bar.active { background: #3b82f6; }
                
                .heatmap-section { background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; }
                .heatmap-section h4 { font-size: 0.9rem; color: #334155; margin-bottom: 15px; font-weight: 600; }
                .heatmap-grid { display: grid; grid-template-columns: repeat(13, 1fr); gap: 6px; }
                .heat-cell { width: 100%; padding-bottom: 100%; border-radius: 4px; }
            `}</style>
        </div>
    );
};

// Content for each slug
const experienceData: Record<string, ExperienceContent> = {
    'visual-explanation': {
        title: 'Visual Explanation',
        subtitle: 'See concepts come to life',
        description:
            'Why read about algorithms when you can watch them run? Our platform uses interactive animations to break down complex logic into step-by-step visual flows. Understand "how" and "why" code works, not just "what" to type.',
        features: [
            {
                title: 'Step-by-Step Execution',
                description: 'Watch variables change and loops iterate in real-time.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                ),
            },
            {
                title: 'Memory Models',
                description: 'Visualize how data is stored in stack and heap memory.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                ),
            },
            {
                title: 'Algorithm Visualizers',
                description: 'Interactive playgrounds for sorting, trees, and graphs.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                ),
            },
        ],
        demoComponent: (
            <div className="demo-visual">
                <div className="code-block" style={{ minWidth: '280px' }}>
                    <div className="line" style={{ color: '#94a3b8' }}>// BFS Path Finding</div>
                    <div className="line"><span style={{ color: '#c678dd' }}>while</span> <span style={{ color: '#e5c07b' }}>queue</span>:</div>
                    <div className="line indent">curr = queue.<span style={{ color: '#61afef' }}>pop</span>(0)</div>
                    <div className="line indent"><span style={{ color: '#c678dd' }}>if</span> curr == <span style={{ color: '#e06c75' }}>end</span>: <span style={{ color: '#c678dd' }}>return</span> <span style={{ color: '#d19a66' }}>True</span></div>
                    <div className="line indent"><span style={{ color: '#c678dd' }}>for</span> next <span style={{ color: '#c678dd' }}>in</span> neighbors:</div>
                    <div className="line indent" style={{ marginLeft: '40px' }}>visit(next)</div>
                </div>
                <div className="visual-block">
                    <MazeVisualizer />
                </div>
            </div>
        )
    },
    'logic-first-approach': {
        title: 'Logic-First Approach',
        subtitle: 'Think before you code',
        description:
            'Stop memorizing syntax. Start solving problems. We teach you how to break down problems into logical steps using flowcharts and pseudocode before you ever touch a keyboard. Examples help you master the "programmer\'s mindset".',
        features: [
            {
                title: 'Flowchart Design',
                description: 'Map out your solution visually before implementation.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                ),
            },
            {
                title: 'Pseudocode Practice',
                description: 'Write logic in plain English to verify your understanding.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                ),
            },
            {
                title: 'Problem Decomposition',
                description: 'Learn to break massive problems into manageable chunks.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                ),
            },
        ],
        demoComponent: <LogicFlowchart />
    },
    'instant-feedback': {
        title: 'Instant Feedback',
        subtitle: 'Learn from your mistakes, instantly',
        description:
            'Frustrated by cryptic error messages? Our intelligent code runner gives you human-readable feedback the moment you make a mistake. It highlights exactly where you went wrong and suggests how to fix it.',
        features: [
            {
                title: 'Real-time Linting',
                description: 'Catch syntax errors as you type, not after you run.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                ),
            },
            {
                title: 'Smart Hints',
                description: 'Stuck? Get context-aware hints that nudge you forward.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                ),
            },
            {
                title: 'Test Case Validation',
                description: 'Verify your code against edge cases automatically.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                ),
            },
        ],
        demoComponent: <IDEVisualizer />
    },
    'detailed-progress': {
        title: 'Detailed Progress',
        subtitle: 'Gamify your learning journey',
        description:
            'Stay motivated with a dashboard that shows exactly how far you\'ve come. Earn badges, track your daily streaks, and visualize your skill mastery across different topics.',
        features: [
            {
                title: 'Skill Radar',
                description: 'Visualize your strengths and weak spots.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                ),
            },
            {
                title: 'Daily Streaks',
                description: 'Build a habit by coding a little bit every day.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                ),
            },
            {
                title: 'Certificates',
                description: 'Earn sharable certificates upon course completion.',
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                ),
            },
        ],
        demoComponent: <DashboardVisualizer />
    },
};

export const ExperiencePage = () => {
    const { type } = useParams();

    if (!type || !experienceData[type]) {
        // Redirect or show 404
        return <Navigate to="/courses" replace />;
    }

    const content = experienceData[type];

    return (
        <div className="experience-page">
            {/* Hero Section */}
            <section className="exp-hero">
                <div className="container">
                    <Link to="/courses" className="back-link">
                        ← Back to Courses
                    </Link>
                    <FadeInUp>
                        <div className="hero-content">
                            <span className="pill">{content.subtitle}</span>
                            <h1>{content.title}</h1>
                            <p>{content.description}</p>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* Visual / Demo Section */}
            <section className="exp-visual-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="demo-wrapper">
                            {/* Window Header */}
                            <div className="demo-window-header">
                                <div className="win-dot red"></div>
                                <div className="win-dot yellow"></div>
                                <div className="win-dot green"></div>
                            </div>
                            {/* Window Content */}
                            <div className="demo-body">
                                {content.demoComponent}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Features Grid */}
            <section className="exp-features">
                <div className="container">
                    <div className="features-grid">
                        {content.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="feature-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="icon-box">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="exp-cta">
                <div className="container">
                    <h2>Ready to experience it yourself?</h2>
                    <Link to="/signup" className="primary-btn">Get Started for Free</Link>
                </div>
            </section>

            <style>{`
        .experience-page {
            min-height: 100vh;
            background: #ffffff;
            font-family: 'Inter', sans-serif;
            padding-top: 80px;
            color: #1e293b;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* Hero */
        .exp-hero {
            position: relative;
            padding: 100px 0 60px;
            text-align: center;
            background: radial-gradient(circle at 50% 0%, #f1f5f9 0%, transparent 70%);
            overflow: hidden;
        }
        
        .exp-hero::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 100%;
            background-image: 
              linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
            background-size: 30px 30px;
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
            pointer-events: none;
            z-index: 0;
        }

        .container { position: relative; z-index: 1; }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 40px;
            color: #64748b;
            font-weight: 500;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.2s;
            background: rgba(255,255,255,0.8);
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            backdrop-filter: blur(4px);
        }
        .back-link:hover { color: #0f172a; border-color: #cbd5e1; }

        .hero-content {
            max-width: 760px;
            margin: 0 auto;
        }

        .pill {
             display: inline-flex;
             background: #eff6ff;
             color: #2563eb;
             font-size: 0.8rem;
             font-weight: 700;
             padding: 8px 16px;
             border-radius: 30px;
             margin-bottom: 24px;
             text-transform: uppercase;
             letter-spacing: 0.06em;
             border: 1px solid #dbeafe;
             box-shadow: 0 2px 4px rgba(37, 99, 235, 0.05);
        }

        h1 {
            font-size: 3.75rem;
            color: #0f172a;
            margin-bottom: 24px;
            letter-spacing: -0.03em;
            line-height: 1.1;
            font-family: 'Satoshi', sans-serif; /* Assuming font is available globally as per other pages */
            font-weight: 800;
        }

        .hero-content p {
            font-size: 1.25rem;
            color: #475569;
            line-height: 1.7;
            font-weight: 400;
        }

        /* Demo Visual Section */
        .exp-visual-section {
            padding: 60px 0 100px;
            display: flex;
            justify-content: center;
        }

        .demo-wrapper {
            background: #ffffff;
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 20px;
            padding: 0; /* padding handled inside for 'window' feel */
            width: 100%;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            box-shadow: 
                0 20px 50px -12px rgba(0, 0, 0, 0.1),
                0 4px 6px -1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            position: relative;
        }
        
        /* Browser Window Header */
        .demo-window-header {
            height: 44px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 8px;
        }
        .win-dot {
            width: 10px; height: 10px; border-radius: 50%;
        }
        .win-dot.red { background: #ef4444; opacity: 0.8; }
        .win-dot.yellow { background: #f59e0b; opacity: 0.8; }
        .win-dot.green { background: #22c55e; opacity: 0.8; }
        
        .demo-body {
            flex: 1;
            padding: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at center, #ffffff, #fcfcfc);
        }

        /* Demo Specific Styles */
        .demo-visual {
            display: flex;
            gap: 60px;
            align-items: center;
        }
        .code-block {
            font-family: 'JetBrains Mono', monospace;
            background: #0f172a;
            color: #e2e8f0;
            padding: 24px;
            border-radius: 12px;
            font-size: 0.95rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            min-width: 250px;
            border: 1px solid #334155;
        }
        .indent { margin-left: 20px; color: #fbbf24; }
        .visual-block {
            display: flex;
            gap: 20px;
        }
        .circle-node {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
            border: 2px solid rgba(255,255,255,0.2);
        }

        .demo-flowchart {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .flow-step {
            padding: 12px 24px;
            border: 2px solid #cbd5e1;
            border-radius: 10px;
            background: white;
            font-weight: 600;
            color: #334155;
            min-width: 140px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.03);
            font-size: 0.95rem;
        }
        .flow-step.start { border-radius: 30px; background: #f0f9ff; border-color: #7dd3fc; color: #0284c7; }
        .flow-step.decision { transform: skewX(-10deg); background: #fffbeb; border-color: #fcd34d; color: #d97706; }
        .flow-step.action { background: #f0fdf4; border-color: #86efac; color: #16a34a; }
        .branches { display: flex; gap: 60px; }
        .branch { display: flex; flex-direction: column; align-items: center; }
        .arrow { color: #94a3b8; font-size: 1.2rem; margin: 4px 0; font-family: monospace; }
        
        .demo-feedback { width: 100%; max-width: 560px; }
        .code-editor {
            background: #1e293b;
            border-radius: 12px;
            padding: 24px;
            color: #f8fafc;
            font-family: 'JetBrains Mono', monospace;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            border: 1px solid #334155;
        }
        .code-line { margin-bottom: 16px; font-size: 1rem; }
        .code-line.error { text-decoration: underline wavy #ef4444; text-underline-offset: 4px; }
        .error-message {
            background: #450a0a;
            color: #fecaca;
            padding: 12px 16px;
            border-radius: 8px;
            margin-top: 16px;
            font-size: 0.9rem;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            border: 1px solid #7f1d1d;
        }
        .suggestion {
            color: #94a3b8;
            font-size: 0.85rem;
            margin-top: 10px;
            font-style: italic;
            padding-left: 26px;
        }

        .demo-progress { width: 100%; max-width: 440px; }
        .progress-bar-container { margin-bottom: 24px; }
        .progress-bar-container .label { font-weight: 600; margin-bottom: 10px; color: #334155; display: flex; justify-content: space-between; }
        .bar-bg { height: 14px; background: #e2e8f0; border-radius: 7px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); }
        .bar-fill { height: 100%; background: linear-gradient(90deg, #22c55e, #4ade80); border-radius: 7px; }
        .percentage { font-size: 0.9rem; color: #64748b; font-weight: 600; }


        /* Features */
        .exp-features { padding: 80px 0; background: #f8fafc; }
        .features-grid {
             display: grid;
             grid-template-columns: repeat(3, 1fr);
             gap: 40px;
        }
        .feature-card {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            border: 1px solid #f1f5f9;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: linear-gradient(90deg, #6366f1, #a855f7);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .feature-card:hover {
            box-shadow: 0 20px 40px -5px rgba(0,0,0,0.1);
            transform: translateY(-8px);
            border-color: white;
        }
        .feature-card:hover::before { opacity: 1; }
        
        .icon-box {
            width: 56px;
            height: 56px;
            background: #eff6ff;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2563eb;
            margin-bottom: 24px;
            transition: all 0.3s;
        }
        .feature-card:hover .icon-box {
            background: #2563eb;
            color: white;
            transform: scale(1.1) rotate(-5deg);
        }
        .icon-box svg { width: 28px; height: 28px; stroke-width: 2px; }
        
        .feature-card h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
            letter-spacing: -0.01em;
        }
        .feature-card p {
            color: #64748b;
            font-size: 1rem;
            line-height: 1.6;
        }

        /* CTA */
        .exp-cta {
             padding: 100px 0 120px;
             text-align: center;
             background: #ffffff;
             position: relative;
        }
        .exp-cta h2 {
            font-size: 2.5rem;
            margin-bottom: 40px;
            color: #0f172a;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        .primary-btn {
            background: hsla(214, 92%, 47%, 1);
            background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
            background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
            background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
            filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
            color: white;
            padding: 18px 40px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.15rem;
            text-decoration: none;
            transition: all 0.3s;
            box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
            display: inline-block;
        }
        .primary-btn:hover { 
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
            filter: brightness(1.1);
        }

        @media(max-width: 768px) {
            h1 { font-size: 2.75rem; }
            .features-grid { grid-template-columns: 1fr; gap: 24px; }
            .demo-visual { flex-direction: column; gap: 30px; }
            .branches { gap: 20px; }
            .exp-hero { padding: 60px 0 40px; }
        }
      `}</style>
        </div>
    );
};
