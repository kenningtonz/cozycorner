import { useGrid } from "../hooks/useGrid";
import { useRef } from "react";
import { ColorMaterial } from "@/hooks/colourMaterial";
import { useGLTF, Clone, Outlines } from "@react-three/drei";

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

	const size = item.getSize(rotation);

	const box = useRef();
	// useHelper(box, THREE.BoxHelper, "cyan");
	//setting colors
	if (colors !== undefined) {
		ColorMaterial(scene, colors, name);
	}

	// if(item.isOnTable && )

	const hoverY = isSelected && axis.onFloor() ? 0.1 : 0;
	const hoverZ = isSelected && axis.x && axis.y ? -0.1 : 0;
	const hoverX = isSelected && axis.z && axis.y ? 0.1 : 0;

	return (
		<>
			<group
				position={gridToVector3(position, size)}
				ref={box}
				onPointerOver={
					gameState === "inside"
						? (e) => {
								onHover(true);
						  }
						: null
				}
				onPointerOut={isHovered ? () => onHover(false) : null}
				onClick={onClick}
			>
				<Clone
					object={scene}
					position={[hoverX, hoverY, hoverZ]}
					rotation-y={((rotation || 0) * Math.PI) / 2}
				/>
				{isHovered && <Outlines thickness={0.05} colors='hotpink' />}
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
