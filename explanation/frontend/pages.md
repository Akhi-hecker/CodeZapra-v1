# Pages Documentation

## What Are Pages?

Pages are **route-level components** that represent distinct views in the application. Each page corresponds to a URL path and is rendered when the user navigates to that route.

---

## Page Directory

**Location:** `src/pages/`

```
pages/
├── HomePage.tsx              # Landing page (/)
├── CoursesPage.tsx           # All courses listing (/courses)
├── PythonCoursePage.tsx      # Python curriculum (/courses/python)
├── TopicLearningPage.tsx     # Individual topic (/courses/python/topic/:topicId)
├── PythonBasicsSection.tsx   # Basics section detail
├── Profile.tsx               # User profile (/profile)
├── Login.tsx                 # Login form (/login)
├── Signup.tsx                # Registration form (/signup)
├── AboutPage.tsx             # About us (/about)
├── HowItWorksPage.tsx        # Platform explanation (/how-it-works)
├── ComingSoonPage.tsx        # Placeholder for future courses
├── ExperiencePage.tsx        # Feature demos (/experience/:type)
└── index.ts                  # Barrel export
```

---

## Page Details

### 1. HomePage (`/`)

**Purpose:** Marketing landing page that introduces the platform.

**Components Used:**
- `Header` — Navigation bar
- `Hero` — Main banner with animated visualizations
- `HowItWorks` — 5-step process cards
- `LogicFirstDemo` — Interactive logic-first demo
- `Courses` — Course cards grid
- `WhyThisPlatform` — Benefits section
- `CallToAction` — CTA to sign up
- `Footer` — Site footer

**Data Flow:** No data fetching. Static content with animations.

---

### 2. Login (`/login`)

**Purpose:** Authenticate existing users.

**Key Features:**
- Email/password form
- Google OAuth button
- Link to signup page
- Error handling with user feedback

**Context Used:** `useAuth()` for `login()` and `googleLogin()`

**On Success:** Redirects to `/courses`

---

### 3. Signup (`/signup`)

**Purpose:** Register new users.

**Key Features:**
- Email/password form with validation
- Google OAuth option
- Creates Firestore user document on signup

**Context Used:** `useAuth()` for `signup()` and `googleLogin()`

**On Success:** Redirects to `/courses`

---

### 4. CoursesPage (`/courses`) — Protected

**Purpose:** Display all available courses with progress.

**Components Used:**
- `CourseCard` — Individual course display with progress indicator

**Context Used:**
- `useAuth()` — Get current user
- `useProgress()` — Get course completion percentages

**Data Displayed:**
- Python (Active), Java (Coming Soon), JavaScript (Coming Soon), DSA (Coming Soon)

---

### 5. PythonCoursePage (`/courses/python`) — Protected

**Purpose:** Display Python course curriculum organized by sections.

**Sections:**
1. Basics (5 topics)
2. Control Flow (4 topics)
3. Functions (5 topics)
4. Data Structures (4 topics)
5. Problem Solving (3 topics)

**Context Used:** `useProgress()` to show completed/total topics per section

**Navigation:** Click topic → `/courses/python/topic/:topicId`

---

### 6. TopicLearningPage (`/courses/python/topic/:topicId`) — Protected

**Purpose:** Individual topic learning with the 6-step methodology.

**The 6 Steps:**

| Step | Name | Description |
|------|------|-------------|
| 1 | Visual Explanation | Animated concept breakdown |
| 2 | Video & Notes | Tutorial video + PDF notes |
| 3 | Logic Explanation | User explains approach in plain English |
| 4 | Code Editor | Monaco editor unlocked after logic approved |
| 5 | Code Evaluation | Run code against test cases |
| 6 | Progress Forward | Mark complete, navigate to next topic |

**Key Components:**
- Monaco Editor (code writing)
- Logic validator (keyword detection)
- Progress buttons

**Context Used:** `useProgress()` for `markTopicComplete()`

---

### 7. Profile (`/profile`) — Protected

**Purpose:** User dashboard showing account info and learning progress.

**Sections:**
- User info (email, login method)
- Python course progress by section
- Reset progress button
- Logout button with confirmation modal

**Context Used:**
- `useAuth()` — User details, logout
- `useProgress()` — Section progress percentages

---

### 8. AboutPage (`/about`)

**Purpose:** Static page explaining the platform mission and team.

---

### 9. HowItWorksPage (`/how-it-works`)

**Purpose:** Detailed explanation of the learning methodology.

**Interactive Elements:**
- Step-by-step carousel
- Feature explanations

---

### 10. ComingSoonPage (`/courses/:courseId`)

**Purpose:** Placeholder for Java, JavaScript, and DSA courses.

**Dynamic Behavior:** Uses `:courseId` param to display course-specific info.

---

### 11. ExperiencePage (`/experience/:type`)

**Purpose:** Interactive feature demos (maze solver, logic flowchart, IDE preview).

---

## Route Protection

All pages under `/courses/*` and `/profile` are wrapped with `ProtectedRoute`:

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/courses" element={<CoursesPage />} />
  {/* ... more protected routes */}
</Route>
```

If `useAuth().user` is `null`, user is redirected to `/login`.

---

## Summary

| Page | Auth Required | Progress Tracking | Key Interaction |
|------|---------------|-------------------|-----------------|
| HomePage | ❌ | ❌ | View marketing content |
| Login | ❌ | ❌ | Authenticate |
| Signup | ❌ | ❌ | Create account |
| CoursesPage | ✅ | ✅ | Select course |
| PythonCoursePage | ✅ | ✅ | Select topic |
| TopicLearningPage | ✅ | ✅ | Complete learning steps |
| Profile | ✅ | ✅ | View/reset progress |
