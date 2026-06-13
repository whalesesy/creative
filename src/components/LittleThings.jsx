import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function LittleThings() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 12 }
    }
  };

  return (
    <section id="little-things" className="section-container">
      <h2 className="section-title">Little Things About You</h2>
      <p className="section-subtitle">The small details that make you infinitely special</p>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {loveConfig.littleThings.map((thing, idx) => {
          const rotation = (idx % 3 - 1) * 2; // tilts (-2, 0, 2)

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                rotate: rotation + (rotation > 0 ? -1 : 1),
                boxShadow: "0 15px 30px rgba(var(--color-primary-rgb), 0.15)"
              }}
              className="glass-card p-6 flex flex-col justify-between min-h-[180px] relative select-none"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                borderTop: '3px solid var(--color-primary)'
              }}
            >
              {/* Sticker Heart corner */}
              <div className="absolute top-2 right-2 text-pink-300 opacity-20">
                <Heart size={24} className="fill-current" />
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                  <Sparkles size={16} className="text-yellow-500" />
                  <span>{thing.title}</span>
                </h4>
                
                <p className="handwritten text-gray-700 text-xl" style={{ fontSize: '1.45rem', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
                  {thing.desc}
                </p>
              </div>

              <div className="mt-4 text-[10px] tracking-wider uppercase text-pink-400 font-semibold">
                Perfect Detail #{idx + 1}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
