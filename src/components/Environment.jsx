import React, { useRef } from "react";
import {
	useGLTF,
	Environment,
	GradientTexture,
	Bounds,
	BakeShadows,
	Clouds,
	Cloud,
	Clone,
	useHelper,
} from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@gameStore";

const TerrainPlane = ({ color }) => {
	const { scene } = useGLTF(`/models/environment/terrain.glb`);
	scene.traverse((child) => {
		if (child.isMesh) {
			child.material.color.set(color);
		}
	});
	// console.log("terrain rerender");
	return <primitive object={scene} position={[0, -0.4, 0]} />;
};

//for later
{
	/* <Glow scale={size * 1.2} near={-25} color={glow || emissive || color} />
<Sparkles count={amount} scale={size * 2} size={6} speed={0.4} /> */
}

const EnvironmentOutside = () => {
	const env = useGameStore((state) => state.environment);
	const isDay = useGameStore((state) => state.isDay);
	// console.log("envi rerender");

	const { scene } = useGLTF(`/models/environment/${env.name}.glb`);

	return (
		<>
			{/* <Environment background={false} preset='forest' /> */}
			<GradientTexture
				attach='background'
				stops={[0, 1]} // As many stops as you want
				colors={[env.skyColor, env.skyColor2]} // Colors need to match the number of stops
			/>
			<ambientLight intensity={isDay ? 0.5 : 0.1} />
			<hemisphereLight
				intensity={isDay ? 0.5 : 0.4}
				color={env.skyLight}
				groundColor={env.groundLight}
			/>
			<rectAreaLight
				// ref={light}
				position={[5, 12, -5]}
				rotation-x={-Math.PI / 2}
				intensity={0.5}
				width={8}
				height={8}
				color='white'
			/>
			<rectAreaLight
				// ref={light}
				position={[12, 5, -5]}
				rotation-y={Math.PI / 2}
				intensity={0.5}
				width={8}
				height={8}
				color='white'
			/>
			<rectAreaLight
				// ref={light}
				position={[5, 5, -12]}
				rotation-y={-Math.PI}
				intensity={0.5}
				width={8}
				height={8}
				color='white'
			/>
			<Clouds
				frustumCulled={false}
				position={[4, -12, -4]}
				material={THREE.MeshBasicMaterial}
			>
				<Cloud
					frustumCulled={false}
					concentrate='outside'
					segments={20}
					bounds={[20, 1, 20]}
					volume={20}
					seed={2}
					scale={2}
					color={env.cloudColor}
				/>
				<Cloud
					frustumCulled={false}
					concentrate='outside'
					bounds={[20, 2, 20]}
					segments={20}
					seed={1}
					scale={2}
					volume={20}
					color={env.cloudColor2}
					fade={100}
				/>
			</Clouds>
			<TerrainPlane color={env.terrainColor} />

			<Clone object={scene} position={[0, -0.4, 0]} />
			<BakeShadows />
		</>
	);
};

export default EnvironmentOutside;
