import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        setProgress(newProgress);
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            audioRef.current.currentTime = (newProgress / 100) * duration;
        }
    };

    return (
        <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md p-6 rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <audio
                ref={audioRef}
                src={`${import.meta.env.BASE_URL}music.mp3`}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                loop
                autoPlay
            />

            <div className="flex items-center gap-6">
                {/* Album Art / Visualizer */}
                <div className="relative w-20 h-20 flex-shrink-0">
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg"
                    >
                        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-purple-400" />
                        </div>
                    </motion.div>
                    {isPlaying && (
                        <div className="absolute -inset-2 rounded-full border-2 border-purple-500/30 animate-ping" />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-white font-bold text-lg">Love Like You</h3>
                            <p className="text-purple-300 text-xs">Steven Universe (PT-BR)</p>
                        </div>
                        <Music className={`w-5 h-5 ${isPlaying ? 'text-purple-400 animate-bounce' : 'text-zinc-600'}`} />
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-1.5 bg-zinc-700 rounded-full mb-4 group">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-white text-purple-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>

                        <div className="flex items-center gap-2">
                            <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition-colors">
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    setVolume(parseFloat(e.target.value));
                                    setIsMuted(false);
                                }}
                                className="w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
