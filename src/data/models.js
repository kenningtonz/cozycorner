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

class Model {
	constructor(name, size, category, color, axis, collidable = true) {
		console.log(size);
		this.name = name;
		this.size = size;
		// this.size = {
		// 	l: size.l,
		// 	w: size.w,
		// 	h: size.h,
		// };
		this.category = category;
		this.color = color;
		this.axis = axis;
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
		this.position = this.axis == "floor" ? [0, -0.25, 0] : [5, 5, 0];
		console.log(this.size);
	}

	placeItem(position, rotation, color) {
		this.position = position;
		this.rotation = rotation;
		this.color = color;
	}

	getWidth(rotation) {
		if (rotation === 1 || rotation === 3) {
			return this.size.l;
		}
		return this.size.w;
	}

	getLength(rotation) {
		console.log(this.size.w);
		if (rotation === 1 || rotation === 3) {
			return this.size.w;
		}
		return this.size.l;
	}
}

const Models = {
	chairAWood: new Model(
		"chairAWood",
		{ l: 1, w: 1, h: 1 },
		Categories.chairs,
		null,
		"floor"
	),
	chairA: new Model("chairA", [1, 1, 1], Categories.chairs, "#87BEE9", "floor"),
	chairBWood: new Model(
		"chairBWood",
		{ l: 1, w: 1, h: 1 },
		Categories.chairs,
		null,
		"floor"
	),
	chairB: new Model(
		"chairB",
		{ l: 1, w: 1, h: 1 },
		Categories.chairs,
		"#87BEE9",
		"floor"
	),
	chairC: new Model(
		"chairC",
		{ l: 1, w: 1, h: 1 },
		Categories.chairs,
		"#87BEE9",
		"floor"
	),
	chairStool: new Model(
		"chairStool",
		{ l: 1, w: 0.5, h: 1 },
		Categories.chairs,
		"#87BEE9",
		"floor"
	),
	chairStoolWood: new Model(
		"chairStoolWood",
		{ l: 1, w: 0.5, h: 1 },
		Categories.chairs,
		null,
		"floor"
	),
	bedDoubleA: new Model(
		"bedDoubleA",

		{ l: 3, w: 1, h: 3 },
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	bedDoubleB: new Model(
		"bedDoubleB",
		{ l: 3, w: 1, h: 3 },
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	bedSingleA: new Model(
		"bedSingleA",
		{ l: 1, w: 1, h: 3 },
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	bedSingleB: new Model(
		"bedSingleB",
		{ l: 1, w: 1, h: 3 },
		Categories.beds,
		"#87BEE9",
		"floor"
	),
	rugRectangleStripesB: new Model(
		"rugRectangleStripesB",
		{ l: 3, w: 0, h: 2 },
		Categories.rugs,
		"#87BEE9",
		"floor",
		false
	),
	cabinetSmall: new Model(
		"cabinetSmall",
		{ l: 1, w: 1, h: 1 },
		Categories.tables,
		"#CEA879",
		"floor"
	),
	cabinetMedium: new Model(
		"cabinetMedium",
		{ l: 2, w: 1, h: 1 },
		Categories.tables,
		"#CEA879",
		"floor"
	),
	shelfBLarge: new Model(
		"shelfBLarge",
		{ l: 2, w: 0.5, h: 0.5 },

		Categories.tables,
		"#CEA879",
		"wall"
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
