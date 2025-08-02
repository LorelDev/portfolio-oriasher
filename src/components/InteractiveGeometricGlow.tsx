import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

interface GeometricGlowProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
  mouseSensitivity?: number;
}

// Geometric shape component
const GeometricShape = ({ 
  position, 
  rotation, 
  scale, 
  color, 
  opacity,
  shape = 'sphere',
  mousePosition,
  index 
}: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Very subtle rotation animation
      meshRef.current.rotation.x = rotation[0] + time * 0.02 * (index % 2 === 0 ? 1 : -1);
      meshRef.current.rotation.y = rotation[1] + time * 0.03 * (index % 3 === 0 ? 1 : -1);
      meshRef.current.rotation.z = rotation[2] + time * 0.01;
      
      // Very subtle mouse/tilt interaction
      if (mousePosition) {
        const parallaxStrength = 0.005 + (index * 0.001);
        meshRef.current.position.x = position[0] + mousePosition.x * parallaxStrength * (index % 2 === 0 ? 1 : -1);
        meshRef.current.position.y = position[1] + mousePosition.y * parallaxStrength * (index % 3 === 0 ? 1 : -1);
      }
      
      // Very subtle breathing effect
      const breathingScale = 1 + Math.sin(time * 1.5 + index) * 0.02;
      meshRef.current.scale.setScalar(scale * breathingScale);
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1, 0);
      default:
        return new THREE.SphereGeometry(1, 16, 16);
    }
  }, [shape]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: opacity * 0.15, // Much more subtle
      roughness: 0.8,
      metalness: 0.1,
      emissive: color,
      emissiveIntensity: 0.05 // Very low emission
    });
  }, [color, opacity]);

  return (
    <Float
      speed={0.5 + index * 0.1} // Slower movement
      rotationIntensity={0.1} // Less rotation
      floatIntensity={0.05} // Minimal floating
    >
      <mesh
        ref={meshRef}
        position={position}
        geometry={geometry}
        material={material}
      />
    </Float>
  );
};

// Device orientation hook for mobile
const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile || typeof window === 'undefined') return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;
      if (beta !== null && gamma !== null) {
        // Normalize to -1 to 1 range with smaller movement
        setOrientation({
          x: Math.max(-1, Math.min(1, gamma / 45)), // Less sensitive
          y: Math.max(-1, Math.min(1, (beta - 45) / 45)) // Adjusted for portrait mode
        });
      }
    };

    // Request permission for iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);

  return orientation;
};

// Scene component
const Scene = ({ intensity, speed, mouseSensitivity }: Omit<GeometricGlowProps, 'children'>) => {
  const { viewport } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();

  // Use device orientation on mobile, mouse on desktop
  const interactionPosition = isMobile ? orientation : mousePosition;

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      setMousePosition({ 
        x: x * (mouseSensitivity || 1), 
        y: y * (mouseSensitivity || 1) 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseSensitivity]);

  // Generate subtle geometric shapes
  const shapes = useMemo(() => {
    const shapeTypes = ['sphere', 'box', 'octahedron', 'tetrahedron'];
    const colors = ['#60a5fa', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    
    return Array.from({ length: 12 }, (_, i) => ({ // More shapes but smaller
      id: i,
      position: [
        (Math.random() - 0.5) * viewport.width * 3, // Spread wider
        (Math.random() - 0.5) * viewport.height * 3,
        (Math.random() - 0.5) * 6 - 2 // Further back
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.2, // Much smaller
      color: colors[i % colors.length],
      opacity: 0.3 + Math.random() * 0.4, // Will be further reduced by material
      shape: shapeTypes[i % shapeTypes.length]
    }));
  }, [viewport]);

  return (
    <>
      {/* Very subtle ambient lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.1} />
      <pointLight position={[-10, -10, -10]} intensity={0.05} color="#8b5cf6" />
      
      {/* Geometric shapes */}
      {shapes.map((shape) => (
        <GeometricShape
          key={shape.id}
          index={shape.id}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale * (intensity || 1)}
          color={shape.color}
          opacity={shape.opacity * (intensity || 1)}
          shape={shape.shape}
          mousePosition={interactionPosition}
        />
      ))}
      
      {/* Post-processing effects */}
      <fog attach="fog" args={['#000000', 8, 25]} />
    </>
  );
};

// Main component
const InteractiveGeometricGlow: React.FC<GeometricGlowProps> = ({ 
  children, 
  intensity = 1, 
  speed = 1, 
  mouseSensitivity = 1 
}) => {
  return (
    <div className="relative">
      {/* Three.js Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          style={{ 
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            premultipliedAlpha: false
          }}
        >
          <Scene 
            intensity={intensity} 
            speed={speed} 
            mouseSensitivity={mouseSensitivity} 
          />
        </Canvas>
      </div>
      
      {/* Content (profile image) */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Very subtle glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.01) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.005) 0%, transparent 40%)
          `,
          filter: 'blur(2px)',
          opacity: intensity * 0.3
        }}
      />
    </div>
  );
};

export default InteractiveGeometricGlow;