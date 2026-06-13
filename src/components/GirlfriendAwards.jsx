import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
import { loveConfig } from '../loveConfig';
import Tilt3D from './Tilt3D';

export default function GirlfriendAwards() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section id="awards" className="section-container scene-3d">
      <div style={{ textAlign:'center', marginBottom:'0.5rem' }}>
        <h2 className="section-title-3d">Girlfriend Superlative Awards</h2>
      </div>
      <p className="section-subtitle">Official certifications of your magic</p>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {loveConfig.awards.map((award) => (
          <Tilt3D key={award.id} maxTilt={20} scale={1.08}>
            <motion.div
              variants={cardVariants}
              whileHover={{
                rotateY: 0,
                boxShadow: "0 30px 60px rgba(245, 197, 59, 0.3), 0 0 40px rgba(245, 197, 59, 0.15)",
                borderColor: "var(--accent-gold)"
              }}
              className="glass-card award-badge-3d relative flex flex-col items-center p-6 text-center select-none border-2 border-transparent"
              style={{ transformStyle:'preserve-3d', height: '100%' }}
            >
            {/* Ribbon Background Sparkle */}
            <div 
              className="absolute top-2 right-2"
              style={{ color: '#f5c53b', opacity: 0.2 }}
            >
              <Star size={40} className="fill-current" />
            </div>

            {/* Glowing Trophy Circle */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner relative"
              style={{ 
                background: 'linear-gradient(135deg, #f5c53b, #d4a418)',
                boxShadow: '0 4px 15px rgba(212, 164, 24, 0.4)'
              }}
            >
              <span className="text-4xl">{award.icon}</span>
              {/* Spinning outer ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
              {award.title}
            </h3>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {award.desc}
            </p>

            {/* Certification Footer stamp */}
            <div className="mt-6 pt-4 border-t border-gray-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
              <Award size={14} />
              <span>Certified Lover</span>
            </div>
            </motion.div>
          </Tilt3D>
        ))}
      </motion.div>

      <style>{`
        @media (min-width: 640px) {
          .sm:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .lg:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
