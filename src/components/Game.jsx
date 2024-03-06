import { OrbitControls } from "@react-three/drei";
import House from "@components/House";
import EnvironmentOutside from "@components/Environment";
import { useGameStore } from "@state/store";

import { useEffect } from "react";

export const Game = () => {
	// console.log(selectedRot, selectedId);
	// console.log("game rerender");

	return (
		<>
			<OrbitControls
				minDistance={0}
				maxDistance={60}
				minPolarAngle={Math.PI / 4}
				maxPolarAngle={Math.PI / 2.5}
				minAzimuthAngle={Math.PI / 2}
				maxAzimuthAngle={Math.PI}
				// enableRotate={false}
				enablePan={false}
				screenSpacePanning={false}
			/>
			<House />
			<EnvironmentOutside />
		</>
	);
};
