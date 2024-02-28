import { useGLTF } from "@react-three/drei";
import { BedDoubleA } from "./models/bedDoubleA";
export const items = {
	// chairAWood: { name: "chairAWood", size: [1, 1], category: "seating" },
	// chairBWood: { name: "chairBWood", size: [1, 1], category: "seating" },
	bedDoubleA: {
		model: BedDoubleA,
		name: "bedDoubleA",
		size: [3, 3],
		category: "beds",
		texture: "furniture_texture.007",
	},
};

export const Categories = {
	seating: { name: "seating" },
	beds: { name: "beds" },
};

export const environments = [
	{
		index: 0,
		name: "default",
		color: "white",
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
