# Components Documentation

## What Are Components?

Components are **reusable building blocks** that encapsulate UI, logic, and behavior. In CodeZapra, components are organized into three categories:

1. **Section Components** — Large sections of the home page
2. **UI Components** — Shared interface elements (Header, Footer, Modals)
3. **Feature Components** — Specific functionality (CourseCard, ProgressBar, ProtectedRoute)

---

## Component Directory Structure

```
src/components/
├── sections/                 # Home page sections
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── LogicFirstDemo.tsx
│   ├── Courses.tsx
│   ├── WhyThisPlatform.tsx
│   ├── CallToAction.tsx
│   └── index.ts
│
├── ui/                       # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ConfirmationModal.tsx
│   ├── AnimatedShinyText.tsx
│   ├── TypingAnimation.tsx
│   └── index.ts
│
├── animations/               # Animation wrappers
│   ├── FadeInUp.tsx
│   └── ScrollReveal.tsx
│
├── CourseCard.tsx            # Course display card
├── ProgressBar.tsx           # Visual progress indicator
└── ProtectedRoute.tsx        # Route guard component
```

---

## Section Components (Home Page)

### Hero.tsx

**Purpose:** Main landing banner with animated algorithm visualizations.

**Contains:**
- Tree Traversal Animation (BFS visualization)
- Sorting Visualizer (Bubble Sort animation)
- Animation carousel that auto-switches between visualizations
- Call-to-action buttons

**Key State:**
- `currentAnimation` — Which visualization is active (0 or 1)
- `visitedNodes` — BFS traversal progress
- `sortState` — Current array state for sorting

**Used In:** `HomePage.tsx`

---

### HowItWorks.tsx

**Purpose:** 5-step carousel explaining the learning methodology.

**The 5 Steps:**
1. Read Visual Explanation
2. Watch Video + Download Notes
3. Explain Logic in English
4. Write Code
5. Get Feedback & Progress

**Features:**
- Auto-advancing carousel
- Manual navigation arrows
- Pause on hover

**Used In:** `HomePage.tsx`, `HowItWorksPage.tsx`

---

### LogicFirstDemo.tsx

**Purpose:** Interactive demo of the "logic-first" approach.

**Demonstrates:**
- User types logic explanation
- System validates keywords
- Code editor unlocks only after approval

**Used In:** `HomePage.tsx`

---

### Courses.tsx

**Purpose:** Grid of course cards showing all available courses.

**Components Used:**
- `CourseCard` for each course

**Used In:** `HomePage.tsx`

---

### WhyThisPlatform.tsx

**Purpose:** Feature cards highlighting platform benefits.

**Features Highlighted:**
- Logic-first methodology
- Visual explanations
- Progress tracking
- Interactive coding

**Used In:** `HomePage.tsx`

---

### CallToAction.tsx

**Purpose:** Bottom CTA section encouraging signup.

**Used In:** `HomePage.tsx`

---

## UI Components

### Header.tsx

**Purpose:** Global navigation bar.

**Contains:**
- Logo (links to `/`)
- Navigation links (Courses, How It Works, About)
- Auth buttons (Login/Signup) or User dropdown (when logged in)
- Mobile hamburger menu

**Context Used:** `useAuth()` for user state

**Responsive:** Desktop nav vs mobile drawer

---

### Footer.tsx

**Purpose:** Site footer with links and copyright.

**Contains:**
- Quick links
- Social media links
- Copyright notice

---

### ConfirmationModal.tsx

**Purpose:** Reusable confirmation dialog for destructive actions.

**Props:**
```typescript
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}
```

**Used For:**
- Logout confirmation
- Reset progress confirmation

---

### AnimatedShinyText.tsx

**Purpose:** Text with animated shine/shimmer effect.

**Used In:** Hero section, feature highlights

---

### TypingAnimation.tsx

**Purpose:** Typewriter text effect.

**Used In:** Hero section taglines

---

## Feature Components

### CourseCard.tsx

**Purpose:** Display individual course information with progress.

**Props:**
```typescript
interface CourseCardProps {
  id: string;
  name: string;
  description: string;
  badge: string;
  bgColor: string;
  avatarUrl: string;
  link?: string;
  progress?: number;  // 0-100
}
```

**Features:**
- Course icon/avatar
- Title and description
- Progress bar (when user is logged in)
- Click navigates to course page

**Context Used:** `useProgress()` for completion percentage

---

### ProgressBar.tsx

**Purpose:** Visual progress indicator bar.

**Props:**
```typescript
interface ProgressBarProps {
  progress: number;    // 0-100
  showLabel?: boolean;
  color?: string;
}
```

**Used In:** `CourseCard`, `Profile`, section progress displays

---

### ProtectedRoute.tsx

**Purpose:** Route guard that redirects unauthenticated users.

**Logic:**
```typescript
const { user, loading } = useAuth();

if (loading) return <LoadingSpinner />;
if (!user) return <Navigate to="/login" />;
return <Outlet />;
```

**Used In:** `App.tsx` to wrap protected routes

---

## Animation Components

### FadeInUp.tsx

**Purpose:** Wrapper that fades in and slides up children on mount.

**Uses:** Framer Motion

---

### ScrollReveal.tsx

**Purpose:** Reveals children when scrolled into viewport.

**Uses:** Framer Motion + Intersection Observer

---

## Component Relationships Diagram

```
App.tsx
│
├── Header (always visible)
│
├── Routes
│   ├── HomePage
│   │   ├── Hero (animations)
│   │   ├── HowItWorks (carousel)
│   │   ├── LogicFirstDemo (interactive)
│   │   ├── Courses (CourseCard x4)
│   │   ├── WhyThisPlatform
│   │   └── CallToAction
│   │
│   ├── CoursesPage
│   │   └── CourseCard x4 (with ProgressBar)
│   │
│   ├── PythonCoursePage
│   │   └── Section lists with ProgressBar
│   │
│   ├── TopicLearningPage
│   │   ├── Step indicators
│   │   ├── Monaco Editor
│   │   └── Progress buttons
│   │
│   └── Profile
│       ├── User info
│       ├── Progress sections with ProgressBar
│       └── ConfirmationModal (logout/reset)
│
└── Footer (always visible)
```

---

## Best Practices Used

1. **Component separation** — Each file has one responsibility
2. **Prop typing** — TypeScript interfaces for all props
3. **Context consumption** — Components use hooks (`useAuth`, `useProgress`)
4. **CSS scoping** — Component-level styles or CSS modules
5. **Barrel exports** — `index.ts` files for clean imports
