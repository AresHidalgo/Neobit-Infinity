import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { routesConfig } from '@/config/app.config';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Trophy, Cpu } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'ELEVA TU TECNOLOGÍA',
    subtitle: 'Descubre increíbles productos de gaming y tecnología',
    icon: Zap,
    bgColor: 'bg-neon-green',
    textColor: 'text-black',
  },
  {
    id: 2,
    title: 'OFERTAS QUE CAMBIAN EL JUEGO',
    subtitle: 'Ofertas exclusivas para entusiastas del gaming',
    icon: Trophy,
    bgColor: 'bg-neon-pink',
    textColor: 'text-white',
  },
  {
    id: 3,
    title: 'GAMING DE NUEVA GENERACIÓN',
    subtitle: 'Tecnología de punta al alcance de tus manos',
    icon: Cpu,
    bgColor: 'bg-neon-blue',
    textColor: 'text-black',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative border-4 border-black h-[600px] overflow-hidden bg-white shadow-brutal">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 ${heroSlides[currentSlide].bgColor}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-block p-4 border-4 border-black bg-white shadow-brutal"
            >
              {(() => {
                const Icon = heroSlides[currentSlide].icon;
                return <Icon className="w-16 h-16 text-black" />;
              })()}
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-6xl md:text-8xl font-heading uppercase leading-none mb-6 ${heroSlides[currentSlide].textColor} text-shadow-sm`}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xl md:text-2xl font-mono font-bold mb-10 ${heroSlides[currentSlide].textColor} bg-black/10 inline-block px-4 py-2`}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center"
            >
              <Link to={routesConfig.products.search}>
                <BrutalButton size="lg" className="bg-white text-black hover:bg-black hover:text-white border-black">
                  Comprar Ahora
                </BrutalButton>
              </Link>
              <Link to={routesConfig.products.search}>
                <BrutalButton size="lg" variant="outline" className="bg-transparent border-black hover:bg-white">
                  Ver Ofertas
                </BrutalButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end p-0 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto p-6 bg-white border-t-4 border-r-4 border-black hover:bg-black hover:text-white transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div className="flex gap-2 mb-6 pointer-events-auto">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 border-2 border-black transition-all ${
                index === currentSlide ? 'bg-black' : 'bg-white hover:bg-gray-200'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="pointer-events-auto p-6 bg-white border-t-4 border-l-4 border-black hover:bg-black hover:text-white transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

