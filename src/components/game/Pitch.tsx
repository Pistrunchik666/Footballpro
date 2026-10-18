import { useMemo } from "react";
import * as THREE from "three";
import { GOAL_H, GOAL_HALF_W } from "@/game/sim";

export function Pitch() {
  const grass = useMemo(() => grassTexture(), []);
  const seats = useMemo(() => seatTexture(), []);
  const boards = useMemo(() => boardTexture(), []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 52]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#0c1210" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 52.5]} receiveShadow>
        <planeGeometry args={[68, 105]} />
        <meshStandardMaterial map={grass} color="#ffffff" roughness={0.92} metalness={0} />
      </mesh>
      <Markings />
      <Goal />
      <mesh position={[0, 0.45, -1.35]}>
        <boxGeometry args={[74, 0.9, 0.18]} />
        <meshStandardMaterial map={boards} roughness={0.6} />
      </mesh>
      <Stand position={[0, 7, -14]} size={[86, 16, 12]} seats={seats} />
      <Stand position={[-42, 5.5, 52]} size={[10, 12, 120]} seats={seats} />
      <Stand position={[42, 5.5, 52]} size={[10, 12, 120]} seats={seats} />
      <Stand position={[0, 6, 112]} size={[86, 14, 10]} seats={seats} />
      <Tower position={[-32, 0, 6]} />
      <Tower position={[32, 0, 6]} />
      <Tower position={[-32, 0, 70]} />
      <Tower position={[32, 0, 70]} />
    </group>
  );
}

function Stand({
  position,
  size,
  seats,
}: {
  position: [number, number, number];
  size: [number, number, number];
  seats: THREE.Texture;
}) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial map={seats} color="#9aa3ad" roughness={0.85} />
    </mesh>
  );
}

function Tower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 11, 0]}>
        <cylinderGeometry args={[0.18, 0.28, 22, 8]} />
        <meshStandardMaterial color="#1a1e26" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 22.2, 0]}>
        <boxGeometry args={[1.6, 0.25, 1.6]} />
        <meshBasicMaterial color="#fff4e4" />
      </mesh>
    </group>
  );
}

function Goal() {
  const net = useMemo(() => netGeometry(), []);
  return (
    <group>
      <mesh position={[-GOAL_HALF_W, GOAL_H / 2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, GOAL_H, 12]} />
        <meshStandardMaterial color="#f4f6f5" metalness={0.25} roughness={0.35} />
      </mesh>
      <mesh position={[GOAL_HALF_W, GOAL_H / 2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, GOAL_H, 12]} />
        <meshStandardMaterial color="#f4f6f5" metalness={0.25} roughness={0.35} />
      </mesh>
      <mesh position={[0, GOAL_H, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, GOAL_HALF_W * 2 + 0.12, 12]} />
        <meshStandardMaterial color="#f4f6f5" metalness={0.25} roughness={0.35} />
      </mesh>
      <lineSegments geometry={net}>
        <lineBasicMaterial color="#d5d8dc" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function Markings() {
  const segs = useMemo(() => lines(), []);
  return (
    <group>
      {segs.map((s, i) => (
        <mesh key={i} position={[(s.x1 + s.x2) / 2, 0.025, (s.z1 + s.z2) / 2]} rotation={[0, Math.atan2(s.x2 - s.x1, s.z2 - s.z1), 0]}>
          <boxGeometry args={[0.12, 0.012, Math.hypot(s.x2 - s.x1, s.z2 - s.z1)]} />
          <meshBasicMaterial color="#f3f6f2" />
        </mesh>
      ))}
    </group>
  );
}

function lines() {
  const segs: Array<{ x1: number; z1: number; x2: number; z2: number }> = [];
  const add = (x1: number, z1: number, x2: number, z2: number) => segs.push({ x1, z1, x2, z2 });
  add(-34, 0, 34, 0);
  add(-34, 105, 34, 105);
  add(-34, 0, -34, 105);
  add(34, 0, 34, 105);
  add(-34, 52.5, 34, 52.5);
  add(-20.16, 0, -20.16, 16.5);
  add(20.16, 0, 20.16, 16.5);
  add(-20.16, 16.5, 20.16, 16.5);
  add(-9.16, 0, -9.16, 5.5);
  add(9.16, 0, 9.16, 5.5);
  add(-9.16, 5.5, 9.16, 5.5);
  const arc = 18;
  for (let i = 0; i < arc; i++) {
    const a0 = Math.PI * 0.3 + ((Math.PI * 0.4) * i) / arc;
    const a1 = Math.PI * 0.3 + ((Math.PI * 0.4) * (i + 1)) / arc;
    add(Math.cos(a0) * 9.15, 11 + Math.sin(a0) * 9.15, Math.cos(a1) * 9.15, 11 + Math.sin(a1) * 9.15);
  }
  const circle = 28;
  for (let i = 0; i < circle; i++) {
    const a0 = (Math.PI * 2 * i) / circle;
    const a1 = (Math.PI * 2 * (i + 1)) / circle;
    add(Math.cos(a0) * 9.15, 52.5 + Math.sin(a0) * 9.15, Math.cos(a1) * 9.15, 52.5 + Math.sin(a1) * 9.15);
  }
  return segs;
}

function grassTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);
  for (let i = 0; i < 8; i++) {
    g.fillStyle = i % 2 === 0 ? "#2f9a4e" : "#38b35c";
    g.fillRect(0, i * 32, 64, 32);
  }
  for (let n = 0; n < 700; n++) {
    g.fillStyle = n % 2 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.05)";
    g.fillRect(Math.random() * 64, Math.random() * 256, 2, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function seatTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);
  g.fillStyle = "#12161c";
  g.fillRect(0, 0, 256, 128);
  const palette = ["#1b2430", "#243140", "#2a2428", "#1c2a24", "#30343c", "#3a4048"];
  for (let y = 3; y < 128; y += 6) {
    for (let x = 2; x < 256; x += 5) {
      g.fillStyle = palette[(x + y * 3) % palette.length]!;
      if ((x * 5 + y) % 17 === 0) g.fillStyle = "#d5d8de";
      g.fillRect(x, y, 3, 3);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function boardTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 128;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);
  g.fillStyle = "#14181f";
  g.fillRect(0, 0, 1024, 128);
  g.fillStyle = "#f4f4f5";
  g.font = "600 54px 'Barlow Condensed', sans-serif";
  g.textAlign = "left";
  g.textBaseline = "middle";
  for (let i = 0; i < 4; i++) g.fillText("FOOTBALL PRO", 24 + i * 260, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function netGeometry() {
  const pts: number[] = [];
  const w = GOAL_HALF_W;
  const h = GOAL_H;
  const d = 1.5;
  const push = (x: number, y: number, z: number, x2: number, y2: number, z2: number) => {
    pts.push(x, y, z, x2, y2, z2);
  };
  for (let i = 0; i <= 12; i++) {
    const x = -w + (i / 12) * w * 2;
    push(x, 0.02, 0, x, 0.15, -d);
    push(x, h, 0, x, h * 0.78, -d);
    push(x, 0.15, -d, x, h * 0.78, -d);
  }
  for (let i = 0; i <= 6; i++) {
    const y = (i / 6) * h;
    const yb = 0.15 + (i / 6) * (h * 0.78 - 0.15);
    push(-w, y, 0, w, y, 0);
    push(-w, yb, -d, w, yb, -d);
  }
  push(-w, 0.02, 0, -w, h, 0);
  push(w, 0.02, 0, w, h, 0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return geo;
}
