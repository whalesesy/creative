import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowUp, Menu, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useCanvasParticles } from './hooks/useCanvasParticles';
import { loveConfig } from './loveConfig';

// Import all sections
import Hero from './components/Hero';
import RelationshipClock from './components/RelationshipClock';
import OurStory from './components/OurStory';
import BookOfUs from './components/BookOfUs';
import LifeChange from './components/LifeChange';
import GirlfriendAwards from './components/GirlfriendAwards';
import GirlfriendQuiz from './components/GirlfriendQuiz';
import ThingsILove from './components/ThingsILove';
import LoveLetters from './components/LoveLetters';
import LittleThings from './components/LittleThings';
import FutureTogether from './components/FutureTogether';
import OpenWhen from './components/OpenWhen';
import FunnyMoments from './components/FunnyMoments';
import NightSkyStars from './components/NightSkyStars';
import MyPromises from './components/MyPromises';
import ForeverSection from './components/ForeverSection';
import ScreenTransition from './components/ScreenTransition';

const PAGE_ICONS = ['📖','⏰','📝','📚','🌱','🏅','❓','💯','📷','💌','🎵','🔍','🌟','💡','🎤','😂','🌌','🤝','♾️'];

export default function App() {
  const [theme, setTheme] = useState('sunshine');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('pooh');
  const [pendingPageIndex, setPendingPageIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const canvasRef = useRef(null);

  useCanvasParticles(canvasRef, theme);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'sunshine' ? 'moonlight' : 'sunshine');

  const triggerPageTransition = (targetIndex) => {
    if (isTransitioning || isOpeningTransition) return;
    const types = ['pooh', 'stitch', 'panda', 'iceage', 'migration'];
    setTransitionType(types[Math.floor(Math.random() * types.length)]);
    setPendingPageIndex(targetIndex);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1500);
  };

  const handleTransitionMidpoint = () => {
    setCurrentPageIndex(pendingPageIndex);
    window.scrollTo(0, 0);
  };

  const handleOpenHeart = () => {
    setIsOpeningTransition(true);
    setTimeout(() => {
      setCurrentPageIndex(1);
      setIsOpeningTransition(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  const goToPage = (idx) => { setNavOpen(false); triggerPageTransition(idx); };
  const handleNext = () => currentPageIndex < pages.length - 1 && triggerPageTransition(currentPageIndex + 1);
  const handlePrev = () => currentPageIndex > 1 && triggerPageTransition(currentPageIndex - 1);

  const pages = [
    { name: 'Cover',      emoji: '📖', component: <Hero onOpenHeart={handleOpenHeart} theme={theme} /> },
    { name: 'Clock',      emoji: '⏰', component: <RelationshipClock /> },
    { name: 'Story',      emoji: '📝', component: <OurStory /> },
    { name: 'Book',       emoji: '📚', component: <BookOfUs /> },
    { name: 'Growth',     emoji: '🌱', component: <LifeChange /> },
    { name: 'Awards',     emoji: '🏅', component: <GirlfriendAwards /> },
    { name: 'Quiz',       emoji: '❓', component: <GirlfriendQuiz /> },
    { name: '100 Reasons',emoji: '💯', component: <ThingsILove /> },
    { name: 'Letters',    emoji: '💌', component: <LoveLetters /> },
    { name: 'Details',    emoji: '🔍', component: <LittleThings /> },
    { name: 'Dreams',     emoji: '🌟', component: <FutureTogether /> },
    { name: 'Open When',  emoji: '💡', component: <OpenWhen /> },
    { name: 'Jokes',      emoji: '😂', component: <FunnyMoments /> },
    { name: 'Stars',      emoji: '🌌', component: <NightSkyStars /> },
    { name: 'Promises',   emoji: '🤝', component: <MyPromises /> },
    { name: 'Forever',    emoji: '♾️', component: <ForeverSection /> },
  ];

  const currentPage = pages[currentPageIndex];
  const progress = currentPageIndex > 0 ? ((currentPageIndex) / (pages.length - 1)) * 100 : 0;

  return (
    <div className={`app-root ${theme === 'moonlight' ? 'dark-mode' : ''}`}>
      {/* Background canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="parchment-overlay" />

      {/* Drifting clouds */}
      <div className="cartoon-world">
        {[['☁️','8s','2%',8],['☁️','14s','22%',12],['☁️','11s','58%',10],['☁️','17s','78%',7]].map(([e,d,t,fs],i)=>(
          <span key={i} className="cartoon-cloud" style={{ fontSize:`${fs}rem`, animationDuration:d, top:t, animationDelay:`${i*3.5}s` }}>{e}</span>
        ))}
      </div>

      {/* Theme toggle */}
      <button onClick={toggleTheme} className="btn-theme-toggle" title="Toggle theme">
        {theme === 'sunshine' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Screen Transition */}
      <ScreenTransition isActive={isTransitioning} type={transitionType} onMidpoint={handleTransitionMidpoint} />

      <AnimatePresence mode="wait">
        {currentPageIndex === 0 ? (
          <motion.div key="cover" exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
            <Hero onOpenHeart={handleOpenHeart} theme={theme} />

            {isOpeningTransition && (
              <div className="fixed inset-0 z-[9999] flex pointer-events-none">
                <motion.div
                  initial={{ x: 0 }} animate={{ x: '-100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  style={{ width: '50%', height: '100%', background: 'var(--bg-primary)', borderRight: '2px solid var(--border-color)', display:'flex', alignItems:'center', justifyContent:'flex-end' }}
                >
                  <div style={{ marginRight: '2rem', textAlign: 'right' }}>
                    <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)' }}>To My...</span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-text)', marginTop: 4 }}>Forever</h2>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: 0 }} animate={{ x: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  style={{ width: '50%', height: '100%', background: 'var(--bg-primary)', borderLeft: '2px solid var(--border-color)', display:'flex', alignItems:'center' }}
                >
                  <div style={{ marginLeft: '2rem' }}>
                    <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--color-primary)' }}>...Person</span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-text)', marginTop: 4 }}>❤️</h2>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={currentPageIndex}
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}
          >
            {/* Top progress bar */}
            <div className="page-progress-bar">
              <motion.div
                className="page-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Floating cartoon badges */}
            <div className="cartoon-badge" style={{ top:'10%', left:'1.5%', fontSize:'2.2rem', animationDelay:'0s' }}>🍯</div>
            <div className="cartoon-badge" style={{ top:'30%', right:'1.5%', fontSize:'2rem', animationDelay:'2s' }}>🌺</div>
            <div className="cartoon-badge" style={{ top:'55%', left:'1.5%', fontSize:'1.9rem', animationDelay:'4s' }}>❄️</div>
            <div className="cartoon-badge" style={{ top:'75%', right:'1.5%', fontSize:'2rem', animationDelay:'1s' }}>🌸</div>

            <main style={{ paddingBottom: '8rem', paddingTop: '1rem' }}>
              {currentPage.component}

              {/* Bottom Nav Bar */}
              <div className="bottom-nav-bar">
                {/* Prev */}
                <button
                  onClick={handlePrev}
                  disabled={currentPageIndex <= 1}
                  className="nav-arrow-btn"
                  aria-label="Previous chapter"
                >
                  <ChevronLeft size={18} />
                  <span className="nav-arrow-label">Prev</span>
                </button>

                {/* Chapter indicator — opens slide-up menu */}
                <button
                  onClick={() => setNavOpen(true)}
                  className="nav-chapter-btn"
                  aria-label="Open chapter menu"
                >
                  <BookOpen size={16} />
                  <span>{currentPage.emoji} {currentPage.name}</span>
                  <span className="nav-chapter-count">{currentPageIndex}/{pages.length - 1}</span>
                </button>

                {/* Next */}
                <button
                  onClick={handleNext}
                  disabled={currentPageIndex >= pages.length - 1}
                  className="nav-arrow-btn"
                  aria-label="Next chapter"
                >
                  <span className="nav-arrow-label">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </main>

            {/* Scroll-to-top */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="scroll-top-btn"
                >
                  <ArrowUp size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-up Chapter Menu */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="nav-overlay"
              onClick={() => setNavOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              className="nav-drawer"
            >
              <div className="nav-drawer-header">
                <h2 className="nav-drawer-title">
                  <BookOpen size={18} /> All Chapters
                </h2>
                <button onClick={() => setNavOpen(false)} className="nav-drawer-close">
                  <X size={20} />
                </button>
              </div>
              <div className="nav-drawer-grid">
                {pages.slice(1).map((page, i) => {
                  const idx = i + 1;
                  const isActive = currentPageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className={`nav-chapter-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-chapter-emoji">{page.emoji}</span>
                      <span className="nav-chapter-name">{page.name}</span>
                      {isActive && <span className="nav-chapter-dot" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
