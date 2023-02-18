import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { Landing, Navbar, Error, Register, Login } from "./pages";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
