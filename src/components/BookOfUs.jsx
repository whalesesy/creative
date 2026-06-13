import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function BookOfUs() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chapter = loveConfig.bookChapters[currentChapterIndex];

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6
  };

  const handleNext = () => {
    if (currentChapterIndex < loveConfig.bookChapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  return (
    <section id="book" className="section-container">
      <h2 className="section-title">The Book of Us</h2>
      <p className="section-subtitle">Writing our lives, chapter by chapter</p>

      <div className="book-container mt-6 select-none">
        <div className="book">
          <div className="book-gutter"></div>

          {/* Left Page (Chapter Index & Title Page) */}
          <div className="book-page justify-between border-r border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-6" style={{ color: 'var(--color-primary)' }}>
                <BookOpen size={24} />
                <span className="font-semibold uppercase tracking-wider text-sm">Table of Contents</span>
              </div>

              <div className="flex flex-col gap-3">
                {loveConfig.bookChapters.map((ch, idx) => (
                  <button
                    key={ch.chapterNum}
                    onClick={() => setCurrentChapterIndex(idx)}
                    className="text-left py-2 px-3 rounded-lg transition-all duration-200 hover:bg-red-50 hover:bg-opacity-50"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: currentChapterIndex === idx ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontWeight: currentChapterIndex === idx ? '600' : '400',
                      borderLeft: currentChapterIndex === idx ? '3px solid var(--color-primary)' : '3px solid transparent',
                      paddingLeft: currentChapterIndex === idx ? '12px' : '8px'
                    }}
                  >
                    Chapter {ch.chapterNum}: {ch.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem' }}>
              "Our favorite chapters are yet to be written."
            </div>
          </div>

          {/* Right Page (Active Chapter Story) */}
          <div className="book-page justify-between bg-white bg-opacity-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapterIndex}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="flex-1 flex flex-col justify-start"
              >
                <div className="text-sm font-semibold tracking-widest text-red-400 mb-2 uppercase">
                  Chapter {chapter.chapterNum}
                </div>
                
                <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                  {chapter.title}
                </h3>
                
                <div className="text-md italic mb-6 font-medium text-gray-500" style={{ color: 'var(--color-primary)' }}>
                  {chapter.subtitle}
                </div>

                <p className="handwritten text-gray-700 leading-relaxed overflow-y-auto max-h-[280px]" style={{ fontSize: '1.55rem' }}>
                  {chapter.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons inside page */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handlePrev}
                disabled={currentChapterIndex === 0}
                className="p-2 rounded-full border border-gray-200 disabled:opacity-35 transition hover:bg-gray-100"
                style={{ color: 'var(--color-text)' }}
              >
                <ArrowLeft size={18} />
              </button>

              <span className="text-xs uppercase tracking-wider text-gray-400">
                Page {chapter.chapterNum} of {loveConfig.bookChapters.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentChapterIndex === loveConfig.bookChapters.length - 1}
                className="p-2 rounded-full border border-gray-200 disabled:opacity-35 transition hover:bg-gray-100"
                style={{ color: 'var(--color-text)' }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .justify-between {
          justify-content: space-between;
        }
        .flex-1 {
          flex: 1 1 0%;
        }
        .border-r {
          border-right-width: 1px;
        }
        .border-t {
          border-top-width: 1px;
        }
        .border-gray-100 {
          border-color: rgba(243, 244, 246, 1);
        }
        .border-gray-200 {
          border-color: rgba(229, 231, 235, 1);
        }
        .disabled\\:opacity-35:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .hover\\:bg-gray-100:hover {
          background-color: rgba(243, 244, 246, 1);
        }
        .overflow-y-auto {
          overflow-y: auto;
        }
        .max-h-\\[280px\\] {
          max-h: 280px;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .tracking-widest {
          letter-spacing: 0.1em;
        }
      `}</style>
    </section>
  );
}
