import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function Soundtrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSongIdx, setActiveSongIdx] = useState(0);
  const [floatingNotes, setFloatingNotes] = useState([]);
  
  const synthIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const songs = loveConfig.soundtrack.songs;
  const currentSong = songs[activeSongIdx];

  // Synthesize a romantic soft melody when playing using Web Audio API
  const playSynthesizedMelody = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Simple sweet chord progression notes (Frequencies)
      // C major, F major, G major, A minor
      const melodyNotes = [
        // C4, E4, G4, C5
        [261.63, 329.63, 392.00, 523.25],
        // F4, A4, C5, F5
        [349.23, 440.00, 523.25, 698.46],
        // G4, B4, D5, G5
        [392.00, 493.88, 587.33, 783.99],
        // A4, C5, E5, A5
        [440.00, 523.25, 659.25, 880.00]
      ];

      let noteStep = 0;

      synthIntervalRef.current = setInterval(() => {
        // Play arpeggio
        const chord = melodyNotes[(activeSongIdx + Math.floor(noteStep / 4)) % melodyNotes.length];
        const freq = chord[noteStep % 4];

        // Synthesizer nodes
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Soft sine wave for gentle music box sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Attack decay envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.3);

        // Spawn a floating music note on screen
        const noteSymbols = ['♪', '♫', '♬', '♩'];
        const newNote = {
          id: Date.now() + Math.random(),
          symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
          left: Math.random() * 80 + 10, // percentage offset
          size: Math.random() * 14 + 16
        };
        setFloatingNotes((prev) => [...prev, newNote].slice(-15)); // keep last 15 notes

        noteStep++;
      }, 700); // tempo
    } catch (e) {
      console.warn("Audio Context failed to load", e);
    }
  };

  const stopSynthesizedMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playSynthesizedMelody();
    } else {
      stopSynthesizedMelody();
    }
    return () => stopSynthesizedMelody();
  }, [isPlaying, activeSongIdx]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setActiveSongIdx((prev) => (prev + 1) % songs.length);
      setIsPlaying(true);
    }, 150);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setActiveSongIdx((prev) => (prev - 1 + songs.length) % songs.length);
      setIsPlaying(true);
    }, 150);
  };

  // Clean floating notes
  useEffect(() => {
    if (floatingNotes.length > 0) {
      const timer = setTimeout(() => {
        setFloatingNotes((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [floatingNotes]);

  return (
    <section id="soundtrack" className="section-container">
      <h2 className="section-title">Our Soundtrack</h2>
      <p className="section-subtitle">Songs that hold pieces of our hearts</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
        
        {/* Left Side: Custom Cassette Tape */}
        <div className="flex flex-col items-center">
          <div className="relative p-6">
            
            {/* Floating Notes Container */}
            <div className="absolute inset-x-0 -top-20 h-28 overflow-hidden pointer-events-none z-20">
              <AnimatePresence>
                {floatingNotes.map((note) => (
                  <motion.span
                    key={note.id}
                    initial={{ y: 80, x: 0, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      y: 0, 
                      x: Math.sin(note.id) * 30, 
                      opacity: [0, 0.7, 0], 
                      scale: 1 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    className="absolute text-pink-400 font-bold"
                    style={{ left: `${note.left}%`, fontSize: `${note.size}px` }}
                  >
                    {note.symbol}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {/* Cassette */}
            <div className="cassette">
              {/* Cassette label */}
              <div className="cassette-label flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                  <span>SIDE A</span>
                  <span>MIX TAPE VOL. 1</span>
                </div>
                
                <div className="text-center font-bold text-sm tracking-wide text-gray-800 italic" style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem' }}>
                  {currentSong.title} - {currentSong.artist}
                </div>

                <div className="text-center text-[10px] text-gray-500 font-semibold tracking-widest">
                  TO MY FOREVER PERSON ❤️
                </div>
              </div>

              {/* Reels */}
              <div className="cassette-reels">
                <div className={`cassette-reel ${isPlaying ? 'spinning' : ''}`}></div>
                <div className={`cassette-reel ${isPlaying ? 'spinning' : ''}`}></div>
              </div>
            </div>

            {/* Audio Synthesis active indicator */}
            {isPlaying && (
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-1.5 justify-center mt-6 text-pink-400 font-bold text-xs uppercase tracking-widest"
              >
                <Volume2 size={16} />
                <span>Synthesizing Melody...</span>
              </motion.div>
            )}
          </div>

          {/* Tape Controls */}
          <div className="flex gap-4 items-center mt-6">
            <button 
              onClick={handlePrev}
              className="p-3 bg-white bg-opacity-40 hover:bg-opacity-80 rounded-full border border-gray-200 shadow transition"
              style={{ color: 'var(--color-text)' }}
            >
              <SkipBack size={18} />
            </button>
            
            <button 
              onClick={handlePlayToggle}
              className="p-4 bg-red-400 text-white rounded-full shadow-lg transition hover:scale-105"
              style={{ background: 'var(--color-primary)' }}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>

            <button 
              onClick={handleNext}
              className="p-3 bg-white bg-opacity-40 hover:bg-opacity-80 rounded-full border border-gray-200 shadow transition"
              style={{ color: 'var(--color-text)' }}
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Song Note card */}
          <div className="mt-8 text-center max-w-sm glass-card bg-opacity-35 p-4 border-opacity-15">
            <h4 className="font-bold flex items-center justify-center gap-1.5 text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-primary)' }}>
              <Music size={14} />
              <span>Why This Song?</span>
            </h4>
            <p className="handwritten text-gray-700 italic" style={{ fontSize: '1.45rem', color: 'var(--color-text-muted)' }}>
              "{currentSong.note}"
            </p>
          </div>
        </div>

        {/* Right Side: Spotify Embed Widget */}
        <div className="glass-card p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
            <span>🎵 Live Spotify Integration</span>
          </h3>
          <p className="text-sm text-gray-500 mb-6 text-center" style={{ color: 'var(--color-text-muted)' }}>
            Play our official playlist directly in the browser:
          </p>
          <iframe
            src={loveConfig.soundtrack.spotifyPlaylistUrl}
            width="100%"
            height="260"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl shadow border border-gray-200 border-opacity-30"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
