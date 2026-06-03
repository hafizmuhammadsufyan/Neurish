import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function NeuralNetwork({ scrollEvolve = false, mode = 'normal' }) {
  const containerRef = useRef(null);
  const modeRef = useRef(mode);

  // Keep mode reference updated for the animation loop
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // --- Scene Setup ---
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0d9488, 3, 30);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xF59E0B, 2, 30);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // --- Brain Lobes Clustered Layout ---
    const nodeCount = 60;
    const nodes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Dynamic Materials (Phongs for premium shading/lighting)
    const tealMaterial = new THREE.MeshPhongMaterial({
      color: 0x0d9488,
      emissive: 0x075e54,
      shininess: 40,
      transparent: true,
      opacity: 0.9,
    });

    const amberMaterial = new THREE.MeshPhongMaterial({
      color: 0xF59E0B,
      emissive: 0xb47105,
      shininess: 40,
      transparent: true,
      opacity: 0.9,
    });

    const sphereGeometry = new THREE.SphereGeometry(0.12, 16, 16);

    // Create Clustered Nodes (Grouping into 3 lobes: Frontal, Sensory/Occipital, Temporal)
    const lobes = [
      { center: new THREE.Vector3(-1.8, 0.5, 0), radius: 2.2, ratio: 0.35 }, // Frontal Lobe
      { center: new THREE.Vector3(1.8, 0.8, 0), radius: 2.0, ratio: 0.35 },  // Sensory / Occipital
      { center: new THREE.Vector3(0, -1.2, 0.5), radius: 1.8, ratio: 0.30 }  // Temporal / Lower Lobe
    ];

    let lobeIdx = 0;
    let accumulatedRatio = 0;

    for (let i = 0; i < nodeCount; i++) {
      const currentRatio = i / nodeCount;
      if (currentRatio > accumulatedRatio + lobes[lobeIdx].ratio && lobeIdx < lobes.length - 1) {
        accumulatedRatio += lobes[lobeIdx].ratio;
        lobeIdx++;
      }

      const lobe = lobes[lobeIdx];
      const radius = Math.random() * lobe.radius;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = lobe.center.x + radius * Math.sin(phi) * Math.cos(theta);
      const y = lobe.center.y + radius * Math.sin(phi) * Math.sin(theta);
      const z = lobe.center.z + radius * Math.cos(phi) * 0.7;

      const isAmber = Math.random() > 0.65;
      const mesh = new THREE.Mesh(sphereGeometry, isAmber ? amberMaterial.clone() : tealMaterial.clone());
      mesh.position.set(x, y, z);
      nodeGroup.add(mesh);

      nodes.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.5,
        pulseScale: 1.0,
        isAmber,
        originalColor: isAmber ? new THREE.Color(0xF59E0B) : new THREE.Color(0x0d9488),
        originalEmissive: isAmber ? new THREE.Color(0xb47105) : new THREE.Color(0x075e54)
      });
    }

    // --- Dynamic Connections (Lines) ---
    const maxConnections = 250;
    const lineGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(maxConnections * 2 * 3);
    const colorArray = new Float32Array(maxConnections * 2 * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      linewidth: 1
    }));
    scene.add(lineSegments);

    // --- Synapse-Style Signaling Pulses ---
    // Pre-allocate small glowing spheres that travel between active node pairs
    const pulseCount = 18;
    const pulses = [];
    const pulseGeometry = new THREE.SphereGeometry(0.06, 8, 8);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < pulseCount; i++) {
      const mesh = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      mesh.visible = false;
      scene.add(mesh);
      pulses.push({
        mesh,
        startNodeIdx: 0,
        endNodeIdx: 0,
        progress: 0,
        speed: 0.5 + Math.random() * 1.0,
        active: false
      });
    }

    // --- Mouse & Scroll Position Tracker ---
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const mouseRadius = 3.5;
    let scrollRatio = 0;

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x * 6, y * 6);
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRatio = window.scrollY / scrollHeight;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    if (scrollEvolve) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Trigger initial scroll check
    }

    // --- Simulator Lerp Parameters ---
    let currentMaxDistance = 2.6;
    let currentPulseSpeed = 1.0;
    let currentLineOpacity = 0.25;
    let currentDriftSpeed = 1.0;
    let currentColorShift = 0.0; // 0 = default, 1 = alternative colors (mode specific)

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Subtle parallax rotation
      nodeGroup.rotation.y = mouse.x * 0.04;
      nodeGroup.rotation.x = -mouse.y * 0.04;

      // Determine target variables based on Simulator Mode
      const currentMode = modeRef.current;
      let targetMaxDistance = 2.6;
      let targetPulseSpeed = 1.2;
      let targetLineOpacity = 0.25;
      let targetDriftSpeed = 0.8;
      let targetColorMode = 'normal'; // normal, gray, warm, indigo

      if (currentMode === 'screentime') {
        targetMaxDistance = 0.8;
        targetPulseSpeed = 0.0;
        targetLineOpacity = 0.05;
        targetDriftSpeed = 0.3;
        targetColorMode = 'gray';
      } else if (currentMode === 'no_interaction') {
        targetMaxDistance = 1.0;
        targetPulseSpeed = 0.1;
        targetLineOpacity = 0.08;
        targetDriftSpeed = 0.2;
        targetColorMode = 'gray';
      } else if (currentMode === 'reading') {
        targetMaxDistance = 3.6;
        targetPulseSpeed = 2.8;
        targetLineOpacity = 0.7;
        targetDriftSpeed = 1.6;
        targetColorMode = 'warm';
      } else if (currentMode === 'communication') {
        targetMaxDistance = 3.4;
        targetPulseSpeed = 2.4;
        targetLineOpacity = 0.6;
        targetDriftSpeed = 1.4;
        targetColorMode = 'warm';
      } else if (currentMode === 'play') {
        targetMaxDistance = 3.2;
        targetPulseSpeed = 2.6;
        targetLineOpacity = 0.65;
        targetDriftSpeed = 1.5;
        targetColorMode = 'normal';
      } else if (currentMode === 'sleep') {
        targetMaxDistance = 2.4;
        targetPulseSpeed = 0.3;
        targetLineOpacity = 0.35;
        targetDriftSpeed = 0.15;
        targetColorMode = 'indigo';
      }

      // Smoothly interpolate parameters (Lerp)
      currentMaxDistance += (targetMaxDistance - currentMaxDistance) * 0.08;
      currentPulseSpeed += (targetPulseSpeed - currentPulseSpeed) * 0.08;
      currentLineOpacity += (targetLineOpacity - currentLineOpacity) * 0.08;
      currentDriftSpeed += (targetDriftSpeed - currentDriftSpeed) * 0.08;
      lineSegments.material.opacity = currentLineOpacity;

      // Scroll-based Evolution Override (Hero / Global page visual)
      // Node visibility and connection density scale up progressively with scroll progress
      let activeNodeCount = nodeCount;
      if (scrollEvolve) {
        // Hero start: 20 nodes, scroll end: 60 nodes
        activeNodeCount = Math.floor(18 + Math.min(scrollRatio * 1.5, 1.0) * (nodeCount - 18));
        // Max connection line range scales up
        const scrollDistanceBonus = Math.min(scrollRatio * 1.5, 1.0) * 1.2;
        currentMaxDistance = 1.5 + scrollDistanceBonus;
      }

      // 1. Update Nodes (Visibility, organic float, mouse reaction, color morphs)
      nodes.forEach((node, idx) => {
        const mesh = node.mesh;
        
        // Handle visibility on scroll
        mesh.visible = idx < activeNodeCount;
        if (!mesh.visible) return;

        // Base float
        const timeFactor = elapsedTime * node.speed * currentDriftSpeed;
        const offsetX = Math.sin(timeFactor + node.phase) * 0.18;
        const offsetY = Math.cos(timeFactor * 0.8 + node.phase) * 0.18;
        const offsetZ = Math.sin(timeFactor * 1.2 + node.phase) * 0.18;

        const targetPos = node.basePos.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ));

        // Mouse proximity reaction: repel slightly
        const mouse3D = new THREE.Vector3(mouse.x, mouse.y, 0);
        const distToMouse = targetPos.distanceTo(mouse3D);
        if (distToMouse < mouseRadius) {
          const repelStrength = (1.0 - distToMouse / mouseRadius) * 0.35;
          const repelDir = targetPos.clone().sub(mouse3D).normalize();
          targetPos.add(repelDir.multiplyScalar(repelStrength));
          node.pulseScale += (1.4 - node.pulseScale) * 0.1;
        } else {
          node.pulseScale += (1.0 - node.pulseScale) * 0.1;
        }

        mesh.scale.setScalar(node.pulseScale);
        mesh.position.lerp(targetPos, 0.08);

        // LERP colors based on the current simulator mode
        let targetColor = node.originalColor;
        let targetEmissive = node.originalEmissive;

        if (targetColorMode === 'gray') {
          // Dull gray
          targetColor = new THREE.Color(0x64748b);
          targetEmissive = new THREE.Color(0x334155);
        } else if (targetColorMode === 'warm') {
          // Glowing warm gold/amber
          targetColor = new THREE.Color(0xffb703);
          targetEmissive = new THREE.Color(0xfb8500);
        } else if (targetColorMode === 'indigo') {
          // Deep peaceful cyan/indigo
          targetColor = new THREE.Color(0x6366f1);
          targetEmissive = new THREE.Color(0x312e81);
        }

        mesh.material.color.lerp(targetColor, 0.08);
        mesh.material.emissive.lerp(targetEmissive, 0.08);
      });

      // 2. Update Lines & active connection coordinate table
      let connectionIdx = 0;
      const positions = lineGeometry.attributes.position.array;
      const colors = lineGeometry.attributes.color.array;
      const activePairs = []; // To feed valid routes into the pulse signaling simulator

      for (let i = 0; i < activeNodeCount; i++) {
        for (let j = i + 1; j < activeNodeCount; j++) {
          if (connectionIdx >= maxConnections) break;

          const posA = nodes[i].mesh.position;
          const posB = nodes[j].mesh.position;
          const dist = posA.distanceTo(posB);

          if (dist < currentMaxDistance) {
            const idx = connectionIdx * 6;
            
            // Set coords
            positions[idx] = posA.x;
            positions[idx + 1] = posA.y;
            positions[idx + 2] = posA.z;
            positions[idx + 3] = posB.x;
            positions[idx + 4] = posB.y;
            positions[idx + 5] = posB.z;

            // Connection opacity fade
            const fade = 1.0 - dist / currentMaxDistance;

            // Proximity synapse illumination around mouse
            const center = posA.clone().add(posB).multiplyScalar(0.5);
            const mouse3D = new THREE.Vector3(mouse.x, mouse.y, 0);
            const mouseDist = center.distanceTo(mouse3D);
            const highlight = mouseDist < mouseRadius ? (1.0 - mouseDist / mouseRadius) * 2.0 + 1.0 : 1.0;

            const colA = nodes[i].mesh.material.color;
            const colB = nodes[j].mesh.material.color;

            colors[idx] = colA.r * fade * highlight;
            colors[idx + 1] = colA.g * fade * highlight;
            colors[idx + 2] = colA.b * fade * highlight;
            colors[idx + 3] = colB.r * fade * highlight;
            colors[idx + 4] = colB.g * fade * highlight;
            colors[idx + 5] = colB.b * fade * highlight;

            activePairs.push({ start: i, end: j });
            connectionIdx++;
          }
        }
      }

      // Clear unused slots
      for (let k = connectionIdx; k < maxConnections; k++) {
        const idx = k * 6;
        positions[idx] = 0; positions[idx + 1] = 0; positions[idx + 2] = 0;
        positions[idx + 3] = 0; positions[idx + 4] = 0; positions[idx + 5] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // 3. Update Synapse Firing Pulses
      pulses.forEach((pulse) => {
        // If pulse is inactive or path broke, re-assign paths if we have connection routes
        if ((!pulse.active || pulse.progress >= 1.0) && activePairs.length > 0) {
          const route = activePairs[Math.floor(Math.random() * activePairs.length)];
          pulse.startNodeIdx = route.start;
          pulse.endNodeIdx = route.end;
          pulse.progress = 0;
          pulse.active = true;
          pulse.mesh.visible = true;
          pulse.speed = 0.6 + Math.random() * 1.5;
        }

        if (pulse.active && currentPulseSpeed > 0) {
          pulse.progress += deltaTime * pulse.speed * currentPulseSpeed;
          
          const posA = nodes[pulse.startNodeIdx].mesh.position;
          const posB = nodes[pulse.endNodeIdx].mesh.position;
          
          pulse.mesh.position.lerpVectors(posA, posB, Math.min(pulse.progress, 1.0));

          // Set pulse mesh opacity & scaling
          pulse.mesh.scale.setScalar(1.0 + Math.sin(elapsedTime * 8) * 0.2);
          pulse.mesh.material.opacity = currentLineOpacity * 2.0;

          if (pulse.progress >= 1.0) {
            pulse.active = false;
            pulse.mesh.visible = false;
          }
        } else if (currentPulseSpeed === 0) {
          pulse.mesh.visible = false;
        }
      });

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
      if (scrollEvolve) {
        window.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
      
      sphereGeometry.dispose();
      tealMaterial.dispose();
      amberMaterial.dispose();
      lineGeometry.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollEvolve]);

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
