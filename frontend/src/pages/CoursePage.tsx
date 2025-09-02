import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Play, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

const CoursePage: React.FC = () => {
  const { user, isSubscriptionActive } = useAuth();
  const hasActiveSubscription = isSubscriptionActive();

  const plans = [
    {
      duration: '3 months',
      price: 2000,
      features: ['Basic makeup techniques', 'Color theory', 'Skin care basics', 'Certificate of completion']
    },
    {
      duration: '6 months',
      price: 3000,
      features: ['All 3-month features', 'Advanced techniques', 'Bridal makeup', 'Business guidance', 'Kit included']
    },
    {
      duration: '1 year',
      price: 5000,
      features: ['All previous features', 'Professional certification', 'Internship opportunity', 'Advanced kit', 'Job placement assistance']
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to access courses</h2>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-purple-600 transition-all duration-300"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-right">
            <p className="text-gray-600">Welcome back,</p>
            <p className="text-xl font-semibold text-gray-800">{user.name}</p>
            {hasActiveSubscription && (
              <div className="flex items-center text-green-600 text-sm mt-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Active Subscription</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Course Introduction Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center relative">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Welcome to SPM Beauty Courses</h3>
                <p className="text-primary-100">
                  Learn professional beauty techniques from industry experts
                </p>
              </div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </motion.div>

        {/* Course Content Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center space-x-6 mb-12"
        >
          <Link
            to="/books"
            className={`relative group ${!hasActiveSubscription ? 'cursor-not-allowed' : ''}`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center min-w-[200px]">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary-500" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">E-Books</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive guides and tutorials
              </p>
            </div>
            {!hasActiveSubscription && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Lock className="h-8 w-8 text-gray-500" />
              </div>
            )}
          </Link>

          <Link
            to="/tutorials"
            className={`relative group ${!hasActiveSubscription ? 'cursor-not-allowed' : ''}`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center min-w-[200px]">
              <Play className="h-12 w-12 mx-auto mb-4 text-primary-500" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">
                Step-by-step video lessons
              </p>
            </div>
            {!hasActiveSubscription && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Lock className="h-8 w-8 text-gray-500" />
              </div>
            )}
          </Link>
        </motion.div>

        {/* Pricing Plans */}
        {!hasActiveSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Learning Plan</h2>
              <p className="text-gray-600">
                Select the perfect plan to start your beauty education journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.duration}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                    index === 1 ? 'ring-2 ring-primary-500 transform scale-105' : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="bg-gradient-to-r from-primary-500 to-purple-500 text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.duration}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary-600">₹{plan.price}</span>
                      <span className="text-gray-500 ml-2">total</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/payment"
                      state={{ plan: plan.duration.replace(' ', ''), price: plan.price }}
                      className="w-full bg-gradient-to-r from-primary-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-primary-600 hover:to-purple-600 transition-all duration-300 text-center block"
                    >
                      Choose Plan
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Subscription Info */}
        {hasActiveSubscription && user.subscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Active Subscription: {user.subscription.type?.toUpperCase()}
                </h3>
                <p className="text-green-600">
                  Valid until: {new Date(user.subscription.endDate!).toLocaleDateString()}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;