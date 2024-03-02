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
	const {
		item: selectedItem,
		rot: selectedRot,
		pos: selectedPos,
		canDrop,
		color: selectedColor,
	} = useGameStore((state) => state.selected);

	const { size, gridDivision, items, environment, itemsBase } = map;
	const gameState = useGameStore((state) => state.gameState);
	// console.log(selectedRot, selectedItem);
	const { scene: walls } = useGLTF("/models/walls.glb");
	const { scene: floor } = useGLTF("/models/floor.glb");
	const { gridToVector3 } = useGrid(map);

	const colorWallsFloor = new THREE.Color(map.buildingColor);
	ColorMaterial(walls, colorWallsFloor, "wall", map.baseColor);
	ColorMaterial(floor, colorWallsFloor, "floor", map.baseColor);

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
			{items.map((item, index) => (
				<Item
					key={`${item.name}-${index}`}
					item={item.item}
					selected={selectedItem === index}
					selectedPos={selectedPos}
					selectedRot={selectedRot}
					canDrop={canDrop}
					map={map}
					selectedColor={selectedColor}
					onClick={() => {
						if (selectedItem !== index && gameState === "inside") {
							setSelected(index);
							console.log(item);
						}
						if (selectedItem === index && gameState === "inside") {
							placeSelected();
						}
					}}
				/>
			))}
			<primitive
				object={walls}
				position={gridToVector3([-1, -0.5, 1], [10.5, 10.5])}
			/>
			<primitive
				object={floor}
				position={gridToVector3([-1, -0.5, 1], [10.5, 10.5])}
			/>
			{gameState === "inside" ? (
				<Grid position-y={0.1} infiniteGrid fadeDistance={50} fadeStrength={5} />
			) : null}
			<EnvironmentOutside environment={environment} />
		</>
	);
};
