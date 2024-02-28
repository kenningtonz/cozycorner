import { useGrid } from "../hooks/useGrid";

import React, { useRef } from "react";
import { useGLTF, Clone } from "@react-three/drei";

import { Model } from "./Model";

export const Item = ({
	item,
	onClick,
	selectedPos,
	map,
	selected,
	canDrop,
	selectedRot,
	selectedColor,
}) => {
	const { name, gridPosition, size, rotation, color, texture } = item;
	const { gridToVector3 } = useGrid(map);
	const itemRotation = selected ? selectedRot : rotation;

	const { scene } = useGLTF(`/models/${name}.glb`);

	const width = itemRotation === 1 || itemRotation === 3 ? size[1] : size[0];
	const height = itemRotation === 1 || itemRotation === 3 ? size[0] : size[1];

	if (color != null && color != undefined) {
		let clonedMaterial;
		scene.traverse((child) => {
			if (child.name === "colour") {
				clonedMaterial = child.material.clone();
				if (selected) {
					clonedMaterial.color.set(selectedColor);
				} else {
					clonedMaterial.color.set(color);
				}
				child.material = clonedMaterial;
			}
		});
	}

	if (selected) {
	}

	return (
		<group
			position={gridToVector3(
				selected ? selectedPos || gridPosition : gridPosition,
				[width, height]
			)}
			onClick={onClick}
		>
			{/* {texture != null ? (
            <Model
                positionY = {selected ? 0.1 : 0}
            rotationY={((itemRotation || 0) * Math.PI) / 2}
                itemName={name}
                itemTexture={texture}
                itemColor={color}
            />
        ) : ( */}
			{/* <primitive
				object={clone}
				position-y={selected ? 0.1 : 0}
				rotation-y={((itemRotation || 0) * Math.PI) / 2}
			/> */}
			<Clone
				object={scene}
				position-y={selected ? 0.1 : 0}
				rotation-y={((itemRotation || 0) * Math.PI) / 2}
			/>

			{/* )} */}
			{/* <primitive
				object={clone}
				position-y={selected ? 0.1 : 0}
				rotation-y={((itemRotation || 0) * Math.PI) / 2}
			/> */}
			{selected && (
				<mesh>
					<boxGeometry args={[size[0], 0.1, size[1]]} />
					<meshStandardMaterial
						color={canDrop ? "green" : "red"}
						transparent
						opacity={0.5}
					/>
				</mesh>
			)}
		</group>
	);
};
