import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, category }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        <Link
          to={`/work/${category.toLowerCase()}`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
        >
          <span>View Gallery</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;