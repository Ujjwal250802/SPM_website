import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="font-bold text-2xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              SPM Beauty Parlour
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Home
            </Link>
            <a
              href="#owners"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Owners
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#appointment"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Book Appointment
            </a>
            <Link
              to="/auth"
              className="btn-primary"
            >
              Courses
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;