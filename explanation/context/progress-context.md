# Progress Context

## What is ProgressContext?

`ProgressContext` is a **React Context** that manages learning progress for authenticated users. It provides:

- Progress data for all courses/sections/topics
- Functions to mark topics complete
- Functions to save quiz scores
- Section completion percentage calculations

---

## Why a Dedicated Context?

| Reason | Explanation |
|--------|-------------|
| **Centralized state** | Single source of truth for progress |
| **Persistence** | Syncs with Firestore automatically |
| **Reusability** | Any component can access progress |
| **Separation** | Keeps progress logic out of components |

---

## File Location

`src/context/ProgressContext.tsx`

---

## Context Interface

```typescript
interface ProgressContextType {
  progress: UserProgress;           // All progress data
  loading: boolean;                 // True while loading from Firestore

  // Actions
  markTopicComplete: (courseId: string, sectionId: string, topicId: string) => Promise<void>;
  saveQuizScore: (courseId: string, sectionId: string, topicId: string, score: number) => Promise<void>;
  markCodingComplete: (courseId: string, sectionId: string, topicId: string) => Promise<void>;
  saveProgress: (courseId: string, sectionId: string, data: SectionProgress) => Promise<void>;
  resetSection: (courseId: string, sectionId: string) => Promise<void>;

  // Queries
  isTopicCompleted: (courseId: string, sectionId: string, topicId: string) => boolean;
  getSectionProgress: (courseId: string, sectionId: string, totalTopics: number) => number;
}
```

---

## Progress Data Structure

```typescript
interface TopicProgress {
  completed: boolean;
  completedAt?: string;      // ISO timestamp
  quizScore?: number;        // 0-100
  codingCompleted?: boolean;
}

interface SectionProgress {
  [topicId: string]: TopicProgress;
}

interface CourseProgress {
  [sectionId: string]: SectionProgress;
}

interface UserProgress {
  [courseId: string]: CourseProgress;
}
```

**Example:**
```json
{
  "python": {
    "basics": {
      "variables": { "completed": true, "completedAt": "2024-01-15T10:00:00Z", "quizScore": 85 },
      "loops": { "completed": false }
    }
  }
}
```

---

## How It Works

### 1. Loading Progress

On mount, if user is authenticated, fetch progress from Firestore:

```tsx
const loadProgress = async () => {
  if (!user) return;
  setLoading(true);

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (userDoc.exists()) {
    setProgress(userDoc.data().progress || {});
  }

  setLoading(false);
};

useEffect(() => {
  loadProgress();
}, [user]);
```

---

### 2. Marking Topic Complete

```tsx
const markTopicComplete = async (courseId: string, sectionId: string, topicId: string) => {
  if (!user) return;

  // 1. Update local state immediately (optimistic update)
  const newProgress = {
    ...progress,
    [courseId]: {
      ...progress[courseId],
      [sectionId]: {
        ...progress[courseId]?.[sectionId],
        [topicId]: {
          completed: true,
          completedAt: new Date().toISOString()
        }
      }
    }
  };
  setProgress(newProgress);

  // 2. Update Firestore
  await updateDoc(doc(db, 'users', user.uid), {
    [`progress.${courseId}.${sectionId}.${topicId}`]: {
      completed: true,
      completedAt: new Date().toISOString()
    }
  });
};
```

---

### 3. Checking Topic Completion

```tsx
const isTopicCompleted = (courseId: string, sectionId: string, topicId: string): boolean => {
  return progress?.[courseId]?.[sectionId]?.[topicId]?.completed || false;
};
```

---

### 4. Calculating Section Progress

```tsx
const getSectionProgress = (courseId: string, sectionId: string, totalTopics: number): number => {
  const section = progress?.[courseId]?.[sectionId];
  if (!section) return 0;

  const completedCount = Object.values(section).filter(topic => topic.completed).length;
  return Math.round((completedCount / totalTopics) * 100);
};
```

Returns a percentage (0-100).

---

### 5. Resetting Section Progress

```tsx
const resetSection = async (courseId: string, sectionId: string) => {
  if (!user) return;

  // Update local state
  const newProgress = { ...progress };
  if (newProgress[courseId]) {
    delete newProgress[courseId][sectionId];
  }
  setProgress(newProgress);

  // Update Firestore
  await updateDoc(doc(db, 'users', user.uid), {
    [`progress.${courseId}.${sectionId}`]: deleteField()
  });
};
```

---

## Usage in Components

### Hook Usage

```tsx
import { useProgress } from '../context/ProgressContext';

const TopicPage = () => {
  const { progress, markTopicComplete, isTopicCompleted } = useProgress();

  const handleComplete = async () => {
    await markTopicComplete('python', 'basics', 'variables');
  };

  const completed = isTopicCompleted('python', 'basics', 'variables');

  return (
    <div>
      {completed ? '✅ Completed' : '⏳ In Progress'}
      <button onClick={handleComplete}>Mark Complete</button>
    </div>
  );
};
```

---

## Components Using ProgressContext

| Component | Usage |
|-----------|-------|
| `CoursesPage.tsx` | `getSectionProgress()` for course cards |
| `PythonCoursePage.tsx` | `getSectionProgress()` for section headers |
| `TopicLearningPage.tsx` | `markTopicComplete()`, `isTopicCompleted()` |
| `Profile.tsx` | `getSectionProgress()`, `resetSection()` |
| `CourseCard.tsx` | Display progress percentage |

---

## Provider Setup

**File:** `src/main.tsx`

```tsx
<AuthProvider>
  <ProgressProvider>
    <App />
  </ProgressProvider>
</AuthProvider>
```

`ProgressProvider` depends on `AuthProvider` because it uses `useAuth()` to get the current user.

---

## Optimistic Updates

The pattern used ensures fast UI feedback:

1. **Update local state immediately** — UI reflects change instantly
2. **Update Firestore in background** — Persistence happens async
3. **No loading spinners** — Better user experience

---

## Related Documentation

- [State Management](../frontend/state-management.md)
- [Firestore Database](../firebase/firestore-database.md)
