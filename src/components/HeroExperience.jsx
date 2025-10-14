import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AvatarHero2 } from "./models/AvatarHero2";

import React from "react";

const HeroExperience = () => {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[-2, 0, 3]} intensity={3} color={"#FF28D5"} />
      <directionalLight position={[2, 0, 3]} intensity={3} color={"#fefefe"} />

      <Sparkles
        count={100}
        size={2}
        speed={0.5}
        color={"pink"}
        scale={[10, 10, 2]}
      />
      <group>
        <AvatarHero2 scale={9} position={[0, -15, 0]} />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
