import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Effects, useFBO } from "@react-three/drei";
import { PainterlyPass, } from "./Postprocessing";
import { useRef } from "react";
import { folder, useControls } from "leva";
import { SpaceShip, LittleTokyo } from "./Model";
extend({ PainterlyPass })
const Painterly = () => {
    const painterlyPassRef = useRef()
    const { radius, painterlyPass } = useControls({
        radius: {
            value: 4,
            min: 1,
            max: 15,
            step: 1
        },
        passes: folder({
            painterlyPass: { value: true },
        }),
    })
    const { modelName } = useControls("Model", {
        modelName: {
            value: "spaceship",
            options: ["spaceship", "LittleTokyo"],
        }
    })
    const originalSceneTarget = useFBO(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );
    useFrame((state) => {
        const { gl, scene, camera } = state;
        painterlyPassRef.current.enabled = false;
        gl.setRenderTarget(originalSceneTarget);
        gl.render(scene, camera);

        painterlyPassRef.current.enabled = painterlyPass;
        gl.setRenderTarget(null);
        gl.render(scene, camera);

        camera.lookAt(0, 0, 0);

    });
    return <>
        <group >
            {modelName === 'spaceship' ? <SpaceShip /> : <LittleTokyo />}
        </group>
        <Effects>
            <painterlyPass
                ref={painterlyPassRef}
                args={[
                    {
                        radius,
                        originalSceneTarget: originalSceneTarget,
                    },
                ]}
            />

        </Effects>
    </>
}
const Experience = () => {
    return <>
        <Canvas gl={{ antialias: true }} camera={{
            position: [7, 7, 7],
            fov: 45,
            near: 1,
            far: 1000
        }}>
            <OrbitControls makeDefault />
            <ambientLight intensity={1.25} />
            <directionalLight position={[-5, 5, 5]} intensity={7} />

            <color attach="background" args={["#3386E0"]} />
            <Painterly />
        </Canvas>
    </>
}

export default Experience;