import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Mail } from 'lucide-react';
import { loveConfig } from '../loveConfig';

/* ── Horizontal book-open letter card ── */
function LetterCard({ letter, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="letter-card-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
      style={{ cursor: 'pointer' }}
    >
      {/* 3-D scene */}
      <div className="letter-scene">
        {/* Right half — letter interior (always visible behind) */}
        <div className="letter-inside">
          <Heart size={18} style={{ color: '#e07a7a', fill: '#e07a7a', marginBottom: 8 }} />
          <p className="letter-inside-date">{letter.date}</p>
          <p className="letter-inside-title">{letter.title}</p>
          <p className="letter-inside-excerpt">{letter.excerpt}</p>
          <span className="letter-inside-tap">tap to read →</span>
        </div>

        {/* Left half — cover (swings open to the left on hover) */}
        <motion.div
          className="letter-cover"
          animate={{ rotateY: hovered ? -160 : 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
        >
          {/* Front face of cover */}
          <div className="letter-cover-front">
            <div className="letter-wax-seal">❤️</div>
            <p className="letter-cover-label">A Letter For You</p>
            <Mail size={22} style={{ color: 'rgba(224,122,122,0.6)', marginTop: 8 }} />
          </div>

          {/* Back face of cover (visible after flipping) */}
          <div
            className="letter-cover-back"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          />
        </motion.div>
      </div>

      {/* Label below */}
      <p className="letter-card-label">{letter.title}</p>
    </div>
  );
}

/* ── Full-screen letter modal ── */
function LetterModal({ letter, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        /* Opens like a book — starts folded (scaleX 0) then spreads open */
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 22 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          maxHeight: '88vh', overflowY: 'auto',
          borderRadius: 20,
          background: 'linear-gradient(160deg, #fffdf9 0%, #fff4f7 100%)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.3), inset 0 0 60px rgba(224,180,160,0.08)',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          position: 'relative',
          border: '1px solid rgba(224,122,122,0.2)',
          transformOrigin: 'left center',
        }}
      >
        {/* Spine line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
          background: 'linear-gradient(to bottom, #e07a7a, #c084fc)',
          borderRadius: '20px 0 0 20px',
        }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(224,122,122,0.1)', border: '1px solid rgba(224,122,122,0.2)',
            borderRadius: '50%', width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#e07a7a',
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingLeft: 8 }}>
          <Heart size={28} style={{ color: '#e07a7a', fill: '#e07a7a', marginBottom: 8 }} />
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0909a', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
            {letter.date}
          </p>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, color: 'var(--color-text)', marginTop: 6 }}>
            {letter.title}
          </h3>
        </div>

        <hr style={{ border: 'none', borderTop: '1px dashed rgba(224,122,122,0.25)', marginBottom: '1.5rem' }} />

        {/* Content */}
        <div style={{
          fontFamily: 'var(--font-handwritten)',
          fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
          lineHeight: 1.75,
          color: '#4d3838',
          whiteSpace: 'pre-wrap',
          paddingLeft: 12,
          borderLeft: '3px solid rgba(224,122,122,0.18)',
        }}>
          {letter.content}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#e07a7a', fontSize: '1.2rem' }}>✦ ✦ ✦</div>
      </motion.div>
    </motion.div>
  );
}

export default function LoveLetters() {
  const [openId, setOpenId] = useState(null);
  const activeLetter = loveConfig.letters.find(l => l.id === openId);

  return (
    <section id="letters" className="section-container">
      <h2 className="section-title">Love Letters</h2>
      <p className="section-subtitle">Heartfelt letters from my soul to yours</p>

      <div className="letter-cards-row">
        {loveConfig.letters.map(letter => (
          <LetterCard key={letter.id} letter={letter} onOpen={() => setOpenId(letter.id)} />
        ))}
      </div>

      <AnimatePresence>
        {openId && activeLetter && (
          <LetterModal letter={activeLetter} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>

      <style>{`
        /* ── Letter card layout ── */
        .letter-cards-row {
          display: flex;
          flex-wrap: wrap;
          gap: 2.5rem;
          justify-content: center;
          margin-top: 3rem;
        }

        .letter-card-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          outline: none;
        }

        /* 3D scene gives depth for the cover flip */
        .letter-scene {
          position: relative;
          width: 280px;
          height: 200px;
          perspective: 900px;
          transform-style: preserve-3d;
        }

        /* Interior — right half of the "book", always shows */
        .letter-inside {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fffdf9, #fff0f4);
          border-radius: 0 16px 16px 0;
          border: 1px solid rgba(224,122,122,0.2);
          border-left: 3px solid rgba(224,122,122,0.25);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 1.4rem 1.2rem;
          box-shadow: 4px 8px 30px rgba(224,122,122,0.12);
        }
        .letter-inside-date {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #b0909a;
          margin-bottom: 4px;
        }
        .letter-inside-title {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .letter-inside-excerpt {
          font-family: var(--font-handwritten);
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .letter-inside-tap {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-primary);
          opacity: 0.7;
          letter-spacing: 0.04em;
        }

        /* Cover — swings open horizontally */
        .letter-cover {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          transform-style: preserve-3d;
          z-index: 2;
          box-shadow: 6px 0 20px rgba(0,0,0,0.12);
        }
        .letter-cover-front {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 16px;
          background: linear-gradient(145deg, #f4c5c5 0%, #e8a8c5 50%, #c9a8e0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4),
                      -4px 0 12px rgba(0,0,0,0.08) inset;
        }
        .letter-wax-seal {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #e05c5c, #8b1a1a);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2);
        }
        .letter-cover-label {
          font-family: var(--font-script);
          font-size: 1rem;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
          margin-top: 4px;
        }
        .letter-cover-back {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #fef3f3, #fde8f0);
          border-right: 1px solid rgba(224,122,122,0.15);
        }

        .letter-card-label {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          text-align: center;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .letter-scene { width: 240px; height: 175px; }
          .letter-inside { padding: 1rem; }
          .letter-inside-title { font-size: 0.88rem; }
        }
      `}</style>
    </section>
  );
}
