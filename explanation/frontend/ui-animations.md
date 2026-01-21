# UI Animations Documentation

## What Are the Animations?

CodeZapra uses **Framer Motion** for smooth, engaging animations throughout the platform. Animations serve two purposes:

1. **Educational** — Visualizing algorithms (tree traversal, sorting)
2. **UX Enhancement** — Page transitions, hover effects, scroll reveals

---

## Animation Library

| Library | Purpose |
|---------|---------|
| **Framer Motion** | Main animation library for React |
| **CSS Transitions** | Simple hover/focus states |
| **CSS Keyframes** | Continuous animations (shimmer, pulse) |

---

## Animation Categories

### 1. Hero Section Animations

**File:** `src/components/sections/Hero.tsx`

#### Tree Traversal Animation

Visualizes **Breadth-First Search (BFS)** on a binary tree.

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

**How It Works:**
1. Tree nodes are positioned with x/y coordinates
2. BFS queue processes nodes level by level
3. Each visited node lights up in sequence
4. Collected values displayed below

**State:**
```tsx
const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
const [collectedValues, setCollectedValues] = useState<number[]>([]);
```

**Animation Logic:**
```tsx
useEffect(() => {
  const bfsQueue = [rootNode];
  const interval = setInterval(() => {
    if (bfsQueue.length === 0) {
      // Reset and restart
      return;
    }
    const node = bfsQueue.shift();
    setVisitedNodes(prev => [...prev, node.id]);
    setCollectedValues(prev => [...prev, node.value]);
    if (node.left) bfsQueue.push(node.left);
    if (node.right) bfsQueue.push(node.right);
  }, 800);

  return () => clearInterval(interval);
}, []);
```

---

#### Sorting Visualizer (Bubble Sort)

Visualizes **Bubble Sort** algorithm step by step.

**Visual:**
```
| 8 | 4 | 2 | 7 | 1 | 5 | 3 | 6 |  ← Colored bars
  ↓   ↓
Compare → Swap if needed
```

**State:**
```tsx
const [sortArray, setSortArray] = useState([8, 4, 2, 7, 1, 5, 3, 6]);
const [comparing, setComparing] = useState<[number, number] | null>(null);
const [sorted, setSorted] = useState<number[]>([]);
```

**Animation Behavior:**
- Bars being compared highlighted in yellow
- Swap animation with smooth transition
- Sorted elements turn green
- Status message updates each step

---

#### Animation Carousel

Switches between tree and sorting visualizations automatically.

```tsx
const [currentAnimation, setCurrentAnimation] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentAnimation(prev => (prev + 1) % 2);
  }, 15000); // Switch every 15 seconds

  return () => clearInterval(timer);
}, []);
```

---

### 2. Page Transition Animations

#### FadeInUp Component

**File:** `src/components/animations/FadeInUp.tsx`

```tsx
import { motion } from 'framer-motion';

const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);
```

**Used In:** Page content sections, cards, headings

---

#### ScrollReveal Component

**File:** `src/components/animations/ScrollReveal.tsx`

Reveals elements when they scroll into view.

```tsx
import { motion } from 'framer-motion';

const ScrollReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);
```

**`viewport` Options:**
- `once: true` — Only animate once (not on every scroll)
- `amount: 0.3` — Trigger when 30% of element is visible

---

### 3. Interactive Animations

#### HowItWorks Carousel

**File:** `src/components/sections/HowItWorks.tsx`

Auto-advancing carousel with pause on hover.

```tsx
const [activeIndex, setActiveIndex] = useState(0);
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused) return;

  const timer = setInterval(() => {
    setActiveIndex(prev => (prev + 1) % 5);
  }, 4000);

  return () => clearInterval(timer);
}, [isPaused]);
```

**Framer Motion for Card Transitions:**
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeIndex}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
  >
    {steps[activeIndex]}
  </motion.div>
</AnimatePresence>
```

---

### 4. Text Animations

#### AnimatedShinyText

**File:** `src/components/ui/AnimatedShinyText.tsx`

CSS-based shimmer effect on text.

```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shiny-text {
  background: linear-gradient(
    90deg,
    #000 0%,
    #fff 50%,
    #000 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
```

---

#### TypingAnimation

**File:** `src/components/ui/TypingAnimation.tsx`

Typewriter effect for hero taglines.

```tsx
const [displayText, setDisplayText] = useState('');
const [index, setIndex] = useState(0);

useEffect(() => {
  if (index < fullText.length) {
    const timer = setTimeout(() => {
      setDisplayText(prev => prev + fullText[index]);
      setIndex(prev => prev + 1);
    }, 50);
    return () => clearTimeout(timer);
  }
}, [index, fullText]);
```

---

### 5. Hover & Interactive Effects

#### Button Hover

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  Click Me
</motion.button>
```

#### Card Hover

```tsx
<motion.div
  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
  transition={{ duration: 0.2 }}
>
  <CourseCard />
</motion.div>
```

---

## Animation Configuration

### Common Transition Presets

```tsx
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## Performance Considerations

1. **Use `will-change`** for animated properties
2. **Prefer `transform` and `opacity`** (GPU-accelerated)
3. **Set `viewport={{ once: true }}`** for scroll reveals
4. **Use `AnimatePresence`** for exit animations
5. **Clean up intervals** in `useEffect` return

---

## Files Involved

| File | Animation Type |
|------|----------------|
| `Hero.tsx` | Algorithm visualizations |
| `HowItWorks.tsx` | Carousel transitions |
| `FadeInUp.tsx` | Mount animations |
| `ScrollReveal.tsx` | Scroll-triggered reveals |
| `AnimatedShinyText.tsx` | Text shimmer |
| `TypingAnimation.tsx` | Typewriter effect |

---

## Summary

| Animation | Purpose | Technology |
|-----------|---------|------------|
| Tree Traversal | Teach BFS algorithm | Custom + Framer Motion |
| Sorting Visualizer | Teach Bubble Sort | Custom + Framer Motion |
| Page Transitions | Smooth UX | Framer Motion |
| Scroll Reveals | Engagement | Framer Motion |
| Text Shimmer | Visual appeal | CSS Keyframes |
| Hover Effects | Interactivity | Framer Motion |
