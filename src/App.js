import logo from "./logo.svg";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Foods from "./pages/Foods";
import Articles from "./pages/Articles";
import AddArticle from "./pages/AddArticle";
import EditArticle from "./pages/EditArticle";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("id-cms-admin-user")) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/foods" element={<Foods />} />
      <Route path="/add-food" element={<AddFood />} />
      <Route path="/edit-food/:id" element={<EditFood />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/add-article" element={<AddArticle />} />
      <Route path="/edit-article/:id" element={<EditArticle />} />
    </Routes>
  );
};

export default App;
