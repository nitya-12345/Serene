import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, RotateCw, Info } from 'lucide-react';

interface HotspotData {
  position: [number, number, number];
  label: string;
  description: string;
}

const Product3DModel: React.FC<{ color: string }> = ({ color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 0.2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh position={[0, 0, -0.15]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial
          color="#F5F5F7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
};

interface Product3DViewerProps {
  productTitle: string;
  series: string;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  series
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHotspot, setShowHotspot] = useState<number | null>(null);

  const seriesColors: { [key: string]: string } = {
    Sleep: '#BDAAFF',
    Focus: '#FFCE6B',
    Mood: '#F8E7C6',
    Collection: '#BDAAFF'
  };

  const hotspots: HotspotData[] = [
    {
      position: [0, 0.5, 0.2],
      label: 'Essential Oil Blend',
      description: 'Premium essential oils infused into the patch material'
    },
    {
      position: [-0.5, -0.5, 0.2],
      label: 'Adhesive Layer',
      description: 'Skin-safe, biodegradable adhesive for comfortable wear'
    }
  ];

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] bg-gradient-to-br from-[#F5F5F7] to-[#FFF9F2] rounded-2xl overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#F8E7C6" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={0.5}
          castShadow
        />

        <Product3DModel color={seriesColors[series] || '#BDAAFF'} />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          minDistance={3}
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-3 rounded-xl backdrop-blur-md transition-all ${
            autoRotate
              ? 'bg-[#BDAAFF] text-white'
              : 'bg-white/80 text-[#111217] hover:bg-white'
          }`}
          aria-label="Toggle auto-rotate"
          title="Toggle auto-rotate"
        >
          <RotateCw className="w-5 h-5" />
        </button>

        <button
          className="p-3 bg-white/80 backdrop-blur-md rounded-xl hover:bg-white transition-colors text-[#111217]"
          aria-label="View fullscreen"
          title="View fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
        <p className="text-sm text-gray-600 mb-1">Interactive 3D Model</p>
        <p className="text-xs text-gray-500">
          Drag to rotate • Scroll to zoom
        </p>
      </div>

      {showHotspot !== null && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-4 shadow-xl max-w-xs">
          <button
            onClick={() => setShowHotspot(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <Info className="w-4 h-4" />
          </button>
          <h4 className="font-bold text-[#111217] mb-2">
            {hotspots[showHotspot].label}
          </h4>
          <p className="text-sm text-gray-600">
            {hotspots[showHotspot].description}
          </p>
        </div>
      )}
    </div>
  );
};
