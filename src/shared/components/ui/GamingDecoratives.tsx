import { useEffect, useState } from 'react';
import { GamingIcon, GamingIconType } from './GamingIcons';
import { 
  getRandomGamingIconType, 
  getRandomRotation, 
  getRandomOpacity, 
  getRandomSize 
} from '../../utils/gamingIcons';

interface RandomGamingIcon {
  id: number;
  type: GamingIconType;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
}

interface RandomGamingIconsProps {
  count?: number;
  density?: 'low' | 'medium' | 'high';
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  className?: string;
}

const densityMap = {
  low: 8,
  medium: 15,
  high: 25,
};

export function RandomGamingIcons({
  count,
  density = 'medium',
  minSize = 40,
  maxSize = 120,
  colors,
  className = '',
}: RandomGamingIconsProps) {
  const [icons, setIcons] = useState<RandomGamingIcon[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const iconCount = count || densityMap[density];
    const generatedIcons: RandomGamingIcon[] = [];

    // Usar viewport size si el contenedor aún no tiene tamaño
    const width = containerSize.width || window.innerWidth;
    const height = containerSize.height || window.innerHeight;

    for (let i = 0; i < iconCount; i++) {
      generatedIcons.push({
        id: i,
        type: getRandomGamingIconType(),
        x: Math.random() * (width - maxSize),
        y: Math.random() * (height - maxSize),
        size: getRandomSize(minSize, maxSize),
        rotation: getRandomRotation(),
        opacity: getRandomOpacity(0.08, 0.25),
      });
    }

    setIcons(generatedIcons);
  }, [count, density, minSize, maxSize, containerSize]);

  // Actualizar tamaño del contenedor en resize
  useEffect(() => {
    const updateSize = () => {
      const container = document.documentElement;
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {icons.map((icon) => {
        const sizeClass = 
          icon.size <= 50 ? 'w-12 h-12' :
          icon.size <= 80 ? 'w-16 h-16' :
          icon.size <= 100 ? 'w-20 h-20' :
          'w-24 h-24';

        return (
          <div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}px`,
              top: `${icon.y}px`,
              transform: `rotate(${icon.rotation}deg)`,
              opacity: icon.opacity,
              color: colors ? colors[Math.floor(Math.random() * colors.length)] : undefined,
            }}
          >
            <GamingIcon
              type={icon.type}
              size={icon.size <= 50 ? 'sm' : icon.size <= 80 ? 'md' : icon.size <= 100 ? 'lg' : 'xl'}
              solid={true}
              randomRotation={false}
            />
          </div>
        );
      })}
    </div>
  );
}

interface GamingIconClusterProps {
  count?: number;
  centerX?: number;
  centerY?: number;
  spread?: number;
  types?: GamingIconType[];
  className?: string;
}

export function GamingIconCluster({
  count = 5,
  centerX = 50,
  centerY = 50,
  spread = 100,
  types,
  className = '',
}: GamingIconClusterProps) {
  const [icons, setIcons] = useState<RandomGamingIcon[]>([]);

  useEffect(() => {
    const generatedIcons: RandomGamingIcon[] = [];
    const iconTypes = types || Array.from({ length: count }, () => getRandomGamingIconType());

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const distance = Math.random() * spread;
      
      generatedIcons.push({
        id: i,
        type: iconTypes[i % iconTypes.length],
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: getRandomSize(30, 60),
        rotation: getRandomRotation(),
        opacity: getRandomOpacity(0.1, 0.3),
      });
    }

    setIcons(generatedIcons);
  }, [count, centerX, centerY, spread, types]);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            transform: `rotate(${icon.rotation}deg)`,
            opacity: icon.opacity,
          }}
        >
          <GamingIcon
            type={icon.type}
            size="md"
            solid={true}
            randomRotation={false}
          />
        </div>
      ))}
    </div>
  );
}

