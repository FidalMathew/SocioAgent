import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./pages/dashboard";
import Template from "./pages/Template";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/template/:id" element={<Template />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
