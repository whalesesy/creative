import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Home, Heart } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function FutureTogether() {
  const [selectedPinIdx, setSelectedPinIdx] = useState(0);
  const travelSpots = loveConfig.future.destinations;
  const moodBoard = loveConfig.future.homeMoodboard;

  // Custom positioning coordinates for map pins to make it look like a vintage constellation map
  const coordinates = [
    { top: '35%', left: '22%' }, // Japan
    { top: '48%', left: '55%' }, // Italy
    { top: '42%', left: '48%' }, // Alps
    { top: '53%', left: '58%' }  // Greece
  ];

  return (
    <section id="future" className="section-container">
      <h2 className="section-title">Future Adventures</h2>
      <p className="section-subtitle">Our hopes, dreams, and places we'll explore</p>

      {/* Part 1: Vintage Travel Constellation Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
        
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
            <Compass className="text-red-400" size={24} />
            <span>Dream Destinations</span>
          </h3>
          <p className="text-sm text-gray-500 mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Click on a star coordinate in our map of the world to reveal where our passports will take us:
          </p>

          {/* Interactive Map Area */}
          <div className="constellation-map">
            {/* Draw glowing constellation lines between pins */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ stroke: 'var(--color-primary)', strokeWidth: '1.5', strokeDasharray: '4,4' }}>
              <line x1="22%" y1="35%" x2="48%" y2="42%" />
              <line x1="48%" y1="42%" x2="55%" y2="48%" />
              <line x1="55%" y1="48%" x2="58%" y2="53%" />
            </svg>

            {travelSpots.map((spot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPinIdx(idx)}
                className="map-pin"
                style={{ 
                  top: coordinates[idx].top, 
                  left: coordinates[idx].left,
                  backgroundColor: selectedPinIdx === idx ? 'var(--accent-gold)' : 'var(--color-primary)',
                  boxShadow: selectedPinIdx === idx ? '0 0 15px var(--accent-gold)' : '0 0 8px var(--color-primary)'
                }}
                title={spot.name}
              />
            ))}
            
            {/* Compass rose decoration in bottom right */}
            <div className="absolute bottom-4 right-4 text-white opacity-10">
              <Compass size={90} className="animate-spin" style={{ animationDuration: '60s' }} />
            </div>
          </div>
        </div>

        {/* Selected Destination Card */}
        <div className="glass-card p-8 min-h-[260px] flex flex-col justify-between border-opacity-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPinIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <span className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-2">Adventure Coordinate #{selectedPinIdx + 1}</span>
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                {travelSpots[selectedPinIdx].name}
              </h3>
              <p className="handwritten text-gray-700 text-2xl" style={{ fontSize: '1.65rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                "{travelSpots[selectedPinIdx].description}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Part 2: Pinterest-style Home Mood Board */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
          <Home className="text-red-400" size={24} />
          <span>Our Future Home Moodboard</span>
        </h3>
        <p className="text-sm text-gray-500 mb-12 text-center" style={{ color: 'var(--color-text-muted)' }}>
          A glance at the little details we'll build in our shared sanctuary:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {moodBoard.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, boxShadow: 'var(--shadow)' }}
              className="glass-card p-6 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
              style={{ borderTop: '4px solid var(--color-secondary)' }}
            >
              <div className="absolute top-2 right-2 text-pink-400 opacity-10">
                <Heart size={40} className="fill-current" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-pink-400" style={{ fontFamily: 'var(--font-sans)' }}>
                Future Goal ✨
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
