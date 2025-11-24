import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { routesConfig } from '@/config/app.config';
import { motion, AnimatePresence } from 'framer-motion';
import { GamingIcon } from '@/shared/components/ui/GamingIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'LEVEL UP YOUR TECH',
    subtitle: 'Discover amazing gaming & tech products',
    icon: 'gamepad' as const,
    bgGradient: 'from-primary/20 via-primary/10 to-transparent',
  },
  {
    id: 2,
    title: 'GAME CHANGING DEALS',
    subtitle: 'Exclusive offers for gaming enthusiasts',
    icon: 'trophy' as const,
    bgGradient: 'from-secondary/20 via-secondary/10 to-transparent',
  },
  {
    id: 3,
    title: 'NEXT GEN GAMING',
    subtitle: 'Cutting-edge technology at your fingertips',
    icon: 'cpu' as const,
    bgGradient: 'from-accent/20 via-accent/10 to-transparent',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <motion.section
      className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden rounded-none flex flex-col justify-center items-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Gradient - Minimalist */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95"></div>
      
      {/* Subtle Grid Pattern - Inspired by liviasatriano.com */}
      <div 
        className="absolute inset-0 opacity-[0.02] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Slides Container */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {heroSlides.map((slide, index) => {
            if (index !== currentSlide) return null;
            
            return (
              <motion.div
                key={slide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 flex items-center justify-center px-6 lg:px-12"
              >
                {/* Slide Content - Centered Minimalist Layout */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-30`}></div>
                
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-8 py-16 lg:py-24">
                  {/* Minimal Icon - Optional, subtle */}
                  <motion.div
                    className="inline-block mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -8, 0],
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.5,
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    }}
                  >
                    <GamingIcon
                      type={slide.icon}
                      className="text-5xl lg:text-6xl text-primary/60"
                    />
                  </motion.div>

                  <motion.h1
                    className="text-4xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight leading-[1.1] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    className="text-lg lg:text-xl xl:text-2xl font-normal tracking-wide text-muted-foreground max-w-2xl mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link to={routesConfig.products.search}>
                      <Button
                        size="lg"
                        className="neon-glow-hover transition-all"
                      >
                        Shop Now
                      </Button>
                    </Link>
                    <Link to={routesConfig.products.new}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="hover:neon-glow-hover transition-all"
                      >
                        New Arrivals
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 brutal-border-minimal bg-background/80 backdrop-blur-sm hover:bg-background hover:neon-glow transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 brutal-border-minimal bg-background/80 backdrop-blur-sm hover:bg-background hover:neon-glow transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-primary neon-glow'
                : 'w-2 bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
}

