# Progress Tracking

## What is Progress Tracking?

Progress tracking records **which topics a user has completed**, storing this data in Firestore and displaying it throughout the UI.

---

## Progress Hierarchy

```
User Progress
└── Course (e.g., "python")
    └── Section (e.g., "basics", "functions")
        └── Topic (e.g., "variables", "loops")
            ├── completed: boolean
            ├── completedAt: string (ISO timestamp)
            ├── quizScore: number (0-100)
            └── codingCompleted: boolean
```

---

## How Progress is Tracked

### 1. Topic Completion

When a user completes all 6 learning steps for a topic:

```tsx
// TopicLearningPage.tsx
const handleTopicComplete = async () => {
  await markTopicComplete('python', 'basics', 'variables');
  navigate('/courses/python/topic/next-topic');
};
```

### 2. Quiz Score

After completing a quiz:

```tsx
await saveQuizScore('python', 'basics', 'variables', 85);
```

### 3. Coding Exercise

After passing code evaluation:

```tsx
await markCodingComplete('python', 'basics', 'variables');
```

---

## Where Progress is Displayed

### Courses Page

Shows overall course completion percentage:

```
┌─────────────────────────────────────┐
│  Python                             │
│  ████████░░░░░░░░░░░░  40% Complete │
│  8 of 20 topics done                │
└─────────────────────────────────────┘
```

### Python Course Page

Shows section-by-section progress:

```
Basics (5 topics)                 ██████████░░░░░░  60%
├── ✅ Variables
├── ✅ Data Types
├── ✅ Operators
├── ⏳ Strings
└── ⏳ Input/Output

Control Flow (4 topics)           ░░░░░░░░░░░░░░░░   0%
├── ⏳ If-Else
├── ⏳ Loops
├── ⏳ Break/Continue
└── ⏳ Nested Loops
```

### Profile Page

Shows comprehensive progress summary:

```
┌─────────────────────────────────────────┐
│  Your Learning Progress                 │
├─────────────────────────────────────────┤
│  Python Course                          │
│  Overall: 40% (8/20 topics)             │
│                                         │
│  ├── Basics:        60% (3/5)           │
│  ├── Control Flow:   0% (0/4)           │
│  ├── Functions:     40% (2/5)           │
│  └── Data Struct:   75% (3/4)           │
│                                         │
│  [ Reset Progress ]                     │
└─────────────────────────────────────────┘
```

---

## Calculating Progress

### Section Progress

```tsx
const getSectionProgress = (
  courseId: string,
  sectionId: string,
  totalTopics: number
): number => {
  const section = progress?.[courseId]?.[sectionId];
  if (!section) return 0;

  const completedCount = Object.values(section)
    .filter(topic => topic.completed).length;

  return Math.round((completedCount / totalTopics) * 100);
};

// Usage:
const basicsProgress = getSectionProgress('python', 'basics', 5);
// Returns: 60 (if 3 of 5 topics completed)
```

### Course Progress

```tsx
const getCourseProgress = (courseId: string): number => {
  const course = progress?.[courseId];
  if (!course) return 0;

  let completed = 0;
  let total = 0;

  for (const section of Object.values(course)) {
    for (const topic of Object.values(section)) {
      total++;
      if (topic.completed) completed++;
    }
  }

  return total > 0 ? Math.round((completed / total) * 100) : 0;
};
```

---

## Persistence

Progress is stored in Firestore under the user's document:

```json
{
  "uid": "user123",
  "email": "user@example.com",
  "progress": {
    "python": {
      "basics": {
        "variables": {
          "completed": true,
          "completedAt": "2024-01-15T10:30:00Z",
          "quizScore": 90
        }
      }
    }
  }
}
```

---

## Optimistic Updates

For a smooth UX, progress updates follow this pattern:

1. **UI updates immediately** (local state change)
2. **Firestore updates in background** (async operation)
3. **No loading spinner** during save

```tsx
const markTopicComplete = async (...) => {
  // 1. Update local state (instant UI feedback)
  setProgress(newProgress);

  // 2. Update Firestore (background)
  await updateDoc(userRef, { ... });
};
```

---

## Resetting Progress

Users can reset section progress from the Profile page:

```tsx
const handleReset = async () => {
  if (confirm('Reset all progress for this section?')) {
    await resetSection('python', 'basics');
  }
};
```

This deletes the section from both local state and Firestore.

---

## Files Involved

| File | Role |
|------|------|
| `ProgressContext.tsx` | Core progress logic |
| `PythonCoursePage.tsx` | Display section progress |
| `TopicLearningPage.tsx` | Mark topics complete |
| `Profile.tsx` | Progress overview, reset functionality |
| `CourseCard.tsx` | Display course progress |
| `ProgressBar.tsx` | Visual progress indicator |

---

## Related Documentation

- [Progress Context](../context/progress-context.md)
- [Logic-First Approach](./logic-first-approach.md)
- [Firestore Database](../firebase/firestore-database.md)
