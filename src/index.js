import { createRoot } from "react-dom/client";
import { Game } from "./components/Game";
import { Home } from "./pages/home";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { UI } from "./components/UI";
import { MusicManager } from "./components/AudioManager";
import "./output.css";

import { models } from "./data/models";

import { useGameStore } from "./state/store";
import { Preload, useGLTF, useProgress, Html } from "@react-three/drei";

Object.values(models.getItems())
	.map((model) => {
		return `/models/${model.name}.glb`;
	})
	.forEach(useGLTF.preload);

[
	"/models/environment/walls.glb",
	"/models/environment/floor.glb",
	"/models/environment/beach.glb",
	"/models/environment/snow.glb",
	"/models/environment/desert.glb",
].forEach(useGLTF.preload);

function Loader() {
	const { progress } = useProgress();
	return (
		<Html wrapperClass='w-dvh h-dvh rainbowAnimated' fullscreen center>
			{progress} % loaded
		</Html>
	);
}

function App() {
	const page = useGameStore((state) => state.page);
	return (
		<>
			{page === "home" ? (
				<Home />
			) : (
				<>
					<MusicManager />
					<Canvas
						gl={{ preserveDrawingBuffer: true }}
						shadows
						camera={{ position: [30, 10, -30], fov: 30 }}
					>
						<Suspense fallback={<Loader />}>
							<Game />
							<Preload all />
						</Suspense>
					</Canvas>
					<UI />
				</>
			)}
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
