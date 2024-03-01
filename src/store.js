import { create } from "zustand";
import { items, environments } from "./data";
import { unstable_batchedUpdates } from "react-dom";
// const map = {
// 	size: [10, 10],
// 	gridDivision: 2,
// 	environment: { ...environments.desert },
// 	items: [
// 		{
// 			...items.floor,
// 			gridPosition: [0, -1, 0],
// 		},
// 		{
// 			...items.walls,
// 			gridPosition: [0, -1, 0],
// 		},
// 	],
// };

class Map {
	constructor({ size, gridDivision }) {
		this.size = size;
		this.gridDivision = gridDivision;
		this.environment = environments[0];
		this.itemsBase = [
			{
				name: "floor",
				size: [10.5, 10.5],
				gridPosition: [-1, -0.5, 1],
			},
			{
				name: "walls",
				size: [10.5, 10.5],
				gridPosition: [-1, -0.5, 1],
			},
		];
		this.items = [];
	}
	static fromLocal() {
		const localMap = localStorage.getItem("map");
		if (localMap !== null) {
			return JSON.parse(localMap);
		}
		return new Map({ size: [10, 10], gridDivision: 2 });
	}
	saveLocal() {
		localStorage.setItem("map", JSON.stringify(this));
	}
}

class Selected {
	constructor(pos, rot, item, color) {
		this.pos = pos;
		this.rot = rot;
		this.item = item;
		console.log(this.item);
		this.canDrop = this.getCanDrop();

		this.color = color;
	}

	rotateSelected = (rotation) => {
		const currentRot = this.rot;
		let newRot = currentRot + rotation;
		if (newRot < 0) {
			newRot = 3;
		}
		if (newRot > 3) {
			newRot = 0;
		}
		this.setSelected();
	};

	reset = () => {
		this.pos = null;
		this.rot = null;
		this.item = null;
		this.canDrop = false;
		this.color = null;
	};

	getCanDrop() {
		let canDrop = false;
		const item = this.selected.item;
		const pos = this.selected.pos;
		console.log(item, pos);
		unstable_batchedUpdates(() => {
			canDrop = isColliding(useGameStore.getState().map.items, item, pos);
		});
		return canDrop;
	}

	setSelected() {
		useGameStore.setState((state) => ({
			selected: this,
		}));
	}
}

export const saveMap = (map) => {
	console.log(map);
	localStorage.setItem("map", JSON.stringify(map));
	useGameStore.setState((state) => ({
		map: map,
	}));
};

export const useUIStore = create((set) => ({
	openCategory: 0,
	setOpenCategory: (openCategory) => set({ openCategory }),
}));

const audioState = {
	playing: false,
	volume: 0.5,
	track: 0,
};

export const useGameStore = create((set) => ({
	selected: { pos: null, rot: null, item: null, canDrop: false, color: null },
	audio: audioState,
	// selected: null,
	localExists: localStorage.getItem("map") !== null,
	page: "home",
	map: new Map({ size: [10, 10], gridDivision: 2 }),
	gameStates: [null, "music", "outside", "inside", "view"],
	gameState: null,
	setAudioVolume: (volume) =>
		set((state) => ({ audio: { ...state.audio, volume } })),
	setAudioTrack: (track) =>
		set((state) => ({ audio: { ...state.audio, track } })),
	setAudioPlaying: (playing) =>
		set((state) => ({ audio: { ...state.audio, playing } })),
	setGameState: (gameState) => set({ gameState }),
	goToHome: () => set({ page: "home" }),
}));

export const startGame = (fromLocal) => {
	if (fromLocal) {
		useGameStore.setState((state) => ({
			page: "game",
			gameState: null,

			map: Map.fromLocal(),
		}));
		return;
	}
	useGameStore.setState((state) => ({
		page: "game",
		gameState: null,
		map: new Map({ size: [10, 10], gridDivision: 2 }),
	}));
	resetSelected();
};

// export const select = (index) => {
// 	if (index === -1) {
// 		useGameStore.setState((state) => ({
// 			selected: new Selected([0, 0, 0], 0, state.map.items.length, "purple"),
// 		}));
// 	} else {
// 		useGameStore.setState((state) => ({
// 			selected: new Selected(
// 				state.map.items[index].gridPosition,
// 				state.map.items[index].rotation,
// 				index,
// 				state.map.items[index].color
// 			),
// 		}));
// 	}
// };

export const setSelected = (index) => {
	console.log(index);
	useGameStore.setState((state) => ({
		selected: {
			pos: state.map.items[index].gridPosition,
			rot: state.map.items[index].rotation,
			item: index,
			color: state.map.items[index].color,
		},
	}));
	if (index === -1) return;
	setCanDrop();
};

const resetSelected = () => {
	useGameStore.setState(() => ({
		selected: {
			pos: null,
			rot: null,
			item: null,
			canDrop: false,
			color: null,
		},
	}));
};

export const spawnItem = (itemName) => {
	console.log(itemName);
	const item = items[itemName];
	let index;
	unstable_batchedUpdates(() => {
		index = useGameStore.getState().map.items.length;
	});
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: [
				...state.map.items,
				{
					...item,
					gridPosition: [0, -0.25, 0],
					rotation: 0,
					index: index,
				},
			],
		},
	}));
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

export const moveSelected = (x, z) => {
	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			pos:
				state.selected.item !== null
					? [
							Math.min(
								state.map.size[0] + state.map.items[state.selected.item].size[0] + 1,
								Math.max(0, state.selected.pos[0] + x)
							),
							state.selected.pos[1],
							Math.max(
								-state.map.size[1] - state.map.items[state.selected.item].size[1] - 1,
								Math.min(0, state.selected.pos[2] + z)
							),
					  ]
					: [0, 0, 0],
		},
	}));
	setCanDrop();
};

// const getMaxX = (mapSizeX, itemSizeX) => {
// 	return mapSizeX + itemSizeX + 1;
// };
// const getMaxZ = (mapSizeZ, itemSizeZ) => {
// 	return -mapSizeZ - itemSizeZ - 1;
// };

// export const getX = (mapSizeX, itemSizeX, x) => {
// 	return Math.min(mapSizeX + itemSizeX + 1, Math.max(0, x));
// };

// export const getZ = (mapSizeZ, itemSizeZ, z) => {
// 	return Math.max(-mapSizeZ - itemSizeZ - 1, Math.min(0, z));
// };

// export const moveSelected = (x, z) => {
// 	useGameStore.setState((state) => ({
// 		selected: {
// 			...state.selected,
// 			pos:
// 				state.selected.item !== null ? [x, state.selected.pos[1], z] : [0, 0, 0],
// 		},
// 	}));
// 	setCanDrop();
// };

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

export const rotateSelected = (rotation) => {
	let currentRot;
	unstable_batchedUpdates(() => {
		currentRot = useGameStore.getState().selected.rot;
	});
	let newRot = currentRot + rotation;
	if (newRot < 0) {
		newRot = 3;
	}
	if (newRot > 3) {
		newRot = 0;
	}
	useGameStore.setState((state) => ({
		selected: {
			...state.selected,
			rot: state.selected.item !== null ? newRot : 0,
		},
	}));
};

export const setEnvironment = (num) => {
	let eIndex;
	unstable_batchedUpdates(() => {
		eIndex = useGameStore.getState().map.environment.index;
	});
	let index = eIndex + num;
	if (index < 0) {
		index = environments.length - 1;
	} else if (index > environments.length - 1) {
		index = 0;
	}

	useGameStore.setState((state) => ({
		map: {
			...state.map,
			environment: environments[index],
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

export const setItems = (items) => {
	console.log(items);
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: items,
		},
	}));
};
