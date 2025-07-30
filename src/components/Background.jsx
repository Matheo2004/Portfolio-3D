import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Background component: shows a huge sphere that changes color while scrolling
export const Background = () => {
    const material = useRef();

    const color = useRef({
        color: "#b9bcff",
    });

    // Get scroll position (from drei)
    const data = useScroll();

    // GSAP timeline stored in a ref
    const tl = useRef();

    // Runs on every frame
    useFrame(() => {
        tl.current.progress(data.scroll.current);
        material.current.color = new THREE.Color(color.current.color);
    });

    useEffect(() => {
        tl.current = gsap.timeline();

        // Animate background color across scroll
        tl.current.to(color.current, { color: "#212121" });
        tl.current.to(color.current, { color: "#7a7ca5" });
        tl.current.to(color.current, { color: "#9b96dd" });
    }, []);

    return (
        <group>
            <Sphere scale={[40, 40, 40]}>
                <meshBasicMaterial
                    ref={material}
                    side={THREE.BackSide}
                    toneMapped={false}
                />
            </Sphere>
        </group>
    );
};
