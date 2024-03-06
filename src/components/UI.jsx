import { useGameStore, saveUserData } from "@gameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMusic,
	faFloppyDisk,
	faHouse,
	faEarthAmericas,
	faDeleteLeft,
	faVolumeXmark,
	faVolumeHigh,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import EnvironmentUI from "@ui/EnvironmentUI";
import InsideUI from "@ui/InsideUI";
import MusicUI from "@ui/MusicUI";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PopUp from "./PopUp";

import ViewUI from "@ui/ViewUI";

export const UI = () => {
	const gameState = useGameStore((state) => state.gameState);
	const setGameState = useGameStore((state) => state.setGameState);
	const goToHome = useGameStore((state) => state.goToHome);
	const setMuted = useGameStore((state) => state.setMuted);
	const soundMuted = useGameStore((state) => state.muted);
	const [clickSound] = useSound("/soundEffects/click.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [confirmationSound] = useSound("/soundEffects/confirmation.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [questionSound] = useSound("/soundEffects/question.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [selectSound] = useSound("/soundEffects/select.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [popUp, setPopUp] = useState(false);

	//floors
	console.log("ui rereender");
	return (
		<main className='absolute top-0 inset-4 flex flex-col pointer-events-none justify-between items-center overflow-hidden'>
			<section
				className={` p-4 ${
					popUp ? `pointer-events-non` : `pointer-events-auto`
				} self-start justify-self-start w-full`}
			>
				<div className=' flex w-full justify-between '>
					<motion.button
						onClick={() => {
							setPopUp(true);
							questionSound();
						}}
						// whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`iconBtn red relative`}
					>
						<FontAwesomeIcon size='xl' icon={faDeleteLeft} />
					</motion.button>

					<div className='rainbowBorder '>
						<div className='flex  rainbowInner p-1 gap-2'>
							<button
								onClick={() => {
									clickSound();
									gameState != "music" ? setGameState("music") : setGameState(null);
								}}
								className='uiBtn'
								data-active={gameState == "music"}
							>
								<FontAwesomeIcon size='2xl' icon={faMusic} />
								{/* <Icon name={"Music"} size={32} /> */}
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
								<FontAwesomeIcon size='2xl' icon={faEarthAmericas} />
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
								<FontAwesomeIcon size='2xl' icon={faHouse} />
								<p className='text-sm'>Inside</p>
							</button>
							<button
								onClick={() => {
									clickSound();
									gameState != "view" ? setGameState("view") : setGameState(null);
								}}
								className='uiBtn'
								data-active={gameState == "view"}
							>
								<FontAwesomeIcon size='2xl' icon={faEye} />
								<p className='text-sm'>View</p>
							</button>
						</div>
					</div>
					<motion.button
						onClick={() => {
							confirmationSound();
							saveUserData();
						}}
						// whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`iconBtn green relative`}
					>
						<FontAwesomeIcon size='xl' icon={faFloppyDisk} />
					</motion.button>
				</div>
				<motion.button
					onClick={() => {
						setMuted(!soundMuted);
						clickSound();
					}}
					whileTap={{ scale: 0.95 }}
					className={`iconBtn relative cursor-pointer pointer-events-auto`}
				>
					<FontAwesomeIcon
						size='xl'
						icon={soundMuted ? faVolumeXmark : faVolumeHigh}
					/>
				</motion.button>
			</section>
			<PopUp isOpen={popUp} setIsOpen={setPopUp}>
				<>
					<p className='text-center text-xl font-bold '>
						Are you sure you want to go back to the home screen?
					</p>
					<p className='text-center text-lg'>
						If you haven't saved this will reset your corner.
					</p>
					<div className='flex my-2 gap-4 justify-center'>
						<button
							onClick={() => {
								goToHome();
								setPopUp(false);
							}}
							className='btn red px-4 py-2'
						>
							Back to Home
						</button>
						<button
							onClick={() => {
								setPopUp(false);
							}}
							className='btn green px-4 py-2'
						>
							Stay in Corner
						</button>
					</div>
				</>
			</PopUp>
			<section
				className={`flex items-center justify-center self-end justify-self-end w-full  transition ${
					popUp ? `pointer-events-none` : ``
				} `}
			>
				{/* <AnimatePresence> */}
				{gameState === "inside" ? <InsideUI muted={soundMuted} /> : null}
				{gameState === "music" ? <MusicUI selectSound={selectSound} /> : null}
				{gameState === "outside" ? (
					<EnvironmentUI selectSound={selectSound} />
				) : null}
				{gameState === "view" ? <ViewUI sound={confirmationSound} /> : null}
				{/* </AnimatePresence> */}
			</section>
		</main>
	);
};
