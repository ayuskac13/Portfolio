import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const V_SIZE = 0.5;

function BurgerModel() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { voxelData, count } = useMemo(() => {
    const data: { pos: [number, number, number]; color: string }[] = [];
    const addVoxel = (x: number, y: number, z: number, color: string) => {
      data.push({ pos: [x * V_SIZE, y * V_SIZE, z * V_SIZE], color });
    };

    const C = {
      bunDark: '#8a400b', bunMid: '#bd6a1e', bunLight: '#de9d4e', bunInside: '#f2cd99',
      sesame: '#fceba4',
      meatDark: '#211005', meatMid: '#3d1d0c', meatHighlight: '#572b13',
      cheese: '#ffaa00', cheeseLight: '#ffcc00',
      sauceDark: '#800606', sauceRed: '#cc1414', sauceBright: '#fa2525',
      jalapenoDark: '#1a2b0e', jalapenoMid: '#314a1c', jalapenoLight: '#6e8f3a',
      chiliRed: '#db0f0f', chiliDark: '#8a0606', chiliStem: '#214d13'
    };

    const R = 22;
    const noise = (nx: number, nz: number) => Math.sin(nx * 0.5) * Math.cos(nz * 0.5) + Math.sin(nx * 0.2 + nz * 0.3);

    // 1. Bottom Bun
    let currentY = 0;
    let bunH = 8;
    for (let y = 0; y < bunH; y++) {
      for (let x = -R; x <= R; x++) {
        for (let z = -R; z <= R; z++) {
          let radSq = x * x + z * z;
          let targetR = R - 1 - (bunH - y) * 0.2;
          if (y > bunH - 2) targetR = R;
          if (radSq <= targetR * targetR) {
            let color = C.bunInside;
            let dist = Math.sqrt(radSq);
            if (dist > targetR - 2) {
              let n = noise(x, z);
              color = n > 0.5 ? C.bunMid : (n < -0.5 ? C.bunLight : '#a35a17');
              if (y < 2) color = C.bunLight;
            }
            addVoxel(x, currentY + y, z, color);
          }
        }
      }
    }
    currentY += bunH;

    // 2. Sauce & Drips
    for (let x = -R - 2; x <= R + 2; x++) {
      for (let z = -R - 2; z <= R + 2; z++) {
        let dist = Math.sqrt(x * x + z * z);
        if (dist <= R - 1) {
          addVoxel(x, currentY, z, Math.random() > 0.5 ? C.sauceDark : C.sauceRed);
        }
        if (dist > R - 2 && dist < R + 1.5) {
          if (Math.random() < 0.15) {
            let dropLen = Math.floor(Math.random() * 8) + 2;
            for (let dy = 0; dy <= dropLen; dy++) {
              if (Math.random() < (1 - dy / dropLen) + 0.2) {
                let c = dy > dropLen - 2 ? C.sauceBright : C.sauceRed;
                addVoxel(x, currentY - dy, z, c);
              }
            }
          }
        }
      }
    }
    currentY += 1;

    // 3. Meat
    let meatH = 10;
    for (let y = 0; y < meatH; y++) {
      for (let x = -R - 1; x <= R + 1; x++) {
        for (let z = -R - 1; z <= R + 1; z++) {
          let angle = Math.atan2(z, x);
          let edgeNoise = Math.sin(angle * 12) * 1.5 + Math.cos(angle * 7) * 1.0;
          let targetR = R - 1.5 + edgeNoise;
          if (x * x + z * z <= targetR * targetR) {
            let isSurface = (x * x + z * z > (targetR - 1.5) * (targetR - 1.5)) || y === 0 || y === meatH - 1;
            let color = C.meatMid;
            if (isSurface) {
              let rVal = Math.random();
              if (rVal > 0.7) color = C.meatDark;
              else if (rVal < 0.2) color = C.meatHighlight;
            }
            addVoxel(x, currentY + y, z, color);
          }
        }
      }
    }
    currentY += meatH;

    // 4. Cheese & Drips
    let cheeseH = 2;
    for (let y = 0; y < cheeseH; y++) {
      for (let x = -R - 2; x <= R + 2; x++) {
        for (let z = -R - 2; z <= R + 2; z++) {
          let dist = Math.sqrt(x * x + z * z);
          if (dist <= R - 0.5) {
            addVoxel(x, currentY + y, z, Math.random() > 0.8 ? C.cheeseLight : C.cheese);
          }
        }
      }
    }
    // Cheese Drips
    for (let i = 0; i < 8; i++) {
        let angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
        let cx = Math.cos(angle) * (R - 1);
        let cz = Math.sin(angle) * (R - 1);
        let dropLen = Math.floor(Math.random() * 7) + 5;
        let width = Math.floor(Math.random() * 3) + 2;
        for (let dy = 1; dy <= dropLen; dy++) {
            for (let wx = -width; wx <= width; wx++) {
                if (Math.abs(wx) < width - (dy / dropLen) * width + 1) {
                     let px = Math.round(cx + Math.cos(angle+Math.PI/2)*wx);
                     let pz = Math.round(cz + Math.sin(angle+Math.PI/2)*wx);
                     addVoxel(px, currentY - dy, pz, C.cheese);
                }
            }
        }
    }
    currentY += cheeseH;

    // 5. Top Bun
    let topBunH = 16;
    for (let y = 0; y <= topBunH; y++) {
      for (let x = -R - 2; x <= R + 2; x++) {
        for (let z = -R - 2; z <= R + 2; z++) {
          let nx = x / R;
          let ny = y / topBunH;
          let nz = z / R;
          if (nx * nx + Math.pow(ny, 1.6) + nz * nz <= 1) {
            let color = C.bunInside;
            let distToSurface = 1 - (nx * nx + Math.pow(ny, 1.6) + nz * nz);
            if (distToSurface < 0.15 || y === 0) {
              color = C.bunMid;
              if (ny > 0.6) color = C.bunDark;
              else if (ny < 0.2) color = C.bunLight;
            }
            addVoxel(x, currentY + y, z, color);
            // Seeds
            if (distToSurface < 0.05 && ny > 0.3 && Math.random() < 0.08) {
              addVoxel(x, currentY + y + 1, z, C.sesame);
            }
          }
        }
      }
    }

    return { voxelData: data, count: data.length };
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    voxelData.forEach((v, i) => {
      dummy.position.set(...v.pos);
      dummy.updateMatrix();
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, color.set(v.color));
      }
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  }, [voxelData]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <boxGeometry args={[V_SIZE, V_SIZE, V_SIZE]} />
      <meshStandardMaterial roughness={0.75} metalness={0.05} />
    </instancedMesh>
  );
}

export default function VoxelBurger() {
  return (
    <div className="w-full h-[500px] bg-zinc-950 rounded-[3rem] overflow-hidden border border-white/5 relative group shadow-2xl">
      <div className="absolute top-10 left-10 z-10 space-y-2 pointer-events-none">
        <h3 className="text-3xl font-bold tracking-tighter text-white">Voxel Spicy Burger</h3>
        <p className="text-sm text-indigo-400 font-mono uppercase tracking-widest">Interactive 3D Simulation</p>
      </div>
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera makeDefault position={[30, 20, 30]} fov={45} />
        <OrbitControls enableZoom={false} enablePan={false} dampingFactor={0.05} />
        <ambientLight intensity={0.5} />
        <spotLight position={[-20, 40, 20]} angle={Math.PI / 4} penumbra={0.5} intensity={1000} castShadow />
        <directionalLight position={[20, 10, -20]} intensity={1.5} color="#444455" />
        <pointLight position={[15, 5, 15]} intensity={500} color="#ff3300" />
        <BurgerModel />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#08080a" roughness={0.9} metalness={0.1} />
        </mesh>
      </Canvas>
      <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Drag to rotate • Scroll to explore</p>
      </div>
    </div>
  );
}
