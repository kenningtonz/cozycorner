import { OrbitControls } from "@react-three/drei";
import House from "@components/House";
import EnvironmentOutside from "@components/Environment";
import { useGameStore } from "@state/store";

import { useThree } from "@react-three/fiber";
import { useShallow } from "zustand/react/shallow";
export const Game = () => {
	const gl = useThree((state) => state.gl);
	const setScreenshot = useGameStore(useShallow((state) => state.setScreenshot));
	setScreenshot(gl.domElement);

	return (
		<>
			<OrbitControls
				minDistance={0}
				maxDistance={60}
				minPolarAngle={Math.PI / 4}
				maxPolarAngle={Math.PI / 2.5}
				minAzimuthAngle={Math.PI / 2}
				maxAzimuthAngle={Math.PI}
				enablePan={false}
				screenSpacePanning={false}
			/>
			<House />
			<EnvironmentOutside />
		</>
	);
};
