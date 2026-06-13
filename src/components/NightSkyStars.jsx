import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Info } from 'lucide-react';

export default function NightSkyStars() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [activeStarIdx, setActiveStarIdx] = useState(null);

  // Special star love messages (distinct from the 100 reasons)
  const starMessages = [
    "I still smile when I think about our very first talk. 🌸",
    "You are my favorite thought in the middle of a busy day. 💭",
    "Of all the souls in this universe, I am so glad I found you. 🌌",
    "You make my life feel like a beautiful, sweet fairytale. ✨",
    "Every day spent with you is my new favorite day of my life. 📅",
    "I love you more than words, websites, letters, or time could explain. ❤️",
    "Thank you for being my home, my comfort, and my absolute peace. 🏡",
    "I choose you. In every lifetime, in every single universe. 💍",
    "Your smile is the warm light that guides me through dark days. ☀️",
    "I promise to always hold your hand, through sunsets and storms. 🤝",
    "You make even the simplest coffee mornings feel like magic. ☕",
    "I am so incredibly proud of the person you are and who you are becoming. 🏆"
  ];

  // Specific absolute positions for stars (top/left percentages) to make a beautiful constellation
  const starPositions = [
    { top: '25%', left: '15%', size: 10 },
    { top: '35%', left: '42%', size: 14 },
    { top: '15%', left: '65%', size: 12 },
    { top: '50%', left: '28%', size: 16 },
    { top: '68%', left: '78%', size: 12 },
    { top: '40%', left: '88%', size: 10 },
    { top: '75%', left: '18%', size: 14 },
    { top: '82%', left: '52%', size: 16 },
    { top: '20%', left: '33%', size: 12 },
    { top: '60%', left: '60%', size: 14 },
    { top: '12%', left: '85%', size: 10 },
    { top: '48%', left: '72%', size: 12 }
  ];

  const handleStarClick = (idx) => {
    setActiveStarIdx(idx);
    setActiveMessage(starMessages[idx]);
  };

  return (
    <section id="stars" className="section-container">
      <h2 className="section-title">Night Sky Messages</h2>
      <p className="section-subtitle">Twinkle, twinkle, little star... click to reveal what you are</p>

      {/* Constellation Canvas area */}
      <div className="constellation-map h-[450px] relative mt-10 flex flex-col justify-between p-6">
        
        {/* Draw subtle grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

        {/* Floating instruction */}
        <div className="absolute top-4 left-4 text-xs font-semibold text-gray-400 tracking-widest flex items-center gap-1">
          <Info size={14} />
          <span>CLICK A TWINKLING STAR IN THE SKY</span>
        </div>

        {/* Stars */}
        {starPositions.map((pos, idx) => {
          const isActive = activeStarIdx === idx;

          return (
            <motion.button
              key={idx}
              onClick={() => handleStarClick(idx)}
              className="absolute bg-white rounded-full flex items-center justify-center cursor-pointer border-none p-0"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.size + (isActive ? 4 : 0),
                height: pos.size + (isActive ? 4 : 0),
                backgroundColor: isActive ? 'var(--accent-gold)' : '#ffffff',
                boxShadow: isActive 
                  ? '0 0 25px #f5c53b, 0 0 10px #ffffff'
                  : `0 0 ${pos.size * 0.8}px #ffffff`
              }}
              animate={{
                scale: isActive ? [1, 1.2, 1] : [1, 1.3, 1],
                opacity: isActive ? 1 : [0.4, 0.9, 0.4]
              }}
              transition={{
                duration: isActive ? 0.8 : 2 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star size={pos.size * 0.6} className={isActive ? 'text-yellow-500 fill-current' : 'text-white fill-current opacity-80'} />
            </motion.button>
          );
        })}

        {/* Active message details box inside the sky */}
        <div className="z-10 mt-auto mx-auto w-full max-w-md">
          <AnimatePresence mode="wait">
            {activeMessage ? (
              <motion.div
                key={activeStarIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-card p-6 bg-black bg-opacity-70 border-yellow-500 border-opacity-30 text-center text-white"
              >
                <div className="flex justify-center text-yellow-500 mb-2">
                  <Sparkles size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <p 
                  className="handwritten text-2xl leading-normal text-yellow-50"
                  style={{ fontSize: '1.65rem' }}
                >
                  "{activeMessage}"
                </p>
              </motion.div>
            ) : (
              <div className="glass-card p-4 text-center text-gray-300 italic text-sm bg-black bg-opacity-40 border-white border-opacity-10">
                No star selected yet. Click a star above to read its secret message.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <style>{`
        .bg-grid {
          background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  );
}
