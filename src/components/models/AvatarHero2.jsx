import { useGLTF } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function AvatarHero2(props) {
  const group = useRef();
  const { scene } = useGLTF("/models/avatarnew.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const rawTarget = useRef(new THREE.Vector3(0, 0, 1));
  const smoothTarget = useRef(new THREE.Vector3(0, 0, 1));
  const [isIntroAnimationDone, setIsIntroAnimationDone] = useState(false);

  useGSAP(() => {
    if (!isIntroAnimationDone) {
      gsap.fromTo(
        group.current.rotation,
        { y: Math.PI },
        {
          y: 0,
          delay: 0.5,
          duration: 1.5,
          ease: "expo.inOut",
          onComplete: () => setIsIntroAnimationDone(true),
        }
      );
    }

    if (isIntroAnimationDone) {
      const updateTarget = (clientX, clientY) => {
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) * 2 - 1;
        const y = -(clientY / innerHeight) * 2 + 1;
        rawTarget.current.set(x, y, 1);
      };

      const handleMouseMove = (e) => updateTarget(e.clientX, e.clientY);

      const handleTouchStart = (e) => {
        const t = e.touches[0];
        updateTarget(t.clientX, t.clientY);
      };

      const handleTouchMove = (e) => {
        const t = e.touches[0];
        updateTarget(t.clientX, t.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isIntroAnimationDone]);

  useFrame(() => {
    if (!isIntroAnimationDone || !group.current) return;

    // Slow lerp — 0.04 feels deliberate on mobile, smooth on desktop
    smoothTarget.current.lerp(rawTarget.current, 0.04);

    const head = group.current.getObjectByName("Head");
    if (head) {
      head.lookAt(smoothTarget.current);
    }

    group.current.rotation.y +=
      (smoothTarget.current.x * 0.5 - group.current.rotation.y) * 0.04;
  });

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/models/avatarnew.glb");
