import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralSceneProps {
  interactive?: boolean;
  className?: string;
}

export const NeuralScene: React.FC<NeuralSceneProps> = ({ interactive = true, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    // 4. Construct Neural Nodes & Synapses Group
    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    const nodeCount = isSoftwareGl ? 35 : 60;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];

    // Distinct materials with varying metallic/roughness and soft glow
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.6,
    });

    const sphereGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const largeSphereGeom = new THREE.SphereGeometry(0.24, 20, 20);

    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral distribution in sphere
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 3.6 + Math.sin(i * 1.7) * 1.2;

      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.8,
        radius * Math.cos(phi)
      );

      nodePositions.push(pos);

      const isLarge = i % 5 === 0;
      const mesh = new THREE.Mesh(isLarge ? largeSphereGeom : sphereGeom, isLarge ? accentMat : coreMat);
      mesh.position.copy(pos);
      neuralGroup.add(mesh);
      nodeSpheres.push(mesh);
    }

    // Connect close neighbors with luminous synaptic lines
    const linePositions: number[] = [];
    const maxDistance = 2.4;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(lineGeom, lineMat);
    neuralGroup.add(linesMesh);

    // Inner glowing intelligence core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreWireMat);
    neuralGroup.add(innerCore);

    // Ambient dust particles
    const particleCount = isSoftwareGl ? 80 : 180;
    const particleGeom = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particleCoords[p] = (Math.random() - 0.5) * 16;
      particleCoords[p + 1] = (Math.random() - 0.5) * 12;
      particleCoords[p + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);

    // 5. Interactive pointer & motion
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth dampening towards target mouse rotation
      currentRotX = THREE.MathUtils.damp(currentRotX, targetRotX, 4, delta);
      currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY, 4, delta);

      // Autonomous gentle spin + mouse parallax
      neuralGroup.rotation.y = time * 0.12 + currentRotY;
      neuralGroup.rotation.x = Math.sin(time * 0.2) * 0.1 + currentRotX;

      // Inner core counter rotation and breath
      innerCore.rotation.y = -time * 0.18;
      innerCore.rotation.z = time * 0.08;
      const scale = 1 + Math.sin(time * 1.5) * 0.04;
      innerCore.scale.set(scale, scale, scale);

      // Subtle particle drift
      particlePoints.rotation.y = time * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      sphereGeom.dispose();
      largeSphereGeom.dispose();
      coreGeo.dispose();
      lineGeom.dispose();
      particleGeom.dispose();
      coreMat.dispose();
      accentMat.dispose();
      coreWireMat.dispose();
      lineMat.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};
