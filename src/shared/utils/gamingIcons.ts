import { GamingIconType } from '../components/ui/GamingIcons';

/**
 * Genera un tipo de icono gaming aleatorio
 */
export function getRandomGamingIconType(): GamingIconType {
  const icons: GamingIconType[] = [
    'gamepad',
    'joystick',
    'mouse',
    'keyboard',
    'headphones',
    'monitor',
    'controller',
    'trophy',
    'zap',
    'shield',
    'star',
    'cpu',
    'gpu',
  ];
  return icons[Math.floor(Math.random() * icons.length)];
}

/**
 * Genera una rotación aleatoria entre -15° y +15°
 */
export function getRandomRotation(): number {
  return Math.floor(Math.random() * 31) - 15;
}

/**
 * Genera una posición aleatoria dentro de un contenedor
 */
export function getRandomPosition(width: number, height: number) {
  return {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };
}

/**
 * Genera opacidad aleatoria entre 0.1 y 0.3 para decorativos
 */
export function getRandomOpacity(min = 0.1, max = 0.3): number {
  return Math.random() * (max - min) + min;
}

/**
 * Genera tamaño aleatorio para iconos decorativos
 */
export function getRandomSize(min = 40, max = 120): number {
  return Math.floor(Math.random() * (max - min) + min);
}

