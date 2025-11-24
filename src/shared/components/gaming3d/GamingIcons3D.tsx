import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh, Vector3 } from 'three';

export type GamingIcon3DType = 
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

interface GamingIcon3DProps {
  type: GamingIcon3DType;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  opacity?: number;
  speed?: number;
}

// Componente de grupo para iconos complejos
function IconGroup({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <group {...props}>{children}</group>;
}

export function GamingIcon3D({ 
  type, 
  position, 
  rotation = [0, 0, 0],
  scale = 1,
  color = '#00ffff',
  opacity = 0.3,
  speed = 1
}: GamingIcon3DProps) {
  const groupRef = useRef<Group>(null);
  
  // Velocidades aleatorias para movimiento tipo asteroide
  const velocities = useMemo(() => ({
    rotation: new Vector3(
      (Math.random() - 0.5) * 0.02 * speed,
      (Math.random() - 0.5) * 0.02 * speed,
      (Math.random() - 0.5) * 0.02 * speed
    ),
    drift: new Vector3(
      (Math.random() - 0.5) * 0.001 * speed,
      (Math.random() - 0.5) * 0.001 * speed,
      (Math.random() - 0.5) * 0.001 * speed
    ),
    float: Math.sin(Math.random() * Math.PI * 2) * 0.001 * speed,
  }), [speed]);

  const floatOffset = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    
    // Rotación tipo asteroide
    group.rotation.x += velocities.rotation.x * delta * 60;
    group.rotation.y += velocities.rotation.y * delta * 60;
    group.rotation.z += velocities.rotation.z * delta * 60;
    
    // Deriva flotante
    floatOffset.current += velocities.float * delta * 60;
    group.position.y += Math.sin(floatOffset.current) * 0.001 * speed;
    
    // Movimiento de deriva suave
    group.position.x += velocities.drift.x * delta * 60;
    group.position.z += velocities.drift.z * delta * 60;
    
    // Wrap-around (si sale de bounds, reaparece del otro lado)
    if (group.position.x > 10) group.position.x = -10;
    if (group.position.x < -10) group.position.x = 10;
    if (group.position.z > 10) group.position.z = -10;
    if (group.position.z < -10) group.position.z = 10;
  });

  // Renderizar diferentes formas 3D según el tipo
  const renderIcon = () => {
    switch (type) {
      case 'gamepad':
      case 'controller':
        return <boxGeometry args={[1, 0.6, 0.2]} />;
      case 'joystick':
        return (
          <IconGroup>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.8, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.15, 0.25, 0.3, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
          </IconGroup>
        );
      case 'mouse':
        return <boxGeometry args={[0.8, 0.4, 1.2]} />;
      case 'keyboard':
        return <boxGeometry args={[2, 0.3, 0.8]} />;
      case 'headphones':
        return (
          <IconGroup>
            <mesh position={[-0.3, 0, 0]}>
              <torusGeometry args={[0.4, 0.1, 16, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.3, 0, 0]}>
              <torusGeometry args={[0.4, 0.1, 16, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.6, 0.3, 0.3]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
          </IconGroup>
        );
      case 'monitor':
        return (
          <IconGroup>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[2, 1.5, 0.2]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[0.8, 0.6, 0.4]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
          </IconGroup>
        );
      case 'trophy':
        return (
          <IconGroup>
            <mesh position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.5, 0.3, 1, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <torusGeometry args={[0.6, 0.05, 16, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.4, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} opacity={opacity} transparent metalness={0.8} roughness={0.2} />
            </mesh>
          </IconGroup>
        );
      case 'zap':
        return <octahedronGeometry args={[0.8, 0]} />;
      case 'shield':
        return <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />;
      case 'star':
        return <octahedronGeometry args={[0.6, 1]} />;
      case 'cpu':
      case 'gpu':
        return <boxGeometry args={[1, 0.3, 1]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const iconContent = renderIcon();
  const isGroup = type === 'joystick' || type === 'headphones' || type === 'monitor' || type === 'trophy';

  if (isGroup) {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {iconContent}
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh>
        {iconContent}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          opacity={opacity}
          transparent
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

