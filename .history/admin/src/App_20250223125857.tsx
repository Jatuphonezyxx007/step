import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index"; // หน้า login
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
