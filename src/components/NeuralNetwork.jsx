import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function NeuralNetwork({ evolutionLevel = 0.2 }) {
  const containerRef = useRef(null);
  const evolutionRef = useRef(evolutionLevel);

  // Keep evolutionRef in sync with prop without re-running setup
  useEffect(() => {
    evolutionRef.current = evolutionLevel;
  }, [evolutionLevel]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0d9488, 2, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xF59E0B, 1.5, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Neural Network structure — 50 total nodes
    const nodeCount = 50;
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const tealMaterial = new THREE.MeshPhongMaterial({
      color: 0x0d9488, emissive: 0x0a6c63, shininess: 30, transparent: true, opacity: 0.9,
    });
    const amberMaterial = new THREE.MeshPhongMaterial({
      color: 0xF59E0B, emissive: 0xb47105, shininess: 30, transparent: true, opacity: 0.9,
    });
    const sphereGeometry = new THREE.SphereGeometry(0.12, 16, 16);

    for (let i = 0; i < nodeCount; i++) {
      const isAmber = Math.random() > 0.65;
      const mesh = new THREE.Mesh(sphereGeometry, isAmber ? amberMaterial : tealMaterial);

      const radius = 4 + Math.random() * 2;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) * 0.7;

      mesh.position.set(x, y, z);
      nodeGroup.add(mesh);

      nodes.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        pulseScale: 1.0,
        // Normalized index (0-1) — used to determine when this node "lights up"
        activationThreshold: i / nodeCount,
      });
    }

    // Dynamic connections
    const maxConnections = 250;
    const lineGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(maxConnections * 2 * 3);
    const colorArray = new Float32Array(maxConnections * 2 * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending,
    }));
    scene.add(lineSegments);

    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const mouseRadius = 3.5;

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x * 6, y * 6);
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animationFrameId;
    const clock = new THREE.Clock();
    // Dynamic connection distance changes with evolution
    const baseMaxDist = 2.2;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const evo = evolutionRef.current; // 0-1

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      nodeGroup.rotation.y = mouse.x * 0.05;
      nodeGroup.rotation.x = -mouse.y * 0.05;

      // Dynamic connection distance based on evolution
      const maxDist = baseMaxDist + evo * 1.4;

      nodes.forEach((node, i) => {
        const mesh = node.mesh;
        const timeFactor = elapsedTime * node.speed;
        const offsetX = Math.sin(timeFactor + node.phase) * 0.15;
        const offsetY = Math.cos(timeFactor * 0.8 + node.phase) * 0.15;
        const offsetZ = Math.sin(timeFactor * 1.2 + node.phase) * 0.15;

        const targetPos = node.basePos.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ));

        const mouse3D = new THREE.Vector3(mouse.x, mouse.y, 0);
        const distToMouse = targetPos.distanceTo(mouse3D);
        if (distToMouse < mouseRadius) {
          const pullStrength = (1.0 - distToMouse / mouseRadius) * 0.4;
          const pullDir = mouse3D.clone().sub(targetPos).normalize();
          targetPos.add(pullDir.multiplyScalar(pullStrength));
          node.pulseScale += (1.3 - node.pulseScale) * 0.1;
        } else {
          node.pulseScale += (1.0 - node.pulseScale) * 0.1;
        }

        // Evolution-based opacity: nodes activate progressively
        const isActive = node.activationThreshold <= evo;
        const targetOpacity = isActive ? 0.9 : Math.max(0.05, evo * 0.3);
        mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.04;

        mesh.scale.setScalar(node.pulseScale);
        mesh.position.lerp(targetPos, 0.08);
      });

      // Update connections
      let connectionIdx = 0;
      const positions = lineGeometry.attributes.position.array;
      const colors = lineGeometry.attributes.color.array;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (connectionIdx >= maxConnections) break;

          const posA = nodes[i].mesh.position;
          const posB = nodes[j].mesh.position;
          const dist = posA.distanceTo(posB);

          if (dist < maxDist) {
            const idx = connectionIdx * 6;
            positions[idx] = posA.x; positions[idx + 1] = posA.y; positions[idx + 2] = posA.z;
            positions[idx + 3] = posB.x; positions[idx + 4] = posB.y; positions[idx + 5] = posB.z;

            const colA = nodes[i].mesh.material.color;
            const colB = nodes[j].mesh.material.color;
            const fade = (1.0 - dist / maxDist) * evo;

            const center = posA.clone().add(posB).multiplyScalar(0.5);
            const mouse3D = new THREE.Vector3(mouse.x, mouse.y, 0);
            const mouseDist = center.distanceTo(mouse3D);
            const mouseHighlight = mouseDist < mouseRadius ? (1.0 - mouseDist / mouseRadius) * 1.5 + 1.0 : 1.0;

            colors[idx] = colA.r * fade * mouseHighlight;
            colors[idx + 1] = colA.g * fade * mouseHighlight;
            colors[idx + 2] = colA.b * fade * mouseHighlight;
            colors[idx + 3] = colB.r * fade * mouseHighlight;
            colors[idx + 4] = colB.g * fade * mouseHighlight;
            colors[idx + 5] = colB.b * fade * mouseHighlight;

            connectionIdx++;
          }
        }
      }

      for (let k = connectionIdx; k < maxConnections; k++) {
        const idx = k * 6;
        positions[idx] = 0; positions[idx + 1] = 0; positions[idx + 2] = 0;
        positions[idx + 3] = 0; positions[idx + 4] = 0; positions[idx + 5] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      sphereGeometry.dispose();
      tealMaterial.dispose();
      amberMaterial.dispose();
      lineGeometry.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'auto' }}
    />
  );
}
