import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../loveConfig';
import { useMouseTilt } from '../hooks/useMouseTilt';

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: ['🌸','🌺','✨','💫','🌹','💕'][i % 6],
  left: `${5 + (i * 5.5) % 90}%`,
  delay: i * 0.4,
  dur: 4 + (i % 5),
  size: 1 + (i % 3) * 0.4,
}));

export default function Hero({ onOpenHeart, theme }) {
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullSubtitle = loveConfig.heroSubtitle;
  const { ref: cardRef, handleMouseMove, handleMouseLeave } = useMouseTilt(12, 1.03);

  useEffect(() => {
    let index = 0;
    const iv = setInterval(() => {
      setTypedSubtitle(fullSubtitle.slice(0, index + 1));
      index++;
      if (index >= fullSubtitle.length) clearInterval(iv);
    }, 38);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(blink);
  }, []);

  const isDark = theme === 'moonlight';

  return (
    <div className="hero-root" style={{ perspective: '1200px' }}>
      {/* Animated gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Falling petals */}
      {PETALS.map(p => (
        <motion.div
          key={p.id}
          className="hero-petal"
          style={{ left: p.left, fontSize: `${p.size}rem` }}
          animate={{ y: ['0vh', '105vh'], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Main card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', zIndex: 10, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 70, rotateX: -30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-card"
          style={{
            background: isDark
              ? 'linear-gradient(145deg, rgba(18,14,36,0.92) 0%, rgba(8,6,20,0.96) 100%)'
              : 'linear-gradient(145deg, rgba(255,252,250,0.95) 0%, rgba(255,238,248,0.92) 100%)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Holographic border shimmer */}
          <div className="hero-card-shimmer" />

          {/* Floating heart */}
          <motion.div
            animate={{ y: [0, -18, 0], scale: [1, 1.18, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginBottom: '1.2rem', transform: 'translateZ(50px)', transformStyle: 'preserve-3d', display:'flex', justifyContent:'center' }}
          >
            <div className="hero-heart-ring">
              <Heart size={52} style={{ color: '#ff4f6d', fill: '#ff4f6d', filter: 'drop-shadow(0 0 16px rgba(255,79,109,0.8))' }} />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="hero-badge"
          >
            <Sparkles size={12} />
            A Digital Scrapbook
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="hero-title"
            style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
          >
            {loveConfig.heroTitle}
          </motion.h1>

          {/* Divider */}
          <div className="hero-divider">
            <span>💗</span>
          </div>

          {/* Typewriter */}
          <p className="hero-subtitle">
            {typedSubtitle}
            <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--color-primary)', marginLeft: 2 }}>|</span>
          </p>

          {/* Anniversary date chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="hero-date-chip"
          >
            📅 Since December 17, 2025
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 140 }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenHeart}
            className="hero-btn"
            style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
          >
            <Heart size={20} style={{ fill: 'white' }} />
            Open My Heart
            <Heart size={20} style={{ fill: 'white' }} />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.2 }}
        className="hero-scroll-hint"
      >
        ↓ scroll to explore
      </motion.p>
    </div>
  );
}
