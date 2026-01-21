# Routing Documentation

## What is Routing?

Routing determines **which page component renders based on the URL**. CodeZapra uses **React Router v6** for client-side routing, meaning page changes happen instantly without full page reloads.

---

## Why React Router v6?

| Feature | Benefit |
|---------|---------|
| Nested Routes | Clean parent/child route structure |
| Route Guards | Easy implementation of `ProtectedRoute` |
| `useParams` | Access URL parameters (`:topicId`) |
| `useNavigate` | Programmatic navigation |
| `Outlet` | Render child routes inside parent |

---

## Route Configuration

**File:** `src/App.tsx`

```tsx
<BrowserRouter>
  <ScrollToTop />
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/how-it-works" element={<PageLayout><HowItWorksPage /></PageLayout>} />
    <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/courses" element={<PageLayout><CoursesPage /></PageLayout>} />
      <Route path="/courses/python" element={<PageLayout><PythonCoursePage /></PageLayout>} />
      <Route path="/courses/python/topic/:topicId" element={<PageLayout><TopicLearningPage /></PageLayout>} />
      <Route path="/courses/python/section/basics" element={<PageLayout><PythonBasicsSection /></PageLayout>} />
      <Route path="/courses/:courseId" element={<PageLayout><ComingSoonPage /></PageLayout>} />
      <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
      <Route path="/experience/:type" element={<PageLayout><ExperiencePage /></PageLayout>} />
    </Route>
  </Routes>
</BrowserRouter>
```

---

## Route Types

### 1. Public Routes

Accessible by anyone, no authentication required.

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Landing page |
| `/login` | `Login` | Login form |
| `/signup` | `Signup` | Registration form |
| `/how-it-works` | `HowItWorksPage` | Methodology explanation |
| `/about` | `AboutPage` | About the platform |

---

### 2. Protected Routes

Require authentication. Wrapped with `ProtectedRoute`.

| Path | Component | Description |
|------|-----------|-------------|
| `/courses` | `CoursesPage` | All courses |
| `/courses/python` | `PythonCoursePage` | Python curriculum |
| `/courses/python/topic/:topicId` | `TopicLearningPage` | Individual topic |
| `/courses/python/section/basics` | `PythonBasicsSection` | Basics section |
| `/courses/:courseId` | `ComingSoonPage` | Other courses (placeholder) |
| `/profile` | `Profile` | User dashboard |
| `/experience/:type` | `ExperiencePage` | Feature demos |

---

### 3. Dynamic Routes

Routes with URL parameters.

#### `/courses/python/topic/:topicId`

**Parameter:** `:topicId` (e.g., `variables`, `loops`, `functions`)

**Access in Component:**
```tsx
import { useParams } from 'react-router-dom';

const TopicLearningPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  // topicId = "variables", "loops", etc.
};
```

#### `/experience/:type`

**Parameter:** `:type` (e.g., `maze`, `logic`, `ide`)

---

## Protected Route Implementation

**File:** `src/components/ProtectedRoute.tsx`

```tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show loading while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes
  return <Outlet />;
};
```

**How It Works:**
1. Check if auth state is still loading
2. If no user, redirect to `/login`
3. If user exists, render the `<Outlet />` (child routes)

---

## PageLayout Wrapper

**Purpose:** Add `Header` and `Footer` to pages that need them.

```tsx
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <Box pt="120px" minH="100vh" bg="#f9fafb">
      {children}
    </Box>
    <Footer />
  </>
);
```

**Note:** `HomePage` has its own layout, so it doesn't use `PageLayout`.

---

## ScrollToTop Utility

**Purpose:** Scroll to top when navigating between pages.

```tsx
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
```

**Why:** Without this, navigating to a new page would keep the scroll position from the previous page.

---

## Navigation Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        User Journey                           │
└──────────────────────────────────────────────────────────────┘

Landing Page (/)
       │
       ├─── Click "Get Started" ───▶ Signup (/signup)
       │                                  │
       │                                  ▼
       │                            Login (/login)
       │                                  │
       └───────────────────────────────────┘
                                          │
                                   Authenticated?
                                   /           \
                                 No             Yes
                                 │               │
                                 ▼               ▼
                          Back to Login    Courses (/courses)
                                                  │
                                                  ▼
                                          Python Course
                                    (/courses/python)
                                                  │
                                                  ▼
                                           Topic Page
                                (/courses/python/topic/:topicId)
                                                  │
                                          Complete Topic
                                                  │
                                                  ▼
                                           Next Topic
                                              or
                                          Profile (/profile)
```

---

## Navigation Methods

### 1. Link Component

```tsx
import { Link } from 'react-router-dom';

<Link to="/courses">View Courses</Link>
```

### 2. useNavigate Hook

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate programmatically
navigate('/courses');
navigate('/courses/python/topic/variables');
navigate(-1); // Go back
```

---

## URL Parameters in TopicLearningPage

The topic page uses the URL to determine which topic to load:

```
/courses/python/topic/variables    →  Load "Variables" content
/courses/python/topic/loops        →  Load "Loops" content
/courses/python/topic/functions    →  Load "Functions" content
```

The component fetches topic data based on `topicId`:

```tsx
const { topicId } = useParams();
const topicData = pythonTopics[topicId]; // Load from data file
```

---

## Summary

| Concept | Implementation |
|---------|----------------|
| Library | React Router v6 |
| Route Config | `App.tsx` with `<Routes>` |
| Public Routes | Direct render |
| Protected Routes | Wrapped in `<ProtectedRoute />` |
| Layout | `PageLayout` wrapper for Header/Footer |
| Scroll Reset | `ScrollToTop` component |
| Dynamic Params | `:topicId`, `:courseId`, `:type` |
