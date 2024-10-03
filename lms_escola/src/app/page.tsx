"use client"
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './sign-in/page';
import SignUp from './sign-up/page';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} /> {/* Redireciona para /adminpage */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redireciona para SignIn se não encontrar a rota */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
