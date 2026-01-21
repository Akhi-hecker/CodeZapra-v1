# State Management Documentation

## What is State Management?

State management refers to **how data is stored, updated, and shared** across components in the application. CodeZapra uses **React Context** for global state and **local component state** for UI-specific data.

---

## State Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Global State                            │
│         (Accessible everywhere via Context hooks)            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────┐    ┌────────────────────────────┐ │
│   │    AuthContext      │    │     ProgressContext        │ │
│   │  - user             │    │  - progress                │ │
│   │  - loading          │    │  - loading                 │ │
│   │  - login()          │    │  - markTopicComplete()     │ │
│   │  - logout()         │    │  - getSectionProgress()    │ │
│   │  - signup()         │    │  - saveQuizScore()         │ │
│   │  - googleLogin()    │    │  - resetSection()          │ │
│   └─────────────────────┘    └────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Local State                             │
│          (Component-specific, UI state)                      │
├─────────────────────────────────────────────────────────────┤
│  - Form inputs (email, password)                             │
│  - Modal open/close states                                   │
│  - Current step in learning flow                             │
│  - Animation states                                          │
│  - Carousel active index                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Global State: Context Providers

### 1. AuthContext

**File:** `src/context/AuthContext.tsx`

**Purpose:** Manage user authentication state across the app.

#### State Values

| State | Type | Description |
|-------|------|-------------|
| `user` | `User \| null` | Firebase user object or null |
| `loading` | `boolean` | True while checking auth state |

#### Actions

| Action | Description |
|--------|-------------|
| `signup(email, password)` | Create new account + Firestore doc |
| `login(email, password)` | Sign in with email/password |
| `googleLogin()` | Sign in with Google OAuth |
| `logout()` | Sign out user |

#### Usage in Components

```tsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;

  return <div>Welcome, {user.email}</div>;
};
```

---

### 2. ProgressContext

**File:** `src/context/ProgressContext.tsx`

**Purpose:** Track and persist learning progress for each user.

#### State Values

| State | Type | Description |
|-------|------|-------------|
| `progress` | `UserProgress` | Nested object with all progress data |
| `loading` | `boolean` | True while loading from Firestore |

#### Progress Data Structure

```typescript
{
  python: {                    // courseId
    basics: {                  // sectionId
      variables: {             // topicId
        completed: true,
        completedAt: "2024-01-15T10:30:00Z",
        quizScore: 85,
        codingCompleted: true
      },
      loops: {
        completed: false
      }
    },
    functions: {
      // ...
    }
  }
}
```

#### Actions

| Action | Parameters | Description |
|--------|------------|-------------|
| `markTopicComplete` | courseId, sectionId, topicId | Mark topic as done |
| `saveQuizScore` | courseId, sectionId, topicId, score | Save quiz score |
| `markCodingComplete` | courseId, sectionId, topicId | Mark coding done |
| `saveProgress` | courseId, sectionId, data | Save arbitrary data |
| `resetSection` | courseId, sectionId | Clear section progress |
| `isTopicCompleted` | courseId, sectionId, topicId | Check if completed |
| `getSectionProgress` | courseId, sectionId, totalTopics | Get percentage |

#### Usage in Components

```tsx
import { useProgress } from '../context/ProgressContext';

const TopicPage = () => {
  const { progress, markTopicComplete, getSectionProgress } = useProgress();

  const handleComplete = async () => {
    await markTopicComplete('python', 'basics', 'variables');
  };

  const sectionPercent = getSectionProgress('python', 'basics', 5);
  // Returns: 40 (if 2 of 5 topics completed)
};
```

---

## Local State Examples

### TopicLearningPage State

```tsx
const [currentStep, setCurrentStep] = useState(1);       // 1-6
const [isLogicApproved, setIsLogicApproved] = useState(false);
const [isCodeUnlocked, setIsCodeUnlocked] = useState(false);
const [isCodeEvaluated, setIsCodeEvaluated] = useState(false);
const [isTopicComplete, setIsTopicComplete] = useState(false);
const [logicText, setLogicText] = useState('');
const [code, setCode] = useState('');
```

### Hero Animation State

```tsx
const [currentAnimation, setCurrentAnimation] = useState(0);  // 0 or 1
const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
const [sortState, setSortState] = useState([8, 4, 2, 7, 1, 5, 3, 6]);
```

### HowItWorks Carousel State

```tsx
const [activeIndex, setActiveIndex] = useState(0);      // 0-4
const [isPaused, setIsPaused] = useState(false);
```

### Form State (Login/Signup)

```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

---

## Data Flow: Marking a Topic Complete

```
TopicLearningPage                ProgressContext              Firebase Firestore
       │                              │                              │
       ├── User clicks "Complete" ───▶│                              │
       │                              │                              │
       │                              ├── markTopicComplete()        │
       │                              │                              │
       │                              ├── Update local state ────────┤
       │                              │   (optimistic update)        │
       │                              │                              │
       │                              ├── updateDoc() ───────────────▶│
       │                              │                              │
       │                              │◀─────── Confirm write ───────┤
       │                              │                              │
       │◀─── Re-render with new ──────┤                              │
       │     progress state           │                              │
```

---

## State Persistence

### AuthContext Persistence

Firebase Auth automatically persists the user session. On page reload:

1. `onAuthStateChanged` listener fires
2. If session exists, `user` is set
3. If no session, `user` is `null`

### ProgressContext Persistence

Progress is stored in **Firestore** under the user's document:

```
Firestore
└── users (collection)
    └── {userId} (document)
        └── progress: { ... }
```

On load:
1. `loadProgress()` fetches user document
2. `progress` state is set from Firestore data

On update:
1. Local state updated immediately (optimistic)
2. Firestore document updated via `updateDoc()`

---

## Context Provider Hierarchy

**File:** `src/main.tsx`

```tsx
<StrictMode>
  <AuthProvider>          {/* Provides user auth state */}
    <ProgressProvider>    {/* Provides learning progress (depends on user) */}
      <ChakraProvider>    {/* UI component library */}
        <App />
      </ChakraProvider>
    </ProgressProvider>
  </AuthProvider>
</StrictMode>
```

**Why This Order?**
- `ProgressProvider` needs `user` from `AuthContext`
- Progress can only be loaded after user is authenticated

---

## Summary

| State Type | Tool | Persisted | Scope |
|------------|------|-----------|-------|
| User Auth | AuthContext | Yes (Firebase) | Global |
| Learning Progress | ProgressContext | Yes (Firestore) | Global |
| Form Inputs | useState | No | Component |
| UI States | useState | No | Component |
| Animation States | useState | No | Component |
