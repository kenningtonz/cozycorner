import { createRoot } from "react-dom/client";
import { Game } from "./components/Game";
import { useShallow } from "zustand/react/shallow";
import { Home } from "./pages/home";
import { Suspense, useEffect } from "react";
import { Physics } from "@react-three/rapier";
import { Canvas } from "@react-three/fiber";
import { UI } from "./components/UI";
import * as THREE from "three";

import "./output.css";

import { useGameStore } from "./store";

function App() {
	const page = useGameStore((state) => state.page);
	const map = useGameStore((state) => state.map);

	return (
		<>
			{page === "home" ? (
				<Home />
			) : (
				<>
					<Canvas
						// gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}

						shadows
						camera={{ position: [30, 10, -30], fov: 30 }}
					>
						<Game map={map} />
					</Canvas>
					<UI map={map} />
				</>
			)}
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
