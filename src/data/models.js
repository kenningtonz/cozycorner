import { m } from "framer-motion";

export const items = {
	chairAWood: {
		name: "chairAWood",
		size: [1, 1],

		category: "chairs",
		color: [],
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
		color: [],
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
		color: [],
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
	shelfBLarge: {
		name: "shelfBLarge",
		color: "#CEA879",
		size: [2, 0.25],
		category: "tables",
		axis: "wall",
	},
};

export const Categories = {
	chairs: { name: "Seating" },
	beds: { name: "Beds" },
	rugs: { name: "Rugs" },
	tables: { name: "Tables" },
	decor: { name: "Decor" },
	wall: { name: "Wall" },
};

class MovableAxis {
	//booleans
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	onFloor() {
		if (this.x && this.z) {
			return true;
		} else if ((this.x && this.y) || (this.y && this.z)) {
			return false;
		}
	}
}

class Model {
	constructor(name, size, category, movableAxis, color, collidable) {
		this.name = name;
		this.size = size;
		this.category = category;
		this.color = color;
		this.axis = movableAxis;
		this.collidable = collidable;
	}
}

export class Item extends Model {
	constructor(model, id) {
		super(
			model.name,
			model.size,
			model.category,
			model.axis,
			model.color,
			model.collidable
		);
		this.id = id;
		this.rotation = 2;

		this.isSelected = false;
		this.isOnTable = false;
		this.tableId = [];
		console.log(this.axis);
		this.position = this.axis.onFloor()
			? { x: 5, y: -0.25, z: -5 }
			: { x: 5, y: 5, z: 0.25 };

		this.tempPos = this.position;
		this.tempRot = this.rotation;
		this.tempCol = this.color;
		this.tempAxis = this.axis;
		this.tempCanDrop = false;
	}

	placeItem() {
		this.position = this.tempPos;
		this.rotation = this.tempRot;
		this.color = this.tempCol;
		this.axis = this.tempAxis;
		this.isSelected = false;
	}

	isDecor() {
		return this.category === Categories.decor;
	}

	isTable() {
		return this.category === Categories.tables;
	}

	getSize(rotation) {
		if (rotation === 1 || rotation === 3) {
			return { x: this.size.z, z: this.size.x, y: this.size.y };
		}
		return this.size;
	}
}

export class Table extends Item {
	constructor(model, id) {
		super(model, id);
		this.items = [];
	}

	addItem(itemID) {
		this.items.push(itemID);
	}

	removeItem(itemID) {
		this.items = this.items.filter((i) => i !== itemID);
	}
}

const Models = {
	chairAWood: new Model(
		"chairAWood",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	chairA: new Model(
		"chairA",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9"],
		true
	),
	chairBWood: new Model(
		"chairBWood",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	chairB: new Model(
		"chairB",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9"],
		[],
		true
	),
	chairC: new Model(
		"chairC",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9"],
		[],
		true
	),
	chairStool: new Model(
		"chairStool",
		{ x: 1, z: 1, y: 0.5 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9"],
		true
	),
	chairStoolWood: new Model(
		"chairStoolWood",
		{ x: 1, z: 1, y: 0.5 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	bedDoubleA: new Model(
		"bedDoubleA",
		{ x: 3, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	bedDoubleB: new Model(
		"bedDoubleB",
		{ x: 3, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	bedSingleA: new Model(
		"bedSingleA",
		{ x: 1, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	bedSingleB: new Model(
		"bedSingleB",
		{ x: 1, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	rugRectangleStripes: new Model(
		"rugRectangleStripes",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		new MovableAxis(true, false, true),
		["#DFB76B"],
		false
	),
	rugRectangle: new Model(
		"rugRectangle",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		new MovableAxis(true, false, true),
		["#DFB76B"],
		false
	),
	rugOval: new Model(
		"rugOval",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		new MovableAxis(true, false, true),
		["#DFB76B"],
		false
	),
	cabinetSmall: new Model(
		"cabinetSmall",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#A16C52", "#CEA879"],
		true
	),
	cabinetMedium: new Model(
		"cabinetMedium",
		{ x: 2, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#A16C52", "#CEA879"],
		true
	),
	// shelfBLarge: new Model(
	// 	"shelfBLarge",
	// 	{ x: 2, z: 0.5, y: 0.5 },
	// 	Categories.tables,
	// 	new MovableAxis(true, true, false),
	// 	"#CEA879",
	// ),
	// shelfALarge: new Model(
	// 	"shelfALarge",
	// 	{ x: 2, z: 0.5, y: 0.5 },
	// 	Categories.tables,
	// 	new MovableAxis(true, true, false),
	// 	"#CEA879",
	// ),
	// shelfBSmall: new Model(
	// 	"shelfBSmall",
	// 	{ x: 1, z: 0.5, y: 0.5 },
	// 	Categories.tables,
	// 	"#CEA879",
	// 	new MovableAxis(true, true, false)
	// ),
	// shelfASmall: new Model(
	// 	"shelfASmall",
	// 	{ x: 1, z: 0.5, y: 0.5 },
	// 	Categories.tables,
	// 	"#CEA879",
	// 	new MovableAxis(true, true, false)
	// ),
	armchair: new Model(
		"armchair",
		{ x: 1.5, z: 1.5, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	couch: new Model(
		"couch",
		{ x: 3, z: 1.5, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	tableLow: new Model(
		"tableLow",
		{ x: 2, z: 1, y: 0.5 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	tableMedium: new Model(
		"tableMedium",
		{ x: 2, z: 2, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	tableMediumLong: new Model(
		"tableMediumLong",
		{ x: 3, z: 2, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	tableSmall: new Model(
		"tableSmall",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	book: new Model(
		"book",
		{ x: 0.5, z: 0.5, y: 0.25 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#87BEE9"],
		true
	),
	bookSet: new Model(
		"bookSet",
		{ x: 1, z: 1, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9", "#87BEE9"],
		true
	),
	cactusMedium: new Model(
		"cactusMedium",
		{ x: 1, z: 1, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	cactusSmall: new Model(
		"cactusSmall",
		{ x: 0.5, z: 0.5, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	candleA: new Model(
		"candleA",
		{ x: 0.25, z: 0.25, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	candleB: new Model(
		"candleB",
		{ x: 0.25, z: 0.25, y: 0.25 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	chair50s: new Model(
		"chair50s",
		{ x: 1, z: 1, y: 0.75 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	chairPastel: new Model(
		"chairPastel",
		{ x: 1, z: 1, y: 0.75 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	chairCC: new Model(
		"chairCC",
		{ x: 1, z: 1, y: 1.25 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	chairGoth: new Model(
		"chairGoth",
		{ x: 1.5, z: 1.5, y: 1.25 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		[],
		true
	),
	radioA: new Model(
		"radioA",
		{ x: 1, z: 0.5, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	radioB: new Model(
		"radioB",
		{ x: 1, z: 0.5, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	radioC: new Model(
		"radioC",
		{ x: 1, z: 0.5, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	radioD: new Model(
		"radioD",
		{ x: 1, z: 0.5, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	paintingA: new Model(
		"paintingA",
		{ x: 2, z: 0.125, y: 1 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	paintingB: new Model(
		"paintingB",
		{ x: 2, z: 0.125, y: 1 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	paintingC: new Model(
		"paintingC",
		{ x: 2, z: 0.125, y: 1 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	paintingSmallA: new Model(
		"paintingSmallA",
		{ x: 0.25, z: 1, y: 0.25 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	paintingSmallB: new Model(
		"paintingSmallB",
		{ x: 0.25, z: 1, y: 0.25 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	paintingSmallC: new Model(
		"paintingSmallC",
		{ x: 0.25, z: 1, y: 0.25 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
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
		return Object.values(this.models).find((model) => model.name === name);
	}
}

export const models = new ModelList();
