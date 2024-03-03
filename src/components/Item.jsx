import { useGrid } from "../hooks/useGrid";
import { useRef } from "react";
import ColorMaterial from "@/hooks/colourMaterial";
import * as THREE from "three";
import {
	useGLTF,
	Clone,
	PivotControls,
	DragControls,
	useHelper,
} from "@react-three/drei";

export const Item = ({ item, onClick, map, isSelected, selected }) => {
	const { name, position, rotation, color, axis } = item;
	const { gridToVector3, vector3ToGrid } = useGrid(map);
	const itemRotation = isSelected ? selected.rot : rotation;
	const { scene } = useGLTF(`/models/${name}.glb`);

	const size = item.getSize(itemRotation);
	const box = useRef();
	useHelper(box, THREE.BoxHelper, "cyan");
	//setting color
	if (color !== undefined) {
		ColorMaterial(
			scene,
			isSelected ? selected.color : color,
			name,
			map.baseColor
		);
	}
	const hoverY = isSelected && axis.onFloor() ? 0.1 : 0;
	const hoverZ = isSelected && axis.x && axis.y ? -0.1 : 0;
	const hoverX = isSelected && axis.z && axis.y ? 0.1 : 0;

	return (
		<>
			<group
				position={gridToVector3(
					isSelected ? selected.pos || position : position,
					size
				)}
				ref={box}
				onClick={onClick}
			>
				<Clone
					object={scene}
					position={[hoverX, hoverY, hoverZ]}
					rotation-y={((itemRotation || 0) * Math.PI) / 2}
				/>
				{isSelected && (
					<mesh>
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
							color={selected.canDrop ? "green" : "red"}
							transparent
							opacity={0.5}
						/>
					</mesh>
				)}
			</group>
		</>
	);
};
