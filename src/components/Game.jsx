import { Environment, OrbitControls, Grid, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Item } from "@components/Item";
import { useEffect, useState } from "react";
import { useGrid } from "../hooks/useGrid";
import { EnvironmentOutside } from "@components/Environment";
import ColorMaterial from "@/hooks/colourMaterial";
import { useGameStore } from "@gameStore";
import { setSelected, placeSelected } from "@state/selectedStoreFunctions";

import * as THREE from "three";

export const Game = ({ map }) => {
	const gameState = useGameStore((state) => state.gameState);
	const isDay = useGameStore((state) => state.map.isDay);
	const environment = map.environment;
	// console.log(selectedRot, selectedItem);

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
	const selected = useGameStore((state) => state.selected);
	const { scene: walls } = useGLTF("/models/walls.glb");
	const { scene: floor } = useGLTF("/models/floor.glb");
	const { gridToVector3 } = useGrid(map);

	ColorMaterial(walls, map.buildingColor, "wall", map.baseColor);
	ColorMaterial(floor, map.buildingColor, "floor", map.baseColor);

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
			{map.items.map((item, index) => (
				<Item
					key={`${item.name}-${index}`}
					item={item}
					isSelected={selected.item === index}
					selected={selected}
					map={map}
					onClick={() => {
						if (selected.item !== index && gameState === "inside") {
							setSelected(index);
							console.log(item);
						}
						if (selected.item === index && gameState === "inside") {
							placeSelected();
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
