import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCcw } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function ThingsILove() {
  const [currentReasonIdx, setCurrentReasonIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleShowAnother = () => {
    setIsFlipped(false);
    // Wait briefly for flip-back animation to finish before changing text
    setTimeout(() => {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * loveConfig.reasons.length);
      } while (nextIdx === currentReasonIdx);
      
      setCurrentReasonIdx(nextIdx);
      setIsFlipped(true);
    }, 200);
  };

  const selectSpecificReason = (idx) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentReasonIdx(idx);
      setIsFlipped(true);
    }, 200);
  };

  return (
    <section id="reasons" className="section-container">
      <h2 className="section-title">100 Things I Love About You</h2>
      <p className="section-subtitle">A collection of reasons why you are my everything</p>

      {/* Main Interactive Heart Flip Card */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div 
          className="relative w-[320px] h-[320px] cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full position-absolute"
            style={{ 
              transformStyle: 'preserve-3d',
              position: 'absolute'
            }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Front Side: Large Red Heart Card */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none backface-hidden border border-red-200 shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #fff3f3, #ffe3e3)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-red-500 mb-6"
              >
                <Heart size={90} className="fill-current drop-shadow-md" />
              </motion.div>
              <h3 className="text-xl font-bold text-red-500 mb-2">Reason #{currentReasonIdx + 1}</h3>
              <p className="text-sm text-gray-500 italic">Click to open my heart</p>
            </div>

            {/* Back Side: The Love Reason */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center p-8 text-center select-none backface-hidden border border-pink-200 shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #fdf6f7, #fdf1f5)',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute top-4 right-4 text-red-300 opacity-30">
                <Sparkles size={24} />
              </div>
              <Heart size={32} className="text-red-400 fill-red-400 mb-4" />
              <p 
                className="handwritten text-gray-800 leading-normal mb-4 text-2xl"
                style={{ fontSize: '1.7rem', color: 'var(--color-text)' }}
              >
                {loveConfig.reasons[currentReasonIdx]}
              </p>
              <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">Reason {currentReasonIdx + 1} of {loveConfig.reasons.length}</span>
            </div>
          </motion.div>
        </div>

        {/* Show Me Another Reason Button */}
        <div className="mt-10">
          <button
            onClick={handleShowAnother}
            className="btn-romantic"
          >
            <RefreshCcw size={18} />
            <span>Show Me Another Reason</span>
          </button>
        </div>
      </div>

      {/* Mini Grid of Interactive Hearts */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h4 className="text-center font-bold text-lg mb-6" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-serif)' }}>
          Click a heart to unlock a specific reason:
        </h4>
        <div className="flex flex-wrap gap-2 justify-center max-h-[160px] overflow-y-auto p-4 glass-card bg-opacity-30 border-opacity-20">
          {loveConfig.reasons.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectSpecificReason(idx)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                currentReasonIdx === idx 
                  ? 'bg-red-400 border-red-500 text-white' 
                  : 'bg-white bg-opacity-50 border-pink-200 text-red-400 hover:bg-pink-50'
              }`}
              title={`Reason #${idx + 1}`}
            >
              <Heart size={14} className={currentReasonIdx === idx ? 'fill-current' : ''} />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .position-absolute {
          position: absolute;
        }
        .inset-0 {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rounded-2xl {
          border-radius: 1rem;
        }
        .flex-wrap {
          flex-wrap: wrap;
        }
        .max-h-\\[160px\\] {
          max-h: 10rem;
        }
      `}</style>
    </section>
  );
}
