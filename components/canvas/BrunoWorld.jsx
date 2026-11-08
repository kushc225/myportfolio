"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { soundManager } from "./AudioController";
import {
  createTextBadgeTexture,
  createBillboardTexture,
  createFloorTexture,
  createCheckeredTexture,
  createMysteryBoxTexture,
  createDockerContainerTexture,
} from "./textureUtils";
import { portfolioData } from "@/data/portfolioData";
import Minimap from "./Minimap";
import ZoneCardDrawer from "./ZoneCardDrawer";

// Stable tour stations order
const TOUR_STATIONS = [
  "experience",
  "projects",
  "devops",
  "skills",
  "education",
  "contact",
];

export default function BrunoWorld({ onOpenModal }) {
  const containerRef = useRef(null);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [activeZone, setActiveZone] = useState(null);
  const activeZoneRef = useRef(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const [carTransform, setCarTransform] = useState({ x: 0, z: 0, yaw: 0 });
  const [powerUpMessage, setPowerUpMessage] = useState(null);

  // Direct action refs
  const teleportRef = useRef(null);
  const resetCarRef = useRef(null);
  const hornRef = useRef(null);

  // Virtual mobile controls state
  const touchControlsRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  });

  const toggleSound = useCallback(() => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      if (soundManager) soundManager.setMute(next);
      return next;
    });
  }, []);

  const handleTeleport = useCallback((zoneId) => {
    if (teleportRef.current) {
      teleportRef.current(zoneId);
    }
  }, []);

  const nextStation = useCallback(() => {
    const nextIdx = (currentTourIndex + 1) % TOUR_STATIONS.length;
    setCurrentTourIndex(nextIdx);
    handleTeleport(TOUR_STATIONS[nextIdx]);
  }, [currentTourIndex, handleTeleport]);

  const prevStation = useCallback(() => {
    const prevIdx =
      (currentTourIndex - 1 + TOUR_STATIONS.length) % TOUR_STATIONS.length;
    setCurrentTourIndex(prevIdx);
    handleTeleport(TOUR_STATIONS[prevIdx]);
  }, [currentTourIndex, handleTeleport]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    let isDisposed = false;
    let animId = null;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050914");
    scene.fog = new THREE.FogExp2("#050914", 0.011);

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.5, 300);
    camera.position.set(-22, 26, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    containerEl.appendChild(renderer.domElement);

    // --- 2. CANNON.JS PHYSICS WORLD ---
    const world = new CANNON.World();
    world.gravity.set(0, -22, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    const defaultMaterial = new CANNON.Material("default");
    const contactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.35,
        restitution: 0.2,
      }
    );
    world.defaultContactMaterial = contactMaterial;

    // --- 3. LIGHTING ---
    const ambientLight = new THREE.AmbientLight("#cbd5e1", 0.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight("#f97316", "#0f172a", 0.85);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight("#ffffff", 1.85);
    dirLight.position.set(40, 60, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 160;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // --- 4. GROUND & TRACKS ---
    const floorTexture = createFloorTexture();
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.85,
      metalness: 0.1,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: defaultMaterial,
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    // Checkered Starting Grid 🏁
    const checkeredTex = createCheckeredTexture();
    const checkGeo = new THREE.PlaneGeometry(10, 5);
    const checkMat = new THREE.MeshBasicMaterial({
      map: checkeredTex,
      side: THREE.DoubleSide,
    });
    const startGrid = new THREE.Mesh(checkGeo, checkMat);
    startGrid.rotation.x = -Math.PI / 2;
    startGrid.position.set(0, 0.03, 0);
    scene.add(startGrid);

    // Outer boundary walls with alternating Smash Karts Rumble Curbs
    const arenaSize = 75;
    const wallHeight = 3.5;
    const wallThick = 2;
    const wallMat = new THREE.MeshStandardMaterial({
      color: "#0f172a",
      roughness: 0.4,
      metalness: 0.5,
      emissive: "#ea580c",
      emissiveIntensity: 0.15,
    });

    const addWall = (x, z, w, d) => {
      const geo = new THREE.BoxGeometry(w, wallHeight, d);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(x, wallHeight / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      const shape = new CANNON.Box(new CANNON.Vec3(w / 2, wallHeight / 2, d / 2));
      const body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape,
        material: defaultMaterial,
        position: new CANNON.Vec3(x, wallHeight / 2, z),
      });
      world.addBody(body);
    };

    addWall(0, arenaSize, arenaSize * 2, wallThick);
    addWall(0, -arenaSize, arenaSize * 2, wallThick);
    addWall(arenaSize, 0, wallThick, arenaSize * 2);
    addWall(-arenaSize, 0, wallThick, arenaSize * 2);

    // 3D Red-and-White Rumble Strip Curbs along boundaries (Smash Karts style)
    const curbGeo = new THREE.BoxGeometry(3, 0.4, 1.2);
    const curbMatRed = new THREE.MeshStandardMaterial({ color: "#ef4444", roughness: 0.3 });
    const curbMatWhite = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.3 });

    for (let i = -70; i <= 70; i += 6) {
      const c1 = new THREE.Mesh(curbGeo, i % 12 === 0 ? curbMatRed : curbMatWhite);
      c1.position.set(i, 0.2, 73.5);
      const c2 = c1.clone();
      c2.position.set(i, 0.2, -73.5);
      scene.add(c1, c2);
    }

    // --- 5. THE SMASH KART (Vibrant Fiery Racing Orange & Crimson!) ---
    // Contrasts boldly with the dark floor so it's impossible to blend in!
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    // Main Chassis Body (Vibrant Fiery Racing Orange Metallic)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: "#f97316",
      metalness: 0.85,
      roughness: 0.15,
    });
    const bodyGeo = new THREE.BoxGeometry(2.2, 0.7, 4.2);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.65;
    bodyMesh.castShadow = true;
    carGroup.add(bodyMesh);

    // Racing Center Stripe (Carbon Fiber Dark)
    const stripeGeo = new THREE.BoxGeometry(0.55, 0.72, 4.22);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: "#020617",
      metalness: 0.9,
      roughness: 0.2,
    });
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.y = 0.65;
    carGroup.add(stripe);

    // Cabin / Cockpit
    const cabinMat = new THREE.MeshStandardMaterial({
      color: "#090d16",
      roughness: 0.1,
      metalness: 0.9,
    });
    const cabinGeo = new THREE.BoxGeometry(1.65, 0.65, 2.1);
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(0, 1.25, -0.2);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // Rear Spoiler (Glossy Racing Crimson Red)
    const spoilerMat = new THREE.MeshStandardMaterial({
      color: "#dc2626",
      metalness: 0.6,
      roughness: 0.2,
    });
    const spoilerGeo = new THREE.BoxGeometry(2.1, 0.09, 0.65);
    const spoiler = new THREE.Mesh(spoilerGeo, spoilerMat);
    spoiler.position.set(0, 1.45, 1.7);
    carGroup.add(spoiler);

    const postGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    const postL = new THREE.Mesh(postGeo, spoilerMat);
    postL.position.set(-0.7, 1.15, 1.7);
    const postR = postL.clone();
    postR.position.x = 0.7;
    carGroup.add(postL, postR);

    // Headlights (Warm Golden Glow)
    const headlightMat = new THREE.MeshStandardMaterial({
      color: "#fef08a",
      emissive: "#facc15",
      emissiveIntensity: 3.5,
    });
    const hlGeo = new THREE.BoxGeometry(0.4, 0.2, 0.1);
    const hlLeft = new THREE.Mesh(hlGeo, headlightMat);
    hlLeft.position.set(-0.75, 0.65, -2.12);
    const hlRight = hlLeft.clone();
    hlRight.position.x = 0.75;
    carGroup.add(hlLeft, hlRight);

    // Headlight Spotlights
    const spotL = new THREE.SpotLight("#fef08a", 3.5, 28, Math.PI / 6, 0.4);
    spotL.position.set(-0.75, 0.65, -2.2);
    spotL.target.position.set(-0.75, 0, -15);
    carGroup.add(spotL);
    carGroup.add(spotL.target);

    // Taillights
    const taillightMat = new THREE.MeshStandardMaterial({
      color: "#ef4444",
      emissive: "#dc2626",
      emissiveIntensity: 2.5,
    });
    const tlGeo = new THREE.BoxGeometry(0.45, 0.15, 0.1);
    const tlLeft = new THREE.Mesh(tlGeo, taillightMat);
    tlLeft.position.set(-0.75, 0.75, 2.12);
    const tlRight = tlLeft.clone();
    tlRight.position.x = 0.75;
    carGroup.add(tlLeft, tlRight);

    // Kart Underglow Neon Light (Fiery Orange)
    const underglow = new THREE.PointLight("#f97316", 2.2, 5);
    underglow.position.set(0, 0.25, 0);
    carGroup.add(underglow);

    // Wheels (Chunky Black Rubber with Fiery Gold / Amber Rims)
    const wheelMat = new THREE.MeshStandardMaterial({
      color: "#0f172a",
      roughness: 0.9,
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: "#f59e0b",
      metalness: 0.9,
      roughness: 0.15,
    });
    const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.42, 18);
    wheelGeo.rotateZ(Math.PI / 2);

    const createWheel = (x, z) => {
      const g = new THREE.Group();
      g.position.set(x, 0.5, z);
      const tire = new THREE.Mesh(wheelGeo, wheelMat);
      tire.castShadow = true;
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.44, 12), rimMat);
      rim.rotateZ(Math.PI / 2);
      g.add(tire, rim);
      carGroup.add(g);
      return g;
    };

    const wheelFL = createWheel(-1.18, -1.3);
    const wheelFR = createWheel(1.18, -1.3);
    const wheelRL = createWheel(-1.18, 1.3);
    const wheelRR = createWheel(1.18, 1.3);

    // Physics body for car in Cannon
    const carShape = new CANNON.Box(new CANNON.Vec3(1.1, 0.55, 2.1));
    const carBody = new CANNON.Body({
      mass: 150,
      shape: carShape,
      material: defaultMaterial,
      position: new CANNON.Vec3(0, 2.5, 0),
      angularDamping: 0.85,
      linearDamping: 0.25,
    });
    world.addBody(carBody);

    carBody.addEventListener("collide", (e) => {
      const relSpeed = e.contact.getImpactVelocityAlongNormal();
      if (Math.abs(relSpeed) > 2.2 && soundManager) {
        soundManager.playCrash(Math.abs(relSpeed));
      }
    });

    // --- 6. SMASH KARTS MYSTERY POWER-UP BOXES ("?") ---
    const mysteryBoxes = [];
    const mysteryTex = createMysteryBoxTexture();
    const mbGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    const mbMat = new THREE.MeshStandardMaterial({
      map: mysteryTex,
      roughness: 0.25,
      metalness: 0.4,
    });

    const boxPositions = [
      { x: 14, z: 10 },
      { x: -14, z: 10 },
      { x: 14, z: -10 },
      { x: -14, z: -10 },
    ];

    boxPositions.forEach((pos, idx) => {
      const mMesh = new THREE.Mesh(mbGeo, mbMat);
      mMesh.position.set(pos.x, 1.6, pos.z);
      mMesh.castShadow = true;
      scene.add(mMesh);
      mysteryBoxes.push({ mesh: mMesh, basePos: pos, offset: idx });
    });

    // --- 7. TRAFFIC CONES & TIRE STACKS (Smash Karts track props) ---
    const coneGeo = new THREE.ConeGeometry(0.35, 0.9, 12);
    const coneMat = new THREE.MeshStandardMaterial({ color: "#ea580c", roughness: 0.4 });
    const tireGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12);
    const tireMat = new THREE.MeshStandardMaterial({ color: "#090d16", roughness: 0.9 });

    const createTireStack = (x, z) => {
      for (let t = 0; t < 3; t++) {
        const tm = new THREE.Mesh(tireGeo, tireMat);
        tm.position.set(x, 0.2 + t * 0.35, z);
        tm.castShadow = true;
        scene.add(tm);
      }
    };

    createTireStack(-32, -18);
    createTireStack(32, -18);
    createTireStack(-32, 20);
    createTireStack(32, 20);
    createTireStack(0, 38);

    // Scattered racing cones
    const conePositions = [
      { x: 5, z: 8 },
      { x: -5, z: 8 },
      { x: 5, z: -8 },
      { x: -5, z: -8 },
      { x: 10, z: -30 },
      { x: -10, z: -30 },
    ];
    conePositions.forEach((p) => {
      const cm = new THREE.Mesh(coneGeo, coneMat);
      cm.position.set(p.x, 0.45, p.z);
      cm.castShadow = true;
      scene.add(cm);
    });

    // --- 8. 3D DOCKER SHIPPING CONTAINER (DevOps Station) ---
    const dockerContainerTex = createDockerContainerTexture();
    const dBoxGeo = new THREE.BoxGeometry(10, 4.2, 4);
    const dBoxMat = new THREE.MeshStandardMaterial({
      map: dockerContainerTex,
      roughness: 0.3,
      metalness: 0.35,
    });
    const dockerContainerMesh = new THREE.Mesh(dBoxGeo, dBoxMat);
    dockerContainerMesh.position.set(0, 2.1, 35);
    dockerContainerMesh.castShadow = true;
    scene.add(dockerContainerMesh);

    const dBoxBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(5, 2.1, 2)),
      position: new CANNON.Vec3(0, 2.1, 35),
    });
    world.addBody(dBoxBody);

    // --- 9. DESTRUCTIBLE SKILL BLOCKS ---
    const physicsObjects = [];
    const skillsList = portfolioData.physicsBlocks;
    const skillsZoneCenter = { x: 0, z: -44 };

    const boxSize = 1.6;
    let blockIndex = 0;
    const rows = 4;

    for (let r = 0; r < rows; r++) {
      const count = rows - r;
      const startX = skillsZoneCenter.x - ((count - 1) * (boxSize + 0.3)) / 2;
      const y = 0.8 + r * (boxSize + 0.05);

      for (let c = 0; c < count; c++) {
        const skill = skillsList[blockIndex % skillsList.length];
        blockIndex++;

        const tex = createTextBadgeTexture({
          text: skill.name,
          category: skill.category,
          accentColor: skill.color,
          bgColor: "#0f172a",
        });

        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.35,
          metalness: 0.25,
        });

        const boxGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const mesh = new THREE.Mesh(boxGeo, mat);
        const bx = startX + c * (boxSize + 0.3);
        const bz = skillsZoneCenter.z;
        mesh.position.set(bx, y, bz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);

        const shape = new CANNON.Box(
          new CANNON.Vec3(boxSize / 2, boxSize / 2, boxSize / 2)
        );
        const body = new CANNON.Body({
          mass: 8,
          shape,
          material: defaultMaterial,
          position: new CANNON.Vec3(bx, y, bz),
          linearDamping: 0.1,
          angularDamping: 0.1,
        });

        body.addEventListener("collide", (e) => {
          const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
          if (v > 3.0 && soundManager) soundManager.playCrash(v * 0.5);
        });

        world.addBody(body);
        physicsObjects.push({ mesh, body });
      }
    }

    // Jump Ramp in Skills Zone
    const rampGeo = new THREE.BoxGeometry(6, 1.8, 7);
    const rampMat = new THREE.MeshStandardMaterial({
      color: "#0284c7",
      roughness: 0.4,
      metalness: 0.3,
    });
    const rampMesh = new THREE.Mesh(rampGeo, rampMat);
    rampMesh.position.set(0, 0.4, -30);
    rampMesh.rotation.x = -0.22;
    rampMesh.castShadow = true;
    rampMesh.receiveShadow = true;
    scene.add(rampMesh);

    const rampBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(3, 0.9, 3.5)),
      position: new CANNON.Vec3(0, 0.4, -30),
      material: defaultMaterial,
    });
    rampBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -0.22);
    world.addBody(rampBody);

    // --- 10. ZONE BILLBOARDS & WAYPOINTS ---
    const zoneBillboards = [
      {
        id: "experience",
        x: -28,
        z: -18,
        title: "Work Experience",
        subtitle: "Xcelore: Outzidr (NestJS/Fastify) & EXEI (Voice AI)",
        tag: "Senior Full Stack",
        color: "#06b6d4",
      },
      {
        id: "projects",
        x: 28,
        z: -18,
        title: "CollabDocs Project",
        subtitle: "Real-Time Google Docs with Convex, Liveblocks & Tiptap",
        tag: "CRDT Collaboration",
        color: "#10b981",
      },
      {
        id: "devops",
        x: 0,
        z: 32,
        title: "Docker & Kubernetes Cloud",
        subtitle: "Multi-stage builds, K8s Pods, GitHub Actions CI/CD & GCP/AWS",
        tag: "DevOps & Cloud SRE",
        color: "#2563eb",
      },
      {
        id: "skills",
        x: 0,
        z: -52,
        title: "Smash The Tech Stack!",
        subtitle: "Crash into the skill towers to see real physics in action",
        tag: "Interactive Playground",
        color: "#f59e0b",
      },
      {
        id: "education",
        x: -28,
        z: 20,
        title: "Education & Background",
        subtitle: "MCA from ABESIT (8.6 CGPA) — 3+ Years Production Engineering",
        tag: "Master of Computer Apps",
        color: "#8b5cf6",
      },
      {
        id: "contact",
        x: 28,
        z: 20,
        title: "Get In Touch",
        subtitle: "kushc225@gmail.com | +91 96088 12837 | Noida, UP",
        tag: "Let's Build Together",
        color: "#ec4899",
      },
    ];

    zoneBillboards.forEach((item) => {
      // Devops station already has the 3D container, so billboard stands next to it
      if (item.id === "devops") {
        const ringGeo = new THREE.RingGeometry(8, 8.4, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: item.color, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(item.x, 0.05, item.z);
        scene.add(ring);

        const beaconGeo = new THREE.CylinderGeometry(0.8, 8, 28, 16, 1, true);
        const beaconMat = new THREE.MeshBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: 0.12,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(item.x, 14, item.z);
        scene.add(beacon);
        return;
      }

      const tex = createBillboardTexture({
        title: item.title,
        subtitle: item.subtitle,
        tag: item.tag,
        accentColor: item.color,
      });

      const boardGeo = new THREE.BoxGeometry(10, 5, 0.4);
      const boardMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.3,
        metalness: 0.2,
      });
      const boardMesh = new THREE.Mesh(boardGeo, boardMat);
      boardMesh.position.set(item.x, 4.5, item.z);
      boardMesh.castShadow = true;
      scene.add(boardMesh);

      const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 3, 12);
      const pillarMat = new THREE.MeshStandardMaterial({ color: "#334155" });
      const p1 = new THREE.Mesh(pillarGeo, pillarMat);
      p1.position.set(item.x - 4, 1.5, item.z);
      const p2 = p1.clone();
      p2.position.x = item.x + 4;
      scene.add(p1, p2);

      const bbShape = new CANNON.Box(new CANNON.Vec3(5, 2.5, 0.4));
      const bbBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: bbShape,
        position: new CANNON.Vec3(item.x, 3.5, item.z),
      });
      world.addBody(bbBody);

      // Glowing Zone Floor Ring
      const ringGeo = new THREE.RingGeometry(8, 8.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: item.color,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(item.x, 0.05, item.z);
      scene.add(ring);

      // Vertical 3D Waypoint Light Pillar
      const beaconGeo = new THREE.CylinderGeometry(0.8, 8, 28, 16, 1, true);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(item.x, 14, item.z);
      scene.add(beacon);
    });

    // --- 11. SPEED & VEHICLE CONTROLS TUNING (40-50 km/h, ZERO BUBBLING!) ---
    const keys = {
      w: false,
      s: false,
      a: false,
      d: false,
      space: false,
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    const handleKeyDown = (e) => {
      if (soundManager) soundManager.unlock();
      if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.code)) {
        keys[e.key] = true;
      }
      if (e.key === " " || e.code === "Space") {
        keys.space = true;
        e.preventDefault();
      }
      if (e.key.toLowerCase() === "r") {
        resetCar(0, 0, 0);
      }
      if (e.key.toLowerCase() === "h") {
        if (soundManager) soundManager.playHorn();
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.code)) {
        keys[e.key] = false;
      }
      if (e.key === " " || e.code === "Space") {
        keys.space = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let carYaw = 0;
    let carSpeed = 0;
    // Tuned for ~45-48 km/h max speed without bubbling!
    const maxForwardSpeed = 16.5;
    const maxReverseSpeed = -8.0;
    const accelRate = 18.0;
    const brakeDecel = 28.0;
    const coastDecel = 9.0;
    const turnSpeed = 2.2;

    const resetCar = (customX = 0, customZ = 0, targetYaw = 0) => {
      carBody.position.set(customX, 1.8, customZ);
      carBody.velocity.set(0, 0, 0);
      carBody.angularVelocity.set(0, 0, 0);
      carYaw = targetYaw;
      carSpeed = 0;
      carBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), carYaw);
      if (soundManager) soundManager.unlock();
    };

    resetCarRef.current = () => resetCar(0, 0, 0);
    hornRef.current = () => {
      if (soundManager) soundManager.playHorn();
    };

    teleportRef.current = (zoneId) => {
      const z = portfolioData.zones.find((item) => item.id === zoneId);
      if (z) {
        let targetX = z.x;
        let targetZ = z.z + 9;
        let yaw = 0;

        if (z.id === "skills") {
          targetZ = z.z + 14;
          yaw = 0;
        } else if (z.id === "devops") {
          targetZ = z.z - 9;
          yaw = Math.PI;
        } else if (z.z > 0) {
          targetZ = z.z - 9;
          yaw = Math.PI;
        }

        resetCar(targetX, targetZ, yaw);
        activeZoneRef.current = z.id;
        setActiveZone(z.id);
        setShowDrawer(true);
        if (soundManager) soundManager.playZoneChime();
      }
    };

    // --- 12. ANIMATION & RENDER LOOP ---
    let lastTime = performance.now();
    let lastCoordUpdateTime = 0;
    let lastMysteryHit = 0;

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Inputs
      const forwardInput =
        keys.w || keys.ArrowUp || touchControlsRef.current.forward;
      const reverseInput =
        keys.s || keys.ArrowDown || touchControlsRef.current.backward;
      const leftInput =
        keys.a || keys.ArrowLeft || touchControlsRef.current.left;
      const rightInput =
        keys.d || keys.ArrowRight || touchControlsRef.current.right;
      const brakeInput = keys.space || touchControlsRef.current.brake;

      if (forwardInput && !brakeInput) {
        carSpeed = Math.min(maxForwardSpeed, carSpeed + accelRate * dt);
      } else if (reverseInput && !brakeInput) {
        carSpeed = Math.max(maxReverseSpeed, carSpeed - accelRate * 0.75 * dt);
      } else if (brakeInput) {
        if (carSpeed > 0) {
          carSpeed = Math.max(0, carSpeed - brakeDecel * dt);
        } else {
          carSpeed = Math.min(0, carSpeed + brakeDecel * dt);
        }
      } else {
        if (carSpeed > 0) {
          carSpeed = Math.max(0, carSpeed - coastDecel * dt);
        } else if (carSpeed < 0) {
          carSpeed = Math.min(0, carSpeed + coastDecel * dt);
        }
      }

      // Steering
      const isMoving = Math.abs(carSpeed) > 0.2;
      const steerDirection = carSpeed >= 0 ? 1 : -1;
      let targetWheelAngle = 0;

      if (leftInput) {
        if (isMoving) carYaw += turnSpeed * steerDirection * dt;
        targetWheelAngle = 0.45;
      } else if (rightInput) {
        if (isMoving) carYaw -= turnSpeed * steerDirection * dt;
        targetWheelAngle = -0.45;
      }

      wheelFL.rotation.y = targetWheelAngle;
      wheelFR.rotation.y = targetWheelAngle;

      const wheelRoll = carSpeed * dt * 3.5;
      wheelFL.children[0].rotation.x += wheelRoll;
      wheelFR.children[0].rotation.x += wheelRoll;
      wheelRL.children[0].rotation.x += wheelRoll;
      wheelRR.children[0].rotation.x += wheelRoll;

      // Forward velocity
      const forwardVec = new THREE.Vector3(
        -Math.sin(carYaw),
        0,
        -Math.cos(carYaw)
      ).normalize();

      carBody.velocity.x = forwardVec.x * carSpeed;
      carBody.velocity.z = forwardVec.z * carSpeed;
      carBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), carYaw);

      // STABILITY CLAMP (Eliminates vehicle bubbling & shaking completely!)
      carBody.angularVelocity.x = 0;
      carBody.angularVelocity.z = 0;
      if (carBody.position.y > 0.75) {
        carBody.position.y = THREE.MathUtils.lerp(carBody.position.y, 0.65, 0.15);
      }

      world.step(1 / 60, dt, 3);

      carGroup.position.copy(carBody.position);
      carGroup.quaternion.copy(carBody.quaternion);

      // Animate rotating Mystery Item Cubes (Smash Karts style)
      for (let i = 0; i < mysteryBoxes.length; i++) {
        const mb = mysteryBoxes[i];
        mb.mesh.rotation.y += 0.025;
        mb.mesh.position.y = 1.6 + Math.sin(now * 0.003 + mb.offset) * 0.25;

        // Check if car collected mystery box
        const mdx = carGroup.position.x - mb.basePos.x;
        const mdz = carGroup.position.z - mb.basePos.z;
        const mDist = Math.sqrt(mdx * mdx + mdz * mdz);

        if (mDist < 2.5 && now - lastMysteryHit > 2500) {
          lastMysteryHit = now;
          if (soundManager) soundManager.playZoneChime();
          const powerups = [
            "⚡ NITRO SPEED BOOST ACTIVATED!",
            "🐳 DOCKER CONTAINER DEPLOYED!",
            "☸️ KUBERNETES REPLICA POD ONLINE!",
            "🚀 CI/CD BUILD SUCCESSFUL!",
          ];
          setPowerUpMessage(powerups[i % powerups.length]);
          setTimeout(() => setPowerUpMessage(null), 2500);
        }
      }

      // Sync skill blocks
      for (let i = 0; i < physicsObjects.length; i++) {
        const { mesh, body } = physicsObjects[i];
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
      }

      // Audio
      if (soundManager) {
        const speedNorm = Math.abs(carSpeed) / maxForwardSpeed;
        soundManager.updateEngine(speedNorm, forwardInput);
      }

      // Speedometer: scale accurately so top speed is ~46 km/h (within user requested 40-50 range)
      const currentKmh = Math.round(Math.abs(carSpeed) * 2.8);
      setSpeedKmh(currentKmh);

      // Throttled minimap update (15 fps)
      if (now - lastCoordUpdateTime > 65) {
        lastCoordUpdateTime = now;
        setCarTransform({
          x: Math.round(carGroup.position.x),
          z: Math.round(carGroup.position.z),
          yaw: carYaw,
        });
      }

      // Camera follow
      const cameraOffset = new THREE.Vector3(-18, 22, 18);
      const targetCamPos = new THREE.Vector3()
        .copy(carGroup.position)
        .add(cameraOffset);
      camera.position.lerp(targetCamPos, 0.08);

      const lookTarget = new THREE.Vector3()
        .copy(carGroup.position)
        .add(new THREE.Vector3(forwardVec.x * 3, 0.8, forwardVec.z * 3));
      camera.lookAt(lookTarget);

      // Proximity detection
      let detectedZone = null;
      let minDistance = 13;

      for (const zone of portfolioData.zones) {
        if (zone.id === "spawn") continue;
        const dx = carGroup.position.x - zone.x;
        const dz = carGroup.position.z - zone.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < minDistance) {
          detectedZone = zone.id;
          minDistance = dist;
        }
      }

      if (detectedZone !== activeZoneRef.current) {
        activeZoneRef.current = detectedZone;
        setActiveZone(detectedZone);
        if (detectedZone) {
          setShowDrawer(true);
          const tourIdx = TOUR_STATIONS.indexOf(detectedZone);
          if (tourIdx !== -1) setCurrentTourIndex(tourIdx);
          if (soundManager) soundManager.playZoneChime();
        }
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (containerEl && renderer.domElement) {
        containerEl.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950 select-none">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />

      {/* Top Left Branding & Teleport Navigation (Positioned safely below h-16 Navbar) */}
      <div className="absolute top-[76px] left-4 md:left-6 z-20 flex flex-col gap-2.5 pointer-events-auto">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/95 px-4 py-3 backdrop-blur-xl shadow-2xl">
          <div className="h-3 w-3 rounded-full bg-orange-500 animate-pulse shrink-0" />
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              {portfolioData.personal.name}
            </h1>
            <p className="mt-0.5 text-xs font-semibold text-orange-400 tracking-tight">
              {portfolioData.personal.title}
            </p>
          </div>
        </div>

        {/* Tour Navigation Controls */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-1.5 backdrop-blur-md shadow-lg">
          <button
            onClick={prevStation}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-slate-200 transition hover:bg-orange-500 hover:text-slate-950"
            title="Previous Station"
          >
            ◀
          </button>

          <span className="px-2 text-[11px] font-bold text-orange-400 uppercase tracking-wider">
            Station {currentTourIndex + 1}/{TOUR_STATIONS.length}:{" "}
            {TOUR_STATIONS[currentTourIndex]}
          </span>

          <button
            onClick={nextStation}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-500 text-xs font-bold text-slate-950 transition hover:bg-orange-400"
            title="Next Station"
          >
            ▶
          </button>
        </div>

        {/* Quick Teleport Zone Pills */}
        <div className="flex flex-wrap gap-1.5 max-w-md pt-0.5">
          {portfolioData.zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => handleTeleport(zone.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all shadow-md ${
                activeZone === zone.id
                  ? "bg-orange-500 text-slate-950 scale-105"
                  : "bg-slate-900/80 text-slate-300 border border-slate-700/50 hover:border-orange-500 hover:text-white"
              }`}
            >
              {zone.name}
            </button>
          ))}
        </div>
      </div>

      {/* Smash Karts Power-Up Pop-up Notification */}
      {powerUpMessage && (
        <div className="absolute top-36 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-2 rounded-2xl border-2 border-yellow-400 bg-slate-900/95 px-6 py-3 text-sm font-extrabold text-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.5)]">
            <span>🎁</span>
            <span>{powerUpMessage}</span>
          </div>
        </div>
      )}

      {/* Top Right System Controls (Positioned safely below h-16 Navbar) */}
      <div className="absolute top-[76px] right-4 md:right-6 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleSound}
          title="Toggle Audio"
          className="flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition hover:border-orange-500 hover:text-orange-400 shadow-lg"
        >
          {isAudioMuted ? "🔇 Sound Off" : "🔊 Sound On"}
        </button>

        <button
          onClick={() => {
            if (hornRef.current) hornRef.current();
          }}
          className="rounded-full border border-slate-700/70 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition hover:border-orange-500 hover:text-orange-400 shadow-lg"
        >
          📢 Horn (H)
        </button>

        <button
          onClick={() => {
            if (resetCarRef.current) resetCarRef.current();
          }}
          className="rounded-full border border-slate-700/70 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition hover:border-orange-500 hover:text-orange-400 shadow-lg"
        >
          🔄 Reset (R)
        </button>
      </div>

      {/* Bottom Right Interactive Radar / Minimap */}
      <div className="hidden sm:block absolute bottom-5 right-5 z-20 pointer-events-auto">
        <Minimap
          carPos={carTransform}
          carYaw={carTransform.yaw}
          activeZone={activeZone}
          onSelectZone={handleTeleport}
        />
      </div>

      {/* Sliding Zone Card Drawer */}
      {showDrawer && activeZone && (
        <ZoneCardDrawer
          zoneId={activeZone}
          onClose={() => setShowDrawer(false)}
          onExpand={(zId) => onOpenModal(zId)}
          onNextStation={nextStation}
        />
      )}

      {/* Bottom Left Controls Guide & Speedometer */}
      <div className="hidden sm:flex absolute bottom-5 left-5 z-20 flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2 backdrop-blur-md">
          <div className="text-center font-mono">
            <span className="text-xl font-black text-orange-400">{speedKmh}</span>
            <span className="ml-1 text-[10px] text-slate-400 uppercase">km/h</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="text-[11px] text-slate-300">
            <span className="font-semibold text-white">WASD</span> to Drive | <span className="font-semibold text-white">SPACE</span> to Brake | <span className="font-semibold text-white">R</span> to Reset | <span className="font-semibold text-white">E</span> for Details
          </div>
        </div>
      </div>

      {/* Mobile Virtual Controls */}
      <div className="sm:hidden absolute bottom-5 inset-x-5 z-20 flex justify-between pointer-events-auto">
        <div className="flex gap-2">
          <button
            onTouchStart={() => (touchControlsRef.current.left = true)}
            onTouchEnd={() => (touchControlsRef.current.left = false)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 text-xl font-bold text-white active:bg-orange-500"
          >
            ◀
          </button>
          <button
            onTouchStart={() => (touchControlsRef.current.right = true)}
            onTouchEnd={() => (touchControlsRef.current.right = false)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 text-xl font-bold text-white active:bg-orange-500"
          >
            ▶
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onTouchStart={() => (touchControlsRef.current.backward = true)}
            onTouchEnd={() => (touchControlsRef.current.backward = false)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-700/60 bg-slate-900/90 text-xs font-bold text-rose-400 active:bg-rose-500 active:text-white"
          >
            REV
          </button>
          <button
            onTouchStart={() => (touchControlsRef.current.forward = true)}
            onTouchEnd={() => (touchControlsRef.current.forward = false)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500 bg-orange-500 text-sm font-black text-slate-950 active:bg-orange-400"
          >
            GAS
          </button>
        </div>
      </div>
    </div>
  );
}
