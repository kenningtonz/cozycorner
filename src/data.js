export const items = {
	chairAWood: {
		name: "chairAWood",
		size: [1, 1],

		category: "chairs",
		color: null,
		axis: "floor",
	},
	chairA: {
		name: "chairA",
		size: [1, 1],
		category: "chairs",
		color: "#87BEE9",
		axis: "floor",
	},
	chairBWood: {
		name: "chairBWood",
		size: [1, 1],
		category: "chairs",
		color: null,
		axis: "floor",
	},
	chairB: {
		name: "chairB",
		size: [1, 1],
		category: "chairs",
		color: "#87BEE9",
		axis: "floor",
	},
	chairC: {
		name: "chairC",
		size: [1, 1],
		category: "chairs",
		color: "#87BEE9",
		axis: "floor",
	},
	chairStool: {
		name: "chairStool",
		size: [1, 1],
		category: "chairs",
		color: "#87BEE9",
		axis: "floor",
	},
	chairStoolWood: {
		name: "chairStoolWood",
		size: [1, 1],
		category: "chairs",
		color: null,
		axis: "floor",
	},
	bedDoubleA: {
		name: "bedDoubleA",
		size: [3, 3],
		category: "beds",
		color: "#87BEE9",
		axis: "floor",
	},
	bedDoubleB: {
		name: "bedDoubleB",
		size: [3, 3],
		category: "beds",
		color: "#87BEE9",
		axis: "floor",
	},
	bedSingleA: {
		name: "bedSingleA",
		size: [1, 3],
		category: "beds",
		color: "#87BEE9",
		axis: "floor",
	},
	bedSingleB: {
		name: "bedSingleB",
		size: [1, 3],
		category: "beds",
		color: "#87BEE9",
		axis: "floor",
	},
	rugRectangleStripes: {
		name: "rugRectangleStripes",
		size: [3, 2],
		category: "rugs",
		color: "#87BEE9",
		collidable: false,
		axis: "floor",
	},
	rugRectangle: {
		name: "rugRectangle",
		size: [3, 2],
		category: "rugs",
		color: "#87BEE9",
		collidable: false,
		axis: "floor",
	},
	rugOval: {
		name: "rugOval",
		size: [3, 2],
		category: "rugs",
		color: "#87BEE9",
		collidable: false,
		axis: "floor",
	},
	cabinetSmall: {
		name: "cabinetSmall",
		color: "#CEA879",
		size: [1, 1],
		category: "tables",
		axis: "floor",
	},
	cabinetMedium: {
		name: "cabinetMedium",
		color: "#CEA879",
		size: [2, 1],
		category: "tables",
		axis: "floor",
	},
};

const baseModelColour = "#A16C52";

export const Categories = {
	chairs: { name: "chairs" },
	beds: { name: "beds" },
	rugs: { name: "rugs" },
	tables: { name: "tables" },
};

export const environments = [
	{
		index: 0,
		name: "default",
		terrainColor: "white",
		skyColor: "white",
		skyColor2: "white",
		cloudColor: "white",
		cloudColor2: "white",
	},
	{
		index: 1,
		name: "forest",
		color: "green",
	},
	{
		index: 2,
		name: "desert",
		color: "yellow",
	},
	{
		index: 3,
		name: "space",
		color: "black",
	},
];

class Model {
	constructor(name, size, category, color, axis) {
		this.name = name;
		this.size = size;
		this.category = category;
		this.color = color;
		this.axis = axis;
	}
}

class Item {
	constructor(model, position, rotation, color) {
		this.model = model;
		this.position = position;
		this.rotation = rotation;
		this.color = color;
	}
}

class ItemList {}

const Models = {
	chairAWood: new Model("chairAWood", [1, 1], Categories.chairs, null, "floor"),
	chairA: new Model("chairA", [1, 1], Categories.chairs, "#87BEE9", "floor"),
	chairBWood: new Model("chairBWood", [1, 1], Categories.chairs, null, "floor"),
	chairB: new Model("chairB", [1, 1], Categories.chairs, "#87BEE9", "floor"),
	chairC: new Model("chairC", [1, 1], Categories.chairs, "#87BEE9", "floor"),
	chairStool: new Model(
		"chairStool",
		[1, 1],
		Categories.chairs,
		"#87BEE9",
		"floor"
	),
	chairStoolWood: new Model(
		"chairStoolWood",
		[1, 1],
		Categories.chairs,
		null,
		"floor"
	),
	bedDoubleA: new Model(
		"bedDoubleA",
		[3, 3],
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	bedDoubleB: new Model(
		"bedDoubleB",
		[3, 3],
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	bedSingleA: new Model(
		"bedSingleA",
		[1, 3],
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	bedSingleB: new Model(
		"bedSingleB",
		[1, 3],
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	rugRectangleStripesB: new Model(
		"rugRectangleStripesB",
		[3, 2],
		Categories.rugs,
		"#87BEE9",
		"floor"
	),
	cabinetSmall: new Model(
		"cabinetSmall",
		[1, 1],
		Categories.tables,
		"#CEA879",
		"floor"
	),
	cabinetMedium: new Model(
		"cabinetMedium",
		[2, 1],
		Categories.tables,
		"#CEA879",
		"floor"
	),
};

class ModelList {
	constructor() {
		this.models = Models;
		this.categories = Categories;
	}

	getItems() {
		return this.models;
	}

	getCategories() {
		return this.categories;
	}

	getModelByName(name) {
		return this.models[name];
	}
}

export const models = new ModelList();

// const environments = {
// 	default: {
// 		index: 0,
// 		name: "default",
// 		color: "white",
// 	},
// 	forest: {
// 		index: 1,
// 		name: "forest",
// 		color: "green",
// 	},
// 	desert: {
// 		index: 2,
// 		name: "desert",
// 		color: "yellow",
// 	},
// 	space: {
// 		index: 3,
// 		name: "space",
// 		color: "black",
// 	},
// };

export const MusicTracks = {
	BloodratSewers: {
		track: 0,
		name: "Bloodrat Sewers",
		path: "/music/JDSherbert - Ambiences Music Pack - Bloodrat Sewers.mp3",
	},
	CosmicStar: {
		track: 1,
		name: "Cosmic Star",
		path: "/music/JDSherbert - Ambiences Music Pack - Cosmic Star.mp3",
	},
	DarkDarkWoods: {
		track: 2,
		name: "Dark Dark Woods",
		path: "/music/JDSherbert - Ambiences Music Pack - Dark Dark Woods.mp3",
	},
	DesertSirocco: {
		track: 3,
		name: "Desert Sirocco",
		path: "/music/JDSherbert - Ambiences Music Pack - Desert Sirocco.mp3",
	},
	FrostMountainAura: {
		track: 4,
		name: "Frost Mountain Aura",
		path: "/music/JDSherbert - Ambiences Music Pack - Frost Mountain Aura.mp3",
	},
	JunctionJazz: {
		track: 5,
		name: "Junction Jazz",
		path: "/music/JDSherbert - Ambiences Music Pack - Junction Jazz.mp3",
	},
	SwampofDigeridoos: {
		track: 6,
		name: "Swamp of Digeridoos",
		path: "/music/JDSherbert - Ambiences Music Pack - Swamp of Digeridoos.mp3",
	},
	TheBlackpennyPub: {
		track: 7,
		name: "The Blackpenny Pub",
		path: "/music/JDSherbert - Ambiences Music Pack - The Blackpenny Pub.mp3",
	},
	UnderwaterCity: {
		track: 8,
		name: "Underwater City",
		path: "/music/JDSherbert - Ambiences Music Pack - Underwater City.mp3",
	},
	TigerTempleTrial: {
		track: 9,
		name: "Tiger Temple Trial",
		path: "/music/JDSherbert - Ambiences Music Pack - Tiger Temple Trial.mp3",
	},
};
