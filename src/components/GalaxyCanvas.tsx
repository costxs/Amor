import React, { useEffect, useRef } from 'react';

interface GalaxyCanvasProps {
    onGalaxyExplode: () => void;
}

interface Particle {
    x: number;
    y: number;
    radius: number;
    angle: number;
    speed: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    reset: (w: number, h: number) => void;
    update: (w: number, h: number) => void;
    updateDisperse: () => void;
    draw: (ctx: CanvasRenderingContext2D, center: { x: number; y: number }) => void;
    drawDisperse: (ctx: CanvasRenderingContext2D) => void;
}

const GalaxyCanvas: React.FC<GalaxyCanvasProps> = ({ onGalaxyExplode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let center = { x: canvas.width / 2, y: canvas.height / 2 };
        const particles: Particle[] = [];
        const numParticles = 1500;
        let animationFrameId: number;

        class ParticleImpl implements Particle {
            x: number = 0;
            y: number = 0;
            radius: number = 0;
            angle: number = 0;
            speed: number = 0;
            size: number = 0;
            color: string = '';
            vx: number = 0;
            vy: number = 0;

            constructor() {
                this.reset(canvas!.width, canvas!.height);
            }

            reset(w: number, h: number) {
                this.radius = Math.random() * (Math.max(w, h) / 2);
                this.angle = Math.random() * Math.PI * 2;
                this.speed = (Math.random() * 0.02) + 0.005;
                this.size = Math.random() * 2.5 + 1;
                this.color = `hsl(${Math.random() * 40 + 10}, 100%, ${Math.random() * 50 + 50}%)`;
                this.vx = 0;
                this.vy = 0;
            }

            update(w: number, h: number) {
                this.radius *= 0.99;
                this.angle += this.speed;
                if (this.radius < 1) {
                    this.reset(w, h);
                }
            }

            updateDisperse() {
                this.x += this.vx;
                this.y += this.vy;
            }

            draw(ctx: CanvasRenderingContext2D, center: { x: number; y: number }) {
                const x = center.x + Math.cos(this.angle) * this.radius;
                const y = center.y + Math.sin(this.angle) * this.radius;
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            drawDisperse(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new ParticleImpl());
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(center.x, center.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();

            particles.forEach(p => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx, center);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            center = { x: canvas.width / 2, y: canvas.height / 2 };
        };

        const handleClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            const distance = Math.sqrt(Math.pow(clickX - center.x, 2) + Math.pow(clickY - center.y, 2));
            const clickableRadius = 50;

            if (distance > clickableRadius) return;

            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('click', handleClick); // Prevent multiple clicks

            // Prepare dispersion
            particles.forEach(p => {
                p.x = center.x + Math.cos(p.angle) * p.radius;
                p.y = center.y + Math.sin(p.angle) * p.radius;

                const angle = Math.atan2(p.y - center.y, p.x - center.x);
                const speed = Math.random() * 10 + 5;
                p.vx = Math.cos(angle) * speed;
                p.vy = Math.sin(angle) * speed;
            });

            const disperseAnimation = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                particles.forEach(p => {
                    p.updateDisperse();
                    p.drawDisperse(ctx);
                });

                requestAnimationFrame(disperseAnimation);
            };
            disperseAnimation();

            setTimeout(() => {
                onGalaxyExplode();
            }, 1500);
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('click', handleClick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('click', handleClick);
        };
    }, [onGalaxyExplode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full cursor-pointer z-10"
        />
    );
};

export default GalaxyCanvas;
