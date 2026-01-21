# Other Contexts

## What Are the Other Contexts?

Besides `ProgressContext`, CodeZapra uses:

1. **AuthContext** — User authentication state
2. **ChakraProvider** — UI component theming (from Chakra UI library)

---

## AuthContext

**File:** `src/context/AuthContext.tsx`

### Purpose

Manages user authentication state and provides auth functions to all components.

### Interface

```typescript
interface AuthContextType {
  user: User | null;       // Firebase user object
  loading: boolean;        // True during initial auth check
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}
```

### State Values

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `user` | `User \| null` | `null` | Current authenticated user |
| `loading` | `boolean` | `true` | Auth state being checked |

### Actions

| Action | When Used |
|--------|-----------|
| `signup(email, password)` | User creates new account |
| `login(email, password)` | User logs in with email |
| `googleLogin()` | User logs in with Google |
| `logout()` | User signs out |

### Usage

```tsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      Welcome, {user.email}
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};
```

### Components Using AuthContext

| Component | Usage |
|-----------|-------|
| `Login.tsx` | `login()`, `googleLogin()` |
| `Signup.tsx` | `signup()`, `googleLogin()` |
| `ProtectedRoute.tsx` | Check `user` and `loading` |
| `Header.tsx` | Show user menu or login buttons |
| `Profile.tsx` | Display user info, `logout()` |
| `ProgressContext.tsx` | Get `user.uid` for Firestore |

---

## ChakraProvider

**Source:** `@chakra-ui/react` (external library)

### Purpose

Provides the Chakra UI theme and component styles to all components.

### Setup

**File:** `src/main.tsx`

```tsx
import { ChakraProvider } from '@chakra-ui/react';

<ChakraProvider>
  <App />
</ChakraProvider>
```

### What It Provides

- Pre-styled components (`Box`, `Button`, `Text`, etc.)
- Responsive style props (`px={{ base: 4, md: 8 }}`)
- Color mode support (light/dark)
- Theme customization

### Usage in Components

```tsx
import { Box, Text, Button } from '@chakra-ui/react';

const MyComponent = () => (
  <Box p={4} bg="gray.100" borderRadius="md">
    <Text fontSize="xl" fontWeight="bold">
      Hello World
    </Text>
    <Button colorScheme="blue">Click Me</Button>
  </Box>
);
```

---

## Context Provider Hierarchy

```tsx
// src/main.tsx
<StrictMode>
  <AuthProvider>          {/* 1. Authentication state */}
    <ProgressProvider>    {/* 2. Learning progress (needs user) */}
      <ChakraProvider>    {/* 3. UI theming */}
        <App />           {/* 4. Application routes */}
      </ChakraProvider>
    </ProgressProvider>
  </AuthProvider>
</StrictMode>
```

**Order Matters:**
- `ProgressProvider` consumes `useAuth()`, so it must be inside `AuthProvider`
- `ChakraProvider` is independent, could be anywhere

---

## Custom Hook Pattern

Both custom contexts follow this pattern:

```tsx
// 1. Create context
const MyContext = createContext<MyContextType | undefined>(undefined);

// 2. Create provider component
export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const value = { state, setState };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// 3. Create custom hook
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

---

## Summary

| Context | Purpose | Custom? | File |
|---------|---------|---------|------|
| AuthContext | User authentication | Yes | `AuthContext.tsx` |
| ProgressContext | Learning progress | Yes | `ProgressContext.tsx` |
| ChakraProvider | UI theming | No (library) | N/A |

---

## Related Documentation

- [Progress Context](./progress-context.md)
- [Firebase Authentication](../firebase/authentication.md)
- [State Management](../frontend/state-management.md)
