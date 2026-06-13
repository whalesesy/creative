import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Heart, Zap } from 'lucide-react';
import { loveConfig } from '../loveConfig';

function TimeUnit({ value, label }) {
  return (
    <div className="clock-unit">
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="clock-number"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="clock-label">{label}</span>
    </div>
  );
}

function ClockCard({ icon: Icon, title, subtitle, time, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, rotateX: 4, rotateY: 2 }}
      className="clock-card glass-card"
      style={{ '--card-color': color }}
    >
      {/* Glow orb */}
      <div className="clock-card-orb" style={{ background: color }} />

      {/* Header */}
      <div className="clock-card-header">
        <div className="clock-card-icon" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <h3 className="clock-card-title">{title}</h3>
          <p className="clock-card-subtitle">{subtitle}</p>
        </div>
      </div>

      {/* Time Display */}
      <div className="clock-display">
        <div className="clock-units-row">
          <TimeUnit value={time.days} label="days" />
          <span className="clock-sep">:</span>
          <TimeUnit value={time.hours} label="hrs" />
          <span className="clock-sep">:</span>
          <TimeUnit value={time.minutes} label="min" />
          <span className="clock-sep">:</span>
          <TimeUnit value={time.seconds} label="sec" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="clock-bar-track">
        <motion.div
          className="clock-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          animate={{ width: `${(time.seconds / 60) * 100}%` }}
          transition={{ duration: 0.9, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

export default function RelationshipClock() {
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeSinceLove, setTimeSinceLove] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const start = new Date(loveConfig.anniversaryDate);
      const loveStart = new Date(loveConfig.firstILoveYouDate);

      const diff = (a, b) => {
        const ms = a - b;
        return {
          days:    Math.floor(ms / 86400000),
          hours:   Math.floor((ms / 3600000) % 24),
          minutes: Math.floor((ms / 60000) % 60),
          seconds: Math.floor((ms / 1000) % 60),
        };
      };

      setTimeTogether(diff(now, start));
      setTimeSinceLove(diff(now, loveStart));

      let nextAnn = new Date(now.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes());
      if (now > nextAnn) nextAnn.setFullYear(nextAnn.getFullYear() + 1);
      setCountdown(diff(nextAnn, now));
    };

    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const cards = [
    {
      icon: Calendar,
      title: 'Creating Memories For',
      subtitle: 'Since we officially became ours ❤️',
      time: timeTogether,
      color: '#ff4f6d',
      delay: 0,
    },
    {
      icon: Heart,
      title: "Since 'I Love You'",
      subtitle: 'When love was spoken aloud 💬',
      time: timeSinceLove,
      color: '#c084fc',
      delay: 0.12,
    },
    {
      icon: Clock,
      title: 'Next Anniversary In',
      subtitle: 'Counting down our special day ✨',
      time: countdown,
      color: '#f59e0b',
      delay: 0.24,
    },
  ];

  return (
    <section id="clock" className="section-container">
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="section-eyebrow"
        >
          <Zap size={14} /> Chapter 1
        </motion.div>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-title"
        >
          Our Relationship Clock
        </motion.h2>
        <p className="section-subtitle">{loveConfig.relationshipClock.title}</p>
      </div>

      <div className="clock-cards-grid">
        {cards.map((card, i) => (
          <ClockCard key={i} {...card} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="clock-footer-text"
      >
        {loveConfig.relationshipClock.subtext}
      </motion.p>
    </section>
  );
}
