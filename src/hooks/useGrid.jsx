import * as THREE from "three";

export const useGrid = (map) => {
	const vector3ToGrid = (vector3) => {
		return [
			Math.floor(vector3.x * map.gridDivision),
			Math.floor(vector3.y * map.gridDivision),
			Math.floor(vector3.z * map.gridDivision),
		];
	};

	const gridToVector3 = (gridPosition, size) => {
		return new THREE.Vector3(
			size.x / map.gridDivision + gridPosition.x,
			gridPosition.y,
			-size.z / map.gridDivision + gridPosition.z
		);
	};

	return {
		vector3ToGrid,
		gridToVector3,
	};
};
