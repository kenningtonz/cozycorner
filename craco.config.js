const path = require("path");
module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@state": path.resolve(__dirname, "src/state"),
			"@data": path.resolve(__dirname, "src/data"),
			"@components": path.resolve(__dirname, "src/components"),
			"@ui": path.resolve(__dirname, "src/components/ui"),
			"@gameStore": path.resolve(__dirname, "src/state/store"),
			"@icons": path.resolve(__dirname, "src/components/icons"),
		},
	},
};
