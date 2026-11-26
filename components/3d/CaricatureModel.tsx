"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCcw, Eye } from "lucide-react";

export default function CaricatureModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [degrees, setDegrees] = useState(0);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Dimensions
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 530;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      36,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 3.4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Orbit Controls (Active on drag)
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.autoRotate = false; // Mouse tracking takes primary focus

    // Studio Lighting setup (Clean black/white/green contrast)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.5, 4.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Soft Green Rim Light (Subtle emerald edge glow on hair/shoulders)
    const rimLight = new THREE.DirectionalLight(0xdcfce7, 1.8);
    rimLight.position.set(-3.5, 3.0, -3.0);
    scene.add(rimLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xf4f4f4, 1.2);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // Soft Contact Shadow Disc beneath model
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.25)");
      gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.08)");
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.02)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.05;
    scene.add(shadowMesh);

    // Load Model
    let model: THREE.Group | null = null;
    let initialRotationY = 0;
    const loader = new GLTFLoader();

    loader.load(
      "/varun_caricature_3D.glb",
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;
        model.scale.setScalar(scale);

        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.05;
        model.position.z = -center.z * scale;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        scene.add(model);
        initialRotationY = model.rotation.y;
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error("Error loading 3D caricature GLB:", error);
        setIsLoading(false);
      }
    );

    // User drag state tracking
    let isUserDragging = false;
    controls.addEventListener("start", () => {
      isUserDragging = true;
    });
    controls.addEventListener("end", () => {
      isUserDragging = false;
    });

    // Window-wide Mouse Cursor Tracking (pizza-burger.webflow.io & parallax-bgs style)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleWindowMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and +1 based on viewport window
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid lerp smoothing for mouse tracking
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      if (model) {
        // Natural idle breathing float
        const breath = Math.sin(elapsedTime * 1.6) * 0.025;
        model.position.y = breath - 0.05;

        // When not dragging, model's head and gaze follow the cursor in 3D
        if (!isUserDragging) {
          // Horizontal head turn (yaw): follows mouse X (-0.55 rad to +0.55 rad ~ ±32°)
          const targetRotY = initialRotationY + currentMouseX * 0.55;
          model.rotation.y += (targetRotY - model.rotation.y) * 0.08;

          // Vertical head nod (pitch): follows mouse Y (subtle ±15°)
          const targetRotX = currentMouseY * 0.28;
          model.rotation.x += (targetRotX - model.rotation.x) * 0.08;

          // Subtle head tilt (roll): slight lean towards cursor movement
          const targetRotZ = -currentMouseX * 0.08;
          model.rotation.z += (targetRotZ - model.rotation.z) * 0.08;

          // Subtle position parallax shift
          model.position.x = currentMouseX * 0.05;
        }

        // Track degrees for HUD readout
        const currentAngle = controls.getAzimuthalAngle();
        const deg = Math.round(((currentAngle * 180) / Math.PI + 360) % 360);
        setDegrees(deg);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 530;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[520px] flex items-center justify-center select-none">
      {/* 3D Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-20">
          <div className="relative w-10 h-10 mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-[#E5E7EB]" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#000000] animate-spin" />
          </div>
          <p className="text-xs font-mono text-[#6B7280]">
            LOADING 3D AVATAR {progress > 0 ? `(${progress}%)` : ""}...
          </p>
        </div>
      )}

      {/* Minimal Exhibition HUD Pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xs text-xs font-mono text-[#000000]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#6B7280]">
            Cursor Tracked
          </span>
          <span className="text-[#E5E7EB]">|</span>
          <span className="text-[11px] text-[#6B7280]">Drag to rotate 360°</span>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[#000000] transition-colors shadow-xs cursor-pointer"
          title="Reset View"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}