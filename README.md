# Task Away! - Task Management App

## Overview

**Task Away!** is a productivity-focused task management application built with React, TypeScript, and Bootstrap. It allows users to create, view, edit, and delete tasks, with authentication powered by Auth0. The app features a responsive UI, persistent state, and a modular architecture for easy maintenance and scalability.

---

## Features

- **User Authentication:** Secure login/logout using Auth0.
- **Task CRUD:** Create, read, update, and delete tasks.
- **Task Details:** View detailed information for each task.
- **Task Completion:** Mark tasks as completed or pending.
- **Due Dates:** Assign and display due dates for tasks.
- **Responsive Design:** Mobile-friendly UI using Bootstrap.
- **Persistent State:** Tasks are saved in local storage for session persistence.
- **Protected Routes:** Only authenticated users can access task management features.

---

## Project Structure & Architecture

```
src/
  components/         # Reusable UI components (NavBar, LoginButton, etc.)
  context/            # React Context for global state management (TaskContext)
  pages/              # Page-level components (Dashboard, TaskForm, TaskDetails, HomePage)
  interfaces/         # TypeScript interfaces and types
  App.tsx             # Main app component and routing
  index.tsx           # Entry point, wraps app in BrowserRouter and Auth0Provider
```

- **State Management:** Uses React Context (`TaskContext`) for global task state.
- **Routing:** React Router v6 for navigation and protected routes.
- **Styling:** Bootstrap and React-Bootstrap for consistent, responsive UI.
- **Authentication:** Auth0 React SDK for secure authentication and route protection.

---

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### 1. Clone the Repository

```sh
git clone https://github.com/SaraViolett/Task-Management-App.git
cd Task-Management-App
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Auth0

- Create a free Auth0 account at [auth0.com](https://auth0.com/).
- Create a new Single Page Application, name the app "ReactAuth0", and note your **Domain** and **Client ID**.
- Navigate to the `Auth0Provider.tsx` file in the components folder.
- Fill your **Domain** and **Client ID** from Auth0.com to blank domain and clientID string objects.
- Add allowed URLs: `http://localhost:5173`
- Add allowed callback URLs: `http://localhost:5173/dashboard`
 

### 4. Start the Development Server

```sh
npm run dev
```
---

## Usage

1. **Login:** Click the "Log In" button to authenticate with Auth0.
2. **Dashboard:** View your list of tasks. Create, edit, or delete tasks as needed.
3. **Task Details:** Click "See Task Details" or use the modal to view more information.
4. **Logout:** Click "Log Out" to end your session.

---

## Implementation Details

- **Task State:** Managed globally via `TaskContext`. Tasks are persisted to `localStorage` for session persistence.
- **Forms:** Task creation and editing use Bootstrap-styled forms with validation.
- **Error Handling:** User-friendly alerts for errors (e.g., failed deletions).
- **Protected Routes:** Only authenticated users can access dashboard and profile pages.

---

##