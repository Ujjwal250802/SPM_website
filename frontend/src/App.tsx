import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import AuthPage from './pages/AuthPage';
import CoursePage from './pages/CoursePage';
import PaymentPage from './pages/PaymentPage';
import BooksPage from './pages/BooksPage';
import TutorialsPage from './pages/TutorialsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:category" element={<WorkPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;