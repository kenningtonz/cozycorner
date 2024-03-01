import { useGrid } from "../hooks/useGrid";
import tinycolor from "tinycolor2";

import React, { useRef } from "react";
import { useGLTF, Clone, PivotControls, DragControls } from "@react-three/drei";
import * as THREE from "three";

import { moveSelected, getX, getZ } from "../store";

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
	const { name, gridPosition, size, rotation, color } = item;
	const { gridToVector3, vector3ToGrid } = useGrid(map);
	const itemRotation = selected ? selectedRot : rotation;

	const { scene } = useGLTF(`/models/${name}.glb`);

	const width = itemRotation === 1 || itemRotation === 3 ? size[1] : size[0];
	const length = itemRotation === 1 || itemRotation === 3 ? size[0] : size[1];

	//setting color
	if (color !== undefined) {
		const colorThree = new THREE.Color(selected ? selectedColor : color);
		const colorThreeHex = tinycolor(colorThree.getHexString());

		// console.log(colorMono);
		// console.log(colorThreeHex.getLuminance(), colorThreeHex.getBrightness());
		let newColor;
		if (
			colorThreeHex.getBrightness() < 20 ||
			colorThreeHex.getLuminance() < 0.2
		) {
			newColor = colorThreeHex.brighten(20).lighten(25).toString("hex");
		} else {
			newColor = colorThreeHex.darken(10).desaturate(10).toString("hex");
		}

		const colorAccent = new THREE.Color(newColor);
		// const colorAccentHex = tinycolor(colorAccent.getHexString());
		// console.log(colorAccentHex.getLuminance(), colorAccentHex.getBrightness());

		if (selected) {
			// console.log(item);
		}
		scene.traverse((child) => {
			if (child.name === `${name}_colour`) {
				const clonedMaterialColour = child.material.clone();
				clonedMaterialColour.color.set(colorThree);
				child.material = clonedMaterialColour;
			}
			if (child.name === `${name}_colourAccent`) {
				const clonedMaterialColourAccent = child.material.clone();
				clonedMaterialColourAccent.color.set(colorAccent);
				child.material = clonedMaterialColourAccent;
			}
			if (child.name === `${name}_base`) {
				const clonedMaterialBase = child.material.clone();
				clonedMaterialBase.color.set(new THREE.Color("#A16C52"));
				child.material = clonedMaterialBase;
			}
		});
	}

	return (
		<>
			<group
				position={gridToVector3(
					selected ? selectedPos || gridPosition : gridPosition,
					[width, length]
				)}
				onClick={onClick}
			>
				<Clone
					object={scene}
					position-y={selected ? 0.1 : 0}
					rotation-y={((itemRotation || 0) * Math.PI) / 2}
				/>
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
		</>
	);
};

/* <DragControls
					// axisLock='x'
					dragLimits={[
						[0, 0],
						[limits.x, limits.z],
					]}
					// autoTransform={false}
					onDrag={(l, dl, w, dw) => {
						// Extract the position and rotation
						const position = new THREE.Vector3();
						const rotation = new THREE.Quaternion();
						w.decompose(position, rotation, new THREE.Vector3());
						// const pos = new THREE.Vector3();
						// console.log(pos.setFromMatrixPosition(e));
						// console.log(vector3ToGrid(pos));
						const pos = vector3ToGrid(position);
						console.log(-map.size[1] - size[1] - 1);
						console.log(pos);

						// moveSelected(
						// 	getX(map.size[0], size[0], pos[0]),
						// 	getZ(map.size[1], size[1], pos[2])
						// );
					}}
				> */
