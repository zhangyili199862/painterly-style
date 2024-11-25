import { useGLTF, useAnimations } from "@react-three/drei";
const SpaceShip = () => {
    const spaceShip = useGLTF("/spaceship.glb");
    return <group scale={1}>
        <primitive object={spaceShip.scene}></primitive>
    </group>
}
const LittleTokyo = () => {
    const tokyo = useGLTF("/LittlestTokyo.glb");
    return <group scale={0.012}>
        <primitive object={tokyo.scene}></primitive>
    </group>
}

export { SpaceShip, LittleTokyo }