import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const TerrainPlane = ({ color }) => {
	const { scene } = useGLTF(`/models/terrain.glb`);
	scene.traverse((child) => {
		if (child.isMesh) {
			child.material.color.set(color);
		}
	});
	return <primitive object={scene} position={[0, -0.4, 0]} />;
};

export const EnvironmentOutside = ({ environment }) => {
	const { name, color } = environment;
	// const { gridToVector3 } = useGrid({ map });
	// const colorMap = useLoader(TextureLoader, `/textures/${texture}.jpg`);
	// const { scene } = useGLTF(`/models/${name}.glb`);
	const terrain = TerrainPlane({ color: color });
	return (
		<>
			{terrain}
			{/* <primitive
			object={scene}
			// onClick={() => (movable ? onClick() : null)}
			// position={gridToVector3(
			// 	isDragging ? dragPosition || gridPosition : gridPosition
			// )}
			position={[
				gridPosition[0] + 5,
				selected ? gridPosition[1] + 0.2 : gridPosition[1],
				gridPosition[2] - 5,
			]}
			rotation-y={((rotation || 0) * Math.PI) / 2}
		/> */}
		</>
	);
};
