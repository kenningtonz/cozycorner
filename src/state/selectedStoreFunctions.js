import { useGameStore } from "./store";
import { Item, models, Table } from "../data/models";
import { unstable_batchedUpdates } from "react-dom";

const isColliding = (selectedId) => {
	let items;
	unstable_batchedUpdates(() => {
		items = useGameStore.getState().items;
	});
	const item = items.find((item) => item.id === selectedId);
	console.log(item);
	if (item.collidable === false) return false;
	let colliding = false;

	// check if item is not colliding with other items
	items.forEach((otherItem) => {
		const otherItemSize = otherItem.getSize(otherItem.rotation);
		const itemSize = item.getSize(item.tempRot);
		// console.log(otherItemSize, itemSize);
		if (otherItem.id === selectedId) {
			return;
		}
		if (otherItem.collidable === false) {
			return;
		}

		const xAxisCheck = () => {
			return (
				item.tempPos.x < otherItem.position.x + otherItemSize.x &&
				item.tempPos.x + itemSize.x > otherItem.position.x
			);
		};

		const zAxisCheck = () => {
			return (
				item.tempPos.z > otherItem.position.z - otherItemSize.z &&
				item.tempPos.z - itemSize.z < otherItem.position.z
			);
		};

		const yAxisCheck = () => {
			return (
				item.tempPos.y < otherItem.position.y + otherItemSize.y &&
				item.tempPos.y + itemSize.y > otherItem.position.y
			);
		};

		//different axis
		// console.log(item.axis.onFloor(), otherItem.axis.onFloor());
		if (
			(!item.tempAxis.onFloor() && otherItem.axis.onFloor()) ||
			(item.tempAxis.onFloor() && !otherItem.axis.onFloor())
		) {
			//check all axis

			if (yAxisCheck() && xAxisCheck() && zAxisCheck()) {
				colliding = true;
			}
		} else if (
			item.tempAxis.x &&
			item.tempAxis.y &&
			otherItem.axis.x &&
			otherItem.axis.y
		) {
			//check x and y
			if (yAxisCheck() && xAxisCheck()) {
				colliding = true;
				// console.log("x and y axis", "colliding: ", colliding);
			}
		} else if (
			item.tempAxis.z &&
			item.tempAxis.y &&
			otherItem.axis.z &&
			otherItem.axis.y
		) {
			if (yAxisCheck() && zAxisCheck()) {
				colliding = true;
				// console.log("y and z", "colliding: ", colliding);
			}
			//check z and y
		} else if (
			item.tempAxis.x &&
			item.tempAxis.z &&
			otherItem.axis.x &&
			otherItem.axis.z
		) {
			//check x and z
			if (zAxisCheck() && xAxisCheck()) {
				colliding = true;
				// console.log("x and z", "colliding: ", colliding);
			}
		}

		if (item.isDecor() && otherItem.isTable() && colliding && !item.isOnTable) {
			putOnTable(otherItem);
		}

		if (!colliding && item.isOnTable) {
			removeFromTable(item);
		}
		if (item.isTable() && otherItem.isDecor() && colliding) {
			item.items.forEach((subItem) => {
				if (subItem == otherItem.id) {
					colliding = false;
				}
			});
		}
		// console.log("colliding: ", colliding, "with", otherItem.name);
	});

	return colliding;
};

const removeFromTable = (itemSelected) => {
	console.log("remove from table");
	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === itemSelected.tableId) {
				item.removeItem(state.selectedId);
			}
			if (item.id === state.selectedId) {
				item.isOnTable = false;
				item.tableId = null;
				item.tempPos = { x: item.tempPos.x, y: -0.25, z: item.tempPos.z };
			}
			return item;
		}),
	}));
};

const putOnTable = (table) => {
	console.log("put on table");
	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === state.selectedId) {
				item.isOnTable = true;
				item.tableId = table.id;
				item.tempPos = {
					x: item.tempPos.x,
					y: table.size.y - 0.25,
					z: item.tempPos.z,
				};
			}
			if (item === table) {
				item.items.push(state.selectedId);
				// console.log(item);
			}
			return item;
		}),
	}));
};

const setCanDrop = () => {
	let canDrop = true;

	let item;
	unstable_batchedUpdates(() => {
		item = useGameStore
			.getState()
			.items.find((item) => item.id === useGameStore.getState().selectedId);
	});
	const colliding = isColliding(item.id);

	if (colliding) {
		canDrop = false;
	}

	if (item.isOnTable) {
		canDrop = true;
	}

	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === state.selectedId) {
				item.tempCanDrop = canDrop;
			}
			return item;
		}),
	}));
};

export const colorSelected = (color, index) => {
	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === state.selectedId) {
				item.tempCol[index] = color;
			}
			return item;
		}),
	}));
};

export const rotateSelected = (rotationChange, item) => {
	//wall axis can only be 1 or 2
	let newRot = item.tempRot;
	let newPos = item.tempPos;
	let newAxis = item.tempAxis;

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
			newPos = { x: -0.25, y: newPos.y, z: -newPos.x };
		} else {
			newRot = 2;
			newAxis.z = false;
			newAxis.x = true;
			newPos = { x: -newPos.z, y: newPos.y, z: 0.25 };
		}
	}
	// console.log(newRot);

	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === state.selectedId) {
				// console.log(state.selectedId);
				item.tempRot = newRot;
				item.tempPos = newPos;
				item.tempAxis = newAxis;
			}
			return item;
		}),
	}));

	// console.log(newRot);
	const itemSize = item.getSize(newRot);

	if (item.isTable() && item.items.length > 0) {
		item.items.forEach((itemOnTableId) => {
			useGameStore.setState((state) => ({
				items: state.items.map((subItem) => {
					if (subItem.id === itemOnTableId) {
						subItem.tempRot = newRot;
					}
					return subItem;
				}),
			}));
		});
	}
	setCanDrop();
};

const getMove = (leftRight, upDown, item) => {
	let mapSize;
	const itemSize = item.getSize(item.tempRot);

	unstable_batchedUpdates(() => {
		mapSize = useGameStore.getState().map.size;
	});
	const moveXAxis = Math.min(
		mapSize[0] - itemSize.x,
		Math.max(0.25, item.tempPos.x + leftRight)
	);

	const moveYAxis = Math.min(
		mapSize[1] - itemSize.y - 1,
		Math.max(0.5, item.tempPos.y + upDown)
	);

	const moveZAxis = Math.max(
		-mapSize[1] + itemSize.z,
		Math.min(-0.25, item.tempPos.z + leftRight)
	);

	const moveZAxisFloor = Math.max(
		-mapSize[1] + itemSize.z,
		Math.min(-0.25, item.tempPos.z + upDown)
	);
	return { moveXAxis, moveYAxis, moveZAxis, moveZAxisFloor };
};

export const moveSelected = (leftRight, upDown, item) => {
	const { moveXAxis, moveYAxis, moveZAxis, moveZAxisFloor } = getMove(
		leftRight,
		upDown,
		item
	);

	// console.log(moveXAxis, moveYAxis, moveZAxis, moveZAxisFloor);

	if (item.isTable() && item.items.length > 0) {
		item.items.forEach((itemOnTableId) => {
			useGameStore.setState((state) => ({
				items: state.items.map((subItem) => {
					if (subItem.id === itemOnTableId) {
						const subItemMove = getMove(leftRight, upDown, subItem);
						// console.log(subItemMove);
						subItem.tempPos = {
							x: subItemMove.moveXAxis,
							y: subItem.tempPos.y,
							z: subItemMove.moveZAxisFloor,
						};
					}
					return subItem;
				}),
			}));
		});
	}

	let newPos;
	if (item.tempAxis.onFloor()) {
		newPos = { x: moveXAxis, y: item.tempPos.y, z: moveZAxisFloor };
	} else if (item.tempAxis.x && item.tempAxis.y) {
		newPos = { x: moveXAxis, y: moveYAxis, z: item.tempPos.z };
	} else if (item.tempAxis.z && item.tempAxis.y) {
		newPos = { x: item.tempPos.x, y: moveYAxis, z: moveZAxis };
	} else {
		newPos = { x: 0, y: 0, z: 0 };
	}
	// console.log(newPos);

	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === state.selectedId) {
				// console.log(state.selectedId);
				item.tempPos = newPos;
			}
			return item;
		}),
	}));
	setCanDrop();
};

export const placeSelected = (item) => {
	// console.log(item.tempCanDrop);
	if (!item.tempCanDrop) {
		return;
	}
	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === state.selectedId) {
				item.position = item.tempPos;
				item.rotation = item.tempRot;
				item.colors = item.tempCol;
				item.axis = item.tempAxis;
				item.isSelected = false;
			}
			return item;
		}),
	}));

	if (item.isTable() && item.items.length > 0) {
		item.items.forEach((itemOnTableId) => {
			useGameStore.setState((state) => ({
				items: state.items.map((subItem) => {
					if (subItem.id === itemOnTableId) {
						subItem.position = subItem.tempPos;
						subItem.rotation = subItem.tempRot;
					}
					return subItem;
				}),
			}));
		});
	}
	resetSelected();
};

export const spawnItem = (itemName) => {
	console.log(itemName);

	const categories = models.getCategories();
	const model = models.getModelByName(itemName);
	const itemID = `item-${itemName}-${Date.now()}`;

	const item =
		model.category === categories.tables
			? new Table(model, itemID)
			: new Item(model, itemID);
	item.isSelected = true;
	useGameStore.setState((state) => ({
		items: [...state.items, item],
	}));
	setSelected(itemID);
	setCanDrop();
};

export const removeSelected = (item) => {
	if (item.isTable() && item.items.length > 0) {
		item.items.forEach((itemOnTableId) => {
			useGameStore.setState((state) => ({
				items: state.items.map((subItem) => {
					if (subItem.id === itemOnTableId) {
						subItem.tempPos = { x: item.tempPos.x, y: -0.25, z: item.tempPos.z };
						subItem.isOnTable = false;
						subItem.tableId = null;
						subItem.position = item.tempPos;
					}
					return subItem;
				}),
			}));
		});
	}
	useGameStore.setState((state) => ({
		items: state.items.filter((i) => i !== item),
	}));
	resetSelected();
};

export const resetSelected = () => {
	useGameStore.setState(() => ({
		selectedId: null,
	}));
};

export const setSelected = (id) => {
	useGameStore.setState(() => ({
		selectedId: id,
	}));
	useGameStore.setState((state) => ({
		items: state.items.map((item) => {
			if (item.id === id) {
				item.isSelected = true;
			} else {
				item.isSelected = false;
			}
			return item;
		}),
	}));

	setCanDrop();
};
