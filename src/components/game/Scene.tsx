import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Pitch } from "@/components/game/Pitch";
import { Player } from "@/components/game/Player";
import { PLAYER_NUMBER, skinTone } from "@/game/clubs";
import { tick, wallIds, world } from "@/game/runtime";
import { useGame } from "@/game/store";

export function Scene() {
  const strip = useGame((s) => s.strip);
  const ball = useRef<THREE.Mesh>(null);
  const blob = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const line = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(120), 3));
    const mat = new THREE.LineBasicMaterial({ color: 0xf4f4f5, transparent: true, opacity: 0.75 });
    const l = new THREE.Line(g, mat);
    l.frustumCulled = false;
    l.visible = false;
    return l;
  }, []);
  const tex = useMemo(() => ballTexture(), []);
  const { camera } = useThree();
  const camPos = useMemo(() => new THREE.Vector3(0, 6, 28), []);
  const look = useMemo(() => new THREE.Vector3(0, 1.2, 8), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const lightTarget = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(0, 0, 14);
    return o;
  }, []);

  useFrame((_, dt) => {
    tick(dt);
    const mesh = ball.current;
    if (mesh) {
      mesh.position.set(world.ball.x, world.ball.y, world.ball.z);
      mesh.rotation.x = world.roll;
      mesh.rotation.z = world.ball.spin * world.clock * 0.4;
    }
    if (blob.current) {
      blob.current.position.set(world.ball.x, 0.03, world.ball.z);
      const s = 1 + Math.max(0, world.ball.y - 0.11) * 0.35;
      blob.current.scale.setScalar(s);
    }
    const attr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
    const pts = world.preview;
    const total = Math.floor(pts.length / 3);
    const count = Math.min(40, total);
    for (let i = 0; i < count; i++) {
      const idx = count === 1 ? 0 : Math.round((i * (total - 1)) / (count - 1));
      attr.setXYZ(i, pts[idx * 3] ?? 0, pts[idx * 3 + 1] ?? 0, pts[idx * 3 + 2] ?? 0);
    }
    line.geometry.setDrawRange(0, count);
    attr.needsUpdate = true;
    line.visible = world.showAim && count > 1;
    if (ring.current) {
      ring.current.visible = Boolean(world.showAim && world.ring);
      if (world.ring) ring.current.position.set(world.ring.x, Math.max(0.2, world.ring.y), 0.06);
    }

    const shake = world.shake ? world.trauma * world.trauma : 0;
    const ox = (Math.sin(world.clock * 37) * 0.5) * 0.28 * shake;
    const oy = (Math.cos(world.clock * 31) * 0.5) * 0.18 * shake;
    if (world.screen !== "match") {
      desired.set(Math.sin(world.clock * 0.07) * 8, 6.2, 26);
      lookAt.set(0, 1.2, 10);
    } else if (world.phase === "flight" || world.phase === "goal" || world.phase === "miss") {
      desired.set(world.ball.x * 0.35, Math.max(2.4, world.ball.y + 2.4), world.ball.z + 8);
      lookAt.set(world.ball.x, Math.max(0.5, world.ball.y), world.ball.z - 3);
    } else {
      desired.set(world.ball.x * 0.25, 2.15, world.ball.z + 3.6);
      lookAt.set(world.ball.x * 0.05, 1.25, 4);
    }
    const k = 1 - Math.exp(-3.1 * Math.min(dt, 0.05));
    camPos.lerp(desired, k);
    look.lerp(lookAt, k);
    camera.position.set(camPos.x + ox, camPos.y + oy, camPos.z);
    camera.lookAt(look);
  }, 1);

  return (
    <>
      <color attach="background" args={["#16324a"]} />
      <fog attach="fog" args={["#16324a", 78, 170]} />
      <mesh>
        <sphereGeometry args={[120, 20, 12]} />
        <meshBasicMaterial color="#1d4e86" side={THREE.BackSide} />
      </mesh>
      <hemisphereLight args={["#e7f2ff", "#3d8a52", 1.35]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[10, 28, 18]}
        intensity={3.1}
        castShadow
        target={lightTarget}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={2}
        shadow-camera-far={80}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-bias={-0.0008}
      />
      <primitive object={lightTarget} />
      <spotLight position={[-26, 22, 8]} angle={0.55} penumbra={0.6} intensity={18} color="#fff6e8" distance={90} />
      <spotLight position={[26, 22, 8]} angle={0.55} penumbra={0.6} intensity={18} color="#fff6e8" distance={90} />
      <Pitch />
      <primitive object={line} />
      <mesh ref={ring}>
        <ringGeometry args={[0.18, 0.28, 20]} />
        <meshBasicMaterial color="#f4f4f5" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={blob} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 14]} />
        <meshBasicMaterial color="#04140c" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ball} castShadow>
        <sphereGeometry args={[0.11, 24, 18]} />
        <meshPhysicalMaterial map={tex} roughness={0.34} metalness={0.04} clearcoat={0.4} clearcoatRoughness={0.4} />
      </mesh>
      <Player id="kicker" shirt={strip.you} shorts={strip.youShorts} socks={strip.you} skin={skinTone(0)} number={PLAYER_NUMBER} seed={0} />
      <Player id="gk" shirt={strip.gk} shorts="#16181d" socks={strip.gk} skin={skinTone(1)} number="1" seed={1} gloves />
      <Player id="ref" shirt="#1c1c1c" shorts="#111111" socks="#111111" skin={skinTone(4)} seed={2} />
      <Player id="def" shirt="#5a463c" shorts="#1a1c20" socks="#5a463c" skin={skinTone(3)} number="2" seed={3} />
      {wallIds.map((id, i) => (
        <Player
          key={id}
          id={id}
          shirt={strip.opp}
          shorts={strip.oppShorts}
          socks={strip.opp}
          skin={skinTone(i + 2)}
          number={["4", "5", "6", "18", "3"][i]}
          seed={i + 4}
        />
      ))}
    </>
  );
}

function ballTexture() {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);
  g.fillStyle = "#f6f4ef";
  g.fillRect(0, 0, s, s);
  g.strokeStyle = "#1c1e22";
  g.lineWidth = 5;
  const panels: Array<[number, number, number]> = [
    [128, 70, 46],
    [70, 140, 40],
    [186, 140, 40],
    [108, 196, 36],
    [158, 196, 36],
    [128, 128, 28],
  ];
  for (const [x, y, r] of panels) {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.strokeStyle = "#2f6b45";
  g.lineWidth = 8;
  g.beginPath();
  g.arc(128, 128, 78, 0.2, 1.4);
  g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
