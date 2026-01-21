# Backend Overview

## What is the Backend?

CodeZapra uses a **serverless backend** powered by **Firebase**. There is no traditional backend server — all backend functionality is handled by Firebase services:

| Service | Purpose |
|---------|---------|
| **Firebase Authentication** | User accounts, login, OAuth |
| **Cloud Firestore** | NoSQL database for user data and progress |

---

## Why Serverless?

| Benefit | Explanation |
|---------|-------------|
| **No server management** | Firebase handles scaling, uptime, security |
| **Cost-effective** | Pay only for what you use |
| **Fast development** | Pre-built auth, database, hosting |
| **Real-time sync** | Firestore listeners for live updates |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Firebase SDK                             │
│            (Installed via npm, runs in browser)              │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌─────────────────────────┐  ┌─────────────────────────────┐
│   Firebase Auth         │  │   Cloud Firestore           │
│   (Google Cloud)        │  │   (Google Cloud)            │
│                         │  │                             │
│   - Email/Password      │  │   - users collection        │
│   - Google OAuth        │  │   - progress data           │
│   - Session management  │  │   - quiz scores             │
└─────────────────────────┘  └─────────────────────────────┘
```

---

## Data Operations

### Read Operations

```tsx
// Fetch user progress from Firestore
const userDoc = await getDoc(doc(db, 'users', user.uid));
const progress = userDoc.data()?.progress || {};
```

### Write Operations

```tsx
// Update progress in Firestore
await updateDoc(doc(db, 'users', user.uid), {
  [`progress.${courseId}.${sectionId}.${topicId}`]: {
    completed: true,
    completedAt: new Date().toISOString()
  }
});
```

---

## Why No Traditional Backend?

For CodeZapra's current scope:

1. **No complex business logic** — Progress tracking is simple CRUD
2. **No server-side processing** — Code evaluation is client-side (for now)
3. **User-specific data only** — Each user accesses their own document
4. **Cost efficiency** — Firebase free tier covers most needs

---

## Future Considerations

If the platform grows, consider:

- **Firebase Cloud Functions** — For server-side code execution
- **Judge0 API** — For secure code evaluation
- **Firebase Admin SDK** — For admin dashboard operations

---

## Related Documentation

- [Firebase Authentication](./firebase/authentication.md)
- [Firestore Database](./firebase/firestore-database.md)
- [Security Rules](./firebase/security-rules.md)
