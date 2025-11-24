import { HTMLAttributes } from 'react';
import { 
  Gamepad2, 
  MousePointer, 
  Keyboard, 
  Headphones, 
  Monitor, 
  Trophy, 
  Zap, 
  Shield,
  Star,
  Cpu,
  HardDrive,
  Joystick
} from 'lucide-react';
import { cn } from '../../utils/cn';

export type GamingIconType = 
  | 'gamepad' 
  | 'joystick' 
  | 'mouse' 
  | 'keyboard' 
  | 'headphones' 
  | 'monitor'
  | 'controller'
  | 'trophy' 
  | 'zap' 
  | 'shield' 
  | 'star' 
  | 'cpu' 
  | 'gpu';

interface GamingIconProps extends HTMLAttributes<HTMLDivElement> {
  type: GamingIconType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  solid?: boolean;
  randomRotation?: boolean;
  color?: string;
}

const iconMap = {
  gamepad: Gamepad2,
  joystick: Joystick,
  mouse: MousePointer,
  keyboard: Keyboard,
  headphones: Headphones,
  monitor: Monitor,
  controller: Gamepad2,
  trophy: Trophy,
  zap: Zap,
  shield: Shield,
  star: Star,
  cpu: Cpu,
  gpu: HardDrive,
};

const sizeMap = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export function GamingIcon({
  type,
  size = 'md',
  solid = true,
  randomRotation = false,
  color,
  className,
  ...props
}: GamingIconProps) {
  const IconComponent = iconMap[type] || Gamepad2;
  
  // Rotación aleatoria si está habilitada
  const rotation = randomRotation 
    ? Math.floor(Math.random() * 31) - 15 // -15° a +15°
    : 0;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        sizeMap[size],
        className
      )}
      style={{
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
        color: color || 'currentColor',
      }}
      {...props}
    >
      <IconComponent
        className={cn(
          sizeMap[size],
          solid && 'fill-current',
          'transition-transform duration-300'
        )}
        strokeWidth={solid ? 0 : 2}
        fill={solid ? 'currentColor' : 'none'}
      />
    </div>
  );
}

interface GamingIconSetProps extends HTMLAttributes<HTMLDivElement> {
  types?: GamingIconType[];
  count?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  randomRotation?: boolean;
}

export function GamingIconSet({
  types = ['gamepad', 'joystick', 'mouse', 'keyboard', 'headphones', 'monitor', 'trophy', 'zap', 'shield', 'cpu', 'gpu'],
  count = 3,
  size = 'md',
  randomRotation = true,
  className,
  ...props
}: GamingIconSetProps) {
  const selectedTypes = Array.from({ length: count }, () => 
    types[Math.floor(Math.random() * types.length)]
  );

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {selectedTypes.map((type, index) => (
        <GamingIcon
          key={`${type}-${index}`}
          type={type}
          size={size}
          solid={true}
          randomRotation={randomRotation}
        />
      ))}
    </div>
  );
}

