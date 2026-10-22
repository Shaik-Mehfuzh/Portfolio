import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Spatial3DCanvas: React.FC = () => {
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

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f0b1e, 0.03);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // 3. Ambient & Volumetric Lighting with Sunset / Twilight Palette
    const ambientLight = new THREE.AmbientLight(0x2a1b40, 1.4);
    scene.add(ambientLight);

    // Warm golden sunset key light
    const sunsetLight = new THREE.DirectionalLight(0xfb923c, 3.2);
    sunsetLight.position.set(12, 10, 12);
    scene.add(sunsetLight);

    // Twilight violet rim light
    const violetLight = new THREE.DirectionalLight(0xa855f7, 2.4);
    violetLight.position.set(-10, -6, 8);
    scene.add(violetLight);

    // Alpine cyan fill
    const alpineLight = new THREE.PointLight(0x38bdf8, 2.0, 30);
    alpineLight.position.set(0, 5, 5);
    scene.add(alpineLight);

    // 4. Floating 3D Geometric Objects Group
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    // Create a series of distinct 3D geometric polyhedra
    const geometries = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.DodecahedronGeometry(1.0, 0),
      new THREE.TorusGeometry(1.2, 0.25, 16, 32),
      new THREE.TetrahedronGeometry(1.1, 0),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0x9f1239,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0369a1,
        emissiveIntensity: 0.6,
        roughness: 0.15,
        metalness: 0.9,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xb45309,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.7,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.5,
        roughness: 0.25,
        metalness: 0.85,
      }),
    ];

    const floatingMeshes: Array<{
      mesh: THREE.Mesh;
      speedX: number;
      speedY: number;
      speedZ: number;
      baseY: number;
      radius: number;
      angle: number;
    }> = [];

    const polyCount = isSoftwareGl ? 8 : 16;
    for (let i = 0; i < polyCount; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / polyCount) * Math.PI * 2;
      const radius = 6.5 + (i % 3) * 3.5;
      const baseY = ((i % 5) - 2) * 5;

      mesh.position.set(
        Math.cos(angle) * radius,
        baseY + (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 12
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = 0.5 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      spaceGroup.add(mesh);

      floatingMeshes.push({
        mesh,
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        speedZ: (Math.random() - 0.5) * 0.015,
        baseY: mesh.position.y,
        radius,
        angle,
      });
    }

    // 5. Particulate Dust Field (Twilight & Sunset Embers)
    const particleCount = isSoftwareGl ? 120 : 350;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emberColors = [
      new THREE.Color(0xfb923c), // warm amber
      new THREE.Color(0xf43f5e), // dusk rose
      new THREE.Color(0xc084fc), // lavender violet
      new THREE.Color(0x38bdf8), // alpine blue
    ];

    for (let p = 0; p < particleCount; p++) {
      positions[p * 3] = (Math.random() - 0.5) * 40;
      positions[p * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[p * 3 + 2] = (Math.random() - 0.5) * 30;

      const chosenColor = emberColors[p % emberColors.length];
      colors[p * 3] = chosenColor.r;
      colors[p * 3 + 1] = chosenColor.g;
      colors[p * 3 + 2] = chosenColor.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 6. Interactive Scroll and Mouse State
    let scrollY = window.scrollY;
    let targetCameraY = 0;
    let targetCameraRotZ = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      // Translate 3D space with scroll progression
      targetCameraY = -progress * 25;
      targetCameraRotZ = (progress - 0.5) * 0.25;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 7. Render Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation based on scroll position
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraY, 3, delta);
      camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, targetCameraRotZ, 2.5, delta);

      // Smooth mouse parallax
      spaceGroup.rotation.x = THREE.MathUtils.damp(spaceGroup.rotation.x, targetRotX, 3, delta);
      spaceGroup.rotation.y = THREE.MathUtils.damp(
        spaceGroup.rotation.y,
        time * 0.05 + targetRotY,
        3,
        delta
      );

      // Animate individual 3D objects
      for (let i = 0; i < floatingMeshes.length; i++) {
        const item = floatingMeshes[i];
        item.mesh.rotation.x += item.speedX * 2;
        item.mesh.rotation.y += item.speedY * 2;
        item.mesh.rotation.z += item.speedZ;

        // Vertical floating oscillation
        item.mesh.position.y = item.baseY + Math.sin(time * 0.8 + i) * 0.6;
      }

      // Slowly rotate particle field
      particles.rotation.y = time * 0.02;
      particles.rotation.x = Math.sin(time * 0.05) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
