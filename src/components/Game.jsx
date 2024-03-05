import {
	Environment,
	OrbitControls,
	useCursor,
	useGLTF,
} from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Item } from "@components/Item";
import { useEffect, useState } from "react";
import { useGrid } from "../hooks/useGrid";
import { EnvironmentOutside } from "@components/Environment";
import { ColorMaterialAccent } from "@/hooks/colourMaterial";
import { useGameStore } from "@gameStore";
import { setSelected, placeSelected } from "@state/selectedStoreFunctions";
import { SoundEffectManager } from "./AudioManager";

import * as THREE from "three";

export const Game = ({ map }) => {
	const gameState = useGameStore((state) => state.gameState);
	const isDay = useGameStore((state) => state.map.isDay);
	const environment = map.environment;
	// console.log(selectedRot, selectedId);

	return (
		<>
			<OrbitControls
				minDistance={0}
				maxDistance={60}
				// minPolarAngle={Math.PI / 4}
				// minAzimuthAngle={Math.PI / 2}
				// maxAzimuthAngle={Math.PI}
				// enableRotate={false}
				enablePan={false}
				// maxPolarAngle={Math.PI / 2.5}
				screenSpacePanning={false}
			/>
			<House map={map} gameState={gameState} />
			<EnvironmentOutside environment={environment} isDay={isDay} />
		</>
	);
};

const House = ({ map, gameState }) => {
	const { placeSound, selectSound } = SoundEffectManager();
	const selectedId = useGameStore((state) => state.selectedId);
	const items = useGameStore((state) => state.items);
	const { scene: walls } = useGLTF("/models/environment/walls.glb");
	const { scene: floor } = useGLTF("/models/environment/floor.glb");
	const { gridToVector3 } = useGrid(map);
	const [isHovered, setIsHovered] = useState(false);

	useCursor(isHovered /*'pointer', 'auto', document.body*/);

	ColorMaterialAccent(walls, map.buildingColor, "wall");
	ColorMaterialAccent(floor, map.buildingColor, "floor");

	const floorColor = new THREE.Color(map.floorColor);
	floor.traverse((child) => {
		if (child.name === `floor_baseAccent`) {
			const clonedMaterialBase = child.material.clone();
			clonedMaterialBase.color.set(floorColor);
			child.material = clonedMaterialBase;
		}
	});

	return (
		<>
			{items.map((item) => (
				<Item
					key={`${item.id}`}
					item={item}
					map={map}
					gameState={gameState}
					isHovered={isHovered}
					onHover={setIsHovered}
					onClick={() => {
						if (selectedId !== item.id && gameState === "inside") {
							setSelected(item.id);
							selectSound();
							console.log(item);
						}
						if (selectedId === item.id && gameState === "inside") {
							placeSelected(item);
							placeSound();
						}
					}}
				/>
			))}
			<primitive
				object={walls}
				position={gridToVector3(
					{ x: -0.5, y: -0.5, z: 0.5 },
					{ x: 10.5, z: 10.5, y: 10.5 }
				)}
			/>
			<primitive
				object={floor}
				position={gridToVector3(
					{ x: -0.5, y: -0.5, z: 0.5 },
					{ x: 10.5, z: 10.5, y: 10.5 }
				)}
			/>
		</>
	);
};
