import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DomeGallery from './components/DomeGallery';
import Quiz from './components/Quiz';
import MainContent from './components/MainContent';

type Stage = 'landing' | 'galaxy' | 'quiz' | 'main';

function App() {
  const [stage, setStage] = useState<Stage>('landing');

  const handleEnter = () => {
    setStage('galaxy');
  };

  const handleGalaxyExplode = () => {
    setStage('quiz');
  };

  const handleQuizComplete = (_passed: boolean) => {
    // Even if they fail, we might want to show the main content eventually, 
    // but the original logic showed a result message. 
    // The Quiz component handles the result message and then calls onComplete.
    setStage('main');
  };

  const handleQuizSkip = () => {
    setStage('main');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white font-sans">
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black"
          >
            <button
              onClick={handleEnter}
              className="group relative px-8 py-4 bg-zinc-900 border-2 border-purple-400 rounded-full flex items-center gap-4 transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]"
            >
              <img src="/kuromi.png" alt="Kuromi" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-purple-100">Clique aqui</span>
              <div className="absolute inset-0 rounded-full ring-2 ring-purple-500/50 animate-pulse" />
            </button>
          </motion.div>
        )}

        {stage === 'galaxy' && (
          <motion.div
            key="galaxy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0 z-40"
          >
            <DomeGallery />
            <div className="absolute bottom-10 w-full flex justify-center pointer-events-none">
              <button
                onClick={handleGalaxyExplode}
                className="pointer-events-auto px-8 py-3 bg-purple-600/80 hover:bg-purple-600 text-white rounded-full backdrop-blur-sm transition-all transform hover:scale-105 border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Continuar para o Quiz ✨
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'quiz' && (
          <Quiz key="quiz" onComplete={handleQuizComplete} onSkip={handleQuizSkip} />
        )}

        {stage === 'main' && (
          <MainContent key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
