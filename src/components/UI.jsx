import { useGameStore, saveMap } from "@gameStore";

import EnvironmentUI from "@ui/EnvironmentUI";
import InsideUI from "@ui/InsideUI";
import MusicUI from "@ui/MusicUI";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import useSound from "use-sound";

import Icon from "@components/Icon";

export const UI = ({ map }) => {
	const [confirmationSound] = useSound("/soundEffects/confirmation.mp3");
	const [clickSound] = useSound("/soundEffects/click.mp3", { volume: 0.5 });
	const [questionSound] = useSound("/soundEffects/question.mp3");
	const goToHome = useGameStore((state) => state.goToHome);
	const gameState = useGameStore((state) => state.gameState);
	const setGameState = useGameStore((state) => state.setGameState);

	//hide ui button
	//save button
	//gamestates
	//environment
	//music
	//wallpaper
	//floors
	console.log(gameState);
	return (
		<main className='absolute top-0 inset-4 flex flex-col pointer-events-none justify-between items-center overflow-hidden'>
			<section className=' p-4 pointer-events-auto self-start justify-self-start w-full'>
				<span className='flex w-full justify-between '>
					<ButtonToolTip
						text={<Icon name={"Back"} />}
						onClick={goToHome}
						sound={questionSound}
						className='red'
						toolTipText='Back to Home'
					/>
					<div className='flex  gap-2'>
						<button
							onClick={() => {
								clickSound();
								gameState != "music" ? setGameState("music") : setGameState(null);
							}}
							className='uiBtn'
							data-active={gameState == "music"}
						>
							<Icon name={"Music"} size={32} />
							<p className='text-sm'>Music</p>
						</button>
						<button
							onClick={() => {
								clickSound();
								gameState != "outside" ? setGameState("outside") : setGameState(null);
							}}
							className='uiBtn'
							data-active={gameState == "outside"}
						>
							<Icon name={"House"} size={32} />
							<p className='text-sm'>Outside</p>
						</button>
						<button
							onClick={() => {
								clickSound();
								gameState != "inside" ? setGameState("inside") : setGameState(null);
							}}
							className='uiBtn'
							data-active={gameState == "inside"}
						>
							Inside
						</button>
						<button
							onClick={() => {
								clickSound();
								gameState != "view" ? setGameState("view") : setGameState(null);
							}}
							className='uiBtn'
							data-active={gameState == "view"}
						>
							View
						</button>
					</div>
					<ButtonToolTip
						text={<Icon name={"Save"} />}
						onClick={() => {
							saveMap(map);
						}}
						sound={confirmationSound}
						className='green'
						toolTipText='Save Corner'
					/>
				</span>
			</section>

			<section className='flex items-center justify-center self-end justify-self-end w-full opacity-60 hover:opacity-100 transition'>
				<AnimatePresence>
					{gameState === "inside" ? <InsideUI /> : null}
					{gameState === "music" ? <MusicUI /> : null}
					{gameState === "outside" ? <EnvironmentUI /> : null}
				</AnimatePresence>
			</section>
		</main>
	);
};

//credits
const ToolTip = ({ text }) => {
	return (
		<div className='absolute sm:top-3 w-32 sm:left-14 top-14 h-6 bg-white/80 rounded-md'>
			<p className=''> {text}</p>
		</div>
	);
};

const ButtonToolTip = ({ text, onClick, className, toolTipText, sound }) => {
	const [showToolTip, setShowToolTip] = useState(false);

	return (
		<motion.button
			onClick={() => {
				onClick();
				sound();
			}}
			// whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onHoverStart={() => {
				setShowToolTip(true);
			}}
			onHoverEnd={() => {
				setShowToolTip(false);
			}}
			className={`iconBtn ${className} relative`}
		>
			{text}

			{showToolTip && <ToolTip text={toolTipText} />}
		</motion.button>
	);
};
