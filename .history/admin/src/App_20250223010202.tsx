import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index"; // หน้า login
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<IndexPage />} />
        <Route
          path="/admin/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
