import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Heart } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function OpenWhen() {
  const [activeCapsuleId, setActiveCapsuleId] = useState(null);
  
  const capsules = loveConfig.openWhen;
  const activeCapsule = capsules.find(c => c.id === activeCapsuleId);

  return (
    <section id="open-when" className="section-container">
      <h2 className="section-title">Open When...</h2>
      <p className="section-subtitle">Digital memory capsules for whenever you need them</p>

      {/* Grid of Capsules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {capsules.map((capsule, idx) => (
          <motion.div
            key={capsule.id}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveCapsuleId(capsule.id)}
            className="glass-card p-6 flex flex-col justify-between items-center text-center cursor-pointer select-none relative overflow-hidden"
            style={{ 
              borderLeft: '4px solid var(--color-primary)',
              background: 'radial-gradient(circle at top left, var(--bg-card) 70%, var(--bg-secondary) 100%)'
            }}
          >
            <div className="absolute top-2 right-2 text-pink-400 opacity-20">
              <Gift size={32} />
            </div>

            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-pink-100 text-red-400 bg-opacity-50">
              <Gift size={28} />
            </div>

            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
              {capsule.title}
            </h3>

            <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
              Click to Open Capsule 📩
            </p>
          </motion.div>
        ))}
      </div>

      {/* Capsule Content Modal */}
      <AnimatePresence>
        {activeCapsuleId && activeCapsule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCapsuleId(null)}
            className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#fdfaf5] p-8 md:p-10 rounded-xl shadow-2xl overflow-y-auto max-h-[80vh] border border-[#e5dec9]"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #fcf9f2 100%)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveCapsuleId(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-2 text-red-400">
                  <Gift size={22} />
                </div>
                <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                  {activeCapsule.title}
                </h3>
              </div>

              {/* Message */}
              <div 
                className="handwritten text-gray-800 leading-relaxed text-2xl mt-4 border-l-2 border-red-300 pl-4"
                style={{ fontSize: '1.7rem', color: 'var(--color-text-muted)' }}
              >
                {activeCapsule.message}
              </div>

              <div className="flex justify-center mt-8 text-red-400">
                <Heart size={20} className="fill-current animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .bg-pink-100 {
          background-color: rgba(fce7f3);
        }
      `}</style>
    </section>
  );
}
