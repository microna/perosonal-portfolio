import { Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { ContactAvatar } from "./models/Avatar2";

const ContactExperience = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={5} color={"#f1f1f1"} />
      <directionalLight />
      <group>
        <Text3D
          position={[-2, -3, -5]}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.1}
          height={1.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font={"/fonts/Inter_Bold.json"}
        >
          {`hello`}
          <meshNormalMaterial />
        </Text3D>
        <ContactAvatar scale={2} position={[-2, -3, -1]} />
      </group>
    </Canvas>
  );
};

export default ContactExperience;
