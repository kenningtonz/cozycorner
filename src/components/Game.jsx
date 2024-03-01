import { Environment, OrbitControls, Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Item } from "./Item";
import { useEffect, useState } from "react";
import { useGrid } from "../hooks/useGrid";
import { EnvironmentOutside } from "./Environment";
import { setItems } from "../store";

import { useGameStore, setSelected, placeSelected } from "../store";

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
					item={item}
					selected={selectedItem === index}
					selectedPos={selectedPos}
					selectedRot={selectedRot}
					canDrop={canDrop}
					map={map}
					selectedColor={selectedColor}
					onClick={() => {
						if (selectedItem !== index && gameState === "inside") {
							setSelected(index);
						}
						if (selectedItem === index && gameState === "inside") {
							placeSelected();
						}
					}}
				/>
			))}
			{itemsBase.map((item, index) => (
				<Item key={`${item.name}-${index}`} item={item} map={map} />
			))}

			{gameState === "inside" ? (
				<Grid position-y={0.1} infiniteGrid fadeDistance={50} fadeStrength={5} />
			) : null}
			<EnvironmentOutside environment={environment} />
		</>
	);
};
