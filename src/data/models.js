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
	constructor(name, size, category, movableAxis, colors, collidable) {
		this.name = name;
		this.size = size;
		this.category = category;
		this.colors = colors;
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
			model.colors,
			model.collidable
		);
		this.id = id;
		this.rotation = 2;

		this.isSelected = false;
		this.isOnTable = false;
		this.tableId = [];

		this.position = this.axis.onFloor()
			? { x: 5, y: -0.25, z: -5 }
			: { x: 5, y: 5, z: 0 };

		this.tempPos = this.position;
		this.tempRot = this.rotation;
		this.tempCol = this.colors;
		this.tempAxis = this.axis;
		console.log(this.tempCol);
		this.tempCanDrop = false;
	}

	static fromJSON(data) {
		const item = new Item(models.getModelByName(data.name), data.id);
		item.position = data.position;
		item.rotation = data.rotation;
		item.colors = data.colors;
		item.axis = new MovableAxis(data.axis.x, data.axis.y, data.axis.z);
		item.isSelected = data.isSelected;
		item.isOnTable = data.isOnTable;
		item.tableId = data.tableId;
		item.tempPos = data.tempPos;
		item.tempRot = data.tempRot;
		item.tempCol = data.tempCol;
		item.tempAxis = new MovableAxis(
			data.tempAxis.x,
			data.tempAxis.y,
			data.tempAxis.z
		);
		item.tempCanDrop = data.tempCanDrop;
		return item;
	}

	placeItem() {
		this.position = this.tempPos;
		this.rotation = this.tempRot;
		this.colors = this.tempCol;
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
		["#A16C52"],
		true
	),
	chairA: new Model(
		"chairA",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#A16C52"],
		true
	),
	chairBWood: new Model(
		"chairBWood",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#A16C52"],
		true
	),
	chairB: new Model(
		"chairB",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#A16C52"],
		true
	),
	chairC: new Model(
		"chairC",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#A16C52"],
		true
	),
	chairD: new Model(
		"chairD",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	chairStool: new Model(
		"chairStool",
		{ x: 1, z: 1, y: 0.5 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#A16C52"],
		true
	),
	chairStoolWood: new Model(
		"chairStoolWood",
		{ x: 1, z: 1, y: 0.5 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#A16C52"],
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
	bedDoubleC: new Model(
		"bedDoubleC",
		{ x: 2.5, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#CBB792", "#87BEE9", "#87BEE9"],
		true
	),
	bedDoubleD: new Model(
		"bedDoubleD",
		{ x: 2.5, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#CBB792", "#87BEE9", "#87BEE9"],
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
	bedSingleC: new Model(
		"bedSingleC",
		{ x: 2, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#CBB792", "#87BEE9", "#87BEE9"],
		true
	),
	bedSingleD: new Model(
		"bedSingleD",
		{ x: 2, z: 3, y: 1 },
		Categories.beds,
		new MovableAxis(true, false, true),
		["#CBB792", "#87BEE9", "#87BEE9"],
		true
	),
	rugRectangleStripes: new Model(
		"rugRectangleStripes",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		new MovableAxis(true, false, true),
		["#DFB76B", "#87BEE9"],
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
	rugSquare: new Model(
		"rugSquare",
		{ x: 2, z: 2, y: 0 },
		Categories.rugs,
		new MovableAxis(true, false, true),
		["#87BEE9"],
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

	armchair: new Model(
		"armchair",
		{ x: 2, z: 1.5, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#87BEE9", "#87BEE9"],
		true
	),
	armchairB: new Model(
		"armchairB",
		{ x: 1.5, z: 1.5, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#8EC3F3", "#B2DAA0", "#CBB792"],
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
	couchB: new Model(
		"couchB",
		{ x: 2.5, z: 1.5, y: 1 },
		Categories.chairs,
		new MovableAxis(true, false, true),
		["#8EC3F3", "#B2DAA0", "#CBB792"],
		true
	),
	tableLow: new Model(
		"tableLow",
		{ x: 2, z: 1, y: 0.5 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#A16C52"],
		true
	),
	tableMedium: new Model(
		"tableMedium",
		{ x: 2, z: 2, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#A16C52"],
		true
	),
	tableMediumB: new Model(
		"tableMediumB",
		{ x: 2, z: 2, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	tableMediumLongB: new Model(
		"tableMediumLongB",
		{ x: 2, z: 1.5, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	tableMediumLong: new Model(
		"tableMediumLong",
		{ x: 3, z: 2, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#A16C52"],
		true
	),
	tableSmall: new Model(
		"tableSmall",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#A16C52"],
		true
	),
	tableSmallB: new Model(
		"tableSmallB",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	tableSmallLong: new Model(
		"tableSmallLong",
		{ x: 2, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	tableHigh: new Model(
		"tableHigh",
		{ x: 1, z: 1, y: 1.5 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	table50s: new Model(
		"table50s",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	tablePastel: new Model(
		"tablePastel",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	tableGoth: new Model(
		"tableGoth",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	tableCC: new Model(
		"tableCC",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		[],
		true
	),
	deskA: new Model(
		"deskA",
		{ x: 2, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	deskB: new Model(
		"deskB",
		{ x: 3, z: 1, y: 1 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
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
	lampA: new Model(
		"lampA",
		{ x: 1, z: 1, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#87BEE9", "#CBB792"],
		true
	),
	lampB: new Model(
		"lampB",
		{ x: 1, z: 1, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#E2EDF6", "#87BEE9"],
		true
	),
	lampStanding: new Model(
		"lampStanding",
		{ x: 1, z: 1, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#E2EDF6", "#6E787B"],
		true
	),
	libraryA: new Model(
		"libraryA",
		{ x: 1, z: 1, y: 2 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	libraryB: new Model(
		"libraryB",
		{ x: 1, z: 1, y: 2 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
		true
	),
	libraryC: new Model(
		"libraryC",
		{ x: 1, z: 1, y: 2 },
		Categories.tables,
		new MovableAxis(true, false, true),
		["#CBB792", "#E2EDF6"],
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
	plantA: new Model(
		"plantA",
		{ x: 0.5, z: 0.5, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#8EE6E3"],
		true
	),
	plantB: new Model(
		"plantB",
		{ x: 0.5, z: 0.5, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#A56C8A"],
		true
	),
	candleA: new Model(
		"candleA",
		{ x: 0.25, z: 0.25, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#EDE5F0", "#5A2475"],
		true
	),
	candleB: new Model(
		"candleB",
		{ x: 0.25, z: 0.25, y: 0.25 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#5A2475"],
		true
	),
	candleC: new Model(
		"candleC",
		{ x: 0.5, z: 0.5, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#4E2068", "#77263B", "#581535"],
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
		{ x: 1, z: 1, y: 1.25 },
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
	duck: new Model(
		"duck",
		{ x: 0.5, z: 0.5, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	globe: new Model(
		"globe",
		{ x: 0.5, z: 0.5, y: 1 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	monitor: new Model(
		"monitor",
		{ x: 2, z: 0.5, y: 1.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		["#000000"],
		true
	),
	wallCorkboard: new Model(
		"wallCorkboard",
		{ x: 2, z: 0.25, y: 1.5 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	pumpkin: new Model(
		"pumpkin",
		{ x: 0.5, z: 0.5, y: 0.5 },
		Categories.decor,
		new MovableAxis(true, false, true),
		[],
		true
	),
	pictureframeLargeC: new Model(
		"pictureframeLargeC",
		{ x: 1.75, z: 0.125, y: 2 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#A16C52"],
		true
	),
	pictureframeLargeA: new Model(
		"pictureframeLargeA",
		{ x: 1.5, z: 0.125, y: 1.5 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#A16C52"],
		true
	),
	pictureframeLargeB: new Model(
		"pictureframeLargeB",
		{ x: 2, z: 0.125, y: 1.25 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#A16C52"],
		true
	),
	pictureframeMediumA: new Model(
		"pictureframeMediumA",
		{ x: 1, z: 0.125, y: 1 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#A16C52"],
		true
	),
	pictureframeMediumB: new Model(
		"pictureframeMediumB",
		{ x: 1, z: 0.125, y: 1.5 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#A16C52"],
		true
	),
	wallA50s: new Model(
		"wallA50s",
		{ x: 1, z: 0.125, y: 1 },
		Categories.wall,
		new MovableAxis(true, true, false),
		[],
		true
	),
	wallB50s: new Model(
		"wallB50s",
		{ x: 1.25, z: 0.125, y: 1.25 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#A16C52"],
		true
	),
	wallAPastel: new Model(
		"wallAPastel",
		{ x: 1.25, z: 0.125, y: 1.25 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#9B6683"],
		true
	),
	wallBPastel: new Model(
		"wallBPastel",
		{ x: 1.5, z: 0.125, y: 2 },
		Categories.wall,
		new MovableAxis(true, true, false),
		["#78C3BB", "#F7D4E9"],
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
