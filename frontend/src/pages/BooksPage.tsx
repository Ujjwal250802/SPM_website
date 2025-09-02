import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BookOpen, Download, ArrowLeft, Lock } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  description?: string;
  link: string;
  category?: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isSubscriptionActive } = useAuth();
  const navigate = useNavigate();

  const hasActiveSubscription = isSubscriptionActive();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!hasActiveSubscription) {
      // Show locked state but still render the page
      setLoading(false);
      return;
    }

    fetchBooks();
  }, [user, hasActiveSubscription, navigate]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/content/books');
      setBooks(response.data.books);
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Active subscription required to access books');
      } else {
        toast.error('Failed to load books');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (link: string, title: string) => {
    if (!hasActiveSubscription) {
      toast.error('Please subscribe to download books');
      return;
    }
    
    // Open the download link in a new tab
    window.open(link, '_blank');
    toast.success(`Downloading: ${title}`);
  };

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-8"
          >
            <Link
              to="/courses"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Courses</span>
            </Link>
          </motion.div>

          <div className="relative">
            {/* Blurred Background Content */}
            <div className="filter blur-sm pointer-events-none">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">E-Books Library</h1>
                <p className="text-xl text-gray-600">Comprehensive beauty guides and tutorials</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lock Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm"
            >
              <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl">
                <div className="bg-gradient-to-br from-primary-500 to-purple-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Lock className="h-12 w-12 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Premium Content Locked
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Subscribe to access our comprehensive library of beauty e-books and guides.
                </p>
                
                <Link
                  to="/courses"
                  className="inline-block bg-gradient-to-r from-primary-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe Now
                </Link>
              </div>
            </motion.div>
          </div>
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
          className="flex items-center space-x-4 mb-8"
        >
          <Link
            to="/courses"
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Courses</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">E-Books Library</h1>
          <p className="text-xl text-gray-600">
            Comprehensive beauty guides and tutorials at your fingertips
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {books.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Books Available</h3>
                <p className="text-gray-500">Books will be added soon. Stay tuned!</p>
              </div>
            ) : (
              /* Books Table */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-primary-500 to-purple-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">S.No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {books.map((book, index) => (
                        <motion.tr
                          key={book._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-primary-500 mr-3" />
                              <span className="font-medium text-gray-800">
                                {book.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {book.category || 'General'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {book.description || 'No description available'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDownload(book.link, book.title)}
                              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-purple-600 transition-all duration-300 text-sm"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Sample Books for Demo */}
            {books.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8"
              >
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Demo Content:</strong> Below are sample books that would be available to subscribers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-primary-500 to-purple-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">S.No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          title: "Foundation & Base Makeup",
                          category: "Basics",
                          description: "Complete guide to applying foundation and creating the perfect base"
                        },
                        {
                          title: "Eye Makeup Techniques",
                          category: "Advanced",
                          description: "Master different eye makeup styles from natural to dramatic"
                        },
                        {
                          title: "Bridal Makeup Guide",
                          category: "Specialization",
                          description: "Traditional and modern bridal makeup techniques"
                        },
                        {
                          title: "Color Theory for Makeup",
                          category: "Theory",
                          description: "Understanding colors and how to use them effectively in makeup"
                        },
                        {
                          title: "Skincare & Preparation",
                          category: "Basics",
                          description: "Pre-makeup skincare routines and skin preparation techniques"
                        }
                      ].map((book, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-primary-500 mr-3" />
                              <span className="font-medium text-gray-800">
                                {book.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {book.category}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {book.description}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toast.success(`Downloaded: ${book.title}`)}
                              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-purple-600 transition-all duration-300 text-sm"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </motion.button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BooksPage;