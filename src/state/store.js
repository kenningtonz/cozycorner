import { create } from "zustand";
import { environments } from "@data/environments";
import { unstable_batchedUpdates } from "react-dom";
import { Item, Table } from "@data/models";

export const saveUserData = () => {
	const userData = {};
	unstable_batchedUpdates(() => {
		userData.items = useGameStore.getState().items;
		userData.environment = useGameStore.getState().environment;
		userData.floorColor = useGameStore.getState().floorColor;
		userData.buildingColor = useGameStore.getState().buildingColor;
		userData.muted = useGameStore.getState().muted;
		userData.musicTrack = useGameStore.getState().audio.track;
		userData.isDay = useGameStore.getState().isDay;
	});
	localStorage.setItem("userData", JSON.stringify(userData));
};

const loadUserData = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));

	if (userData !== null) {
		const items = [];
		userData.items.map((item) => {
			if (item.category.name == "Tables") {
				items.push(Table.tableFromJSON(item));
				// console.log("table");
			} else {
				// console.log("item");
				items.push(Item.fromJSON(item));
			}
		});
		// console.log(items);
		useGameStore.setState(() => ({
			environment: userData.environment,
			floorColor: userData.floorColor,
			muted: userData.muted,
			audio: {
				playing: false,
				volume: 0.5,
				track: userData.musicTrack,
				musicRef: null,
			},
			isDay: userData.isDay,
			items: items,
			page: "game",
			gameState: null,
		}));
	} else {
		newCorner();
	}
};

const newCorner = () => {
	// console.log("new corner");
	useGameStore.setState(() => ({
		environment: environments[0],
		floorColor: "#cdaa7d",
		muted: false,
		audio: {
			playing: false,
			volume: 0.5,
			track: 0,
			musicRef: null,
		},
		isDay: true,
		items: [],
		page: "game",
		gameState: null,
	}));
};

export const useGameStore = create((set) => ({
	selectedId: null,
	items: [],
	environment: environments[0],
	muted: false,
	floorColor: "#cdaa7d",
	buildingColor: "#DBF760",
	isDay: true,
	audio: { playing: false, volume: 0.5, track: 0, musicRef: null },

	localExists: localStorage.getItem("userData") != undefined,
	page: "home",
	screenshot: null,
	setScreenshot: (canvas) => set({ screenshot: canvas }),
	map: { size: [10, 10], gridDivision: 2 },
	gameState: null,
	categoryOpen: 0,
	setCategoryOpen: (index) => set({ categoryOpen: index }),
	setBuildingColor: (buildingColor) => set({ buildingColor: buildingColor }),
	setFloorColor: (floorColor) => set({ floorColor: floorColor }),
	setMuted: (muted) => set({ muted: muted }),
	setEnvironment: (index) => set({ environment: environments[index] }),
	setIsDay: (isDay) => set({ isDay: isDay }),
	setGameState: (gameState) => set({ gameState: gameState }),
	goToHome: () => set({ page: "home" }),
}));

export const createScreenshot = () => {
	let canvas;
	unstable_batchedUpdates(() => {
		canvas = useGameStore.getState().screenshot;
	});
	const link = document.createElement("a");
	link.setAttribute("download", "screenshot.png");
	// console.log(canvas);
	link.setAttribute(
		"href",
		canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
	);
	link.click();
};

export const startGame = (fromLocal) => {
	// console.log("start game");
	if (fromLocal) {
		loadUserData();
	} else {
		newCorner();
	}
};
