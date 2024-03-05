import React, { useRef } from "react";
import {
	useGLTF,
	Environment,
	GradientTexture,
	Bounds,
	BakeShadows,
	Clouds,
	Cloud,
	useHelper,
} from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

const TerrainPlane = ({ color }) => {
	const { scene } = useGLTF(`/models/environment/terrain.glb`);
	scene.traverse((child) => {
		if (child.isMesh) {
			child.material.color.set(color);
		}
	});
	return <primitive object={scene} position={[0, -0.4, 0]} />;
};

export const EnvironmentOutside = ({ environment, isDay }) => {
	const {
		name,
		terrainColor,
		skyLight,
		groundLight,
		skyColor,
		skyColor2,
		cloudColor,
		cloudColor2,
	} = environment;

	// const light = useRef();
	// useHelper(light, THREE.DirectionalLightHelper, 1, "cyan");
	// useHelper(light, RectAreaLightHelper, "red");

	// const { gridToVector3 } = useGrid({ map });
	// const colorMap = useLoader(TextureLoader, `/textures/${texture}.jpg`);
	const { scene } = useGLTF(`/models/environment/${name}.glb`);
	console.log(scene);

	return (
		<>
			{/* <Environment background={false} preset='forest' /> */}
			<GradientTexture
				attach='background'
				stops={[0, 1]} // As many stops as you want
				colors={[skyColor, skyColor2]} // Colors need to match the number of stops
			/>
			<ambientLight intensity={isDay ? 0.5 : 0.1} />
			<hemisphereLight
				intensity={isDay ? 0.5 : 0.4}
				color={skyLight}
				groundColor={groundLight}
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
			<Clouds position={[4, -12, -4]} material={THREE.MeshBasicMaterial}>
				<Cloud
					concentrate='outside'
					segments={20}
					bounds={[20, 1, 20]}
					volume={20}
					seed={2}
					scale={2}
					color={cloudColor}
				/>
				<Cloud
					concentrate='outside'
					bounds={[20, 2, 20]}
					segments={20}
					seed={1}
					scale={2}
					volume={20}
					color={cloudColor2}
					fade={100}
				/>
			</Clouds>
			<TerrainPlane color={terrainColor} />

			<primitive object={scene} position={[0, -0.4, 0]} />
			<BakeShadows />
		</>
	);
};
