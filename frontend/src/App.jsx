import { Routes, Route, Navigate } from "react-router-dom";
import JobFeed from "./components/JobFeed";
import JobDetail from "./components/JobDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import useAuth from "./hooks/useAuth";
import Dashboard from "./components/DashBoard";
import CreateJobPage from "./components/CreateJob";
import ReviewPage from "./components/ReviewPage";
import PaymentsPage from "./components/Payments";
import ResumeUploader from "./components/ResumeUploader";
export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/jobs"
        element={user ? <JobFeed /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/jobs/:id"
        element={user ? <JobDetail /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/create-job"
        element={user ? <CreateJobPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/review/:jobId"
        element={user ? <ReviewPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/payments/:jobId"
        element={user ? <PaymentsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/resume"
        element={user ? <ResumeUploader /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
