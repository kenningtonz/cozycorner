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
	shelfBLarge: {
		name: "shelfBLarge",
		color: "#CEA879",
		size: [2, 0.25],
		category: "tables",
		axis: "wall",
	},
};

export const Categories = {
	chairs: { name: "chairs" },
	beds: { name: "beds" },
	rugs: { name: "rugs" },
	tables: { name: "tables" },
};

export const AxisPlane = {
	floor: { xz: "xz", xyz: "xyz" },
	wall: { zy: "zy", xy: "xy" },
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
	constructor(name, size, category, color, movableAxis, collidable = true) {
		// console.log(size);
		this.name = name;
		this.size = size;
		this.category = category;
		this.color = color;
		this.axis = movableAxis;
		this.collidable = collidable;
	}
}

export class Item extends Model {
	constructor(model, index) {
		super(
			model.name,
			model.size,
			model.category,
			model.color,
			model.axis,
			model.collidable
		);
		this.index = index;
		this.rotation = 2;
		console.log(this.axis);
		this.position = this.axis.onFloor()
			? { x: 5, y: -0.25, z: -5 }
			: { x: 5, y: 5, z: 0.25 };
	}

	placeItem(position, rotation, color) {
		this.position = position;
		this.rotation = rotation;
		this.color = color;
	}

	getSize(rotation) {
		if (rotation === 1 || rotation === 3) {
			return { x: this.size.z, z: this.size.x, y: this.size.y };
		}
		return this.size;
	}
}

const Models = {
	chairAWood: new Model(
		"chairAWood",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		null,
		new MovableAxis(true, false, true)
	),
	chairA: new Model(
		"chairA",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	chairBWood: new Model(
		"chairBWood",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		null,
		new MovableAxis(true, false, true)
	),
	chairB: new Model(
		"chairB",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	chairC: new Model(
		"chairC",
		{ x: 1, z: 1, y: 1 },
		Categories.chairs,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	chairStool: new Model(
		"chairStool",
		{ x: 1, z: 1, y: 0.5 },
		Categories.chairs,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	chairStoolWood: new Model(
		"chairStoolWood",
		{ x: 1, z: 1, y: 0.5 },
		Categories.chairs,
		null,
		new MovableAxis(true, false, true)
	),
	bedDoubleA: new Model(
		"bedDoubleA",
		{ x: 3, z: 3, y: 1 },
		Categories.beds,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	bedDoubleB: new Model(
		"bedDoubleB",
		{ x: 3, z: 3, y: 1 },
		Categories.beds,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	bedSingleA: new Model(
		"bedSingleA",
		{ x: 1, z: 3, y: 1 },
		Categories.beds,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	bedSingleB: new Model(
		"bedSingleB",
		{ x: 1, z: 3, y: 1 },
		Categories.beds,
		"#87BEE9",
		new MovableAxis(true, false, true)
	),
	rugRectangleStripes: new Model(
		"rugRectangleStripes",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		"#DFB76B",
		new MovableAxis(true, false, true),
		false
	),
	rugRectangle: new Model(
		"rugRectangle",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		"#DFB76B",
		new MovableAxis(true, false, true),
		false
	),
	rugOval: new Model(
		"rugOval",
		{ x: 3, z: 2, y: 0 },
		Categories.rugs,
		"#DFB76B",
		new MovableAxis(true, false, true),
		false
	),
	cabinetSmall: new Model(
		"cabinetSmall",
		{ x: 1, z: 1, y: 1 },
		Categories.tables,
		"#CEA879",
		new MovableAxis(true, false, true)
	),
	cabinetMedium: new Model(
		"cabinetMedium",
		{ x: 2, z: 1, y: 1 },
		Categories.tables,
		"#CEA879",
		new MovableAxis(true, false, true)
	),
	shelfBLarge: new Model(
		"shelfBLarge",
		{ x: 2, z: 0.5, y: 0.5 },
		Categories.tables,
		"#CEA879",
		new MovableAxis(true, true, false)
	),
	shelfALarge: new Model(
		"shelfALarge",
		{ x: 2, z: 0.5, y: 0.5 },
		Categories.tables,
		"#CEA879",
		new MovableAxis(true, true, false)
	),
	shelfBSmall: new Model(
		"shelfBSmall",
		{ x: 1, z: 0.5, y: 0.5 },
		Categories.tables,
		"#CEA879",
		new MovableAxis(true, true, false)
	),
	shelfASmall: new Model(
		"shelfASmall",
		{ x: 1, z: 0.5, y: 0.5 },
		Categories.tables,
		"#CEA879",
		new MovableAxis(true, true, false)
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
