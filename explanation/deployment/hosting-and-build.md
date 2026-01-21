# Hosting and Build

## What is the Build Process?

The build process transforms the React/TypeScript source code into optimized static files that can be deployed to any web server.

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| **Vite** | Build tool and dev server |
| **TypeScript** | Compiles to JavaScript |
| **React** | Renders to static HTML |

---

## Development vs Production

| Environment | Command | Output |
|-------------|---------|--------|
| Development | `npm run dev` | Hot-reload server on `localhost:5173` |
| Production | `npm run build` | Static files in `/dist` folder |

---

## Build Command

```bash
npm run build
```

**What It Does:**
1. TypeScript compilation (type checking)
2. React component compilation
3. CSS bundling and minification
4. JavaScript minification
5. Asset optimization (images, fonts)
6. Output to `/dist` folder

---

## Build Output

```
dist/
├── index.html           # Entry HTML file
├── assets/
│   ├── index-[hash].js   # Main JavaScript bundle
│   ├── index-[hash].css  # Main CSS bundle
│   └── [images, fonts]   # Optimized assets
└── [copied public files]
```

The `[hash]` in filenames enables **cache busting** — browsers fetch new versions when code changes.

---

## Environment Variables

**File:** `.env`

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

> **Important:** Never commit `.env` to version control. Add it to `.gitignore`.

---

## Deployment Options

### Option 1: Netlify (Recommended)

**Setup:**
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

**Automatic Deploys:** Push to `main` branch triggers deploy.

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule is essential for **client-side routing** — all paths should load `index.html`.

---

### Option 2: Vercel

**Setup:**
1. Connect GitHub repository to Vercel
2. Vercel auto-detects Vite projects
3. Add environment variables in Vercel dashboard

**Automatic Deploys:** Push to `main` branch triggers deploy.

---

### Option 3: GitHub Pages

**Setup:**
1. Build locally: `npm run build`
2. Deploy `/dist` folder

**Note:** Requires `base` configuration in `vite.config.ts`:
```ts
export default defineConfig({
  base: '/repository-name/', // For GitHub Pages
  plugins: [react()]
});
```

---

### Option 4: Firebase Hosting

**Setup:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select 'dist' as public directory
# Configure as single-page app: Yes
firebase deploy
```

---

## Vite Configuration

**File:** `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,  // Disable for production
    minify: 'esbuild'  // Fast minification
  }
});
```

---

## Build Checklist

Before deploying:

- [ ] All TypeScript errors resolved
- [ ] `npm run build` completes without errors
- [ ] Environment variables set on hosting platform
- [ ] SPA redirect configured (for React Router)
- [ ] Firebase security rules deployed

---

## Deployment Flow

```
┌─────────────────────┐
│   Developer        │
│   pushes to main   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   CI/CD (Netlify/   │
│   Vercel triggers)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   npm install       │
│   npm run build     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Deploy /dist      │
│   to CDN            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Live at           │
│   yoursite.com      │
└─────────────────────┘
```

---

## Production Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CDN (Netlify/Vercel)                     │
│   Serves static files: HTML, JS, CSS, Images                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                           │
│   Runs React app, makes API calls to Firebase               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Firebase (Google Cloud)                  │
│   ┌───────────────────┐   ┌──────────────────────────┐      │
│   │ Authentication    │   │ Firestore Database       │      │
│   │ (User sessions)   │   │ (Progress data)          │      │
│   └───────────────────┘   └──────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Build Fails

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for lint errors
npm run lint
```

### Routing Issues After Deploy

Ensure SPA redirect is configured. Without it, direct URL access (e.g., `/courses/python`) returns 404.

### Environment Variables Not Working

- Prefix with `VITE_` (required for Vite)
- Restart dev server after changing `.env`
- Verify variables in hosting platform dashboard

---

## Files Involved

| File | Purpose |
|------|---------|
| `vite.config.ts` | Build configuration |
| `package.json` | Build scripts |
| `.env` | Environment variables (local) |
| `dist/` | Build output (generated) |
| `netlify.toml` | Netlify configuration (optional) |

---

## Related Documentation

- [Frontend Overview](../frontend/overview.md)
- [Firebase Configuration](../firebase/authentication.md)
