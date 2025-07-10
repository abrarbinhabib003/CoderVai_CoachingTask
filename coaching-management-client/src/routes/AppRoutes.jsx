import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import ErrorPage from '../pages/ErrorPage'; 
import AdminDashboard from '../pages/AdminDashboard'; 


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
           
          <Route path="admin-dashboard" element={<AdminDashboard />} />
         
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
      </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;