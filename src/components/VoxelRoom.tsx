import { useRef, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";

function RoomScene() {
  const { scene, camera, gl, size } = useThree();
  const composerRef = useRef<EffectComposer>(null);

  // Materials
  const materials = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({ color: 0xffd8b8, roughness: 0.6 }),
    blush: new THREE.MeshStandardMaterial({ color: 0xff9999, roughness: 0.6 }),
    hair: new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.8 }),
    jacket: new THREE.MeshStandardMaterial({ color: 0x3b5998, roughness: 0.9 }),
    jacketLight: new THREE.MeshStandardMaterial({ color: 0x5a7ab9, roughness: 0.9 }),
    heart: new THREE.MeshStandardMaterial({ color: 0xd93838, roughness: 0.7 }),
    sofa: new THREE.MeshStandardMaterial({ color: 0x9e9a91, roughness: 0.9 }),
    sofaDark: new THREE.MeshStandardMaterial({ color: 0x827e75, roughness: 0.9 }),
    pillowYellow: new THREE.MeshStandardMaterial({ color: 0xd49b24, roughness: 0.8 }),
    pillowDark: new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.8 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.8 }),
    lampWood: new THREE.MeshStandardMaterial({ color: 0x503010, roughness: 0.8 }),
    lampShade: new THREE.MeshStandardMaterial({ color: 0xfff0c0, emissive: 0xffcc66, emissiveIntensity: 0.8 }),
    white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x3c4c5c, roughness: 1.0 }),
    floor: new THREE.MeshStandardMaterial({ color: 0x504030, roughness: 0.9 }),
    rug: new THREE.MeshStandardMaterial({ color: 0x8a7b6c, roughness: 1.0 })
  }), []);

  useEffect(() => {
    // Setup Fog
    scene.fog = new THREE.FogExp2(0x2c3e50, 0.012);
    
    // Helper to add blocks
    const addBlock = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = scene) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // 1. Build Room
    addBlock(100, 2, 80, materials.floor, 0, -1, 0);
    addBlock(40, 0.2, 25, materials.rug, -5, 0.1, 5);
    addBlock(100, 40, 2, materials.wall, 0, 20, -20);
    addBlock(2, 40, 80, materials.wall, -40, 20, 10);

    // 2. Build Sofa
    const sofaGroup = new THREE.Group();
    addBlock(26, 4, 12, materials.sofa, 0, 2, 0, sofaGroup);
    addBlock(26, 12, 4, materials.sofa, 0, 10, -4, sofaGroup);
    addBlock(4, 5, 12, materials.sofa, -13, 6.5, 0, sofaGroup);
    addBlock(4, 5, 12, materials.sofa, 13, 6.5, 0, sofaGroup);
    addBlock(11, 1.5, 10, materials.sofaDark, -5.5, 4.75, 1, sofaGroup);
    addBlock(11, 1.5, 10, materials.sofaDark, 5.5, 4.75, 1, sofaGroup);
    addBlock(5, 5, 2, materials.pillowYellow, -8, 8, -1.5, sofaGroup).rotation.z = 0.1;
    addBlock(6, 6, 2.5, materials.pillowDark, 9, 8.5, -1.5, sofaGroup).rotation.z = -0.15;
    addBlock(5, 5, 2, materials.pillowDark, -3, 7.5, -2, sofaGroup);
    scene.add(sofaGroup);

    // 3. Build Furniture
    const tableGroup = new THREE.Group();
    tableGroup.position.set(-14, 0, 10);
    addBlock(12, 0.8, 8, materials.wood, 0, 4, 0, tableGroup);
    addBlock(1, 4, 1, materials.wood, -5, 2, -3, tableGroup);
    addBlock(1, 4, 1, materials.wood, 5, 2, -3, tableGroup);
    addBlock(1, 4, 1, materials.wood, -5, 2, 3, tableGroup);
    addBlock(1, 4, 1, materials.wood, 5, 2, 3, tableGroup);
    addBlock(1.8, 2.5, 1.8, materials.white, 2, 5.65, -1, tableGroup);
    addBlock(0.5, 1.5, 1, materials.white, 3, 5.5, -1, tableGroup);
    // Steam
    addBlock(0.4, 0.4, 0.4, materials.white, 2, 7.5, -1, tableGroup);
    addBlock(0.3, 0.3, 0.3, materials.white, 2.2, 8.2, -1.2, tableGroup);
    scene.add(tableGroup);

    // Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-16, 0, -6);
    addBlock(0.8, 14, 0.8, materials.lampWood, 0, 7, 0, lampGroup);
    addBlock(6, 0.5, 1, materials.lampWood, 0, 0.25, 0, lampGroup).rotation.y = Math.PI/4;
    addBlock(6, 0.5, 1, materials.lampWood, 0, 0.25, 0, lampGroup).rotation.y = -Math.PI/4;
    addBlock(7, 6, 7, materials.lampShade, 0, 14, 0, lampGroup);
    scene.add(lampGroup);

    // Bookshelf
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(-24, 0, -17);
    addBlock(10, 24, 4, materials.wood, 0, 12, 0, shelfGroup);
    addBlock(8, 22, 3.5, materials.wall, 0, 12, 0.5, shelfGroup);
    for(let i=4; i<22; i+=5) {
        addBlock(9, 0.5, 3.8, materials.wood, 0, i, 0, shelfGroup);
        if(Math.random() > 0.3) addBlock(1.5, 3, 2.5, materials.white, -3, i+1.75, 0, shelfGroup);
        if(Math.random() > 0.3) addBlock(1, 3.5, 2.5, materials.jacketLight, -1, i+2, 0, shelfGroup);
        if(Math.random() > 0.3) addBlock(2, 2.8, 2.5, materials.pillowYellow, 2, i+1.6, 0, shelfGroup);
    }
    scene.add(shelfGroup);

    // 4. Character
    const charGroup = new THREE.Group();
    charGroup.position.set(2, 5.5, 2);
    addBlock(2.5, 2, 2.5, materials.skin, -2, 1, 2, charGroup);
    addBlock(2.5, 2, 2.5, materials.skin, 2, 1, 2, charGroup);
    addBlock(7, 5, 4, materials.jacket, 0, 4.5, 0, charGroup);
    addBlock(7.2, 1, 4.2, materials.jacketLight, 0, 2.5, 0, charGroup);
    addBlock(2.5, 3.5, 4, materials.jacket, -4.5, 4.5, 1.5, charGroup);
    addBlock(2.5, 3.5, 4, materials.jacket, 4.5, 4.5, 1.5, charGroup);
    addBlock(1.8, 1.8, 1.8, materials.skin, -4, 3.5, 4, charGroup);
    addBlock(1.8, 1.8, 1.8, materials.skin, 4, 3.5, 4, charGroup);
    addBlock(8.5, 6, 6, materials.skin, 0, 10, 0, charGroup);
    addBlock(9.5, 7, 5, materials.hair, 0, 10.5, -1.5, charGroup);
    addBlock(2, 4, 2, materials.hair, -4.5, 8.5, 0.5, charGroup);
    addBlock(2, 4, 2, materials.hair, 4.5, 8.5, 0.5, charGroup);
    addBlock(1.2, 1.8, 0.5, materials.hair, -2, 10, 3.1, charGroup);
    addBlock(1.2, 1.8, 0.5, materials.hair, 2, 10, 3.1, charGroup);
    addBlock(1.5, 1, 0.5, materials.blush, -3.5, 9, 3.1, charGroup);
    addBlock(1.5, 1, 0.5, materials.blush, 3.5, 9, 3.1, charGroup);
    addBlock(1.2, 0.4, 0.4, materials.hair, 0, 9, 3.1, charGroup);
    addBlock(9, 3.5, 8, materials.hair, 0, 14, -0.5, charGroup);
    addBlock(9.5, 1.5, 4, materials.hair, 0, 12.5, 4, charGroup);
    scene.add(charGroup);

    // 5. Voxel Heart
    const buildHeart = (x: number, y: number, z: number) => {
      const heartGroup = new THREE.Group();
      const s = 0.65;
      const pattern = [
          "  XX  XX  ",
          " XXXX XXXX ",
          "XXXXXXXXXX",
          "XXXXXXXXXX",
          " XXXXXXXX ",
          "  XXXXXX  ",
          "   XXXX   ",
          "    XX    "
      ];
      const depth = 5;
      for (let r = 0; r < pattern.length; r++) {
          for (let c = 0; c < pattern[r].length; c++) {
              if (pattern[r][c] === 'X') {
                  for (let d = 0; d < depth; d++) {
                      const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), materials.heart);
                      mesh.position.set(
                          (c - pattern[r].length / 2) * s + (s/2),
                          (pattern.length / 2 - r) * s - (s/2),
                          (d - depth / 2) * s + (s/2)
                      );
                      mesh.castShadow = true;
                      mesh.receiveShadow = true;
                      heartGroup.add(mesh);
                  }
              }
          }
      }
      const faceZ = (depth/2) * s + 0.1;
      addBlock(0.6, 0.6, 0.3, materials.hair, -1.2, 0.5, faceZ, heartGroup);
      addBlock(0.6, 0.6, 0.3, materials.hair, 1.2, 0.5, faceZ, heartGroup);
      addBlock(0.8, 0.3, 0.3, materials.hair, 0, 0, faceZ, heartGroup);
      heartGroup.position.set(x, y, z);
      heartGroup.rotation.x = -0.1;
      heartGroup.rotation.y = 0.05;
      scene.add(heartGroup);
    };
    buildHeart(charGroup.position.x, charGroup.position.y + 4.5, charGroup.position.z + 4.5);

    // Post-processing
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.8, 0.5, 0.7);
    bloomPass.threshold = 0.7;
    bloomPass.strength = 0.8;
    bloomPass.radius = 0.5;
    composer.addPass(bloomPass);
    (composerRef as any).current = composer;

    return () => {
      // Cleanup
      scene.clear();
    };
  }, [scene, camera, gl, size, materials]);

  useFrame(() => {
    if (composerRef.current) {
      composerRef.current.render();
    }
  }, 1);

  return null;
}

export default function VoxelRoom() {
  return (
    <div className="w-full h-[600px] bg-[#2c3e50] rounded-[3rem] overflow-hidden border border-white/5 relative group shadow-2xl">
      <div className="absolute top-10 left-10 z-10 space-y-2 pointer-events-none">
        <h3 className="text-3xl font-bold tracking-tighter text-white">Cozy Voxel Room</h3>
        <p className="text-sm text-indigo-300 font-mono uppercase tracking-widest">Procedural 3D Environment</p>
      </div>
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[-20, 14, 28]} fov={45} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          dampingFactor={0.05} 
          autoRotate 
          autoRotateSpeed={0.3}
          target={[0, 6, 0]}
        />
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[40, 30, 10]} 
          intensity={1.2} 
          color="#ccddee" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-16, 14, -6]} intensity={100} color="#ffbb55" castShadow />
        <RoomScene />
      </Canvas>
      <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">Drag to explore • Scroll to immerse</p>
      </div>
    </div>
  );
}
