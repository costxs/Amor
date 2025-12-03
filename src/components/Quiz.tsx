import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QuizProps {
    onComplete: (passed: boolean) => void;
    onSkip: () => void;
}

const questions = [
    {
        question: "Qual foi o lugar do nosso primeiro encontro ?",
        answers: [
            { text: "Cia Paulista", correct: false },
            { text: "Restô", correct: false },
            { text: "Gugu", correct: true },
            { text: "Mar e sabor ", correct: false }
        ]
    },
    {
        question: "Em que momento eu te apresentei para os meus pais ?",
        answers: [
            { text: "Arraial na praça", correct: true },
            { text: "Aniversário da minha mãe", correct: false },
            { text: "Quando veio a primeira vez em casa", correct: false },
            { text: "seu aniversário", correct: false }
        ]
    },
    {
        question: "Quando se vimos pessoalmente a primeira vez, qual roupa eu estava vestindo ?",
        answers: [
            { text: "Regada vermelha e shorts preto", correct: false },
            { text: "Camisa azul e shorts pretos", correct: false },
            { text: "Camisa verde e shorts azul", correct: false },
            { text: "Camisa preta e short preto", correct: true }
        ]
    }
];

const Quiz: React.FC<QuizProps> = ({ onComplete, onSkip }) => {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleStart = () => setStarted(true);

    const handleAnswer = (isCorrect: boolean, index: number) => {
        setSelectedAnswer(index);
        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            setSelectedAnswer(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(i => i + 1);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    if (!started) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
            >
                <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-purple-300 mb-6">Você quer participar de um quiz especial?</h2>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleStart}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all transform hover:scale-105"
                        >
                            Sim!
                        </button>
                        <button
                            onClick={onSkip}
                            className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-all"
                        >
                            Não
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (showResult) {
        const passed = score >= 4;
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
            >
                <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-purple-300 mb-4">
                        {passed ? "Parabéns minha princesa!" : "Ah, não foi dessa vez..."}
                    </h2>
                    <p className="text-gray-300 mb-6">
                        {passed
                            ? "Você conhece cada detalhe nosso!"
                            : "Você não me ama? só eu amo"}
                    </p>
                    <button
                        onClick={() => onComplete(passed)}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                    >
                        Continuar
                    </button>
                </div>
            </motion.div>
        );
    }

    const question = questions[currentQuestionIndex];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4">
            <motion.div
                key={currentQuestionIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="bg-zinc-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl max-w-md w-full"
            >
                <h2 className="text-xl font-semibold text-purple-300 mb-6 text-center">{question.question}</h2>
                <div className="flex flex-col gap-3">
                    {question.answers.map((answer, index) => {
                        let btnClass = "p-3 rounded-lg border border-purple-500/30 text-left transition-all ";
                        if (selectedAnswer !== null) {
                            if (index === selectedAnswer) {
                                btnClass += answer.correct ? "bg-green-600 border-green-500" : "bg-red-600 border-red-500";
                            } else if (answer.correct) {
                                btnClass += "bg-green-600/30 border-green-500/30";
                            } else {
                                btnClass += "bg-zinc-800 opacity-50";
                            }
                        } else {
                            btnClass += "bg-zinc-800 hover:bg-purple-900/50 hover:border-purple-500";
                        }

                        return (
                            <button
                                key={index}
                                disabled={selectedAnswer !== null}
                                onClick={() => handleAnswer(answer.correct, index)}
                                className={btnClass}
                            >
                                {answer.text}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default Quiz;
