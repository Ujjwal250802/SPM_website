import React from 'react';
import { motion } from 'framer-motion';

const products = [
  { name: 'Lipstick', emoji: '💄', delay: 0 },
  { name: 'Powder', emoji: '🎨', delay: 1 },
  { name: 'Mascara', emoji: '👁️', delay: 2 },
  { name: 'Perfume', emoji: '🌸', delay: 3 },
  { name: 'Mirror', emoji: '🪞', delay: 4 },
  { name: 'Brush', emoji: '🖌️', delay: 5 },
];

const FloatingProducts: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {products.map((product, index) => (
        <motion.div
          key={product.name}
          className="absolute text-4xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [-20, -100, -100, -20],
            x: [0, Math.sin(index) * 50, Math.cos(index) * 30, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: product.delay,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + (index * 15)}%`,
            top: `${20 + (index % 3) * 20}%`,
          }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg">
            {product.emoji}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingProducts;