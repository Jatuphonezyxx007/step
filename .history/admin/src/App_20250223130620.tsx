import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "@/pages/index";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
