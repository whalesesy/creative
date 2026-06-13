import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Play, Square, Info } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function VoiceNotes() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const speechUtteranceRef = useRef(null);
  const audioRef = useRef(null);

  const notes = loveConfig.voiceNotes;

  const playVoiceNote = (note) => {
    // Stop any current voice note
    stopVoiceNote();

    setActiveNoteId(note.id);
    setIsPlaying(true);

    // If an MP3 audio file path exists (customized by the user later), play it
    if (note.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(note.audioUrl);
      } else {
        audioRef.current.src = note.audioUrl;
      }
      
      audioRef.current.play()
        .then(() => {
          audioRef.current.onended = () => {
            setIsPlaying(false);
            setActiveNoteId(null);
          };
        })
        .catch((err) => {
          console.warn("Audio file failed, falling back to Web Speech Synthesis", err);
          runSpeechSynthesis(note.messageText);
        });
    } else {
      // Fallback: Web Speech API text-to-speech
      runSpeechSynthesis(note.messageText);
    }
  };

  const runSpeechSynthesis = (text) => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis not supported in this browser. Please customize with MP3s!");
      setIsPlaying(false);
      setActiveNoteId(null);
      return;
    }

    // Cancel active speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    speechUtteranceRef.current = utterance;

    // Try to find a sweet, high quality English voice (preferably female or warm)
    const voices = window.speechSynthesis.getVoices();
    const sweetVoice = voices.find(v => 
      v.name.includes("Google US English") || 
      v.name.includes("Natural") || 
      v.lang.startsWith("en")
    );
    if (sweetVoice) {
      utterance.voice = sweetVoice;
    }

    // Settings for a warm, gentle tone
    utterance.pitch = 1.05; // slightly sweet
    utterance.rate = 0.85;  // slower, romantic pacing

    utterance.onend = () => {
      setIsPlaying(false);
      setActiveNoteId(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setActiveNoteId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopVoiceNote = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveNoteId(null);
  };

  useEffect(() => {
    // Load voices in Chrome/Safari
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      stopVoiceNote();
    };
  }, []);

  return (
    <section id="voice-notes" className="section-container">
      <h2 className="section-title">Voice Notes From My Heart</h2>
      <p className="section-subtitle">Click to hear my voice whispering sweet words</p>

      {/* Grid of Voice Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {notes.map((note) => {
          const isActive = activeNoteId === note.id;

          return (
            <motion.div
              key={note.id}
              whileHover={{ scale: 1.01 }}
              className={`glass-card p-6 flex items-center justify-between border-2 transition ${
                isActive ? 'border-pink-300 shadow-xl' : 'border-transparent'
              }`}
            >
              <div className="flex-1 mr-4">
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  {note.label}
                </h3>
                <p className="text-xs text-gray-500 mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  {note.subtitle}
                </p>
                
                {/* Visualizer Waveform when playing */}
                <AnimatePresence>
                  {isActive && isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 24 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 mt-2"
                    >
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: [8, Math.random() * 20 + 6, 8] 
                          }}
                          transition={{ 
                            duration: 0.6 + i * 0.05, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="w-1 bg-red-400 rounded-full"
                          style={{ background: 'var(--color-primary)' }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Play / Stop Button */}
              <div>
                {isActive && isPlaying ? (
                  <button
                    onClick={stopVoiceNote}
                    className="p-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    <Square size={20} className="fill-current" />
                  </button>
                ) : (
                  <button
                    onClick={() => playVoiceNote(note)}
                    className="p-4 rounded-full text-white transition hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      boxShadow: '0 4px 15px rgba(var(--color-primary-rgb), 0.25)'
                    }}
                  >
                    <Play size={20} className="fill-current ml-0.5" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Customization tip block */}
      <div className="mt-12 p-4 glass-card border-opacity-20 flex gap-3 max-w-xl mx-auto items-center">
        <Info className="text-pink-400 shrink-0" size={20} />
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          <strong>Tip for personalization:</strong> By default, this uses high-fidelity speech synthesis. To hear your <em>actual</em> voice, record voice notes as <code>.mp3</code> files, drop them inside the <code>public/</code> directory, and add the paths in <code>loveConfig.js</code> under <code>audioUrl</code>!
        </p>
      </div>
    </section>
  );
}
