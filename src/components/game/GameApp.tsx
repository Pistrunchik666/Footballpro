import { Component, useEffect, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Scene } from "@/components/game/Scene";
import { Overlay } from "@/components/game/Overlay";
import { unlockAudio } from "@/game/audio";
import { commitShot, previewAim, world } from "@/game/runtime";
import { ensurePlayable, useGame } from "@/game/store";

export function GameApp() {
  return (
    <Boundary>
      <div className="game">
        <div className="stage">
          <Canvas
            shadows
            dpr={[1, 1.25]}
            frameloop="always"
            camera={{ fov: 38, near: 0.1, far: 260, position: [0, 4.2, 26] }}
            style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              preserveDrawingBuffer: true,
            }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.15;
              gl.setClearColor("#16324a", 1);
              gl.domElement.style.touchAction = "none";
            }}
          >
            <Scene />
          </Canvas>
        </div>
        <Gestures />
        <Overlay />
      </div>
    </Boundary>
  );
}

function Gestures() {
  const aiming = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const pts = useRef<Array<{ x: number; y: number }>>([]);
  const screen = useGame((s) => s.screen);

  useEffect(() => {
    const down = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && typeof target.closest === "function" && target.closest("button, a, input, label, .panel, .hud-hit")) return;
      unlockAudio();
      ensurePlayable();
      if (world.screen !== "match" || world.paused || world.phase !== "idle" || world.settled) return;
      aiming.current = true;
      world.userAiming = true;
      start.current = { x: e.clientX, y: e.clientY };
      pts.current = [{ x: e.clientX, y: e.clientY }];
      const cap = e.target as HTMLElement | null;
      if (cap && typeof cap.setPointerCapture === "function") {
        try {
          cap.setPointerCapture(e.pointerId);
        } catch {
          /* canvas may already be released */
        }
      }
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!aiming.current) return;
      e.preventDefault();
      pts.current.push({ x: e.clientX, y: e.clientY });
      if (pts.current.length > 48) pts.current.shift();
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      const power = clamp(-dy / 150, 0, 1);
      const side = clamp(dx / 120, -1, 1);
      world.power = power;
      if (power < 0.05) {
        world.showAim = false;
        world.preview = [];
        world.launchDraft = null;
        world.spin = side;
        return;
      }
      previewAim(side * 0.82, power, side);
    };
    const up = (e: PointerEvent) => {
      if (!aiming.current) return;
      aiming.current = false;
      world.userAiming = false;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      const power = clamp(-dy / 150, 0, 1);
      const side = clamp(dx / 120, -1, 1);
      if (power > 0.12) {
        ensurePlayable();
        previewAim(side * 0.82, power, side);
        commitShot(power);
      } else {
        world.showAim = false;
        world.preview = [];
        world.power = 0;
        world.spin = 0;
        world.launchDraft = null;
      }
    };
    const blockTouch = (e: TouchEvent) => {
      if (world.screen === "match" && !world.paused && world.phase === "idle") e.preventDefault();
    };
    window.addEventListener("pointerdown", down, { passive: false });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("touchmove", blockTouch, { passive: false });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("touchmove", blockTouch);
    };
  }, [screen]);

  return null;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

class Boundary extends Component<{ children: ReactNode }, { error: string }> {
  state = { error: "" };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message || "Не удалось запустить поле" };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="boot">
          <p className="display boot-title">Football Pro</p>
          <p className="muted">{this.state.error}</p>
        </main>
      );
    }
    return this.props.children;
  }
}
