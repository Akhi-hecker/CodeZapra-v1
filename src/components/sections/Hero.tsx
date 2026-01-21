import { motion, AnimatePresence } from 'framer-motion';
import AnimatedShinyText from '../ui/AnimatedShinyText';
import TypingAnimation from '../ui/TypingAnimation';
import RainbowBackground from '../ui/RainbowBackground';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

// Tree Node structure
interface TreeNode {
  id: number;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
}

// Build a sample binary tree - 4 levels, 15 nodes with proper spacing
// ViewBox is 220x100, each leaf node needs ~25 units apart horizontally
const buildTree = (): TreeNode => {
  return {
    id: 0,
    value: 50,
    x: 110,  // Center
    y: 15,
    left: {
      id: 1,
      value: 25,
      x: 60,
      y: 38,
      left: {
        id: 3,
        value: 12,
        x: 35,
        y: 62,
        left: { id: 7, value: 5, x: 22, y: 86 },
        right: { id: 8, value: 18, x: 48, y: 86 },
      },
      right: {
        id: 4,
        value: 37,
        x: 85,
        y: 62,
        left: { id: 9, value: 31, x: 72, y: 86 },
        right: { id: 10, value: 43, x: 98, y: 86 },
      },
    },
    right: {
      id: 2,
      value: 75,
      x: 160,
      y: 38,
      left: {
        id: 5,
        value: 62,
        x: 135,
        y: 62,
        left: { id: 11, value: 56, x: 122, y: 86 },
        right: { id: 12, value: 68, x: 148, y: 86 },
      },
      right: {
        id: 6,
        value: 87,
        x: 185,
        y: 62,
        left: { id: 13, value: 81, x: 172, y: 86 },
        right: { id: 14, value: 93, x: 198, y: 86 },
      },
    },
  };
};

// Flatten tree to array for rendering
const flattenTree = (node: TreeNode | undefined, nodes: TreeNode[] = []): TreeNode[] => {
  if (!node) return nodes;
  nodes.push(node);
  flattenTree(node.left, nodes);
  flattenTree(node.right, nodes);
  return nodes;
};

// Get edges for rendering
const getEdges = (node: TreeNode | undefined, edges: { from: TreeNode; to: TreeNode }[] = []): { from: TreeNode; to: TreeNode }[] => {
  if (!node) return edges;
  if (node.left) {
    edges.push({ from: node, to: node.left });
    getEdges(node.left, edges);
  }
  if (node.right) {
    edges.push({ from: node, to: node.right });
    getEdges(node.right, edges);
  }
  return edges;
};

// BFS traversal order
const getBFSOrder = (root: TreeNode): number[] => {
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.id);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
};

// Tree Traversal Animation Component
const TreeTraversalAnimation = ({ onComplete }: { onComplete?: () => void }) => {
  const tree = buildTree();
  const nodes = flattenTree(tree);
  const edges = getEdges(tree);
  const traversalOrder = getBFSOrder(tree);

  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(() => traversalOrder[0]);
  const [step, setStep] = useState(0);

  // Get node value by id
  const getNodeValue = (nodeId: number): number => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? node.value : 0;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1;
        if (next >= traversalOrder.length) {
          // Reset after completion with a pause
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            } else {
              // Fallback independent loop if no onComplete provided
              setVisitedNodes(new Set());
              setCurrentNode(traversalOrder[0]);
              setStep(0);
            }
          }, 1500);
          return prev;
        }

        setCurrentNode(traversalOrder[next]);
        setVisitedNodes((prevVisited) => {
          const newVisited = new Set(prevVisited);
          newVisited.add(traversalOrder[prev]);
          return newVisited;
        });

        return next;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [traversalOrder, onComplete]);

  // Compute traversal sequence from step (avoids duplicates)
  const displaySequence = traversalOrder.slice(0, step + 1).map(id => getNodeValue(id));

  // Pastel colors for each level (shown initially before traversal)
  const levelColors = [
    { bg: '#EEF2FF', border: '#A5B4FC', text: '#3730A3', activeBg: '#818CF8' }, // Level 0 - Indigo/Blue
    { bg: '#ECFDF5', border: '#86EFAC', text: '#065F46', activeBg: '#34D399' }, // Level 1 - Emerald/Green
    { bg: '#FFFBEB', border: '#FCD34D', text: '#92400E', activeBg: '#FBBF24' }, // Level 2 - Amber/Yellow
    { bg: '#FFF1F2', border: '#FDA4AF', text: '#9F1239', activeBg: '#FB7185' }, // Level 3 - Rose/Red
  ];

  // Get node level based on id
  const getNodeLevel = (nodeId: number): number => {
    if (nodeId === 0) return 0;
    if (nodeId <= 2) return 1;
    if (nodeId <= 6) return 2;
    return 3;
  };

  const getNodeColor = (nodeId: number) => {
    const level = getNodeLevel(nodeId);
    const colors = levelColors[level];

    // Current node being visited - brighter version of its level color
    if (currentNode === nodeId) {
      return { bg: colors.activeBg, border: colors.activeBg, text: '#ffffff', glow: true };
    }
    // Already visited - turn blue/purple
    if (visitedNodes.has(nodeId)) {
      return { bg: '#ddd6fe', border: '#c4b5fd', text: '#5b21b6', glow: false };
    }
    // Not yet visited - show pastel level color
    return { bg: colors.bg, border: colors.border, text: colors.text, glow: false };
  };

  return (
    <div className="tree-container">
      {/* Header */}
      <div className="tree-header">
        <div className="tree-title">
          <div className="status-dot active" />
          <span>Binary Tree Traversal</span>
        </div>
        <div className="tree-subtitle">Level Order Traversal (BFS)</div>
      </div>

      {/* Tree Visualization */}
      <div className="tree-stage">
        <svg className="tree-svg" viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet">
          {/* Edges */}
          {edges.map((edge, idx) => {
            const isVisited = visitedNodes.has(edge.from.id) && (visitedNodes.has(edge.to.id) || currentNode === edge.to.id);
            return (
              <motion.line
                key={idx}
                x1={edge.from.x}
                y1={edge.from.y + 7}
                x2={edge.to.x}
                y2={edge.to.y - 7}
                stroke={isVisited ? '#c4b5fd' : '#e5e7eb'}
                strokeWidth="1.5"
                animate={{
                  stroke: isVisited ? '#c4b5fd' : '#e5e7eb',
                }}
                transition={{ duration: 0.2 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = getNodeColor(node.id);
            return (
              <g key={node.id}>
                {/* Glow effect for current node */}
                {colors.glow && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="10"
                    fill={colors.bg}
                    opacity="0.35"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
                {/* Main node circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="8"
                  fill={colors.bg}
                  stroke={colors.border}
                  strokeWidth="0.8"
                  animate={{
                    fill: colors.bg,
                    stroke: colors.border,
                  }}
                  transition={{ duration: 0.2 }}
                />
                {/* Node value text */}
                <motion.text
                  x={node.x}
                  y={node.y + 0.4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={colors.text}
                  fontWeight="700"
                  fontFamily="'Inter', sans-serif"
                  style={{ fontSize: 5 }}
                  animate={{ fill: colors.text }}
                  transition={{ duration: 0.2 }}
                >
                  {node.value}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Sequence */}
      <div className="traversal-sequence">
        <span className="sequence-label">BFS:</span>
        <span className="sequence-values">
          {displaySequence.map((value, index) => (
            <span key={index}>
              <span className="sequence-node">{value}</span>
              {index < displaySequence.length - 1 && <span className="sequence-arrow">→</span>}
            </span>
          ))}
        </span>
      </div>

      {/* Footer */}
      <div className="tree-footer">
        <span className="traversal-label">Visiting nodes level by level</span>
        <div className="progress-info">
          <span className="progress-value">{visitedNodes.size + (currentNode !== null ? 1 : 0)}/{nodes.length}</span>
        </div>
      </div>

      <style>{`
        .tree-container {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          width: 100%;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .tree-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          background: linear-gradient(to bottom, #fafbfc, #ffffff);
        }

        .tree-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
          letter-spacing: 0.02em;
        }

        .tree-subtitle {
          font-size: 0.7rem;
          font-weight: 500;
          color: #6366f1;
          margin-top: 4px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .status-dot.active {
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.15);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .tree-stage {
          padding: 48px 32px;
          background: #ffffff;
          background-image: 
              linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tree-svg {
          width: 100%;
          height: auto;
        }

        .traversal-sequence {
          padding: 12px 20px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          min-height: 40px;
        }

        .sequence-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sequence-values {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .sequence-node {
          font-size: 0.8rem;
          font-weight: 600;
          color: #334155;
          font-family: 'JetBrains Mono', monospace;
        }

        .sequence-arrow {
          font-size: 0.75rem;
          color: #94a3b8;
          margin: 0 2px;
        }

        .tree-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #fafbfc;
          border-top: 1px solid #f1f5f9;
        }

        .traversal-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }

        .progress-info {
          display: flex;
          align-items: center;
        }

        .progress-value {
          font-size: 0.85rem;
          color: #6366f1;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        @media (max-width: 640px) {
          .tree-container {
            max-width: 100%;
          }
          
          .tree-footer {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }

          .progress-info {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

// Sorting Visualizer Component
const SortingVisualizer = ({ onComplete }: { onComplete?: () => void }) => {
  const initialArray = useMemo(() => [45, 28, 92, 14, 86, 33], []);
  const [array, setArray] = useState([...initialArray]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('Ready to sort');
  const [algoState, setAlgoState] = useState<'idle' | 'comparing' | 'swapping' | 'sorted'>('idle');
  const isMountedRef = useRef(true);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runBubbleSort = useCallback(async () => {
    setArray([...initialArray]);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
    setCurrentStep('Initializing Bubble Sort...');
    setAlgoState('idle');
    await sleep(1000);

    const arr = [...initialArray];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isMountedRef.current) return;

        // Compare
        setComparing([j, j + 1]);
        setAlgoState('comparing');
        setCurrentStep('Comparing numbers...');
        await sleep(800);

        if (arr[j] > arr[j + 1]) {
          // Swap needed
          setSwapping([j, j + 1]);
          setAlgoState('swapping');
          setCurrentStep('Swapping...');
          await sleep(600);

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(600);
          setSwapping([]);
        } else {
          // No swap needed
          setCurrentStep('Correct order');
          await sleep(600);
        }
        setComparing([]);
      }
      if (isMountedRef.current) {
        setSorted(prev => [...prev, n - 1 - i]);
        setAlgoState('idle');
        await sleep(300);
      }
    }

    if (isMountedRef.current) {
      setSorted(prev => [...prev, 0]);
      setAlgoState('sorted');
      setCurrentStep('Sorting Complete!');
      await sleep(2000);
      if (isMountedRef.current && onComplete) onComplete();
    }
  }, [initialArray, onComplete]);

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => runBubbleSort(), 500);
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [runBubbleSort]);

  return (
    <div className="visualizer-card">
      {/* Header */}
      <div className="viz-header">
        <div className="viz-icon-bg">
          <div className="viz-icon-bars">
            <span className="bar" style={{ height: '40%' }}></span>
            <span className="bar" style={{ height: '70%' }}></span>
            <span className="bar" style={{ height: '100%' }}></span>
          </div>
        </div>
        <div className="viz-title-group">
          <div className="viz-title">Bubble Sort</div>
          <div className="viz-subtitle">O(n²) Time Complexity</div>
        </div>
        <div className={`status-badge ${algoState}`}>
          {algoState === 'idle' && 'Processing'}
          {algoState === 'comparing' && 'Comparing'}
          {algoState === 'swapping' && 'Swapping'}
          {algoState === 'sorted' && 'DONE'}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="viz-content">
        <div className="cards-row">
          <div className="cards-wrapper">
            {/* Arrows Layer */}
            <AnimatePresence>
              {algoState === 'swapping' && swapping.length === 2 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="arrow-overlay"
                    style={{ left: `${swapping[0] * 58}px` }}
                  >
                    <svg width="104" height="110" viewBox="0 0 104 110" fill="none">
                      {/* Top Arrow: Left to Right (Above) */}
                      <path d="M 23 25 Q 52 0 81 25" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M 77 22 L 81 25 L 77 28" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Bottom Arrow: Right to Left (Below) */}
                      <path d="M 81 81 Q 52 106 23 81" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
                      <path d="M 27 84 L 23 81 L 27 78" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {array.map((value, index) => {
                const isComparing = comparing.includes(index);
                const isSwapping = swapping.includes(index);
                const isSorted = sorted.includes(index);

                return (
                  <motion.div
                    key={`${String(index)}-${value}`}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className={`sort-box ${isComparing ? 'comparing' : ''} ${isSwapping ? 'swapping' : ''} ${isSorted ? 'sorted' : ''}`}
                  >
                    <span className="box-number">{value}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="viz-footer">
        <div className="step-text">{currentStep}</div>
        <div className="footer-legend">
          <div className="legend-item"><span className="dot compare"></span> Compare</div>
          <div className="legend-item"><span className="dot swap"></span> Swap</div>
          <div className="legend-item"><span className="dot sorted"></span> Sorted</div>
        </div>
      </div>

      <style>{`
        .visualizer-card {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03);
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
            border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .viz-header {
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid #f1f5f9;
            background: linear-gradient(to bottom, #ffffff, #fafbfc);
        }

        .viz-icon-bg {
            width: 42px;
            height: 42px;
            background: #EEF2FF;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #E0E7FF;
        }
        
        .viz-icon-bars {
            display: flex;
            align-items: flex-end;
            gap: 3px;
            height: 20px;
            width: 20px;
        }

        .viz-icon-bars .bar {
            width: 4px;
            background: #6366F1;
            border-radius: 2px;
        }

        .viz-title-group {
            flex: 1;
        }

        .viz-title {
            font-size: 1rem;
            font-weight: 700;
            color: #1e293b;
            letter-spacing: -0.01em;
        }

        .viz-subtitle {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
            margin-top: 2px;
        }

        .status-badge {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            background: #f1f5f9;
            color: #64748b;
            transition: all 0.3s ease;
        }
        .status-badge.comparing { background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5; }
        .status-badge.swapping { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
        .status-badge.sorted { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }

        .viz-content {
            flex: 1;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            background-image: 
                linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
            position: relative;
        }

        .cards-row {
            display:flex;
            align-items: center;
            justify-content: center;
            min-height: 120px;
            width: 100%;
        }

        .cards-wrapper {
             position: relative;
             display: inline-flex;
             gap: 12px;
             align-items: center;
        }
        
        .arrow-overlay {
            position: absolute;
            top: -30px; 
            z-index: 10;
            pointer-events: none;
            width: 104px;
        }

        .sort-box {
            width: 46px;
            height: 46px;
            background: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
        }
        
        .box-number {
             font-size: 1rem;
             font-weight: 700;
             color: #475569;
             font-family: 'JetBrains Mono', monospace;
        }

        /* States */
        /* Comparing */
        .sort-box.comparing {
            border-color: #fb923c;
            background: #fff7ed;
            transform: scale(1.05);
            box-shadow: 0 0 0 4px rgba(251, 146, 60, 0.15);
        }
        .sort-box.comparing .box-number {
            color: #ea580c;
        }

        /* Swapping */
        .sort-box.swapping {
            border-color: #f87171;
            background: #fef2f2;
            box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.15);
            z-index: 2;
        }
        .sort-box.swapping .box-number {
             color: #dc2626;
        }

        /* Sorted */
        .sort-box.sorted {
            border-color: #6366f1;
            background: #eef2ff;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }
        .sort-box.sorted .box-number {
            color: #4f46e5;
        }


        .viz-footer {
            padding: 16px 24px;
            background: #fafbfc;
            border-top: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .step-text {
            font-size: 0.85rem;
            font-weight: 600;
            color: #334155;
        }

        .footer-legend {
            display: flex;
            gap: 16px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
        }

        .legend-item .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
        .dot.compare { background: #fb923c; }
        .dot.swap { background: #f87171; }
        .dot.sorted { background: #6366f1; }

        @media (max-width: 640px) {
            .cards-row { gap: 6px; }
            .sort-box { width: 36px; height: 36px; }
            .viz-footer { flex-direction: column; gap: 8px; align-items: flex-start; }
            .arrow-overlay { display: none; } /* Hide arrows on small screens if alignment is tricky */
        }
      `}</style>
    </div>
  );
};
// Animation Carousel Component
const AnimationCarousel = () => {
  const [activeAnimation, setActiveAnimation] = useState<'tree' | 'sorting'>('tree');

  const handleTreeComplete = useCallback(() => {
    setActiveAnimation('sorting');
  }, []);

  const handleSortComplete = useCallback(() => {
    setActiveAnimation('tree');
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AnimatePresence mode="wait">
        {activeAnimation === 'tree' ? (
          <motion.div
            key="tree"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <TreeTraversalAnimation onComplete={handleTreeComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="sorting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            <SortingVisualizer onComplete={handleSortComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Hero = () => {
  const ref = useRef(null);

  return (
    <section className="hero" ref={ref}>
      <RainbowBackground className="absolute inset-0 z-0" />
      <div className="container">
        {/* Left - Text */}
        <motion.div
          className="hero-text-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill">
            <span>✨</span>
            <AnimatedShinyText>Logic-First Learning</AnimatedShinyText>
          </span>
          <h1>
            Think First.<br />
            <TypingAnimation
              className="gradient-text"
              text="Code Later."
              delay={1000}
              speed={150}
            />
          </h1>
          <p className="hero-subtitle">
            Master coding through visual learning and guided practice.
            Build strong problem-solving foundations before writing a single line of code.
          </p>
          <div className="btns">
            <Link to="/courses" className="primary-btn">
              Start Learning →
            </Link>
            <Link to="/how-it-works" className="secondary-btn">
              How It Works
            </Link>
          </div>
        </motion.div>

        {/* Right - Animation Carousel */}
        <motion.div
          className="hero-animation-block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AnimationCarousel />
        </motion.div>
      </div>


      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #f9fafb;
          background-image: radial-gradient(#F1F5F9 1px, transparent 1px);
          background-size: 24px 24px;
          padding: 8rem 0 8rem;
        }
        
        .hero .container {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 4rem;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .hero-text-block { max-width: 500px; }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 28px;
        }
        .dot { 
          width: 8px; 
          height: 8px; 
          background: #6366f1; 
          border-radius: 50%;
          animation: dotPulse 2s ease-in-out infinite;
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
        }
        
        @keyframes dotPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          50% { 
            transform: scale(1.2);
            box-shadow: 0 0 0 6px rgba(99, 102, 241, 0);
          }
        }
        
        .hero-text-block h1 {
          font-family: var(--font-heading);
          font-size: 4.5rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        
        .gradient-text {
          background: hsla(214, 92%, 47%, 1);
          background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-subtitle {
          font-family: var(--font-body);
          font-size: 1.25rem;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 40px;
          font-weight: 400;
          max-width: 500px;
        }
        
        .btns { display: flex; gap: 20px; }
        .primary-btn {
          padding: 16px 32px;
          background: hsla(214, 92%, 47%, 1);
          background: linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -moz-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          background: -webkit-linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%);
          filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0968E5", endColorstr="#091970", GradientType=1 );
          color: white;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border: 1px solid transparent;
        }
        .primary-btn:hover { 
          background: var(--color-accent); 
          transform: translateY(-2px); 
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        }
        .secondary-btn {
          padding: 16px 32px;
          background: white;
          color: #334155;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 50px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .secondary-btn:hover { background: #f8fafc; border-color: #cbd5e1; }

        .hero-animation-block { 
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Sorting Animation Styles */
        .sort-container {
          width: 100%;
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        }

        .sort-body {
          flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        min-height: 200px;
        position: relative;
        }

        .box-row {
          display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        }

        .box {
          width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-weight: 700;
        color: #475569;
        font-size: 1.1rem;
        position: relative;
        z-index: 2;
        }

        .box.compare {
          background: #eef2ff;
        border-color: #6366f1;
        color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        .box.swap {
          background: #fffbeb;
        border-color: #f59e0b;
        color: #d97706;
        box-shadow: 0 4px 12px -2px rgba(245,158,11,0.25);
        transform: translateY(-8px);
        }

        .box.sorted {
          background: #ecfdf5;
        border-color: #10b981;
        color: #059669;
        }

        .sort-status-bar {
          text - align: center;
        font-size: 0.9rem;
        font-weight: 500;
        color: #64748b;
        background: #f1f5f9;
        padding: 8px 16px;
        border-radius: 8px;
        display: inline-block;
        margin: 0 auto;
        }

        .legend-mini {
          display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.75rem;
        color: #64748b;
        }

        .leg-dot {
          width: 8px;
        height: 8px;
        border-radius: 2px;
        display: inline-block;
        margin-right: 4px;
        }
        .leg-dot.compare {background: #6366f1; }
        .leg-dot.swap {background: #f59e0b; }
        .leg-dot.sorted {background: #10b981; }

        .arrow-top {
          position: absolute;
        top: -10px;
        z-index: 10;
        pointer-events: none;
        }

        @media (max-width: 1024px) {
          .hero.container {grid - template - columns: 1fr; gap: 3rem; text-align: center; }
        .hero-text-block {max - width: 100%; margin: 0 auto; }
        .btns {justify - content: center; }
        .hero-text-block h1 {font - size: 3rem; }
        .hero-animation-block {order: -1; }
        }
      `}</style>
    </section >
  );
};
