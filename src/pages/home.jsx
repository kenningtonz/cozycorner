import { startGame, useGameStore } from "../state/store";
import { motion } from "framer-motion";
import Credits from "@components/Credits";
import PopUp from "@components/PopUp";

import { useEffect, useState } from "react";

export const Home = () => {
	const [popUp, setPopUp] = useState(false);

	const localExists = useGameStore((state) => state.localExists);
	return (
		<main className='flex flex-col items-center justify-center h-screen gap-4 '>
			<h1 className='text-6xl'>Comfort Corner</h1>

			<motion.button
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => startGame(false)}
				className=' rainbowBorder text-3xl rounded-lg  px-4 hover: '
			>
				<div className='rainbowInner py-2 px-4'>New Corner</div>
			</motion.button>
			{localExists && (
				<motion.button
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => startGame(true)}
					className=' rainbowBorder text-2xl rounded-lg  px-4 hover: '
				>
					<div className='rainbowInner py-1 px-3'>Load From Local</div>
				</motion.button>
			)}

			<motion.button
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setPopUp(true)}
				className=' rainbowBorder text-2xl rounded-lg  px-4 self-jusify-end '
			>
				<div className='rainbowInner py-1 px-3'>Credits</div>
			</motion.button>

			<PopUp isOpen={popUp} setIsOpen={setPopUp}>
				<Credits />
			</PopUp>
		</main>
	);
};
