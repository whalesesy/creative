import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function LifeChange() {
  const data = loveConfig.lifeChange;

  return (
    <section id="transformation" className="section-container">
      <h2 className="section-title">Why You Changed My Life</h2>
      <p className="section-subtitle">How your presence brought color to my world</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        
        {/* Before You card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-8 border-opacity-20 flex flex-col justify-between"
          style={{ borderTop: '4px solid var(--color-secondary)' }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Before You Came Along</span>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
              A Quiet, Straight Path 🚶‍♂️
            </h3>
            <p className="handwritten text-gray-700 text-2xl leading-relaxed" style={{ fontSize: '1.6rem', color: 'var(--color-text-muted)' }}>
              "{data.before}"
            </p>
          </div>
          <div className="mt-8 text-xs text-gray-400 italic">
            Chapter 0: The Quiet Beginning
          </div>
        </motion.div>

        {/* After You card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-8 border-opacity-30 flex flex-col justify-between"
          style={{ 
            borderTop: '4px solid var(--color-primary)',
            background: 'radial-gradient(circle at top left, var(--bg-card) 60%, var(--bg-secondary) 100%)' 
          }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-2 block">With You By My Side</span>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
              A World Full of Color 🎨
            </h3>
            <p className="handwritten text-gray-800 text-2xl leading-relaxed" style={{ fontSize: '1.65rem', color: 'var(--color-text)' }}>
              "{data.after}"
            </p>
          </div>
          <div className="mt-8 text-xs text-pink-400 font-bold uppercase tracking-widest flex items-center gap-1">
            <Heart size={12} className="fill-current" />
            <span>Chapter 1: The Magic of Us</span>
          </div>
        </motion.div>

      </div>

      {/* Lessons Learned panel */}
      <div className="max-w-2xl mx-auto mt-12 glass-card p-6 border-opacity-20 select-none">
        <h4 className="font-bold flex items-center justify-center gap-1.5 text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--color-primary)' }}>
          <Sparkles size={16} />
          <span>Lessons You Taught Me</span>
        </h4>
        <div className="flex flex-col gap-3">
          {data.lessons.map((lesson, idx) => (
            <div key={idx} className="flex gap-2 items-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <span className="text-red-400 font-bold">✦</span>
              <span>{lesson}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
