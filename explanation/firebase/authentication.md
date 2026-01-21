# Firebase Authentication

## What is Firebase Authentication?

Firebase Authentication provides **ready-to-use authentication** with support for email/password, OAuth providers (Google, Facebook, GitHub), and more. CodeZapra uses:

1. **Email/Password Authentication**
2. **Google OAuth**

---

## Why Firebase Auth?

| Feature | Benefit |
|---------|---------|
| Pre-built UI flows | Quick implementation |
| Secure by default | Google-managed security |
| Session management | Automatic token refresh |
| Cross-platform | Works on web, iOS, Android |
| Free tier | 10K authentications/month |

---

## Configuration

**File:** `src/firebase/firebaseConfig.js`

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
```

---

## Authentication Methods

### 1. Email/Password Signup

**Flow:**
1. User enters email and password on signup form
2. `createUserWithEmailAndPassword()` creates Firebase account
3. `createUserDocument()` creates Firestore user document
4. User is automatically logged in

**Code:** `src/context/AuthContext.tsx`

```tsx
const signup = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument(res.user);
  return res;
};
```

---

### 2. Email/Password Login

**Flow:**
1. User enters credentials on login form
2. `signInWithEmailAndPassword()` validates credentials
3. User session is established
4. `onAuthStateChanged` updates app state

**Code:**

```tsx
const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
```

---

### 3. Google OAuth Login

**Flow:**
1. User clicks "Continue with Google"
2. `signInWithPopup()` opens Google account picker
3. On first login, `createUserDocument()` creates Firestore document
4. User session is established

**Code:**

```tsx
const googleLogin = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  await createUserDocument(res.user);
  return res;
};
```

---

## User Document Creation

When a new user signs up (email or Google), a Firestore document is created:

```tsx
const createUserDocument = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  // Only create if document doesn't exist
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
      progress: {} // Empty progress object
    });
  }
};
```

---

## Auth State Listener

Firebase automatically maintains session state. The app listens for changes:

```tsx
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
    setLoading(false);
  });

  return unsubscribe; // Cleanup on unmount
}, []);
```

**Triggered When:**
- User logs in
- User logs out
- User refreshes page (session restored)
- Token expires/refreshes

---

## Logout

```tsx
const logout = () => {
  return signOut(auth);
};
```

This clears the session. `onAuthStateChanged` fires with `null` user.

---

## Auth Context Shape

```typescript
interface AuthContextType {
  user: User | null;       // Firebase user object
  loading: boolean;        // True during initial auth check
  signup: (email, password) => Promise<UserCredential>;
  login: (email, password) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}
```

---

## Components Using Auth

| Component | Usage |
|-----------|-------|
| `Login.tsx` | `login()`, `googleLogin()` |
| `Signup.tsx` | `signup()`, `googleLogin()` |
| `ProtectedRoute.tsx` | Check `user` for route protection |
| `Header.tsx` | Show login/logout buttons |
| `Profile.tsx` | Display user info, `logout()` |

---

## Error Handling

Firebase throws specific error codes:

| Error Code | Meaning |
|------------|---------|
| `auth/email-already-in-use` | Email taken (signup) |
| `auth/wrong-password` | Invalid password (login) |
| `auth/user-not-found` | Email not registered |
| `auth/weak-password` | Password < 6 characters |
| `auth/popup-closed-by-user` | Google popup closed |

**Example:**

```tsx
try {
  await login(email, password);
} catch (error) {
  if (error.code === 'auth/wrong-password') {
    setError('Incorrect password');
  }
}
```

---

## Security Notes

1. **API keys are client-side safe** — Firebase rules protect data
2. **Tokens auto-refresh** — No manual token management
3. **Use environment variables** — Never commit `.env` file
