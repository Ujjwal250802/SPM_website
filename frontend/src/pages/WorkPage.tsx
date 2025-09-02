import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';

const WorkPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const getTitle = () => {
    switch (category) {
      case 'bridal': return 'Bridal Makeup Gallery';
      case 'party': return 'Party Makeup Gallery';
      case 'normal': return 'Regular Services Gallery';
      default: return 'Our Work Gallery';
    }
  };

  const getDescription = () => {
    switch (category) {
      case 'bridal': return 'Beautiful bridal transformations for your special day';
      case 'party': return 'Glamorous looks for parties and celebrations';
      case 'normal': return 'Everyday beauty and regular services';
      default: return 'Our professional beauty work';
    }
  };

  // Sample video data - replace with actual content
  const videos = [
    {
      id: 1,
      thumbnail: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=500",
      title: "Bridal Transformation 1",
      duration: "3:45"
    },
    {
      id: 2,
      thumbnail: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500",
      title: "Party Look Makeover",
      duration: "2:30"
    },
    {
      id: 3,
      thumbnail: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=500",
      title: "Natural Day Look",
      duration: "4:12"
    },
    {
      id: 4,
      thumbnail: "https://images.pexels.com/photos/3261069/pexels-photo-3261069.jpeg?auto=compress&cs=tinysrgb&w=500",
      title: "Traditional Makeup",
      duration: "5:20"
    },
    {
      id: 5,
      thumbnail: "https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=500",
      title: "Glamour Makeup",
      duration: "3:15"
    },
    {
      id: 6,
      thumbnail: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=500",
      title: "Wedding Guest Look",
      duration: "2:45"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{getTitle()}</h1>
          <p className="text-xl text-gray-600">{getDescription()}</p>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-8 w-8 text-primary-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
            Load More Videos
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkPage;