# Frontend Architecture Overview

## What is This?

The CodeZapra frontend is a **React 18 + TypeScript** single-page application (SPA) built with **Vite** as the development and build tool. It follows a component-based architecture with centralized state management via React Context.

---

## Why This Architecture?

| Choice | Reason |
|--------|--------|
| **React 18** | Component-based UI, large ecosystem, excellent for interactive learning platforms |
| **TypeScript** | Type safety prevents runtime errors, better IDE support, self-documenting code |
| **Vite** | Fast HMR (Hot Module Replacement), optimized builds, modern bundling |
| **React Router v6** | Industry-standard routing, supports nested routes and protected routes |
| **Framer Motion** | Smooth animations for engaging learning experience |

---

## Project Structure

```
src/
├── App.tsx                 # Root component with routing
├── main.tsx                # Entry point, wraps app with providers
├── index.css               # Global styles and CSS variables
│
├── pages/                  # Route-level page components
│   ├── HomePage.tsx
│   ├── CoursesPage.tsx
│   ├── PythonCoursePage.tsx
│   ├── TopicLearningPage.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Profile.tsx
│   └── ... (more pages)
│
├── components/
│   ├── sections/           # Home page section components
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── LogicFirstDemo.tsx
│   │   ├── Courses.tsx
│   │   └── ... (more sections)
│   │
│   ├── ui/                 # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ConfirmationModal.tsx
│   │   └── ... (more UI)
│   │
│   ├── animations/         # Animation wrapper components
│   ├── CourseCard.tsx
│   ├── ProgressBar.tsx
│   └── ProtectedRoute.tsx
│
├── context/                # React Context providers
│   ├── AuthContext.tsx
│   └── ProgressContext.tsx
│
├── firebase/               # Firebase configuration
│   └── firebaseConfig.js
│
├── assets/                 # Static images and icons
└── theme/                  # Theme configuration
```

---

## Data Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        main.tsx                              │
│          Wraps App with AuthProvider + ProgressProvider      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│   BrowserRouter → Routes → PageLayout → Page Components      │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐    ┌─────────────────────────────┐
│   Public Routes         │    │   Protected Routes          │
│   /, /login, /signup    │    │   /courses, /profile, etc.  │
└─────────────────────────┘    └─────────────────────────────┘
                                              │
                                              ▼
                              ┌─────────────────────────────┐
                              │   ProtectedRoute wrapper    │
                              │   Checks useAuth().user     │
                              └─────────────────────────────┘
```

---

## Key Files Explained

### `main.tsx` — Application Entry Point

```tsx
// Wraps the entire app with context providers
<AuthProvider>
  <ProgressProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ProgressProvider>
</AuthProvider>
```

All child components can now access authentication and progress state.

---

### `App.tsx` — Routing Configuration

Defines all routes using React Router v6:

- **Public routes**: `/`, `/login`, `/signup`, `/how-it-works`, `/about`
- **Protected routes**: `/courses`, `/courses/python`, `/courses/python/topic/:topicId`, `/profile`

The `PageLayout` wrapper adds the `Header` and `Footer` to pages that need them.

---

### `Context Providers` — Global State

1. **AuthContext** — Manages user authentication state (`user`, `loading`, `login`, `logout`, `signup`, `googleLogin`)
2. **ProgressContext** — Manages learning progress (`progress`, `markTopicComplete`, `getSectionProgress`, etc.)

Both contexts sync with Firebase (Auth and Firestore) and provide real-time state to all components.

---

## Pages Using This Architecture

| Page | Route | Uses Auth | Uses Progress |
|------|-------|-----------|---------------|
| HomePage | `/` | ❌ | ❌ |
| Login | `/login` | ✅ | ❌ |
| Signup | `/signup` | ✅ | ❌ |
| CoursesPage | `/courses` | ✅ | ✅ |
| PythonCoursePage | `/courses/python` | ✅ | ✅ |
| TopicLearningPage | `/courses/python/topic/:topicId` | ✅ | ✅ |
| Profile | `/profile` | ✅ | ✅ |

---

## Summary

The CodeZapra frontend is built for **scalability**, **maintainability**, and **user experience**. The separation of concerns (pages vs components vs contexts) makes it easy to add new courses, topics, and features without refactoring existing code.
