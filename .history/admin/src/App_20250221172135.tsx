import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<IndexPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
