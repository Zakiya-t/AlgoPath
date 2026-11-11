import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf8fafc, 18, 48);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 15);

    // 2. High-performance WebGL Renderer with clean light background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf8fafc, 0); // Transparent so it blends seamlessly with CSS background
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting for High-End 3D Materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x059669, 2.2); // Emerald light
    keyLight.position.set(12, 16, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 1.8); // Cyan light
    fillLight.position.set(-12, -8, 8);
    scene.add(fillLight);

    const warmAccentLight = new THREE.PointLight(0x6366f1, 2.5, 30); // Indigo point light
    warmAccentLight.position.set(0, 4, 6);
    scene.add(warmAccentLight);

    // Interactive mouse tracker light
    const mouseLight = new THREE.PointLight(0x10b981, 2.0, 20);
    mouseLight.position.set(0, 0, 8);
    scene.add(mouseLight);

    // 4. Main 3D Graph Hierarchy
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // 5. Create 3D Data Structure Polyhedra (Memory Blocks, Pointers, Graph Nodes)
    interface NodeMesh {
      mesh: THREE.Group;
      initialPos: THREE.Vector3;
      speed: number;
      offset: number;
      rotSpeed: { x: number; y: number; z: number };
    }

    const geometries = [
      new THREE.IcosahedronGeometry(0.9, 0),        // Crystal / Node
      new THREE.BoxGeometry(1.2, 1.2, 1.2),         // Memory cell
      new THREE.OctahedronGeometry(0.95, 0),        // Pointer diamond
      new THREE.TorusGeometry(0.85, 0.24, 16, 36),  // Circular buffer / Queue
      new THREE.DodecahedronGeometry(0.85, 0),      // Balanced tree vertex
      new THREE.TetrahedronGeometry(1.0, 0)         // Fast heap node
    ];

    const materials = [
      // Saturated Emerald
      new THREE.MeshPhysicalMaterial({
        color: 0x059669,
        roughness: 0.15,
        metalness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.92
      }),
      // Radiant Cyan
      new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        roughness: 0.2,
        metalness: 0.25,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.92
      }),
      // Deep Indigo
      new THREE.MeshPhysicalMaterial({
        color: 0x4f46e5,
        roughness: 0.15,
        metalness: 0.3,
        clearcoat: 0.8,
        transparent: true,
        opacity: 0.88
      }),
      // Rich Teal
      new THREE.MeshPhysicalMaterial({
        color: 0x0d9488,
        roughness: 0.2,
        metalness: 0.2,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.92
      })
    ];

    const nodes: NodeMesh[] = [];

    // Spatial Layout Coordinates for DSA memory nodes
    const nodeCoords = [
      new THREE.Vector3(-5.2, 3.2, -1.0),
      new THREE.Vector3(-2.8, -2.4, 1.2),
      new THREE.Vector3(0.0, 3.6, -0.5),
      new THREE.Vector3(3.6, 2.2, 1.5),
      new THREE.Vector3(5.6, -2.8, -1.2),
      new THREE.Vector3(-1.2, 0.4, -2.5),
      new THREE.Vector3(2.4, -3.2, 0.6),
      new THREE.Vector3(-6.0, -1.8, -1.5),
      new THREE.Vector3(4.8, 0.8, -2.0)
    ];

    nodeCoords.forEach((coord, i) => {
      const nodeGroup = new THREE.Group();
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];

      // Solid faceted core
      const coreMesh = new THREE.Mesh(geo, mat);
      nodeGroup.add(coreMesh);

      // Contrast wireframe cage for crisp delineation in light mode
      const wireGeo = new THREE.WireframeGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.35
      });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      wireMesh.scale.set(1.02, 1.02, 1.02);
      nodeGroup.add(wireMesh);

      // Internal glowing pulse beacon inside node
      const pulseGeo = new THREE.SphereGeometry(0.3, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x10b981 : 0x06b6d4,
        transparent: true,
        opacity: 0.8
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      nodeGroup.add(pulse);

      nodeGroup.position.copy(coord);
      graphGroup.add(nodeGroup);

      nodes.push({
        mesh: nodeGroup,
        initialPos: coord.clone(),
        speed: 0.5 + (i % 4) * 0.2,
        offset: i * 0.8,
        rotSpeed: {
          x: 0.005 + (i % 3) * 0.003,
          y: 0.007 + (i % 2) * 0.004,
          z: 0.004
        }
      });
    });

    // 6. Connect Nodes with 3D Dynamic Bezier Curves (Graph & Pointer references)
    const curveConnections = [
      [0, 2], [2, 3], [3, 4], [4, 6], [6, 1], [1, 7], [7, 0], [1, 5], [5, 2], [3, 8]
    ];

    const lineObjects: THREE.Line[] = [];
    const curveMaterial = new THREE.LineBasicMaterial({
      color: 0x059669,
      transparent: true,
      opacity: 0.45,
      linewidth: 2
    });

    curveConnections.forEach(([fromIdx, toIdx]) => {
      const fromPos = nodes[fromIdx].mesh.position;
      const toPos = nodes[toIdx].mesh.position;
      const midPoint = new THREE.Vector3()
        .addVectors(fromPos, toPos)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.8, 0.4));

      const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, toPos);
      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, curveMaterial);
      graphGroup.add(line);
      lineObjects.push(line);
    });

    // 7. Dynamic Data Particle Cloud (Memory Bits Drifting in Space)
    const particleCount = 160;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color(0x059669);
    const cyanColor = new THREE.Color(0x0284c7);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const chosenColor = Math.random() > 0.5 ? emeraldColor : cyanColor;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 8. Interactive Mouse Movement & Parallax Damping
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotY = normX * 0.35;
      targetRotX = -normY * 0.25;

      // Update cursor tracking light
      mouseLight.position.x = normX * 8;
      mouseLight.position.y = normY * 6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Window Resize Handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const updateConnections = () => {
      curveConnections.forEach(([fromIdx, toIdx], lineIdx) => {
        const fromPos = nodes[fromIdx].mesh.position;
        const toPos = nodes[toIdx].mesh.position;
        const midPoint = new THREE.Vector3()
          .addVectors(fromPos, toPos)
          .multiplyScalar(0.5)
          .add(new THREE.Vector3(0, 0.7, 0.3));

        const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, toPos);
        const points = curve.getPoints(24);
        lineObjects[lineIdx].geometry.setFromPoints(points);
      });
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/graph damping (lerp)
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      graphGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.25) * 0.05;
      graphGroup.rotation.y = currentRotY + elapsedTime * 0.05;

      // Animate individual nodes floating with sinusoidal offset
      nodes.forEach((n) => {
        n.mesh.position.y =
          n.initialPos.y + Math.sin(elapsedTime * n.speed + n.offset) * 0.35;
        n.mesh.position.x =
          n.initialPos.x + Math.cos(elapsedTime * n.speed * 0.7 + n.offset) * 0.18;

        n.mesh.rotation.x += n.rotSpeed.x;
        n.mesh.rotation.y += n.rotSpeed.y;
        n.mesh.rotation.z += n.rotSpeed.z;
      });

      updateConnections();

      // Slow particle drift
      particles.rotation.y = elapsedTime * 0.025;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      curveMaterial.dispose();
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
