//https://codesandbox.io/p/sandbox/react-three-fiber-creating-a-sky-box-and-reflections-6izyu?file=%2Fsrc%2FApp.js%3A38%2C1-55%2C2
// Loads the skybox texture and applies it to the scene.

function SkyBox({ texture }) {
	const { scene } = useThree();
	const loader = new CubeTextureLoader();
	// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	const texture = loader.load([
		"/1.jpg",
		"/2.jpg",
		"/3.jpg",
		"/4.jpg",
		"/5.jpg",
		"/6.jpg",
	]);

	// Set the scene background property to the resulting texture.
	scene.background = texture;
	return null;
}
