import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { numberInk } from "@/game/clubs";
import { poses } from "@/game/runtime";

type Id = keyof typeof poses;

type Props = {
  id: Id;
  shirt: string;
  shorts: string;
  socks: string;
  skin: string;
  number?: string;
  gloves?: boolean;
  seed?: number;
};

export function Player({ id, shirt, shorts, socks, skin, number, gloves, seed = 0 }: Props) {
  const root = useRef<THREE.Group>(null);
  const dive = useRef<THREE.Group>(null);
  const leg = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const shirtMat = useMat(shirt, 0.72);
  const shortMat = useMat(shorts, 0.74);
  const sockMat = useMat(socks, 0.68);
  const skinMat = useMat(skin, 0.55);
  const bootMat = useMat(seed % 2 === 0 ? "#161616" : "#f4f1ea", 0.4, 0.06);
  const hairMat = useMat(hairColor(seed), 0.62);
  const white = useMat("#f7f4ee", 0.35);
  const dark = useMat("#1a1c20", 0.4);
  const lip = useMat("#a15a55", 0.5);
  const gloveMat = useMat(gloves ? "#f3f1ea" : skin, 0.48);
  const stripe = useMat(numberInk(shirt) === "#16181d" ? "#1a1c20" : "#f7f7f5", 0.45);
  const numMap = useMemo(() => (number ? numberTexture(number, numberInk(shirt)) : null), [number, shirt]);
  const face = useFace(seed);
  const height = 0.96 + (seed % 5) * 0.018;
  const shoulders = 0.96 + ((seed * 3) % 4) * 0.02;

  useEffect(() => () => numMap?.dispose(), [numMap]);

  useFrame(() => {
    const pose = poses[id];
    const g = root.current;
    if (!pose || !g || !dive.current) return;
    g.visible = pose.visible;
    if (!pose.visible) return;
    g.position.set(pose.x, pose.y, pose.z);
    g.rotation.y = pose.yaw;
    dive.current.rotation.z = pose.lean;
    dive.current.rotation.x = pose.flinch * 0.28;
    dive.current.position.y = pose.lift;
    if (leg.current) leg.current.rotation.x = pose.leg;
    const raise = pose.armRaise;
    if (armL.current) {
      armL.current.rotation.z = 0.18 + raise * 1.15;
      armL.current.rotation.x = -raise * 0.2;
    }
    if (armR.current) {
      armR.current.rotation.z = -0.18 - raise * 1.15;
      armR.current.rotation.x = -raise * 0.2;
    }
  });

  const hair = seed % 3;

  return (
    <group ref={root} scale={[shoulders, height, shoulders]}>
      <group ref={dive}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <circleGeometry args={[0.32, 16]} />
          <meshBasicMaterial color="#06140c" transparent opacity={0.35} />
        </mesh>
        <Leg position={[-0.11, 0.96, 0]} sock={sockMat} boot={bootMat} skin={skinMat} />
        <group ref={leg} position={[0.11, 0.96, 0]}>
          <LegInner sock={sockMat} boot={bootMat} skin={skinMat} />
        </group>
        <mesh position={[0, 0.98, 0]} material={shortMat} castShadow>
          <capsuleGeometry args={[0.2, 0.08, 4, 10]} />
        </mesh>
        <mesh position={[0, 1.28, 0]} material={shirtMat} castShadow>
          <capsuleGeometry args={[0.2, 0.36, 6, 12]} />
        </mesh>
        <mesh position={[0, 1.46, 0]} rotation={[0, 0, Math.PI / 2]} material={shirtMat}>
          <torusGeometry args={[0.16, 0.028, 8, 16]} />
        </mesh>
        <mesh position={[0, 1.34, 0.19]} material={stripe}>
          <boxGeometry args={[0.4, 0.045, 0.01]} />
        </mesh>
        {numMap ? (
          <mesh position={[0, 1.3, 0.205]}>
            <planeGeometry args={[0.16, 0.2]} />
            <meshBasicMaterial map={numMap} transparent />
          </mesh>
        ) : null}
        {numMap ? (
          <mesh position={[0, 1.3, -0.205]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.22, 0.28]} />
            <meshBasicMaterial map={numMap} transparent />
          </mesh>
        ) : null}
        <group ref={armL} position={[-0.28, 1.46, 0]}>
          <Arm cloth={shirtMat} skin={skinMat} hand={gloveMat} />
        </group>
        <group ref={armR} position={[0.28, 1.46, 0]}>
          <Arm cloth={shirtMat} skin={skinMat} hand={gloveMat} />
        </group>
        <mesh position={[0, 1.58, 0]} material={skinMat}>
          <cylinderGeometry args={[0.06, 0.07, 0.1, 10]} />
        </mesh>
        <mesh position={[0, 1.74, 0.01]} material={skinMat} castShadow>
          <sphereGeometry args={[0.135, 22, 18]} />
        </mesh>
        <mesh position={[-0.125, 1.74, 0]} material={skinMat}>
          <sphereGeometry args={[0.028, 8, 8]} />
        </mesh>
        <mesh position={[0.125, 1.74, 0]} material={skinMat}>
          <sphereGeometry args={[0.028, 8, 8]} />
        </mesh>
        {face ? (
          <mesh position={[0, 1.78, 0.2]}>
            <circleGeometry args={[0.15, 28]} />
            <meshBasicMaterial map={face} transparent side={THREE.DoubleSide} depthTest />
          </mesh>
        ) : (
          <>
            <mesh position={[0, 1.72, 0.11]} material={skinMat}>
              <sphereGeometry args={[0.045, 10, 8]} />
            </mesh>
            <mesh position={[-0.048, 1.775, 0.1]} rotation={[0, 0, 0.3]} material={dark}>
              <boxGeometry args={[0.045, 0.012, 0.012]} />
            </mesh>
            <mesh position={[0.048, 1.775, 0.1]} rotation={[0, 0, -0.3]} material={dark}>
              <boxGeometry args={[0.045, 0.012, 0.012]} />
            </mesh>
            <mesh position={[-0.046, 1.745, 0.118]} material={white}>
              <sphereGeometry args={[0.02, 10, 8]} />
            </mesh>
            <mesh position={[0.046, 1.745, 0.118]} material={white}>
              <sphereGeometry args={[0.02, 10, 8]} />
            </mesh>
            <mesh position={[-0.046, 1.744, 0.134]} material={dark}>
              <sphereGeometry args={[0.01, 8, 8]} />
            </mesh>
            <mesh position={[0.046, 1.744, 0.134]} material={dark}>
              <sphereGeometry args={[0.01, 8, 8]} />
            </mesh>
            <mesh position={[0, 1.69, 0.128]} material={lip}>
              <boxGeometry args={[0.045, 0.012, 0.012]} />
            </mesh>
          </>
        )}
        {hair === 0 ? (
          <mesh position={[0, 1.82, -0.01]} material={hairMat}>
            <sphereGeometry args={[0.14, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
          </mesh>
        ) : null}
        {hair === 1 ? (
          <mesh position={[0, 1.8, -0.02]} material={hairMat}>
            <sphereGeometry args={[0.142, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          </mesh>
        ) : null}
        {hair === 2 ? (
          <mesh position={[0, 1.86, 0]} material={hairMat}>
            <sphereGeometry args={[0.09, 12, 10]} />
          </mesh>
        ) : null}
      </group>
    </group>
  );
}

function Leg({
  position,
  sock,
  boot,
  skin,
}: {
  position: [number, number, number];
  sock: THREE.Material;
  boot: THREE.Material;
  skin: THREE.Material;
}) {
  return (
    <group position={position}>
      <LegInner sock={sock} boot={boot} skin={skin} />
    </group>
  );
}

function LegInner({
  sock,
  boot,
  skin,
}: {
  sock: THREE.Material;
  boot: THREE.Material;
  skin: THREE.Material;
}) {
  return (
    <>
      <mesh position={[0, -0.16, 0]} material={skin} castShadow>
        <capsuleGeometry args={[0.07, 0.22, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.42, 0.01]} material={sock} castShadow>
        <capsuleGeometry args={[0.055, 0.24, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.55, 0.02]} material={sock}>
        <cylinderGeometry args={[0.062, 0.058, 0.06, 10]} />
      </mesh>
      <mesh position={[0, -0.72, 0.05]} material={boot} castShadow>
        <boxGeometry args={[0.11, 0.07, 0.22]} />
      </mesh>
    </>
  );
}

function Arm({
  cloth,
  skin,
  hand,
}: {
  cloth: THREE.Material;
  skin: THREE.Material;
  hand: THREE.Material;
}) {
  return (
    <>
      <mesh position={[0, -0.16, 0]} material={cloth} castShadow>
        <capsuleGeometry args={[0.05, 0.18, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.36, 0]} material={skin}>
        <capsuleGeometry args={[0.04, 0.16, 3, 8]} />
      </mesh>
      <mesh position={[0, -0.5, 0.01]} material={hand}>
        <sphereGeometry args={[0.05, 10, 8]} />
      </mesh>
    </>
  );
}

function useFace(seed: number) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let drop = false;
    const img = new Image();
    img.onload = () => {
      if (drop) return;
      const size = 512;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const g = c.getContext("2d");
      if (!g) return;
      g.drawImage(img, 0, 0, size, size);
      g.globalCompositeOperation = "destination-in";
      g.beginPath();
      g.arc(size * 0.5, size * 0.42, size * 0.34, 0, Math.PI * 2);
      g.fill();
      const next = new THREE.CanvasTexture(c);
      next.colorSpace = THREE.SRGBColorSpace;
      next.needsUpdate = true;
      setTex(next);
    };
    img.src = `/faces/p${seed % 3}.jpg`;
    return () => {
      drop = true;
    };
  }, [seed]);
  return tex;
}

function hairColor(seed: number) {
  return ["#1a120e", "#3a2418", "#0e0e0e", "#5a3a28", "#2a2a2a"][seed % 5]!;
}

function useMat(color: string, roughness: number, metalness = 0.02) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color, roughness, metalness }),
    [color, roughness, metalness],
  );
  useEffect(() => () => mat.dispose(), [mat]);
  return mat;
}

function numberTexture(num: string, ink: string) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 160;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);
  g.clearRect(0, 0, 128, 160);
  g.fillStyle = ink;
  g.font = "600 112px 'Barlow Condensed', sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(num, 64, 82);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
