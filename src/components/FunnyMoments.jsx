import React from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function FunnyMoments() {
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
    <section id="funny" className="section-container">
      <h2 className="section-title">Giggles & Inside Jokes</h2>
      <p className="section-subtitle">{loveConfig.funnyMoments.subtitle}</p>

      <div className="flex justify-center mb-8 text-yellow-500">
        <Smile size={32} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4"
      >
        {loveConfig.funnyMoments.items.map((item, idx) => {
          const rotation = idx % 2 === 0 ? -1.5 : 1.5;

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                rotate: rotation + (rotation > 0 ? -0.5 : 0.5)
              }}
              className="glass-card p-6 relative select-none"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                borderBottom: '4px solid var(--color-secondary)'
              }}
            >
              {/* Scrapbook Tape */}
              <div className="scrapbook-tape" style={{ width: '80px', backgroundColor: 'rgba(213, 184, 255, 0.5)' }}></div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">😂</span>
                <h4 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h4>
              </div>

              <p className="handwritten text-gray-700 text-xl" style={{ fontSize: '1.45rem', color: 'var(--color-text-muted)' }}>
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
