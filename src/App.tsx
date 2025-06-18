import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationGuard from "./components/AuthenticationGuard";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";
import TaskDetail from "./pages/TaskDetails";
import TaskForm from "./pages/TaskForm";

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={Dashboard} />}
        />
        <Route
          path="/task/:id"
          element={<AuthenticationGuard component={TaskDetail} />}
        />
        <Route
          path="/create"
          element={<AuthenticationGuard component={TaskForm} />}
        />
        <Route
          path="/edit/:id"
          element={<AuthenticationGuard component={TaskForm} />}
        />
      </Routes>
    </TaskProvider>
  );
};

export default App;