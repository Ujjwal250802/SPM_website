import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import FloatingProducts from '../components/FloatingProducts';
import OwnerCard from '../components/OwnerCard';
import ServiceCard from '../components/ServiceCard';
import AppointmentForm from '../components/AppointmentForm';
import { Sparkles, Star, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  const owners = [
    {
      name: "Priya Sharma",
      bio: "Master beautician with 15+ years of experience. Specializes in bridal makeup and traditional Indian looks.",
      image: "https://images.pexels.com/photos/3261069/pexels-photo-3261069.jpeg?auto=compress&cs=tinysrgb&w=500",
      expertise: ["Bridal Makeup", "Traditional Looks", "Hair Styling"]
    },
    {
      name: "Sanya Malhotra",
      bio: "Award-winning makeup artist known for contemporary and party makeup. Expert in color theory and skin care.",
      image: "https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=500",
      expertise: ["Party Makeup", "Color Theory", "Skincare"]
    }
  ];

  const services = [
    {
      title: "Bridal Makeup",
      description: "Complete bridal transformation with traditional and contemporary styles. Perfect for your special day.",
      image: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "bridal"
    },
    {
      title: "Party Makeup",
      description: "Glamorous looks for parties, events, and celebrations. Stand out with our expert touch.",
      image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "party"
    },
    {
      title: "Regular Services",
      description: "Daily beauty routines, facials, and regular makeup services for everyday elegance.",
      image: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=500",
      category: "normal"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingProducts />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-gradient-to-r from-primary-500 to-purple-500 p-4 rounded-full shadow-lg">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
              SPM Beauty Parlour
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your beauty with our expert touch. Professional makeup, styling, and beauty courses.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 pt-8"
            >
              <a
                href="#services"
                className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-primary-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Services
              </a>
              <a
                href="#appointment"
                className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Book Appointment
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Owners Section */}
      <section id="owners" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Expert Beauticians
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Skilled professionals dedicated to bringing out your natural beauty with years of experience and passion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {owners.map((owner, index) => (
              <motion.div
                key={owner.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <OwnerCard {...owner} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Work & Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of professional beauty services tailored to make you look and feel amazing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Star className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold">500+</div>
              <div className="text-xl opacity-90">Happy Clients</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold">15+</div>
              <div className="text-xl opacity-90">Years Experience</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <Sparkles className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold">100+</div>
              <div className="text-xl opacity-90">Course Students</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <AppointmentForm />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">SPM Beauty Parlour</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your beauty is our passion. Transform yourself with professional care and expertise.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
              © 2024 SPM Beauty Parlour. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;