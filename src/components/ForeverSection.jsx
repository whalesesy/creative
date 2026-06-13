import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { loveConfig } from '../loveConfig';
import Tilt3D from './Tilt3D';

/* Floating heart particles */
const HEARTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 0.8 + Math.random() * 1.4,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 6,
  drift: (Math.random() - 0.5) * 60,
}));

export default function ForeverSection() {
  const [showHiddenMsg, setShowHiddenMsg] = useState(false);
  const [stars, setStars] = useState([]);
  const data = loveConfig.foreverSection;

  /* Generate star field once */
  useEffect(() => {
    setStars(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.7,
      dur: 2 + Math.random() * 4,
    })));
  }, []);

  return (
    <section
      id="forever"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem 8rem',
        overflow: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* ── 3D Deep-space star field ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {stars.map(s => (
          <motion.div
            key={s.id}
            animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              borderRadius: '50%',
              background: 'white',
              boxShadow: `0 0 ${s.size * 3}px rgba(255,255,255,0.8)`,
            }}
          />
        ))}
      </div>

      {/* ── Floating rising hearts ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {HEARTS.map(h => (
          <motion.div
            key={h.id}
            animate={{
              y: ['100vh', '-10vh'],
              x: [0, h.drift],
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.5, 1, 1, 0.3],
            }}
            transition={{
              duration: h.dur,
              repeat: Infinity,
              delay: h.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${h.x}%`,
              bottom: 0,
              fontSize: `${h.size}rem`,
              filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.5))',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* ── 3D Glow Orbs ── */}
      {[
        { x: '10%', y: '20%', c: 'rgba(224,122,122,0.25)', s: 300 },
        { x: '70%', y: '60%', c: 'rgba(144,124,163,0.2)',  s: 250 },
        { x: '40%', y: '5%',  c: 'rgba(245,197,59,0.15)',  s: 200 },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          style={{
            position: 'absolute',
            left: o.x, top: o.y,
            width: o.s, height: o.s,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${o.c}, transparent 70%)`,
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Main 3D card ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 700 }}>
        <Tilt3D maxTilt={10} scale={1.03}>
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '4rem',
              borderRadius: 28,
              background: 'radial-gradient(ellipse at top, rgba(40,20,40,0.95) 0%, rgba(10,8,19,0.98) 100%)',
              border: '1px solid rgba(224,122,122,0.3)',
              boxShadow: `
                0 0 80px rgba(224,122,122,0.18),
                0 40px 80px rgba(0,0,0,0.6),
                0 0 0 1px rgba(255,255,255,0.05) inset
              `,
              backdropFilter: 'blur(20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Pulsing heart button */}
            <motion.div
              animate={{
                scale: [1, 1.18, 1],
                boxShadow: [
                  '0 0 20px rgba(239,68,68,0.5)',
                  '0 0 60px rgba(239,68,68,0.9)',
                  '0 0 20px rgba(239,68,68,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              onClick={() => setShowHiddenMsg(true)}
              style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #ec4899)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 2.5rem',
                cursor: 'pointer',
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <Heart size={36} style={{ color: 'white', fill: 'white' }} />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#fce7f3',
                marginBottom: '1.5rem',
                lineHeight: 1.35,
                textShadow: '0 0 30px rgba(224,122,122,0.4)',
                transform: 'translateZ(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              "{data.mainQuote}"
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="handwritten"
              style={{
                fontSize: '1.6rem',
                color: '#f9a8d4',
                marginBottom: '2.5rem',
                transform: 'translateZ(10px)',
              }}
            >
              {data.subQuote}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowHiddenMsg(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 40px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'white',
                background: 'linear-gradient(135deg, #ef4444, #ec4899, #a855f7)',
                boxShadow: '0 8px 32px rgba(239,68,68,0.5), 0 2px 0 rgba(255,255,255,0.2) inset',
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              One More I Love You ❤️
            </motion.button>
          </motion.div>
        </Tilt3D>
      </div>

      {/* ── Full-screen Hidden Message ── */}
      <AnimatePresence>
        {showHiddenMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHiddenMsg(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
              perspective: '1000px',
            }}
          >
            <motion.div
              initial={{ scale: 0.6, rotateY: -45, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.6, rotateY: 45, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 16 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: 580, width: '100%',
                borderRadius: 28,
                padding: '4rem',
                textAlign: 'center',
                background: 'radial-gradient(ellipse at top, #1e0a0a 0%, #08050f 100%)',
                border: '1px solid rgba(239,68,68,0.4)',
                boxShadow: '0 0 80px rgba(239,68,68,0.3), 0 40px 80px rgba(0,0,0,0.8)',
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}
            >
              <button
                onClick={() => setShowHiddenMsg(false)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#6b7280', fontSize: '1.2rem',
                }}
              >
                <X size={24} />
              </button>

              <motion.div
                animate={{ scale: [1, 1.22, 1], filter: ['drop-shadow(0 0 20px rgba(239,68,68,0.7))','drop-shadow(0 0 50px rgba(239,68,68,1))','drop-shadow(0 0 20px rgba(239,68,68,0.7))'] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ marginBottom: '2rem' }}
              >
                <Heart size={80} style={{ color: '#ef4444', fill: '#ef4444', margin: '0 auto' }} />
              </motion.div>

              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 0 20px rgba(239,68,68,0.5)',
              }}>
                To My Eternity
              </h4>

              <p className="handwritten" style={{
                fontSize: '1.7rem',
                color: '#fef3c7',
                lineHeight: 1.5,
                marginBottom: '2rem',
              }}>
                "{data.hiddenMessage}"
              </p>

              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6b7280', fontWeight: 700 }}>
                Forever & Always yours.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        position: 'absolute', bottom: 24,
        fontSize: '0.65rem', textTransform: 'uppercase',
        letterSpacing: '0.2em', color: 'rgba(var(--color-primary-rgb),0.5)',
        fontWeight: 700, zIndex: 10,
      }}>
        Created with ❤️ for {loveConfig.girlfriendName}
      </div>
    </section>
  );
}
