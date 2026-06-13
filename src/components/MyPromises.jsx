import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function MyPromises() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 12 }
    }
  };

  return (
    <section id="promises" className="section-container">
      <h2 className="section-title">My Promises To You</h2>
      <p className="section-subtitle">Vows written in ink, kept in my heart forever</p>

      <div className="max-w-2xl mx-auto mt-12 glass-card p-8 md:p-12 relative overflow-hidden" style={{ borderLeft: '6px double var(--color-primary)' }}>
        
        {/* Decorative corner leaves/vines */}
        <div className="absolute -top-6 -right-6 text-pink-400 opacity-10">
          <Heart size={120} className="fill-current" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          {loveConfig.promises.map((promise, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="flex gap-4 items-start select-none"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  boxShadow: '0 3px 8px rgba(var(--color-primary-rgb), 0.2)'
                }}
              >
                <Check size={16} />
              </div>

              <div>
                <p 
                  className="handwritten text-gray-800 leading-normal text-2xl"
                  style={{ fontSize: '1.75rem', color: 'var(--color-text)' }}
                >
                  {promise}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll footer signature */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center text-sm font-semibold italic text-gray-400" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem' }}>
          <span>"Hand signed with love,"</span>
          <span className="text-xl font-bold text-red-400" style={{ fontFamily: 'var(--font-script)' }}>Forever Yours</span>
        </div>

      </div>
    </section>
  );
}
