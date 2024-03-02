import tinycolor from "tinycolor2";
import * as THREE from "three";

const ColorMaterial = (scene, color, name, baseColor) => {
	const colorThreeHex = tinycolor(color.getHexString());

	// console.log(colorMono);
	// console.log(colorThreeHex.getLuminance(), colorThreeHex.getBrightness());
	let newColor;
	if (colorThreeHex.getBrightness() < 20 || colorThreeHex.getLuminance() < 0.2) {
		newColor = colorThreeHex.brighten(20).lighten(25).toString("hex");
	} else {
		newColor = colorThreeHex.darken(10).desaturate(10).toString("hex");
	}

	const colorAccent = new THREE.Color(newColor);

	scene.traverse((child) => {
		if (child.name === `${name}_colour`) {
			const clonedMaterialColor = child.material.clone();
			clonedMaterialColor.color.set(color);
			child.material = clonedMaterialColor;
		}
		if (child.name === `${name}_colourAccent`) {
			const clonedMaterialColorAccent = child.material.clone();
			clonedMaterialColorAccent.color.set(colorAccent);
			child.material = clonedMaterialColorAccent;
		}
		if (child.name === `${name}_base`) {
			const clonedMaterialBase = child.material.clone();
			clonedMaterialBase.color.set(new THREE.Color(baseColor));
			child.material = clonedMaterialBase;
		}
	});
};

export default ColorMaterial;
