import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      {/* TEMPORARY TAILWIND TEST */}
      {/* <h1 className="text-5xl font-bold text-red-500 p-4">
        Tailwind Working
      </h1> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
