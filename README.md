# Code Zapra - Interactive Learning Platform

Code Zapra is a modern, interactive coding education platform designed to help beginners build strong programming fundamentals through a logic-first approach. Unlike traditional text-based tutorials, Code Zapra emphasizes visualization, mental models, and guided interactions before jumping into syntax.

## 🚀 Features

- **Logic-First Learning**: Understand concepts visually ("mental models") before writing code.
- **Interactive Coding**: Built-in code editor (Monaco Editor) for hands-on practice directly in the browser.
- **Structured Courses**: Step-by-step topics ranging from basics to advanced concepts (e.g., Python Course).
- **Secure Authentication**: Email & Google support via Firebase Authentication.
- **Cloud Progress Sync**: Progress is strictly stored in Firestore and synced across devices.
- **Protected Routes**: Access control for authenticated zones (Courses, Profile).
- **Modern UI/UX**: Fast, responsive, and animated user interface built with React and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend / Auth**: [Firebase v9](https://firebase.google.com/) (Auth + Firestore)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd code-zapra
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure

```text
CodeZapra/
├── src/
│   ├── assets/         # Static assets like images
│   ├── components/     # Reusable UI components
│   │   ├── animations/ # Framer Motion animation wrappers
│   │   ├── sections/   # Page sections (Hero, Features, etc.)
│   │   └── ui/         # Header, Footer, Modals
│   ├── context/        # React Context providers (Auth, Progress)
│   ├── firebase/       # Firebase configuration
│   ├── pages/          # Route-level page components
│   ├── App.tsx         # Main app with routing
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
│
├── explanation/        # 📖 Project documentation
│   ├── frontend/       # Architecture, pages, components, routing
│   ├── backend/        # Serverless Firebase overview
│   ├── firebase/       # Auth, Firestore, security rules
│   ├── context/        # State management documentation
│   ├── learning-flow/  # Logic-first methodology
│   └── deployment/     # Build and hosting
│
└── public/             # Static public assets
```

## 📖 Documentation

Comprehensive project documentation is available in the [`explanation/`](./explanation/) folder:

| Folder | Contents |
|--------|----------|
| `frontend/` | Architecture, pages, components, routing, state, animations |
| `backend/` | Serverless Firebase architecture |
| `firebase/` | Authentication, Firestore, security rules |
| `context/` | Progress tracking, AuthContext |
| `learning-flow/` | Logic-first approach, code unlock flow |
| `deployment/` | Build process, hosting options |

> Start with [`explanation/README.md`](./explanation/README.md) for a guided reading order.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Type-checks and builds the project for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

---

> Built with ❤️ by the Code Zapra Team
