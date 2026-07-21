import { Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash/Splash";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Estimate from "../pages/Estimate/Estimate";
import Result from "../pages/Result/Result";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/estimate" element={<Estimate />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default AppRoutes;