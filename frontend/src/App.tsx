import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Quizzes from './components/Quizzes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
    </Router>
  );
};

export default App;