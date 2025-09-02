import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OwnerCardProps {
  name: string;
  bio: string;
  image: string;
  expertise: string[];
}

const OwnerCard: React.FC<OwnerCardProps> = ({ name, bio, image, expertise }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white"
            >
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold mb-2"
              >
                {name}
              </motion.h3>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-200 mb-3 text-sm leading-relaxed"
              >
                {bio}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-500/80 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OwnerCard;