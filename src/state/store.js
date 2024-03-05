import { create } from "zustand";
import { environments } from "@data/environments";
import { unstable_batchedUpdates } from "react-dom";
import { resetSelected } from "./selectedStoreFunctions";

class Map {
	constructor({ size, gridDivision }) {
		this.size = size;
		this.gridDivision = gridDivision;
		this.environment = environments[0];
		this.floorColor = "#cdaa7d";
		this.buildingColor = "#DBF760";
		this.items = [];
		this.isDay = true;
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
	itemIsSelected: false,
	selectedId: null,
	items: [],
	muted: false,
	audio: { playing: false, volume: 0.5, track: 0, musicRef: null },

	localExists: localStorage.getItem("map") !== null,
	page: "home",
	setMuted: (muted) => set({ muted }),
	saveItems: () =>
		set((state) => ({ map: { ...state.map, items: state.items } })),
	setBuildingColor: (color) =>
		set((state) => ({ map: { ...state.map, buildingColor: color } })),
	setFloorColor: (color) =>
		set((state) => ({ map: { ...state.map, floorColor: color } })),
	map: new Map({ size: [10, 10], gridDivision: 2 }),
	gameState: null,
	setEnvironment: (index) =>
		set((state) => ({ map: { ...state.map, environment: environments[index] } })),
	setIsDay: (isDay) => set((state) => ({ map: { ...state.map, isDay } })),
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
