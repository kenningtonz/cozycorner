import { useGameStore } from "./store";
import { Item, models } from "../data/models";
import { unstable_batchedUpdates } from "react-dom";

const isColliding = (items, selectedItem, position) => {
	const item = items[selectedItem];
	if (item.collidable === false) return true;
	let droppable = true;

	// check if item is not colliding with other items
	items.forEach((otherItem, index) => {
		if (index === selectedItem) {
			return;
		}
		if (otherItem.collidable === false) {
			return;
		}

		const xAxisCheck = () => {
			return (
				position.x < otherItem.position.x + otherItem.size.x &&
				position.x + item.size.x > otherItem.position.x
			);
		};

		const zAxisCheck = () => {
			return (
				position.z > otherItem.position.z - otherItem.size.z &&
				position.z - item.size.z < otherItem.position.z
			);
		};

		const yAxisCheck = () => {
			return (
				position.y < otherItem.position.y + otherItem.size.y &&
				position.y + item.size.y > otherItem.position.y
			);
		};

		//different axis
		if (item.axis != otherItem.axis) {
			//check all axis
			if (yAxisCheck() && xAxisCheck() && zAxisCheck()) {
				droppable = false;
			}
		} else if (
			item.axis.x &&
			item.axis.y &&
			otherItem.axis.x &&
			otherItem.axis.y
		) {
			//check x and y
			if (yAxisCheck() && xAxisCheck()) {
				droppable = false;
			}
		} else if (
			item.axis.z &&
			item.axis.y &&
			otherItem.axis.z &&
			otherItem.axis.y
		) {
			if (yAxisCheck() && zAxisCheck()) {
				droppable = false;
			}
			//check z and y
		} else if (
			item.axis.x &&
			item.axis.z &&
			otherItem.axis.x &&
			otherItem.axis.z
		) {
			//check x and z
			if (zAxisCheck() && xAxisCheck()) {
				droppable = false;
			}
		}
	});

	return droppable;
};

const setCanDrop = () => {
	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			canDrop: isColliding(
				state.map.items,
				state.selected.item,
				state.selected.pos
			),
		},
	}));
};

export const colorSelected = (color) => {
	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			color: color,
		},
	}));
};

export const rotateSelected = (rotationChange) => {
	//wall axis can only be 1 or 2
	let newRot;
	let newPos;
	let newAxis;

	unstable_batchedUpdates(() => {
		const selected = useGameStore.getState().selected;
		newRot = selected.rot;
		newAxis = selected.axis;
		newPos = selected.pos;
	});
	console.log(newRot);
	if (newAxis.onFloor()) {
		newRot = newRot + rotationChange;
		if (newRot < 0) {
			newRot = 3;
		}
		if (newRot > 3) {
			newRot = 0;
		}
	} else {
		if (newRot == 2) {
			newRot = 1;
			newAxis.x = false;
			newAxis.z = true;
			newPos = { x: 0, y: newPos.y, z: -newPos.x };
		} else {
			newRot = 2;
			newAxis.z = false;
			newAxis.x = true;
			newPos = { x: -newPos.z, y: newPos.y, z: 0 };
		}
	}
	console.log(newAxis);
	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			pos: newPos,
			rot: newRot,
			axis: newAxis,
		},
	}));
	setCanDrop();
};

export const moveSelected = (leftRight, upDown) => {
	let selected;
	let mapSize;
	let itemSize;
	let mapDivisions;
	unstable_batchedUpdates(() => {
		selected = useGameStore.getState().selected;
		mapSize = useGameStore.getState().map.size;
		mapDivisions = useGameStore.getState().map.gridDivision;
		const item = useGameStore.getState().map.items[selected.item];
		itemSize = item.getSize(selected.rot);
		// console.log(itemSize);
	});

	const moveXAxis = Math.min(
		mapSize[0] - itemSize.x,
		Math.max(0.25, selected.pos.x + leftRight)
	);

	const moveYAxis = Math.min(
		mapSize[1] - itemSize.y - 1,
		Math.max(0.5, selected.pos.y + upDown)
	);

	const moveZAxis = Math.max(
		-mapSize[1] + itemSize.z,
		Math.min(-0.25, selected.pos.z + leftRight)
	);

	const moveZAxisFloor = Math.max(
		-mapSize[1] + itemSize.z,
		Math.min(-0.25, selected.pos.z + upDown)
	);

	let newPos;
	if (selected.axis.onFloor()) {
		newPos = { x: moveXAxis, y: selected.pos.y, z: moveZAxisFloor };
	} else if (selected.axis.x && selected.axis.y) {
		newPos = { x: moveXAxis, y: moveYAxis, z: 0 };
	} else if (selected.axis.z && selected.axis.y) {
		newPos = { x: 0, y: moveYAxis, z: moveZAxis };
	} else {
		newPos = { x: 0, y: 0, z: 0 };
	}
	// console.log(newPos);
	selected.pos = newPos;
	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			pos: newPos,
		},
	}));
	setCanDrop();
};

export const placeSelected = () => {
	let canDrop;
	unstable_batchedUpdates(() => {
		canDrop = useGameStore.getState().selected.canDrop;
	});
	console.log(canDrop);
	if (!canDrop) {
		return;
	}
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: state.map.items.map((item, index) => {
				if (index === state.selected.item) {
					console.log(state.selected);
					item.position = state.selected.pos;
					item.rotation = state.selected.rot;
					item.color = state.selected.color;
					item.axis = state.selected.axis;
				}
				return item;
			}),
		},
	}));
	unstable_batchedUpdates(() => {
		console.log(useGameStore.getState().map.items);
	});
	resetSelected();
};

export const deleteSelected = () => {
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: state.map.items.filter(
				(item, index) => index !== state.selected.item
			),
		},
	}));
	resetSelected();
};

export const spawnItem = (itemName) => {
	console.log(itemName);
	let index;
	unstable_batchedUpdates(() => {
		index = useGameStore.getState().map.items.length;
	});
	const item = new Item(models.getModelByName(itemName), index);
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: [...state.map.items, item],
		},
	}));
	unstable_batchedUpdates(() => {
		console.log(useGameStore.getState().map.items);
	});
	setSelected(index);
	setCanDrop();
};

export const removeSelected = () => {
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: state.map.items.filter(
				(item, index) => index !== state.selected.item
			),
		},
	}));
	resetSelected();
};

export const resetSelected = () => {
	useGameStore.setState((state) => ({
		selected: {
			pos: null,
			rot: null,
			color: null,
			item: null,
			canDrop: false,
			axis: null,
		},
	}));
};

export const setSelected = (index) => {
	let item;
	unstable_batchedUpdates(() => {
		item = useGameStore.getState().map.items[index];
	});

	useGameStore.setState((state) => ({
		selected: {
			canDrop: true,
			pos: item.position,
			rot: item.rotation,
			item: index,
			color: item.color,
			axis: item.axis,
		},
	}));
	setCanDrop();
};
