import { startGame, useGameStore } from "../state/store";
import { motion } from "framer-motion";
import Credits from "@components/Credits";
import PopUp from "@components/PopUp";

import useSound from "use-sound";
import { useState } from "react";

export const Home = () => {
	const [popUp, setPopUp] = useState(false);

	const [clickSound] = useSound("/soundEffects/click.mp3", {
		volume: 0.5,
	});
	const localExists = useGameStore((state) => state.localExists);

	// console.log("home rerender");

	return (
		<main className='flex flex-col items-center justify-center h-screen gap-4 rainbowAnimated '>
			<img src='/logo.png' alt='comfort corner logo' width={200} height={200} />
			<h1 className=' text-center text-6xl mb-4'>Comfort Corner</h1>
			<motion.button
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => {
					startGame(false);
					clickSound();
				}}
				className=' py-2 px-4 text-3xl rounded-lg shadow-md bg-white/50 hover:bg-white/90 '
			>
				New Corner
			</motion.button>
			{localExists && (
				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => {
						startGame(true);
						clickSound();
					}}
					className=' py-2 px-4 text-3xl rounded-lg shadow-md bg-white/50 hover:bg-white/90'
				>
					Load From Local
				</motion.button>
			)}

			<motion.button
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => {
					setPopUp(true);
					clickSound();
				}}
				className='  py-2 px-4 text-3xl rounded-lg shadow-md bg-white/50 hover:bg-white/90 self-justify-end '
			>
				Credits
			</motion.button>

			<PopUp isOpen={popUp} setIsOpen={setPopUp}>
				<Credits />
			</PopUp>
		</main>
	);
};
