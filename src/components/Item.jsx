import { useGrid } from "../hooks/useGrid";
import { Children, useRef } from "react";
import { ColorMaterial } from "@/hooks/colourMaterial";
import { useGLTF, Clone, Outlines, useHelper } from "@react-three/drei";
import * as THREE from "three";

export const Item = ({ item, onClick, map, onHover, isHovered, gameState }) => {
	const { name, isSelected, isOnTable } = item;
	const { gridToVector3, vector3ToGrid } = useGrid(map);

	// console.log(item);

	const colors = isSelected ? item.tempCol : item.colors;
	const position = isSelected || isOnTable ? item.tempPos : item.position;
	const rotation = isSelected || isOnTable ? item.tempRot : item.rotation;
	const axis = isSelected ? item.tempAxis : item.axis;
	// const canDrop = isSelected ? item.canDrop : false;

	const { scene } = useGLTF(`/models/${name}.glb`);
	// const { nodes, materials } = useGraph(scene)
	const size = item.getSize(rotation);
	// console.log(size);
	const box = useRef();
	// useHelper(box, THREE.BoxHelper, "cyan");
	//setting colors

	if (colors !== undefined) {
		ColorMaterial(scene, colors, name);
	}

	scene.traverse((child) => {
		// console.log(child);
		if (child.isMesh) {
			child.castShadow = true;
			child.receiveShadow = true;
		}
	});

	// if(item.isOnTable && )
	const hoverY = isSelected && axis.onFloor() ? 0.1 : 0;
	const hoverZ = isSelected && axis.x && axis.y ? -0.1 : 0;
	const hoverX = isSelected && axis.z && axis.y ? 0.1 : 0;

	// console.log(hoverX, hoverY, hoverZ);
	return (
		<>
			<group
				position={gridToVector3(position, size)}
				onPointerOver={
					gameState === "inside"
						? (e) => {
								onHover(true);
								console.log(e);
						  }
						: null
				}
				onPointerOut={isHovered ? () => onHover(false) : null}
				onPointerDown={(e) => {
					console.log(e);
				}}
			>
				<Clone
					ref={box}
					// onUpdate={(self) => console.log(self)}
					rotation-y={((rotation || 0) * Math.PI) / 2}
					object={scene}
					position={[hoverX, hoverY, hoverZ]}
				/>
				{/* <Outlines thickness={0.05} colors='hotpink' /> */}
				{isSelected && (
					<mesh position={[0, axis.onFloor() ? 0 : size.y / 2, 0]}>
						<boxGeometry
							args={
								axis.onFloor()
									? [size.x, 0.1, size.z]
									: axis.x && axis.y
									? [size.x, size.y, 0.1]
									: [0.1, size.y, size.z]
							}
						/>
						<meshStandardMaterial
							color={item.tempCanDrop ? "green" : "red"}
							transparent
							opacity={0.5}
						/>
					</mesh>
				)}
			</group>
		</>
	);
};
