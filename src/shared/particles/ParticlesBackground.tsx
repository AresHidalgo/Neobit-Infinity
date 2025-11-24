import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/core/providers/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  color: string;
  alpha: number;
  spawnTime: number;
  update(
    target: { x: number | null; y: number | null },
    rect: { width: number; height: number }
  ): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

interface ParticlesBackgroundProps {
  particleCount?: number;
  colors?: string[];
  opacity?: number;
  className?: string;
}

export function ParticlesBackground({
  particleCount = 200, // Increased for more frequency
  colors,
  opacity = 0.65, // 65% opacity
  className = "",
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({
    x: null as number | null,
    y: null as number | null,
    isDown: false,
  });
  const rafRef = useRef<number | null>(null);
  const spawnIntervalRef = useRef<number | null>(null);
  const { currentTheme, resolvedThemeId } = useTheme();

  // Generate contrasting but harmonious colors from theme
  const getThemeColors = (): string[] => {
    if (colors && colors.length > 0) return colors;

    const theme = currentTheme;
    const colorsArray: string[] = [];

    // Extract HSL values from theme colors
    const extractHSL = (
      colorStr: string
    ): { h: number; s: number; l: number } => {
      const match = colorStr.match(/(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%/);
      if (match) {
        return {
          h: parseFloat(match[1]),
          s: parseFloat(match[2]),
          l: parseFloat(match[3]),
        };
      }
      return { h: 220, s: 70, l: 50 };
    };

    // Get base colors from theme
    const primaryHSL = extractHSL(theme.colors.primary);
    const secondaryHSL = extractHSL(
      theme.colors.secondary || theme.colors.accent
    );
    const accentHSL = extractHSL(theme.colors.accent || theme.colors.primary);

    // Create variations with contrast adjustments
    const variations = [
      // Primary variations
      {
        h: primaryHSL.h,
        s: Math.min(100, primaryHSL.s + 20),
        l: Math.min(90, primaryHSL.l + 20),
      },
      { h: primaryHSL.h, s: primaryHSL.s, l: primaryHSL.l },
      {
        h: primaryHSL.h,
        s: Math.max(20, primaryHSL.s - 10),
        l: Math.max(10, primaryHSL.l - 10),
      },
      // Secondary variations
      {
        h: secondaryHSL.h,
        s: Math.min(100, secondaryHSL.s + 15),
        l: Math.min(85, secondaryHSL.l + 15),
      },
      { h: secondaryHSL.h, s: secondaryHSL.s, l: secondaryHSL.l },
      // Accent variations
      {
        h: accentHSL.h,
        s: Math.min(100, accentHSL.s + 25),
        l: Math.min(80, accentHSL.l + 25),
      },
      // Complementary colors (offset hue by 30-60 degrees)
      { h: (primaryHSL.h + 30) % 360, s: primaryHSL.s, l: primaryHSL.l },
      {
        h: (primaryHSL.h + 180) % 360,
        s: Math.min(70, primaryHSL.s),
        l: Math.min(70, primaryHSL.l + 10),
      },
    ];

    // Convert to HSL strings
    variations.forEach(({ h, s, l }) => {
      colorsArray.push(`hsl(${h}, ${s}%, ${l}%)`);
    });

    return colorsArray.length > 0
      ? colorsArray
      : ["#61dafb", "#7c4dff", "#00d084"];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // Make canvas pixel-perfect
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Particle class - now as pixels (squares)
    class ParticleClass implements Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      size: number;
      color: string;
      alpha: number;
      spawnTime: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseSize = 2 + Math.random() * 3; // Pixel size 2-5px
        this.size = this.baseSize;
        this.color = color;
        this.alpha = 0.65 * opacity; // Base 65% opacity
        this.spawnTime = Date.now();
      }

      update(
        target: { x: number | null; y: number | null },
        rect: { width: number; height: number }
      ) {
        // Increased speed by 15%: 0.02 * 1.15 = 0.023
        if (target && target.x !== null && target.y !== null) {
          const dx = target.x - this.x;
          const dy = target.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = Math.min(120 / dist, 0.8);

          // 15% faster interaction
          this.vx += (dx / dist) * force * 0.023;
          this.vy += (dy / dist) * force * 0.023;
        }

        // Velocity damping
        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = rect.width;
        if (this.x > rect.width) this.x = 0;
        if (this.y < 0) this.y = rect.height;
        if (this.y > rect.height) this.y = 0;

        // Gentle size wobble
        this.size =
          this.baseSize + Math.sin(Date.now() / 300 + this.x * 0.01) * 0.5;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw as pixel (square) instead of circle
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.fillStyle = this.color;

        // Draw pixel (square) with slight rotation for variety
        const pixelSize = Math.max(1, this.size);
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.sin(Date.now() / 500 + this.x * 0.01) * 0.1);
        ctx.fillRect(-pixelSize / 2, -pixelSize / 2, pixelSize, pixelSize);

        ctx.restore();
      }
    }

    // Random spawn function
    const randomSpawn = () => {
      const rect = canvas.getBoundingClientRect();
      const themeColors = getThemeColors();
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];

      const x = rect.width * Math.random();
      const y = rect.height * Math.random();

      particlesRef.current.push(new ParticleClass(x, y, color));

      // Remove oldest particles if too many
      if (particlesRef.current.length > particleCount * 1.5) {
        particlesRef.current.shift();
      }
    };

    // Init particles
    const initParticles = () => {
      particlesRef.current = [];
      const rect = canvas.getBoundingClientRect();
      const themeColors = getThemeColors();

      for (let i = 0; i < particleCount; i++) {
        const x = rect.width * Math.random();
        const y = rect.height * Math.random();
        const color =
          themeColors[Math.floor(Math.random() * themeColors.length)];
        particlesRef.current.push(new ParticleClass(x, y, color));
      }
    };

    // Initial setup
    initParticles();
    window.addEventListener("resize", resize);

    // Random spawn interval (every 2-5 seconds)
    spawnIntervalRef.current = window.setInterval(
      () => {
        if (Math.random() > 0.3) {
          // 70% chance to spawn
          randomSpawn();
        }
      },
      2000 + Math.random() * 3000
    );

    // GSAP: intro animation (fade in + gentle spread)
    gsap.fromTo(
      particlesRef.current,
      { alpha: 0, baseSize: 0.1 },
      {
        duration: 1.6,
        alpha: () => {
          return 0.65 * opacity;
        },
        baseSize: () => 2 + Math.random() * 3,
        stagger: { each: 0.002 },
        ease: "power3.out",
      }
    );

    // Render loop
    const render = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Clear (transparent background)
      ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr);

      // Draw particles and connections
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        pts[i].update(mouseRef.current, rect);
        pts[i].draw(ctx);
      }

      // Optional: draw subtle lines between close pixels
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = dx * dx + dy * dy;
          if (d < 9000) {
            // Distance threshold squared
            const alpha = Math.max(0, 0.12 - (d / 9000) * 0.12) * opacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = a.color;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse handlers (convert to canvas coords)
    const getPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    const onMove = (e: MouseEvent) => {
      const pos = getPos(e);
      mouseRef.current = { ...pos, isDown: mouseRef.current.isDown };
    };

    const onLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const onDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      // Burst effect: push nearby particles outward
      const p = getPos(e);
      burst(p.x, p.y);
    };

    const onUp = () => {
      mouseRef.current.isDown = false;
    };

    // Add listeners to window for better coverage
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Burst using GSAP with 15% faster animation
    const burst = (x: number, y: number) => {
      const pts = particlesRef.current;
      const affected = pts.filter((pt) => {
        const dx = pt.x - x;
        const dy = pt.y - y;
        return dx * dx + dy * dy < 40000; // within 200px
      });

      affected.forEach((pt) => {
        const angle = Math.atan2(pt.y - y, pt.x - x);
        const push = (2 + Math.random() * 4) * 1.15; // 15% faster
        gsap.to(pt, {
          duration: 0.9 * 0.85, // 15% faster (shorter duration)
          vx: Math.cos(angle) * push + (Math.random() - 0.5) * 0.6,
          vy: Math.sin(angle) * push + (Math.random() - 0.5) * 0.6,
          baseSize: pt.baseSize + Math.random() * 2.2,
          ease: "power2.out",
        });

        // Shrink back after
        gsap.to(pt, {
          duration: 1.2 * 0.85, // 15% faster
          delay: 0.4 * 0.85, // 15% faster
          baseSize: Math.max(0.6, pt.baseSize - Math.random() * 1.5),
          ease: "power2.inOut",
        });
      });
    };

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      gsap.killTweensOf(particlesRef.current);
    };
  }, [particleCount, colors, opacity, currentTheme, resolvedThemeId]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none -z-10 ${className}`}
      style={{
        display: "block",
        touchAction: "none",
      }}
      aria-hidden="true"
    />
  );
}
