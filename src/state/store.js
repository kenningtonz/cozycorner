import { create } from "zustand";
import { resetSelected } from "@state/selectedStoreFunctions";
import { environments } from "@data/environments";
import { unstable_batchedUpdates } from "react-dom";

class Map {
	constructor({ size, gridDivision }) {
		this.size = size;
		this.gridDivision = gridDivision;
		this.environment = environments[0];
		this.baseColor = "#A16C52";
		this.buildingColor = "#DBF760";
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

export const saveMap = (map) => {
	console.log(map);
	localStorage.setItem("map", JSON.stringify(map));
	useGameStore.setState((state) => ({
		map: map,
	}));
};

export const useGameStore = create((set) => ({
	selected: { pos: null, rot: null, item: null, canDrop: false, color: null },
	audio: { playing: false, volume: 0.5, track: 0, musicRef: null },
	// selected: null,
	localExists: localStorage.getItem("map") !== null,
	page: "home",

	setBaseColor: (color) =>
		set((state) => ({ map: { ...state.map, baseColor: color } })),
	setBuildingColor: (color) =>
		set((state) => ({ map: { ...state.map, buildingColor: color } })),
	map: new Map({ size: [10, 10], gridDivision: 2 }),
	gameStates: [null, "music", "outside", "inside", "view"],
	gameState: null,

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

export const setItems = (items) => {
	console.log(items);
	useGameStore.setState((state) => ({
		map: {
			...state.map,
			items: items,
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
