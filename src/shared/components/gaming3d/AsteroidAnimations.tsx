import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { GamingIcon3D, GamingIcon3DType } from './GamingIcons3D';
import { getRandomGamingIconType } from '@/shared/utils/gamingIcons';

interface AsteroidAnimationsProps {
  count?: number;
  density?: 'low' | 'medium' | 'high';
  minScale?: number;
  maxScale?: number;
  speed?: number;
  colors?: string[];
  className?: string;
}

const densityMap = {
  low: 8,
  medium: 15,
  high: 25,
};

const defaultColors = [
  '#00ffff', // cyan
  '#ff00ff', // magenta
  '#ffff00', // yellow
  '#00ff00', // green
  '#ff6b00', // orange
];

export function AsteroidAnimations({
  count,
  density = 'medium',
  minScale = 0.5,
  maxScale = 1.5,
  speed = 1,
  colors = defaultColors,
  className = '',
}: AsteroidAnimationsProps) {
  const iconCount = count || densityMap[density];
  
  const asteroids = useMemo(() => {
    return Array.from({ length: iconCount }, (_, i) => {
      const type = getRandomGamingIconType() as GamingIcon3DType;
      const scale = Math.random() * (maxScale - minScale) + minScale;
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.2 + 0.1;
      
      return {
        id: i,
        type,
        position: [x, y, z] as [number, number, number],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ] as [number, number, number],
        scale,
        color,
        opacity,
        speed: (Math.random() * 0.5 + 0.5) * speed,
      };
    });
  }, [iconCount, minScale, maxScale, speed, colors]);

  return (
    <div className={`fixed inset-0 pointer-events-none -z-10 ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 15], fov: 75 }}
      >
        <Suspense fallback={null}>
          {/* Ambiente oscuro estilo espacio */}
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ffff" />
          
          {/* Iconos gaming flotando como asteroides */}
          {asteroids.map((asteroid) => (
            <GamingIcon3D
              key={asteroid.id}
              type={asteroid.type}
              position={asteroid.position}
              rotation={asteroid.rotation}
              scale={asteroid.scale}
              color={asteroid.color}
              opacity={asteroid.opacity}
              speed={asteroid.speed}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

