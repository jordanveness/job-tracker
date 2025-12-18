# Job Search Tracker

A full-stack Kanban-style web application for managing job applications. Built with React, TypeScript, and Firebase.

**Live Demo:** [job-tracker.netlify.app](https://job-tracker.netlify.app)

---

## Overview

Job Search Tracker helps users manage their job application pipeline visually. Applications can be tracked from initial submission through to offer or rejection using a drag-and-drop Kanban board. Data syncs in real-time across devices via Firebase.

### Why I Built This

During my job search, I found existing tools like Trello difficult to maintain consistently. Spreadsheets became unwieldy as applications grew. I needed a purpose-built solution with:

- A visual pipeline showing application stages at a glance
- Quick data entry with job-specific fields (salary, recruiter, deadlines)
- Cross-device access without manual syncing
- Simple, focused interface without unnecessary features

This project also demonstrates my ability to build and deploy a complete full-stack application independently.

---

## Features

- **Google Authentication** - Secure sign-in with data isolated per user
- **Kanban Board** - 7 status columns with drag-and-drop functionality
- **Real-time Sync** - Changes appear instantly across all devices
- **Search** - Filter applications by company, role, or source
- **Statistics Dashboard** - Track total applications, active interviews, offers, and response rate
- **Mobile Responsive** - Fully functional on mobile devices

### Application Stages

| Stage           | Description             |
| --------------- | ----------------------- |
| Applied         | Application submitted   |
| Phone Screen    | Initial phone screening |
| First Interview | First formal interview  |
| Final Interview | Final round interviews  |
| Offer           | Received an offer       |
| Rejected        | Application rejected    |
| Not Pursuing    | Withdrawn by candidate  |

---

## Tech Stack

### Frontend

| Technology   | Purpose                              |
| ------------ | ------------------------------------ |
| React 18     | UI component library                 |
| TypeScript   | Type safety and developer experience |
| Tailwind CSS | Utility-first styling                |
| Vite         | Build tool and development server    |
| Lucide React | Icon library                         |

### Backend

| Technology              | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| Firebase Authentication | User authentication via Google OAuth             |
| Cloud Firestore         | NoSQL document database with real-time listeners |

### Infrastructure

| Service | Purpose                                     |
| ------- | ------------------------------------------- |
| Netlify | Frontend hosting with continuous deployment |
| GitHub  | Version control and CI/CD trigger           |

---

## Architecture

```
src/
├── components/
│   ├── Auth/           # Sign-in screen
│   ├── Board/          # Kanban board, columns, job cards
│   ├── Modals/         # Add and edit job modals
│   └── Stats/          # Statistics dashboard
├── hooks/
│   ├── useAuth.ts      # Authentication state and methods
│   └── useJobs.ts      # CRUD operations and real-time sync
├── services/
│   └── firebase.ts     # Firebase configuration
├── types/
│   └── index.ts        # TypeScript interfaces and constants
├── App.tsx             # Main application component
└── main.tsx            # Entry point
```

### Data Flow

1. User interactions trigger functions passed down from `App.tsx`
2. Functions call methods from custom hooks (`useAuth`, `useJobs`)
3. Hooks interact with Firebase services
4. Firestore real-time listeners push updates back to hooks
5. React re-renders components with new data

---

## User Stories

### Authentication

```
As a user, I want to sign in with Google so that my data is secure and synced across devices.
As a user, I want to sign out so that others cannot access my data on shared devices.
```

### Managing Applications

```
As a user, I want to add a job application with company, role, source, and URL so that I can track where I have applied.
As a user, I want to drag applications between columns so that I can quickly update their status.
As a user, I want to click on an application to view and edit its details.
As a user, I want to delete applications I no longer need to track.
As a user, I want to record salary range, recruiter name, and interview dates for each application.
As a user, I want to mark whether I have contacted the recruiter directly.
```

### Viewing Data

```
As a user, I want to see all applications organised by status in columns so that I can visualise my pipeline.
As a user, I want to search applications by company, role, or source.
As a user, I want to see statistics including total applications, active interviews, offers, and response rate.
```

### Data Persistence

```
As a user, I want my data to persist between sessions.
As a user, I want changes to sync across all my devices in real-time.
```

---

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm
- A Firebase project (free tier is sufficient)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/jordanveness/job-tracker.git
cd job-tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com) and update `src/services/firebase.ts` with your config values.

4. **Enable Firebase services**

In Firebase Console:

- Authentication → Sign-in method → Enable Google
- Firestore Database → Create database → Start in production mode
- Add localhost to authorised domains

5. **Set Firestore security rules**

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

6. **Start development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deployment

The application is deployed on Netlify with continuous deployment from the `main` branch.

### Deploy Your Own

1. Fork this repository
2. Connect the fork to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add your Netlify domain to Firebase authorised domains

---

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## Future Enhancements

- [ ] Email reminders for follow-up dates
- [ ] Export data to CSV
- [ ] Dark mode
- [ ] Multiple job search campaigns
- [ ] Interview preparation notes per company
- [ ] Analytics and insights over time

---

## What I Learned

- Structuring a React application with TypeScript for maintainability
- Implementing real-time data synchronisation with Firestore
- Building accessible drag-and-drop interfaces
- Deploying and configuring CI/CD with Netlify
- Writing custom hooks to separate business logic from UI components

---

## Contact

**Jordan Veness**

- GitHub: [@jordanveness](https://github.com/jordanveness)
- LinkedIn: [linkedin.com/in/jordanveness](https://linkedin.com/in/jordanveness)

---

## Licence

This project is open source and available under the [MIT Licence](LICENCE).
