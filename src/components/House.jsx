import { ColorMaterialAccent } from "@/hooks/colourMaterial";
import { useGameStore } from "@gameStore";
import { setSelected, placeSelected } from "@state/selectedStoreFunctions";
import { Item } from "@components/Item";
import { useState } from "react";
import { useGrid } from "../hooks/useGrid";
import { useCursor, useGLTF } from "@react-three/drei";
import useSound from "use-sound";
import * as THREE from "three";

const House = () => {
	const items = useGameStore((state) => state.items);
	const map = useGameStore((state) => state.map);
	const gameState = useGameStore((state) => state.gameState);
	const selectedId = useGameStore((state) => state.selectedId);
	const buildingColor = useGameStore((state) => state.buildingColor);
	const floorColor = useGameStore((state) => state.floorColor);
	const muted = useGameStore((state) => state.muted);

	const [placeSound] = useSound("/soundEffects/place.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [selectSound] = useSound("/soundEffects/select.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const { scene: walls } = useGLTF("/models/environment/walls.glb");
	const { scene: floor } = useGLTF("/models/environment/floor.glb");
	const { gridToVector3 } = useGrid(map);
	const [isHovered, setIsHovered] = useState(false);

	useCursor(isHovered /*'pointer', 'auto', document.body*/);

	ColorMaterialAccent(walls, buildingColor, "wall");
	ColorMaterialAccent(floor, buildingColor, "floor");

	floor.traverse((child) => {
		if (child.name === `floor_baseAccent`) {
			const clonedMaterialBase = child.material.clone();
			clonedMaterialBase.color.set(new THREE.Color(floorColor));
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
				receiveShadow
				position={gridToVector3(
					{ x: -0.5, y: -0.5, z: 0.5 },
					{ x: 10.5, z: 10.5, y: 10.5 }
				)}
			/>
			<primitive
				object={floor}
				receiveShadow
				position={gridToVector3(
					{ x: -0.5, y: -0.5, z: 0.5 },
					{ x: 10.5, z: 10.5, y: 10.5 }
				)}
			/>
		</>
	);
};

export default House;
