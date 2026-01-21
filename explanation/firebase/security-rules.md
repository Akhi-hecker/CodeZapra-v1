# Firebase Security Rules

## What Are Security Rules?

Firestore Security Rules are **server-side access control** that determine who can read or write data. They run on Firebase servers before any operation is allowed.

---

## Why Security Rules Matter

Without rules, **anyone with your project ID could read/write your database**. Rules ensure:

1. Users can only access their own data
2. Malicious clients can't corrupt data
3. Data validation happens server-side

---

## CodeZapra Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      // Allow read only if the requesting user matches the document owner
      allow read: if request.auth != null && request.auth.uid == userId;

      // Allow write only if the requesting user matches the document owner
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Deny access to any other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Rule Breakdown

### `match /users/{userId}`

Matches documents in the `users` collection. `{userId}` is a wildcard that captures the document ID.

---

### `allow read: if request.auth != null && request.auth.uid == userId`

| Condition | Meaning |
|-----------|---------|
| `request.auth != null` | User must be logged in |
| `request.auth.uid == userId` | User can only read their own document |

---

### `allow write: if request.auth != null && request.auth.uid == userId`

Same as read — users can only modify their own documents.

---

### `match /{document=**}` + `allow read, write: if false`

**Deny all** access to any other collections. This is a catch-all that blocks unintended access.

---

## How Rules Are Applied

```
Client Request
      │
      ▼
┌─────────────────────┐
│  Firebase Server    │
│  (Security Rules)   │
└─────────────────────┘
      │
      ├── Auth token present?
      │      └── No → DENIED
      │
      ├── UID matches document owner?
      │      └── No → DENIED
      │
      └── Yes → ALLOWED
              │
              ▼
┌─────────────────────┐
│  Firestore Database │
└─────────────────────┘
```

---

## Testing Rules

### Allowed Operations

```tsx
// ✅ User reading their own document
const userDoc = await getDoc(doc(db, 'users', 'abc123'));
// Passes if authenticated user's UID === 'abc123'

// ✅ User updating their own progress
await updateDoc(doc(db, 'users', 'abc123'), {
  'progress.python.basics.variables.completed': true
});
// Passes if authenticated user's UID === 'abc123'
```

### Denied Operations

```tsx
// ❌ User trying to read another user's document
const otherUserDoc = await getDoc(doc(db, 'users', 'xyz789'));
// DENIED: request.auth.uid !== 'xyz789'

// ❌ Unauthenticated access
// signOut(auth);
const doc = await getDoc(doc(db, 'users', 'abc123'));
// DENIED: request.auth == null

// ❌ Accessing non-existent collection
const other = await getDoc(doc(db, 'admin', 'settings'));
// DENIED: matches catch-all rule
```

---

## Deploying Rules

### Via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project → Firestore Database → Rules tab
3. Paste rules and click "Publish"

### Via Firebase CLI

```bash
# Create firestore.rules file with rules
firebase deploy --only firestore:rules
```

---

## Common Rule Patterns

### Data Validation

```javascript
allow write: if request.auth != null
              && request.auth.uid == userId
              && request.resource.data.email is string
              && request.resource.data.progress is map;
```

### Rate Limiting (Conceptual)

Firestore doesn't have built-in rate limiting, but you can:
- Use Cloud Functions for complex validation
- Check `request.time` against stored timestamps

---

## Security Checklist

| Item | Status |
|------|--------|
| Users can only read own document | ✅ |
| Users can only write own document | ✅ |
| Unauthenticated access blocked | ✅ |
| Other collections blocked | ✅ |
| API keys in environment variables | ✅ |

---

## Related Documentation

- [Authentication](./authentication.md)
- [Firestore Database](./firestore-database.md)
