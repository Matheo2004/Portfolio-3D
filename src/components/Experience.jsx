// Import useful things for 3D rendering, animation, and custom components
import {
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { Office } from "./Office";
import { Projects } from "./Projects";

export const Experience = (props) => {
    const { menuOpened } = props; // Check if the menu is open
    const { viewport } = useThree(); // Get screen size info
    const data = useScroll(); // Get scrolling data

    const isMobile = window.innerWidth < 768; // Check if on a mobile screen

    // Adjust scaling based on screen width
    const responsiveRatio = viewport.width / 12;
    const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

    const [section, setSection] = useState(0); // Track which section we're in

    // Create animated values for the camera
    const cameraPositionX = useMotionValue();
    const cameraLookAtX = useMotionValue();

    // Move the camera when the menu opens or closes
    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -5 : 0, {
            ...framerMotionConfig,
        });
        animate(cameraLookAtX, menuOpened ? 5 : 0, {
            ...framerMotionConfig,
        });
    }, [menuOpened]);

    // This ref is used to place the avatar at a specific spot
    const characterContainerAboutRef = useRef();

    // This will control the avatar's animation
    const [characterAnimation, setCharacterAnimation] = useState("Typing");

    useEffect(() => {
        // When section changes, make avatar fall briefly
        setCharacterAnimation("Falling");
        setTimeout(() => {
            // Then return to a different animation depending on section
            if (section === 0) {
                setCharacterAnimation("Typing");
            }
            else if (section === 3){
                setCharacterAnimation("Punch");
            }
            else {
                setCharacterAnimation("Standing");
            }
        }, 600);
    }, [section]);

    // This ref is for the whole avatar 3D group
    const characterGroup = useRef();

    // Runs every frame to update camera and section logic
    useFrame((state) => {
        // Get current section based on scroll
        let curSection = Math.floor(data.scroll.current * data.pages);

        // Limit to max section number
        if (curSection > 4) {
            curSection = 4;
        }

        // If section has changed, update it
        if (curSection !== section) {
            setSection(curSection);
        }

        // Set camera position and look direction
        state.camera.position.x = cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0, 0);

        // In section 0, reposition avatar based on a ref
        if (section === 0) {
            characterContainerAboutRef.current.getWorldPosition(
                characterGroup.current.position
            );
        }
    });

    return (
        <>
            {/* Background component */}
            <Background />

            {/* Avatar group that moves and rotates depending on section */}
            <motion.group
                ref={characterGroup}
                rotation={[-Math.PI, 1.205, Math.PI]}
                scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
                animate={"" + section}
                transition={{ duration: 0.6 }}
                variants={{
                    0: {
                        scaleX: officeScaleRatio,
                        scaleY: officeScaleRatio,
                        scaleZ: officeScaleRatio,
                    },
                    1: {
                        y: -viewport.height + 0.5,
                        x: isMobile ? 0.3 : 0,
                        z: 7,
                        rotateX: 0,
                        rotateY: isMobile ? -Math.PI / 2 : 0,
                        rotateZ: 0,
                        scaleX: isMobile ? 1.5 : 1,
                        scaleY: isMobile ? 1.5 : 1,
                        scaleZ: isMobile ? 1.5 : 1,
                    },
                    2: {
                        x: isMobile ? -1.4 : -2,
                        y: -viewport.height * 2 + 0.5,
                        z: 0,
                        rotateX: 0,
                        rotateY: Math.PI / 2,
                        rotateZ: 0,
                        scaleX: 1,
                        scaleY: 1,
                        scaleZ: 1,
                    },
                    3: {
                        y: -viewport.height * 3 + 0.5,
                        x: 3,
                        z: 4,
                        rotateX: 0,
                        rotateY: -Math.PI /16,
                        rotateZ: 0,
                        scaleX: 1,
                        scaleY: 1,
                        scaleZ: 1,
                    },
                    4: {
                        y: -viewport.height * 4 + 1,
                        x: 0.24,
                        z: 8.5,
                        rotateX: 0,
                        rotateY: -Math.PI / 4,
                        rotateZ: 0,
                        scaleX: 1,
                        scaleY: 1,
                        scaleZ: 1,
                    },
                }}
            >
                {/* The avatar character */}
                <Avatar animation={characterAnimation} wireframe={section === 1} />
            </motion.group>

            {/* Light for the scene */}
            <ambientLight intensity={1} />

            {/* Office and avatar placement */}
            <motion.group
                position={[
                    isMobile ? 0 : 1.5 * officeScaleRatio,
                    isMobile ? -viewport.height / 6 : 2,
                    3,
                ]}
                scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
                rotation-y={-Math.PI / 4}
                animate={{
                    y: isMobile ? -viewport.height / 6 : 0,
                }}
                transition={{
                    duration: 0.8,
                }}
            >
                <Office section={section} />
                <group
                    ref={characterContainerAboutRef}
                    name="CharacterSpot"
                    position={[0.07, 0.16, -0.57]}
                    rotation={[-Math.PI, 0.42, -Math.PI]}
                ></group>
            </motion.group>

            {/* Skills section with floating shapes */}
            <motion.group
                position={[
                    0,
                    isMobile ? -viewport.height : -1.5 * officeScaleRatio,
                    -10,
                ]}
                animate={{
                    z: section === 1 ? 0 : -10,
                    y:
                        section === 1
                            ? -viewport.height
                            : isMobile
                                ? -viewport.height
                                : -1.5 * officeScaleRatio,
                }}
            >
                <directionalLight position={[-5, 3, 5]} intensity={0.4} />

                {/* Floating red sphere */}
                <Float>
                    <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
                        <sphereGeometry />
                        <MeshDistortMaterial
                            opacity={0.8}
                            transparent
                            distort={0.4}
                            speed={4}
                            color={"red"}
                        />
                    </mesh>
                </Float>

                {/* Floating yellow sphere */}
                <Float>
                    <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
                        <sphereGeometry />
                        <MeshDistortMaterial
                            opacity={0.8}
                            transparent
                            distort={1}
                            speed={5}
                            color="yellow"
                        />
                    </mesh>
                </Float>

                {/* Floating blue box */}
                <Float>
                    <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
                        <boxGeometry />
                        <MeshWobbleMaterial
                            opacity={0.8}
                            transparent
                            factor={1}
                            speed={5}
                            color={"blue"}
                        />
                    </mesh>
                </Float>
            </motion.group>

            {/* Projects section */}
            <Projects />
        </>
    );
};
