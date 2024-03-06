import tinycolor from "tinycolor2";
import * as THREE from "three";

export const ColorMaterialAccent = (scene, color, name) => {
	const colorTiny = tinycolor(color);
	const colorAccent = getAccentColor(colorTiny);

	scene.traverse((child) => {
		if (child.name === `${name}_colour`) {
			const clonedMaterialColorAccent = child.material.clone();
			clonedMaterialColorAccent.color.set(new THREE.Color(color));
			child.material = clonedMaterialColorAccent;
		}
		if (child.name === `${name}_colourAccent`) {
			const clonedMaterialColorAccent = child.material.clone();
			clonedMaterialColorAccent.color.set(new THREE.Color(colorAccent));
			child.material = clonedMaterialColorAccent;
		}
	});
};

export const ColorMaterial = (scene, colors, name) => {
	// const colorTiny = tinycolor(color);

	// const colorAccent = getAccentColor(colorTiny);

	const letters = ["A", "B", "C"];

	colors.forEach((color, index) => {
		scene.traverse((child) => {
			if (child.name === `${name}_colour${letters[index]}`) {
				const clonedMaterialColor = child.material.clone();
				clonedMaterialColor.color.set(new THREE.Color(color));
				clonedMaterialColor.flatShading = true;
				child.material = clonedMaterialColor;
			}
		});
	});

	// scene.traverse((child) => {
	// 	if (child.name === `${name}_colourA`) {
	// 		const clonedMaterialColor = child.material.clone();
	// 		clonedMaterialColor.color.set(new THREE.Color(color));
	// 		child.material = clonedMaterialColor;
	// 	}
	// 	if (child.name === `${name}_colourB`) {
	// 		const clonedMaterialColorAccent = child.material.clone();
	// 		clonedMaterialColorAccent.color.set(new THREE.Color(colorAccent));
	// 		child.material = clonedMaterialColorAccent;
	// 	}
	// 	if (child.name === `${name}_colourC`) {
	// 		const clonedMaterialBase = child.material.clone();
	// 		clonedMaterialBase.color.set(new THREE.Color(baseColor));
	// 		child.material = clonedMaterialBase;
	// 	}
	// });
};

function getAccentColor(color) {
	if (color.getBrightness() < 20 || color.getLuminance() < 0.2) {
		return color.brighten(20).lighten(25).toString("hex");
	} else {
		return color.darken(10).desaturate(10).toString("hex");
	}
}
