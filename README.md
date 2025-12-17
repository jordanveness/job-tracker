# Job Search Tracker

A React + TypeScript application for tracking job applications with Firebase backend.

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore)
- **Build Tool:** Vite
- **Icons:** Lucide React

## Project Structure

```
src/
├── components/
│   ├── Auth/          # Authentication components
│   ├── Board/         # Kanban board, columns, job cards
│   ├── Modals/        # Add job and detail modals
│   └── Stats/         # Statistics display
├── hooks/
│   ├── useAuth.ts     # Firebase authentication hook
│   └── useJobs.ts     # Firestore jobs CRUD hook
├── services/
│   └── firebase.ts    # Firebase configuration
├── types/
│   └── index.ts       # TypeScript interfaces and constants
├── App.tsx            # Main application component
├── main.tsx           # Entry point
└── index.css          # Tailwind CSS imports
```

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

## Firebase Setup

Before the app works, complete these steps in Firebase Console:

### 1. Enable Google Authentication
- Go to Firebase Console → Authentication → Sign-in method
- Enable Google provider
- Add your domain to authorized domains

### 2. Create Firestore Database
- Go to Firebase Console → Firestore Database
- Click "Create database"
- Start in production mode

### 3. Set Security Rules
In Firestore → Rules, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Deployment to GitHub Pages

1. **Create GitHub repository**

2. **Add GitHub Pages configuration to `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Deploy using gh-pages:**
   ```bash
   npm install -D gh-pages
   npx gh-pages -d dist
   ```

5. **Add deployed URL to Firebase authorized domains**

## Alternative: Deploy to Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add deployed URL to Firebase authorized domains

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
