import { Environment, OrbitControls, Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Item } from "./Item";
import { useEffect, useState } from "react";
import { useGrid } from "../hooks/useGrid";
import { EnvironmentOutside } from "./Environment";
import { setItems } from "../store";

import { useGameStore, setSelected } from "../store";

export const Game = ({ map }) => {
	const {
		item: selectedItem,
		rot: selectedRot,
		pos: selectedPos,
		canDrop,
		color: selectedColor,
	} = useGameStore((state) => state.selected);

	const { size, gridDivision, items, environment, itemsBase } = map;

	console.log(selectedRot, selectedItem);

	return (
		<>
			<OrbitControls
				minDistance={0}
				maxDistance={60}
				minPolarAngle={0}
				enablePan={false}
				maxPolarAngle={Math.PI / 2}
				screenSpacePanning={false}
			/>
			<Environment preset='sunset' />
			<ambientLight intensity={0.3} />
			{/* <directionalLight color='white' position={[0, 0, 5]} /> */}
			<EnvironmentOutside environment={environment} />
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
					onClick={() => setSelected(index)}
				/>
			))}
			{itemsBase.map((item, index) => (
				<Item key={`${item.name}-${index}`} item={item} map={map} />
			))}

			<mesh position={[size[0] / 2, 0.01, -size[1] / 2]} rotation-x={-Math.PI / 2}>
				<planeGeometry args={map.size} />
				{/* <meshStandardMaterial color='green' /> */}
			</mesh>

			{/* <RigidBody colliders={false} type='fixed' position-y={-0.5}></RigidBody> */}
			<Grid position-y={0.1} infiniteGrid fadeDistance={50} fadeStrength={5} />
		</>
	);
};
