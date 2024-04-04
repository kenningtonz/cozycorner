import { useGrid } from "../hooks/useGrid";
import { useRef } from "react";
import { ColorMaterial } from "@/hooks/colourMaterial";
import { useGLTF, Clone } from "@react-three/drei";

export const Item = ({ item, onClick, map, onHover, offHover }) => {
	const { name, isSelected, isOnTable } = item;
	const { gridToVector3 } = useGrid(map);

	//setting current values
	const colors = isSelected ? item.tempCol : item.colors;
	const position = isSelected || isOnTable ? item.tempPos : item.position;
	const rotation = isSelected || isOnTable ? item.tempRot : item.rotation;
	const axis = isSelected ? item.tempAxis : item.axis;

	const { scene } = useGLTF(`/models/${name}.glb`);
	const size = item.getSize(rotation);

	if (colors !== undefined) {
		ColorMaterial(scene, colors, name);
	}

	scene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
			child.receiveShadow = true;
		}
	});

	//green box for placement
	const hoverY = isSelected && axis.onFloor() ? 0.1 : 0;
	const hoverZ = isSelected && axis.x && axis.y ? -0.1 : 0;
	const hoverX = isSelected && axis.z && axis.y ? 0.1 : 0;

	return (
		<>
			<group
				position={gridToVector3(position, size)}
				onPointerOver={onHover}
				onPointerOut={offHover}
				onPointerDown={(e) => {
					onClick();
				}}
			>
				<Clone
					rotation-y={((rotation || 0) * Math.PI) / 2}
					object={scene}
					position={[hoverX, hoverY, hoverZ]}
				/>
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
