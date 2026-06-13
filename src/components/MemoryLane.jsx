import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, X } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function MemoryLane() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="section-container scene-3d">
      <div style={{ textAlign:'center', marginBottom:'0.5rem' }}>
        <h2 className="section-title-3d">Memory Lane</h2>
      </div>
      <p className="section-subtitle">A physical scrapbook of our times together</p>

      {/* Camera shutter icon decoration */}
      <div className="flex justify-center mb-8 text-red-300">
        <motion.div animate={{ rotateY: [0,10,-10,0], scale:[1,1.15,1] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}>
          <Camera size={36} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mt-8" style={{ perspective:'1200px' }}>
        {loveConfig.polaroids.map((photo, idx) => (
          <div key={photo.id} className="flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -30, rotateZ: photo.angle }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateZ: photo.angle }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, type:'spring', stiffness:100 }}
              whileHover={{
                rotateX: 8,
                rotateY: photo.angle > 0 ? 8 : -8,
                rotateZ: photo.angle * 0.3,
                scale: 1.1,
                y: -18,
                boxShadow: '0 30px 60px rgba(0,0,0,0.22)',
                zIndex: 20,
              }}
              onClick={() => setSelectedPhoto(photo)}
              className="polaroid cursor-pointer select-none"
              style={{ transform: `rotate(${photo.angle}deg)`, transformStyle:'preserve-3d' }}
            >
              {/* Washi Tape */}
              <div className="scrapbook-tape"></div>
              <img src={photo.image} alt="Memory" className="pointer-events-none" />
              <div className="polaroid-caption">{photo.caption}</div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black bg-opacity-85 z-[9999] flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-8 max-w-2xl w-full rounded shadow-2xl relative"
              style={{ backgroundColor: 'var(--bg-primary)', border: '8px solid white' }}
            >
              {/* Close button */}
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 -right-4 md:-right-12 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
              >
                <X size={20} />
              </button>

              <img 
                src={selectedPhoto.image} 
                alt="Selected Memory" 
                className="w-full max-h-[70vh] object-contain border border-gray-200" 
              />
              
              <p 
                className="handwritten text-center mt-6 text-gray-800 text-3xl px-4"
                style={{ color: '#3e332d', fontSize: '2rem' }}
              >
                {selectedPhoto.caption}
              </p>
              
              <div className="flex justify-center mt-4 text-red-500">
                <Heart size={20} className="fill-current" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .fixed {
          position: fixed;
        }
        .bg-black {
          background-color: rgba(0, 0, 0, 1);
        }
        .bg-opacity-85 {
          --tw-bg-opacity: 0.85;
          background-color: rgba(0,0,0,var(--tw-bg-opacity));
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .max-w-2xl {
          max-w: 42rem;
        }
        @media (min-width: 640px) {
          .sm:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 768px) {
          .md:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .gap-12 {
          gap: 3rem;
        }
        .pointer-events-none {
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
