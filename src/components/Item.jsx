import { useGrid } from "../hooks/useGrid";
import ColorMaterial from "@/hooks/colourMaterial";
import * as THREE from "three";
import { useGLTF, Clone, PivotControls, DragControls } from "@react-three/drei";

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
	const { name, position, rotation, color, axis } = item;
	const { gridToVector3, vector3ToGrid } = useGrid(map);
	const itemRotation = selected ? selectedRot : rotation;

	const { scene } = useGLTF(`/models/${name}.glb`);

	const width = item.getWidth(itemRotation);
	const length = item.getLength(itemRotation);

	//setting color
	if (color !== undefined) {
		const colorThree = new THREE.Color(selected ? selectedColor : color);
		ColorMaterial(scene, colorThree, name, map.baseColor);
	}

	return (
		<>
			<group
				position={gridToVector3(selected ? selectedPos || position : position, [
					width,
					length,
				])}
				onClick={onClick}
			>
				<Clone
					object={scene}
					position-y={selected ? 0.1 : 0}
					rotation-y={((itemRotation || 0) * Math.PI) / 2}
				/>
				{selected && (
					<mesh>
						<boxGeometry
						// args={
						// 	axis == "floor"
						// 		? [size[0], 0.1, size[1]]
						// 		: itemRotation == 1
						// 		? [0.1, size[0], size[1]]
						// 		: [size[1], size[0], 0.1]
						// }
						/>
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
