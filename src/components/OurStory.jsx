import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { loveConfig } from '../loveConfig';
import Tilt3D from './Tilt3D';

const TYPE_ICONS = {
  'first-meet': '🤝',
  'first-chat': '💬',
  'first-date': '☕',
  'first-love': '💖',
  'adventure':  '✈️',
  'forever':    '🏡',
};
const TYPE_COLORS = {
  'first-meet': '#e07a7a',
  'first-chat': '#907ca3',
  'first-date': '#d4a418',
  'first-love': '#ec4899',
  'adventure':  '#3b82f6',
  'forever':    '#10b981',
};

export default function OurStory() {
  const tilts = [-2, 1.5, -1, 2, -1.5, 0.8];

  return (
    <section
      id="our-story"
      className="section-container"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 30%' }}
    >
      {/* 3D Section Title */}
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <motion.h2
          initial={{ y: -30, opacity: 0, rotateX: -40 }}
          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'backOut' }}
          className="section-title-3d"
          style={{ display: 'inline-block' }}
        >
          Our Story
        </motion.h2>
      </div>
      <p className="section-subtitle">A timeline of how we became us</p>

      <div className="relative mt-12" style={{ minHeight: 500 }}>
        {/* 3D Glowing central line */}
        <div className="timeline-line" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {loveConfig.timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const tilt   = tilts[index % tilts.length];
            const icon   = TYPE_ICONS[item.type]  || '✨';
            const color  = TYPE_COLORS[item.type] || 'var(--color-primary)';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -80 : 80, rotateY: isLeft ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 70, delay: index * 0.08 }}
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              >
                {/* 3D Glowing Node */}
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 10px ${color}44`,
                      `0 0 28px ${color}99`,
                      `0 0 10px ${color}44`,
                    ],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                  className="timeline-node"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, white, ${color})`,
                    border: `3px solid ${color}`,
                  }}
                >
                  {icon}
                </motion.div>

                {/* 3D Tilted Scrapbook Card */}
                <div className="timeline-card-wrap">
                  <Tilt3D maxTilt={14} scale={1.05} className="glass-card" style={{
                    borderRadius: 18,
                    borderBottom: `4px solid ${color}`,
                    padding: '2rem',
                    transform: `rotate(${tilt}deg)`,
                    background: `linear-gradient(145deg, var(--bg-card), rgba(255,255,255,0.05))`,
                    boxShadow: `0 20px 50px ${color}22, 0 1px 0 rgba(255,255,255,0.4) inset`,
                  }}>
                    {/* Washi tape */}
                    <div className="scrapbook-tape" />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color }}>
                      <Calendar size={15} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.date}</span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      marginBottom: '0.8rem',
                      textShadow: `1px 2px 0 ${color}22`,
                      transform: 'translateZ(12px)',
                    }}>
                      {item.title}
                    </h3>

                    <p className="handwritten" style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem' }}>
                      {item.note}
                    </p>
                  </Tilt3D>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
