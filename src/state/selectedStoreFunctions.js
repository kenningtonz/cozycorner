import { useGameStore } from "./store";
import { items, Item, models } from "../data/models";
import { unstable_batchedUpdates } from "react-dom";

const isColliding = (items, selectedItem, selectedPos) => {
	const item = items[selectedItem];
	if (item.collidable === false) return true;
	let droppable = true;
	const width =
		item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
	const length =
		item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];

	// check if item is not colliding with other items
	items.forEach((otherItem, index) => {
		if (index === selectedItem) {
			return;
		}
		if (otherItem.collidable === false) {
			return;
		}
		const otherWidth =
			otherItem.rotation === 1 || otherItem.rotation === 3
				? otherItem.size[1]
				: otherItem.size[0];
		const otherLength =
			otherItem.rotation === 1 || otherItem.rotation === 3
				? otherItem.size[0]
				: otherItem.size[1];
		// console.log(selectedPos[0], otherItem.gridPosition[0] + otherWidth);
		// console.log(selectedPos[0] + width * 2, otherItem.gridPosition[0]);
		// console.log(selectedPos[2], otherItem.gridPosition[2] + otherHeight * -2);
		// console.log(selectedPos[2] + height * -2, otherItem.gridPosition[2]);
		if (
			selectedPos[0] < otherItem.gridPosition[0] + otherWidth * 2 &&
			selectedPos[0] + width * 2 > otherItem.gridPosition[0] &&
			selectedPos[2] > otherItem.gridPosition[2] + otherLength * -2 &&
			selectedPos[2] + length * -2 < otherItem.gridPosition[2]
		) {
			droppable = false;
		}
	});

	return droppable;
};

export const setCanDrop = () => {
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

export const setSelected = (item) => {
	useGameStore.setState((state) => ({
		selected: new Selected(item),
	}));
};

export const rotateSelected = (rotation) => {
	let newRot;
	unstable_batchedUpdates(() => {
		const selected = useGameStore.getState().selected;
		//wall axis can only be 2 or 3
		if (selected.axis === "floor") {
			newRot = selected.rot + rotation;
			if (newRot < 0) {
				newRot = 3;
			}
			if (newRot > 3) {
				newRot = 0;
			}
		} else {
			if (selected.rot == 1) {
				newRot = 2;
			} else {
				newRot = 1;
			}
		}
	});

	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			rot: state.selected.item !== null ? newRot : 0,
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
					return {
						...item,
						gridPosition: state.selected.pos,
						rotation: state.selected.rot,
						color: state.selected.color,
					};
				}
				return item;
			}),
		},
	}));
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
			items: [
				...state.map.items,
				{
					item,
				},
			],
		},
	}));
	setSelected(item);
	// setCanDrop();
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

export const moveSelected = (x, z) => {
	let newX;
	let newZ;
	let newY;
	unstable_batchedUpdates(() => {
		const mapSize = useGameStore.getState().map.size;
		const item =
			useGameStore.getState().map.items[useGameStore.getState().selected.item];
		const selected = useGameStore.getState().selected;
		console.log(selected.rot);
		if (selected.axis === "floor") {
			newX = Math.min(
				mapSize[0] + item.size[0] + 1,
				Math.max(0, selected.pos[0] + x)
			);
			newZ = Math.max(
				-mapSize[1] - item.size[1] - 1,
				Math.min(0, selected.pos[2] + z)
			);
			newY = selected.pos[1];
		} else if (selected.axis === "wall" && selected.rot === 2) {
			newX = Math.min(
				mapSize[0] + item.size[0] + 1,
				Math.max(0, selected.pos[0] + x)
			);
			newZ = 0;
			newY = Math.max(
				-mapSize[1] - item.size[1] - 1,
				Math.min(0, selected.pos[1] + z)
			);
		} else {
			newX = 0;
			newZ = Math.max(
				-mapSize[1] - item.size[1] - 1,
				Math.min(0, selected.pos[2] + z)
			);
			newY = Math.max(
				-mapSize[0] - item.size[0] - 1,
				Math.min(0, selected.pos[1] + x)
			);
		}
	});

	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			pos: state.selected.item !== null ? [newX, newY, newZ] : [0, 0, 0],
		},
	}));
	setCanDrop();
};

export const resetSelected = () => {
	useGameStore.setState(() => ({
		selected: {
			pos: null,
			rot: null,
			item: null,
			canDrop: false,
			color: null,
			axis: null,
		},
	}));
};

class Selected {
	constructor(item) {
		this.pos = item.position;
		this.rot = item.rotation;
		this.item = item.index;
		console.log(this.item);
		this.color = item.color;
		this.canDrop = true;
	}

	// rotateSelected = (rotation) => {
	// 	const currentRot = this.rot;
	// 	let newRot = currentRot + rotation;
	// 	if (newRot < 0) {
	// 		newRot = 3;
	// 	}
	// 	if (newRot > 3) {
	// 		newRot = 0;
	// 	}
	// 	this.setSelected();
	// };

	// reset = () => {
	// 	this.pos = null;
	// 	this.rot = null;
	// 	this.item = null;
	// 	this.canDrop = false;
	// 	this.color = null;
	// };

	// updateCanDrop() {
	// 	const items = useGameStore.getState().map.items;
	// 	const item = items[this.item];
	// 	const selectedItem = this.item;
	// 	const selectedPos = this.pos;
	// 	if (item.collidable === false) return true;
	// 	let droppable = true;

	// 	// check if item is not colliding with other items
	// 	items.forEach((otherItem, index) => {
	// 		if (index === selectedItem) {
	// 			return;
	// 		}
	// 		if (otherItem.collidable === false) {
	// 			return;
	// 		}
	// 		const otherWidth =
	// 			otherItem.rotation === 1 || otherItem.rotation === 3
	// 				? otherItem.size[1]
	// 				: otherItem.size[0];
	// 		const otherLength =
	// 			otherItem.rotation === 1 || otherItem.rotation === 3
	// 				? otherItem.size[0]
	// 				: otherItem.size[1];
	// 		// console.log(selectedPos[0], otherItem.gridPosition[0] + otherWidth);
	// 		// console.log(selectedPos[0] + width * 2, otherItem.gridPosition[0]);
	// 		// console.log(selectedPos[2], otherItem.gridPosition[2] + otherHeight * -2);
	// 		// console.log(selectedPos[2] + height * -2, otherItem.gridPosition[2]);
	// 		if (
	// 			selectedPos[0] < otherItem.gridPosition[0] + otherItem.getWidth * 2 &&
	// 			selectedPos[0] + width * 2 > otherItem.gridPosition[0] &&
	// 			selectedPos[2] > otherItem.gridPosition[2] + otherLength * -2 &&
	// 			selectedPos[2] + length * -2 < otherItem.gridPosition[2]
	// 		) {
	// 			droppable = false;
	// 		}
	// 	});

	// 	return droppable;

	// }

	// setSelected() {
	// 	useGameStore.setState((state) => ({
	// 		selected: this,
	// 	}));
	// }
}
