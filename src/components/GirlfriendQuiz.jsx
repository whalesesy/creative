import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { loveConfig } from '../loveConfig';

export default function GirlfriendQuiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockedMsg, setUnlockedMsg] = useState('');
  const [answeredState, setAnsweredState] = useState(null); // 'correct' or 'incorrect'

  const currentQuestion = loveConfig.quiz[currentQuestionIdx];

  const handleOptionClick = (idx) => {
    if (selectedOptionIdx !== null) return; // Prevent double clicks
    
    setSelectedOptionIdx(idx);
    const isCorrect = idx === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
      setAnsweredState('correct');
      setUnlockedMsg(currentQuestion.reward);
    } else {
      setAnsweredState('incorrect');
      setUnlockedMsg(`Oops! Not quite correct, but I still love you. The correct answer was: "${currentQuestion.options[currentQuestion.correctIndex]}".`);
    }
  };

  const handleNext = () => {
    setSelectedOptionIdx(null);
    setAnsweredState(null);
    setUnlockedMsg('');
    
    if (currentQuestionIdx < loveConfig.quiz.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setQuizFinished(false);
    setScore(0);
    setUnlockedMsg('');
    setAnsweredState(null);
  };

  return (
    <section id="quiz" className="section-container">
      <h2 className="section-title">The Girlfriend Quiz</h2>
      <p className="section-subtitle">Test your memory & unlock secret scrolls</p>

      <div className="max-w-2xl mx-auto mt-8">
        <div className="glass-card p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center mb-6 text-sm text-gray-500 font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                    <span>Question {currentQuestionIdx + 1} of {loveConfig.quiz.length}</span>
                    <span>Score: {score}</span>
                  </div>

                  {/* Question */}
                  <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                    {currentQuestion.question}
                  </h3>

                  {/* Options */}
                  <div className="flex flex-col gap-4">
                    {currentQuestion.options.map((option, idx) => {
                      let btnClass = "";
                      if (selectedOptionIdx !== null) {
                        if (idx === currentQuestion.correctIndex) {
                          btnClass = "selected-correct";
                        } else if (idx === selectedOptionIdx) {
                          btnClass = "selected-incorrect";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedOptionIdx !== null}
                          onClick={() => handleOptionClick(idx)}
                          className={`quiz-option ${btnClass}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Reward Log */}
                {selectedOptionIdx !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 rounded-xl border flex gap-3 items-start bg-white bg-opacity-50"
                    style={{ 
                      borderColor: answeredState === 'correct' ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)',
                    }}
                  >
                    {answeredState === 'correct' ? (
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    ) : (
                      <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                    )}
                    <div>
                      <p className="text-sm font-semibold mb-1 text-gray-800">
                        {answeredState === 'correct' ? 'Reward Unlocked! ✨' : 'A Gentle Note 🤍'}
                      </p>
                      <p className="handwritten text-gray-700" style={{ fontSize: '1.4rem', lineHeight: '1.3' }}>
                        {unlockedMsg}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Next Button */}
                {selectedOptionIdx !== null && (
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleNext}
                      className="btn-romantic"
                    >
                      {currentQuestionIdx === loveConfig.quiz.length - 1 ? "Finish Quiz 🏁" : "Next Question ➡️"}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              // Quiz Finished Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-4"
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(135deg, #f5c53b, #cca43b)' }}
                >
                  <Trophy size={40} className="text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                  Quiz Completed!
                </h3>

                <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  You got <strong className="text-red-400">{score} out of {loveConfig.quiz.length}</strong> questions correct!
                </p>

                <p className="handwritten text-xl max-w-md mb-8 italic" style={{ fontSize: '1.6rem', color: 'var(--color-primary)' }}>
                  {score === loveConfig.quiz.length 
                    ? '"Your memory is as flawless as your heart. You unlock the Ultimate Girlfriend Certificate!"'
                    : '"Not a perfect score, but you are still 100% perfect in my eyes."'}
                </p>

                <div className="flex gap-4">
                  <button onClick={handleReset} className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-semibold transition hover:bg-gray-100" style={{ color: 'var(--color-text)' }}>
                    <RefreshCw size={16} />
                    <span>Try Again</span>
                  </button>
                  {score === loveConfig.quiz.length && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <a href="#awards" className="btn-romantic">
                        View Awards 🏅
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <style>{`
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        .max-w-2xl {
          max-w: 42rem;
        }
        .min-h-\\[400px\\] {
          min-height: 400px;
        }
        .shrink-0 {
          flex-shrink: 0;
        }
        .inline-flex {
          display: inline-flex;
        }
        @media (max-width: 640px) {
          .glass-card.p-8 {
            padding: 1.5rem 1rem !important;
          }
          .min-h-\\[400px\\] {
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
