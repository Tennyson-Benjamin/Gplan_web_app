import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "../features/inputGraphEditor/components/DashBoard";
import LoginPage from "../features/login/LoginPage";
import SignUpPage from "../features/login/SignUpPage";
import InputGraphEditorPage from "../features/inputGraphEditor/InputGraphEditorPage";
import HomePage from "../features/home/HomePage";
import OutputEditorPage from "../features/outputEditor/OutputEditorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import Toast from "../common-components/Toast"; // Make sure this path is correct

function Home() {
  return (
    <Router>
      <div>
        {/* Routes setup */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inputeditor" element={<InputGraphEditorPage />} />
            <Route path="/outputeditor" element={<OutputEditorPage />} />
          </Route>

          {/* Catch All Route */}
          <Route path="*" element={<div>PATH DNE</div>} />
        </Routes>

        {/* Toast component */}
        <Toast />
      </div>
    </Router>
  );
}

export default Home;
