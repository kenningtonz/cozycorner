import { useGLTF } from "@react-three/drei";

export function Model({
	itemName,
	itemTexture,
	itemColor,
	rotationY,
	positionY,
}) {
	const { nodes, materials } = useGLTF(`/models/${itemName}.glb`);
	nodes.colour.material.color.set(itemColor);
	return (
		<group position-y={positionY} rotation-y={rotationY} dispose={null}>
			<mesh
				name='base'
				castShadow
				receiveShadow
				geometry={nodes.base.geometry}
				material={materials[itemTexture]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.935}
			/>
			<mesh
				name='colour'
				castShadow
				receiveShadow
				geometry={nodes.colour.geometry}
				material={nodes.colour.material}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.935}
			/>
		</group>
	);
}

useGLTF.preload("/bedDoubleA.glb");
