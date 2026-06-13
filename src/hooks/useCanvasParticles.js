import { useEffect } from 'react';

export const useCanvasParticles = (canvasRef, theme) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Helper to draw a heart path
    const drawHeart = (context, x, y, size, color, alpha) => {
      context.save();
      context.globalAlpha = alpha;
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(x, y + size / 4);
      context.quadraticCurveTo(x, y - size / 2, x + size / 2, y - size / 2);
      context.quadraticCurveTo(x + size, y - size / 2, x + size, y + size / 4);
      context.quadraticCurveTo(x + size, y + size * 0.7, x, y + size * 1.25);
      context.quadraticCurveTo(x - size, y + size * 0.7, x - size, y + size / 4);
      context.quadraticCurveTo(x - size, y - size / 2, x - size / 2, y - size / 2);
      context.quadraticCurveTo(x, y - size / 2, x, y + size / 4);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Helper to draw a sky lantern
    const drawLantern = (context, x, y, size, alpha) => {
      context.save();
      context.globalAlpha = alpha;
      
      // Lantern body (rounded rectangle/trapezoid)
      const grad = context.createLinearGradient(x - size, y - size * 1.5, x + size, y + size);
      grad.addColorStop(0, '#f39c12'); // glowing orange top
      grad.addColorStop(0.5, '#e67e22'); // warm orange body
      grad.addColorStop(1, '#c0392b'); // red bottom base

      context.fillStyle = grad;
      context.shadowBlur = size * 1.5;
      context.shadowColor = '#f1c40f';

      context.beginPath();
      context.moveTo(x - size * 0.7, y - size * 1.5);
      context.lineTo(x + size * 0.7, y - size * 1.5);
      context.quadraticCurveTo(x + size * 0.9, y - size * 0.5, x + size, y + size);
      context.lineTo(x - size, y + size);
      context.quadraticCurveTo(x - size * 0.9, y - size * 0.5, x - size * 0.7, y - size * 1.5);
      context.closePath();
      context.fill();

      // Glowing fire base
      context.fillStyle = '#ffffff';
      context.beginPath();
      context.arc(x, y + size * 0.9, size * 0.3, 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    // Initialize particles based on theme
    const initParticles = () => {
      particles = [];
      const particleCount = theme === 'moonlight' ? 80 : 30; // More particles for stars, fewer for hearts

      for (let i = 0; i < particleCount; i++) {
        if (theme === 'moonlight') {
          // Twinkling stars (background) & Sky Lanterns (foreground)
          const isLantern = Math.random() > 0.85; // 15% lanterns
          particles.push({
            type: isLantern ? 'lantern' : 'star',
            x: Math.random() * width,
            y: Math.random() * height,
            size: isLantern ? Math.random() * 8 + 8 : Math.random() * 2 + 1,
            speedY: isLantern ? -(Math.random() * 0.6 + 0.3) : 0,
            speedX: isLantern ? Math.sin(Math.random()) * 0.2 : 0,
            alpha: Math.random() * 0.6 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            direction: Math.random() > 0.5 ? 1 : -1,
            wobble: Math.random() * 100,
            wobbleSpeed: Math.random() * 0.02 + 0.005
          });
        } else {
          // Floating Hearts
          particles.push({
            type: 'heart',
            x: Math.random() * width,
            y: height + Math.random() * 100,
            size: Math.random() * 15 + 8,
            speedY: -(Math.random() * 0.8 + 0.4),
            speedX: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.4 + 0.2,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
            wobbleDistance: Math.random() * 20 + 5,
            wobble: Math.random() * Math.PI,
            color: ['#f0a39e', '#e07a7a', '#f5c5b2', '#cca43b', '#c5b2db'][Math.floor(Math.random() * 5)]
          });
        }
      }
    };

    initParticles();

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (p.type === 'heart') {
          p.y += p.speedY;
          p.wobble += p.wobbleSpeed;
          p.x += p.speedX + Math.sin(p.wobble) * 0.5;

          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha);

          // Recycle heart when it floats off the top
          if (p.y < -p.size * 2) {
            p.y = height + p.size * 2;
            p.x = Math.random() * width;
            p.alpha = Math.random() * 0.4 + 0.2;
          }
        } else if (p.type === 'star') {
          // Twinkle effect (sine wave alpha)
          p.alpha += p.twinkleSpeed * p.direction;
          if (p.alpha > 0.8) p.direction = -1;
          if (p.alpha < 0.1) p.direction = 1;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        } else if (p.type === 'lantern') {
          p.y += p.speedY;
          p.wobble += p.wobbleSpeed;
          p.x += Math.sin(p.wobble) * 0.3;

          drawLantern(ctx, p.x, p.y, p.size, p.alpha);

          // Recycle lantern when it floats off the top
          if (p.y < -p.size * 3) {
            p.y = height + p.size * 3;
            p.x = Math.random() * width;
            p.speedY = -(Math.random() * 0.6 + 0.3);
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, canvasRef]);
};
