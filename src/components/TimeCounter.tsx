import React, { useState, useEffect } from 'react';
import Counter from './Counter';

interface TimeCounterProps {
    targetDate: number;
}

const TimeCounter: React.FC<TimeCounterProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const counterProps = {
        fontSize: 40,
        padding: 10,
        gap: 2,
        textColor: "white",
        fontWeight: 700,
        gradientHeight: 10,
        gradientFrom: "rgba(0,0,0,0.8)",
        gradientTo: "transparent"
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
                <Counter value={timeLeft.days} places={[100, 10, 1]} {...counterProps} />
                <span className="text-xs md:text-sm text-purple-400 uppercase tracking-wider mt-2">Dias</span>
            </div>
            <div className="flex flex-col items-center">
                <Counter value={timeLeft.hours} places={[10, 1]} {...counterProps} />
                <span className="text-xs md:text-sm text-purple-400 uppercase tracking-wider mt-2">Horas</span>
            </div>
            <div className="flex flex-col items-center">
                <Counter value={timeLeft.minutes} places={[10, 1]} {...counterProps} />
                <span className="text-xs md:text-sm text-purple-400 uppercase tracking-wider mt-2">Min</span>
            </div>
            <div className="flex flex-col items-center">
                <Counter value={timeLeft.seconds} places={[10, 1]} {...counterProps} />
                <span className="text-xs md:text-sm text-purple-400 uppercase tracking-wider mt-2">Seg</span>
            </div>
        </div>
    );
};

export default TimeCounter;
