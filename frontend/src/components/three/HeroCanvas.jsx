import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BridgeNodes = () => {
  const groupRef = useRef();
  const midGroupRef = useRef();
  const clientRef = useRef();
  const workerRef = useRef();
  const bridgeLineRef = useRef();
  
  const { mouse } = useThree();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Colors
  const copper = new THREE.Color(0xc9793b);
  const blue = new THREE.Color(0x4a8a90);
  const paper = new THREE.Color(0xede7dc);

  // Mid nodes data
  const midCount = 7;
  const midNodesData = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < midCount; i++) {
      const t = (i + 1) / (midCount + 1);
      const x = THREE.MathUtils.lerp(-5.2, 5.2, t);
      const archY = Math.sin(t * Math.PI) * 2.6 + THREE.MathUtils.lerp(0.6, -0.4, t);
      const z = Math.sin(t * Math.PI * 2) * 0.8;
      nodes.push({
        x,
        baseY: archY,
        z,
        size: 0.28 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return nodes;
  }, []);

  const midRefs = useRef(midNodesData.map(() => React.createRef()));
  const supportLineRefs = useRef(midNodesData.map(() => React.createRef()));

  // Particle field
  const starCount = 180;
  const starPos = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    
    const t = clock.getElapsedTime();

    // Animate mid nodes
    midRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const data = midNodesData[index];
        ref.current.position.y = data.baseY + Math.sin(t * 0.8 + data.phase) * 0.12;
        ref.current.rotation.x += 0.004;
        ref.current.rotation.y += 0.006;
      }
    });

    if (clientRef.current) clientRef.current.rotation.y += 0.004;
    if (workerRef.current) workerRef.current.rotation.y += 0.004;

    // Update bridge line
    if (bridgeLineRef.current) {
      const positions = [];
      if (clientRef.current) positions.push(clientRef.current.position);
      midRefs.current.forEach((ref) => {
        if (ref.current) positions.push(ref.current.position);
      });
      if (workerRef.current) positions.push(workerRef.current.position);
      
      bridgeLineRef.current.geometry.setFromPoints(positions);
    }

    // Update support lines
    supportLineRefs.current.forEach((ref, index) => {
      if (ref.current && midRefs.current[index]?.current) {
        const data = midNodesData[index];
        const currentPos = midRefs.current[index].current.position;
        ref.current.setFromPoints([
          currentPos,
          new THREE.Vector3(data.x, -3.2, data.z)
        ]);
      }
    });

    // Parallax mouse rotation
    if (groupRef.current) {
      // Three.js mouse coordinates are -1 to 1. The original code used 0 to 1 based clientX.
      // In R3F, mouse.x/y is already -1 to 1.
      groupRef.current.rotation.y = -0.15 + (mouse.x * 0.5) * 0.25;
      groupRef.current.rotation.x = -(mouse.y * 0.5) * 0.1;
    }
  });

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={starPos}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={0x8c8375} size={0.035} transparent opacity={0.5} />
      </points>
      
      <group ref={groupRef} rotation={[0, -0.15, 0]}>
        {/* Client Node */}
        <mesh ref={clientRef} position={[-5.2, 0.6, 0]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color={blue} wireframe transparent opacity={0.9} />
        </mesh>
        
        {/* Worker Node */}
        <mesh ref={workerRef} position={[5.2, -0.4, 0]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color={copper} wireframe transparent opacity={0.9} />
        </mesh>
        
        {/* Mid Nodes & Supports */}
        <group ref={midGroupRef}>
          {midNodesData.map((data, i) => (
            <group key={i}>
              <mesh ref={midRefs.current[i]} position={[data.x, data.baseY, data.z]}>
                <icosahedronGeometry args={[data.size, 1]} />
                <meshBasicMaterial color={paper} wireframe transparent opacity={0.9} />
              </mesh>
              {/* Support lines */}
              <line>
                <bufferGeometry ref={supportLineRefs.current[i]} />
                <lineBasicMaterial color={0x8c8375} transparent opacity={0.15} />
              </line>
            </group>
          ))}
        </group>
        
        {/* Main Bridge Line */}
        <line ref={bridgeLineRef}>
          <bufferGeometry />
          <lineBasicMaterial color={0x8c8375} transparent opacity={0.35} />
        </line>
      </group>
    </>
  );
};

const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 1.2, 13], fov: 45 }}>
        <BridgeNodes />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
