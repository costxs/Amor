import React from 'react';
import { motion } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import TimeCounter from './TimeCounter';
import { Carousel } from './Carousel';

const MainContent: React.FC = () => {
    // Anniversary Date: 2025-12-21 (Month is 0-indexed in JS Date, so 11 is Dec)
    const anniversaryDate = new Date(2025, 11, 21, 0, 0, 0).getTime();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full p-8 pb-20 overflow-y-auto text-center flex flex-col items-center gap-12"
        >
            {/* Music Player */}
            <MusicPlayer />

            {/* Slideshow */}
            <div className="w-full flex justify-center">
                <Carousel />
            </div>

            {/* Countdown */}
            <div className="bg-zinc-900/80 p-8 rounded-2xl border border-purple-500/30 shadow-lg max-w-2xl w-full backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-purple-300 mb-6">Contando os dias para o seu momento especial...</h2>
                <TimeCounter targetDate={anniversaryDate} />
            </div>

            {/* Final Message */}
            <div className="max-w-3xl w-full bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-purple-500/30 shadow-xl text-left">
                <h2 className="text-2xl font-bold text-purple-300 mb-6 text-center">Feliz mais um mês para nós, meu amor!</h2>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    É difícil encontrar palavras para explicar o tamanho do meu amor por você. De minha garotinha, você se transformou em tudo para mim: minha amiga, minha parceira e o tesouro que prometo proteger por toda a eternidade.
                    {'\n\n'}
                    Peço perdão pelas vezes em que o meu estresse falou mais alto e, sem perceber, acabei te magoando. Prometo me esforçar para trocar cada lágrima que causei por muitos sorrisos. Espero que o seu amor por mim continue firme e que possamos construir uma felicidade imensa lado a lado. Te amo demais, minha infinita garotinha.
                </p>
            </div>
        </motion.div>
    );
};

export default MainContent;
