import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScreenTransition({ isActive, type, onMidpoint }) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => { onMidpoint(); }, 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, onMidpoint]);

  if (!isActive) return null;

  const renderTransitionContent = () => {
    switch (type) {

      // ─── WINNIE THE POOH – Honey waterfall pours down in 3D ───────────────
      case 'pooh':
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg,#fde68a 0%,#f59e0b 40%,#d97706 100%)',
              perspective: '900px',
            }}
          >
            {/* 3D Honey River */}
            <motion.div
              initial={{ rotateX: 60, y: '-100%', scaleX: 1.4 }}
              animate={{ rotateX: [60, 20, 0], y: ['-100%', '0%', '0%'] }}
              transition={{ duration: 1.6, times: [0, 0.5, 1], ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg,#fbbf24 0%,#f59e0b 60%,#b45309 100%)',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                borderRadius: '0 0 60% 60%',
                boxShadow: '0 40px 80px rgba(180,83,9,0.6)',
              }}
            />

            {/* 3D Rotating Honey Pot */}
            <motion.div
              initial={{ rotateY: -80, scale: 0.3, opacity: 0 }}
              animate={{ rotateY: [-80, 0, 20, 0], scale: [0.3, 1.2, 1], opacity: 1 }}
              transition={{ duration: 1.4, ease: 'backOut' }}
              style={{
                position: 'absolute', top: '20%', left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '8rem',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                transformStyle: 'preserve-3d',
              }}
            >
              🍯
            </motion.div>

            {/* Flying Bees in 3D arcs */}
            {[0,1,2,3].map(i => (
              <motion.div
                key={i}
                initial={{ x: '-20%', y: `${30+i*15}%`, z: -200, rotateZ: 0, scale: 0.5 }}
                animate={{ x: '130%', y: `${20+i*20}%`, rotateZ: [0,-15,15,-10,0], scale: [0.5,1.3,1] }}
                transition={{ duration: 1.3 + i*0.15, delay: i*0.12, ease: 'easeInOut' }}
                style={{ position: 'absolute', fontSize: '3rem',
                  filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.3))' }}
              >
                🐝
              </motion.div>
            ))}

            {/* Honey drips 3D */}
            {[15,30,50,70,85].map((x,i) => (
              <motion.div
                key={i}
                initial={{ y: '-10%', scaleY: 0, opacity: 0 }}
                animate={{ y: '110%', scaleY: [0, 1, 1], opacity: [0, 1, 0.6] }}
                transition={{ duration: 1.4, delay: i*0.1, ease: 'easeIn' }}
                style={{
                  position: 'absolute', left: `${x}%`, top: 0,
                  width: `${12 + i*4}px`, background: 'rgba(217,119,6,0.7)',
                  borderRadius: '0 0 50% 50%',
                  filter: 'blur(1px)',
                }}
              />
            ))}

            <motion.h2
              initial={{ y: 60, opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                position: 'absolute', bottom: '12%', width: '100%',
                textAlign: 'center', fontSize: '2.8rem',
                fontFamily: 'Dancing Script, cursive', color: '#78350f',
                textShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              "Oh, Bother…" 🍯
            </motion.h2>
          </div>
        );

      // ─── LILO & STITCH – 3D UFO orbital flyby + ocean depth ──────────────
      case 'stitch':
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg,#0c4a6e 0%,#0369a1 40%,#06b6d4 80%,#67e8f9 100%)',
              perspective: '1000px',
            }}
          >
            {/* Ocean wave 3D tilt-in */}
            <motion.div
              initial={{ rotateX: 70, y: '80%', opacity: 0.7 }}
              animate={{ rotateX: [70,10,0], y: ['80%','0%','0%'], opacity: 1 }}
              transition={{ duration: 1.6, times: [0,0.5,1], ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(160deg,#0ea5e9 0%,#22d3ee 50%,#6ee7b7 100%)',
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d',
                borderRadius: '50% 50% 0 0 / 30px 30px 0 0',
                boxShadow: '0 -20px 60px rgba(6,182,212,0.5)',
              }}
            />

            {/* 3D Orbiting UFO (Stitch's ship) */}
            <motion.div
              initial={{ x: '-30%', y: '70%', rotateY: -90, scale: 0.4 }}
              animate={{
                x: ['-30%','110%'],
                y: ['70%','15%','40%'],
                rotateY: [-90, 0, 90],
                scale: [0.4, 1.6, 0.6],
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute', fontSize: '6rem',
                filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.9))',
                transformStyle: 'preserve-3d',
              }}
            >
              🛸
            </motion.div>

            {/* 3D Stitch emoji swooping */}
            <motion.div
              initial={{ x: '120%', y: '60%', rotateY: 180, scale: 0.3 }}
              animate={{ x: [' 120%','50%','-20%'], y: ['60%','30%','60%'], rotateY:[180,90,0], scale:[0.3,2,0.5] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute', fontSize: '5rem',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
              }}
            >
              👾
            </motion.div>

            {/* Hibiscus flowers orbiting in 3D */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: `${i*12+5}%`, y: '-15%', rotateZ: 0, rotateX: -60, scale: 0.5, opacity: 0 }}
                animate={{ y: '110%', rotateZ: 360, rotateX: 0, scale: [0.5,1.4,0.8], opacity: [0,1,1,0] }}
                transition={{ duration: 1.5, delay: i*0.1, ease: 'easeOut' }}
                style={{ position: 'absolute', fontSize: `${2 + (i%3)}rem`,
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
              >
                🌺
              </motion.div>
            ))}

            <motion.h2
              initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'backOut' }}
              style={{
                position: 'absolute', bottom: '10%', width: '100%',
                textAlign: 'center', fontSize: '2.8rem',
                fontFamily: 'Dancing Script, cursive', color: '#f0f9ff',
                textShadow: '0 0 30px rgba(6,182,212,0.8), 0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              "Ohana Means Family" 🌴
            </motion.h2>
          </div>
        );

      // ─── ICE AGE – 3D Glacier shattering + Scrat acorn ───────────────────
      case 'iceage':
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg,#e0f2fe 0%,#bae6fd 40%,#7dd3fc 80%,#38bdf8 100%)',
              perspective: '1200px',
            }}
          >
            {/* 3D Glacier slab crashing in */}
            <motion.div
              initial={{ rotateX: -90, y: '-50%', opacity: 0 }}
              animate={{ rotateX: [-90,-20,0,5,0], y: ['-50%','0%','0%'], opacity: [0,1,1] }}
              transition={{ duration: 1.6, times: [0,0.5,0.7,0.85,1], ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(186,230,253,0.95) 0%, rgba(125,211,252,0.9) 50%, rgba(56,189,248,0.85) 100%)',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 30px 80px rgba(56,189,248,0.6), inset 0 0 100px rgba(255,255,255,0.4)',
              }}
            />

            {/* Ice crack SVG */}
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
              {[[50,50,10,5],[50,50,80,15],[50,50,30,85],[50,50,90,75],[50,50,5,60],[50,50,70,95]].map(([x1,y1,x2,y2],i) => (
                <motion.line
                  key={i}
                  x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                  stroke="rgba(186,230,253,0.9)" strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0,1,1,0] }}
                  transition={{ duration: 1.2, delay: 0.3+i*0.06, times:[0,0.3,0.7,1] }}
                />
              ))}
            </svg>

            {/* 3D Rolling Acorn */}
            <motion.div
              initial={{ x: '-15%', y: '50%', rotateZ: 0, scale: 0.5 }}
              animate={{ x: '120%', rotateZ: 1080, scale: [0.5, 2, 0.5], y: ['50%','40%','55%'] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute', fontSize: '5rem',
                filter: 'drop-shadow(8px 12px 20px rgba(0,0,0,0.4))',
              }}
            >
              🌰
            </motion.div>

            {/* Snowflakes floating in 3D */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: `${i*9}%`, y: '-5%', rotateZ: 0, rotateX: -45, scale: 0.3, opacity: 0 }}
                animate={{ y: '110%', rotateZ: 360, rotateX: 45, scale: [0.3,1.2,0.6], opacity: [0,1,1,0] }}
                transition={{ duration: 1.6, delay: i*0.08, ease: 'linear' }}
                style={{ position: 'absolute', fontSize: `${1.5+Math.random()*1}rem`,
                  filter: 'drop-shadow(0 4px 8px rgba(56,189,248,0.6))' }}
              >
                ❄️
              </motion.div>
            ))}

            <motion.h2
              initial={{ scale: 0.1, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'backOut' }}
              style={{
                position: 'absolute', bottom: '10%', width: '100%',
                textAlign: 'center', fontSize: '2.8rem',
                fontFamily: 'Dancing Script, cursive', color: '#0c4a6e',
                textShadow: '0 0 20px rgba(255,255,255,0.9), 0 4px 15px rgba(0,0,0,0.2)',
              }}
            >
              "The Acorn Awaits" ❄️
            </motion.h2>
          </div>
        );

      // ─── MIGRATION – 3D V-Formation flyby through clouds ─────────────────
      case 'migration':
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg,#1e3a5f 0%,#2563eb 25%,#60a5fa 55%,#bae6fd 80%,#e0f7ea 100%)',
              perspective: '1000px',
            }}
          >
            {/* 3D Cloud layers rushing past */}
            {[0,1,2].map(i => (
              <motion.div
                key={i}
                initial={{ x: `${120 + i*40}%`, y: `${15+i*20}%`, rotateY: -30, scale: 0.6+i*0.2, opacity: 0.8 }}
                animate={{ x: [` ${120+i*40}%`,`-40%`], rotateY: [-30,10], scale: [0.6+i*0.2, 1.3, 0.4] }}
                transition={{ duration: 1.3+i*0.2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', fontSize: `${4+i*2}rem`,
                  filter: `blur(${i}px) drop-shadow(0 10px 20px rgba(0,0,0,0.2))`,
                  transformStyle: 'preserve-3d',
                }}
              >
                ☁️
              </motion.div>
            ))}

            {/* 3D V-Formation of ducks */}
            {[...Array(7)].map((_, i) => {
              const side = i === 0 ? 0 : (i % 2 === 0 ? -1 : 1);
              const rank = Math.ceil(i / 2);
              return (
                <motion.div
                  key={i}
                  initial={{
                    x: '-25%',
                    y: `${40 + side * rank * 8}%`,
                    z: -rank * 80,
                    rotateY: -60,
                    scale: Math.max(0.4, 1 - rank*0.12),
                    opacity: 0,
                  }}
                  animate={{
                    x: '130%',
                    rotateY: [-60, 0, 20],
                    scale: [Math.max(0.4, 1-rank*0.12), 1.8-rank*0.15, 0.3],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 1.6, delay: rank*0.05, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    fontSize: `${3.5 - rank*0.3}rem`,
                    filter: 'drop-shadow(4px 8px 16px rgba(0,0,0,0.4))',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  🦆
                </motion.div>
              );
            })}

            {/* Falling feathers in 3D */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: `${10+i*15}%`, y: '-5%', rotateZ: 0, rotateX: -45, opacity: 0 }}
                animate={{ y: '110%', rotateZ: [0,180,360], rotateX: 45, opacity: [0,1,0.8,0] }}
                transition={{ duration: 1.8, delay: i*0.15, ease: 'easeOut' }}
                style={{ position: 'absolute', fontSize: '1.8rem',
                  filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.2))' }}
              >
                🪶
              </motion.div>
            ))}

            <motion.h2
              initial={{ y: 80, opacity: 0, rotateX: -60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'backOut' }}
              style={{
                position: 'absolute', bottom: '10%', width: '100%',
                textAlign: 'center', fontSize: '2.8rem',
                fontFamily: 'Dancing Script, cursive', color: '#fff',
                textShadow: '0 0 30px rgba(37,99,235,0.8), 0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              "Spread Your Wings" 🌾
            </motion.h2>
          </div>
        );

      // ─── KUNG FU PANDA – 3D yin-yang tornado + peach blossoms ────────────
      case 'panda':
        return (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg,#1c1917 0%,#44403c 40%,#78350f 80%,#b45309 100%)',
              perspective: '1000px',
            }}
          >
            {/* Giant 3D Spinning Yin-Yang */}
            <motion.div
              initial={{ rotateY: 0, rotateX: -80, scale: 0.1, opacity: 0 }}
              animate={{ rotateY: [0,360,720], rotateX: [-80,0,30,0], scale: [0.1,5,0.1], opacity: [0,0.4,0.4,0] }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                fontSize: '20rem', lineHeight: 1,
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 0 60px rgba(251,191,36,0.6))',
              }}
            >
              ☯️
            </motion.div>

            {/* 3D Panda flying in */}
            <motion.div
              initial={{ x: '-20%', y: '80%', rotateY: 90, scale: 0.2 }}
              animate={{ x: ['-20%','50%','120%'], y: ['80%','35%','10%'], rotateY:[90,0,-30], scale:[0.2,2,0.3] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute', fontSize: '6rem',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
              }}
            >
              🐼
            </motion.div>

            {/* Peach blossom petals in 3D orbital paths */}
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%', y: '50%',
                  rotateZ: (i/18)*360,
                  scale: 0.1, opacity: 0,
                }}
                animate={{
                  x: `${50 + Math.cos((i/18)*Math.PI*2)*60}%`,
                  y: `${50 + Math.sin((i/18)*Math.PI*2)*55}%`,
                  rotateZ: [(i/18)*360, (i/18)*360+540],
                  scale: [0.1, 1.5, 0.2],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.5, delay: i*0.04, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  fontSize: `${1.2 + (i%4)*0.4}rem`,
                  filter: 'drop-shadow(2px 4px 8px rgba(244,114,182,0.5))',
                }}
              >
                🌸
              </motion.div>
            ))}

            <motion.h2
              initial={{ scale: 0.2, opacity: 0, rotateZ: -15 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'backOut' }}
              style={{
                position: 'absolute', bottom: '10%', width: '100%',
                textAlign: 'center', fontSize: '2.6rem',
                fontFamily: 'Dancing Script, cursive', color: '#fde68a',
                textShadow: '0 0 30px rgba(251,191,36,0.8), 0 4px 20px rgba(0,0,0,0.7)',
              }}
            >
              "There is no secret ingredient…" 🎋
            </motion.h2>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 99999,
          pointerEvents: 'auto',
          perspective: '1000px',
        }}
      >
        {renderTransitionContent()}
      </motion.div>
    </AnimatePresence>
  );
}
