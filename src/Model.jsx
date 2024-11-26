import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
const SpaceShip = () => {
    const spaceShip = useGLTF("/spaceship.glb");
    return <group scale={1}>
        <primitive object={spaceShip.scene}></primitive>
    </group>
}
const LittleTokyo = () => {
    const { scene, animations } = useGLTF("/LittlestTokyo.glb");
    const { actions,names } = useAnimations(animations, scene)
    console.log(actions,names)
    useEffect(() => {
        actions[names[0]].play()
    }, [])
    return <group scale={0.012}>
        <primitive object={scene}></primitive>
    </group>
}

export { SpaceShip, LittleTokyo }