# Firestore Database

## What is Firestore?

Cloud Firestore is a **NoSQL document database** by Google Firebase. It stores data in collections (like tables) containing documents (like rows), where each document holds fields (like columns).

---

## Database Structure

```
Firestore
└── users (collection)
    └── {userId} (document)
        ├── uid: string
        ├── email: string
        ├── createdAt: Timestamp
        └── progress: {
              python: {
                basics: {
                  variables: { completed: true, completedAt: "...", quizScore: 85 },
                  loops: { completed: false }
                },
                functions: {
                  defining-functions: { completed: true, ... }
                }
              }
            }
```

---

## Why Firestore?

| Feature | Benefit |
|---------|---------|
| NoSQL flexibility | Nested progress structure easy to manage |
| Real-time sync | Live updates when progress changes |
| Offline support | Works without internet, syncs later |
| Security rules | Fine-grained access control |
| Scalability | Handles millions of users |

---

## User Document Schema

```typescript
interface UserDocument {
  uid: string;                    // Firebase Auth UID
  email: string;                  // User's email
  createdAt: Timestamp;           // Account creation time
  progress: UserProgress;         // Nested progress object
}

interface UserProgress {
  [courseId: string]: CourseProgress;
}

interface CourseProgress {
  [sectionId: string]: SectionProgress;
}

interface SectionProgress {
  [topicId: string]: TopicProgress;
}

interface TopicProgress {
  completed: boolean;
  completedAt?: string;           // ISO timestamp
  quizScore?: number;             // 0-100
  codingCompleted?: boolean;
}
```

---

## Example Document

```json
{
  "uid": "abc123xyz",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:00:00Z",
  "progress": {
    "python": {
      "basics": {
        "variables": {
          "completed": true,
          "completedAt": "2024-01-15T11:30:00Z",
          "quizScore": 90,
          "codingCompleted": true
        },
        "loops": {
          "completed": true,
          "completedAt": "2024-01-15T12:00:00Z"
        },
        "strings": {
          "completed": false
        }
      },
      "functions": {
        "defining-functions": {
          "completed": false
        }
      }
    }
  }
}
```

---

## Database Operations

### Read User Data

```tsx
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const loadProgress = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  
  if (userDoc.exists()) {
    return userDoc.data().progress || {};
  }
  return {};
};
```

---

### Create User Document

```tsx
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const createUserDocument = async (user: User) => {
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    createdAt: serverTimestamp(),
    progress: {}
  });
};
```

---

### Update Progress (Nested Field)

```tsx
import { doc, updateDoc } from 'firebase/firestore';

const markTopicComplete = async (
  userId: string,
  courseId: string,
  sectionId: string,
  topicId: string
) => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    [`progress.${courseId}.${sectionId}.${topicId}`]: {
      completed: true,
      completedAt: new Date().toISOString()
    }
  });
};
```

**Note:** Firestore's dot notation allows updating nested fields.

---

### Delete Section Progress

```tsx
import { doc, updateDoc, deleteField } from 'firebase/firestore';

const resetSection = async (
  userId: string,
  courseId: string,
  sectionId: string
) => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    [`progress.${courseId}.${sectionId}`]: deleteField()
  });
};
```

---

## Data Flow Diagram

```
┌──────────────────┐     ┌───────────────────┐     ┌──────────────────┐
│  React Component │────▶│  ProgressContext  │────▶│    Firestore     │
│  (TopicPage)     │     │  (markComplete)   │     │  (updateDoc)     │
└──────────────────┘     └───────────────────┘     └──────────────────┘
                                  │                         │
                                  ▼                         ▼
                         ┌───────────────────┐     ┌──────────────────┐
                         │  Local State      │     │  Persisted Data  │
                         │  (Immediate UI)   │     │  (Cloud Backup)  │
                         └───────────────────┘     └──────────────────┘
```

---

## Components Using Firestore

| Component | Operations |
|-----------|------------|
| `AuthContext.tsx` | Create user document on signup |
| `ProgressContext.tsx` | Read/update progress |
| `Profile.tsx` | Reset section progress |
| `TopicLearningPage.tsx` | Mark topics complete |

---

## Cost Considerations

Firestore charges for:
- Document reads
- Document writes
- Document deletes
- Storage used

**Optimization Tips:**
1. Load progress once on login (not per page)
2. Update local state immediately, Firestore in background
3. Batch updates when possible

---

## Related Documentation

- [Authentication](./authentication.md)
- [Security Rules](./security-rules.md)
- [Progress Context](../context/progress-context.md)
