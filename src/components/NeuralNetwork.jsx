import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function NeuralNetwork() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    // WebGL Renderer with Alpha (Transparent Background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0d9488, 2, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xF59E0B, 1.5, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // --- Neural Network Structure ---
    const nodeCount = 45;
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Node materials
    const tealMaterial = new THREE.MeshPhongMaterial({
      color: 0x0d9488,
      emissive: 0x0a6c63,
      shininess: 30,
      transparent: true,
      opacity: 0.9,
    });

    const amberMaterial = new THREE.MeshPhongMaterial({
      color: 0xF59E0B,
      emissive: 0xb47105,
      shininess: 30,
      transparent: true,
      opacity: 0.9,
    });

    const sphereGeometry = new THREE.SphereGeometry(0.12, 16, 16);

    // Create Nodes
    for (let i = 0; i < nodeCount; i++) {
      // Pick color theme
      const isAmber = Math.random() > 0.65;
      const mesh = new THREE.Mesh(sphereGeometry, isAmber ? amberMaterial : tealMaterial);
      
      // Position nodes in a 3D spherical cluster
      const radius = 4 + Math.random() * 2;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) * 0.7; // Flatten slightly on Z-axis

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
      });
    }

    // --- Dynamic Connections (Lines) ---
    // We will draw connections between nodes that are close to each other.
    const maxDistance = 2.8;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0d9488,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    // We pre-allocate space for maximum possible connections
    const maxConnections = 200;
    const lineGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(maxConnections * 2 * 3); // 2 points per line, 3 coords per point
    const colorArray = new Float32Array(maxConnections * 2 * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      linewidth: 1 // WebGL ignored in most browsers, but good design standard
    }));
    scene.add(lineSegments);

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const mouseRadius = 3.5;

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x * 6, y * 6); // Scale to 3D units
    };

    container.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Subtle parallax rotation of the entire group based on mouse
      nodeGroup.rotation.y = mouse.x * 0.05;
      nodeGroup.rotation.x = -mouse.y * 0.05;

      // 1. Move Nodes Organically (Floating motion + mouse pull)
      nodes.forEach((node) => {
        const mesh = node.mesh;
        
        // Organic sine wave floating offset
        const timeFactor = elapsedTime * node.speed;
        const offsetX = Math.sin(timeFactor + node.phase) * 0.15;
        const offsetY = Math.cos(timeFactor * 0.8 + node.phase) * 0.15;
        const offsetZ = Math.sin(timeFactor * 1.2 + node.phase) * 0.15;

        // Base Position
        const targetPos = node.basePos.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ));

        // Mouse Proximity Attraction
        const mouse3D = new THREE.Vector3(mouse.x, mouse.y, 0);
        // Project node to screen-ish coordinates or check 3D distance
        const distToMouse = targetPos.distanceTo(mouse3D);
        if (distToMouse < mouseRadius) {
          // Attract nodes slightly towards mouse
          const pullStrength = (1.0 - distToMouse / mouseRadius) * 0.4;
          const pullDir = mouse3D.clone().sub(targetPos).normalize();
          targetPos.add(pullDir.multiplyScalar(pullStrength));
          
          // Node pulse scale
          node.pulseScale += (1.3 - node.pulseScale) * 0.1;
        } else {
          node.pulseScale += (1.0 - node.pulseScale) * 0.1;
        }

        // Apply scale
        mesh.scale.setScalar(node.pulseScale);

        // Smoothly interpolate position
        mesh.position.lerp(targetPos, 0.08);
      });

      // 2. Update Lines & Connections dynamically
      let connectionIdx = 0;
      const positions = lineGeometry.attributes.position.array;
      const colors = lineGeometry.attributes.color.array;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (connectionIdx >= maxConnections) break;

          const posA = nodes[i].mesh.position;
          const posB = nodes[j].mesh.position;
          const dist = posA.distanceTo(posB);

          if (dist < maxDistance) {
            // Draw connection
            const idx = connectionIdx * 6;
            
            // Set coordinates for Node A
            positions[idx] = posA.x;
            positions[idx + 1] = posA.y;
            positions[idx + 2] = posA.z;
            
            // Set coordinates for Node B
            positions[idx + 3] = posB.x;
            positions[idx + 4] = posB.y;
            positions[idx + 5] = posB.z;

            // Colors transition based on node type
            const colA = nodes[i].mesh.material.color;
            const colB = nodes[j].mesh.material.color;

            // Connection opacity fade based on distance
            const fade = 1.0 - dist / maxDistance;
            
            // Highlight connections that are closer to mouse
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

      // Zero out the remaining positions if connections are less than maxConnections
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

    // --- Resize Handler ---
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose materials & geometries
      sphereGeometry.dispose();
      tealMaterial.dispose();
      amberMaterial.dispose();
      lineMaterial.dispose();
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
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0,
        zIndex: 1,
        pointerEvents: 'auto'
      }} 
    />
  );
}
