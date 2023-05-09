import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Admin/SignIn";
import LayoutAdmin from "./components/Layout/Admin";
import MoviesManagement from "./pages/Admin/MoviesManagement";
import UserManagement from "./pages/Admin/UserManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/sign-in" element={<SignIn />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="/" element={<UserManagement />} />
          <Route
            path="/admin/movies-management"
            element={<MoviesManagement />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
