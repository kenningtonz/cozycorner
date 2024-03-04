import { useGameStore, saveMap } from "@gameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMusic,
	faFloppyDisk,
	faHouse,
	faEarthAmericas,
	faDeleteLeft,
	faVolumeXmark,
	faEye,
} from "@fortawesome/free-solid-svg-icons";

import EnvironmentUI from "@ui/EnvironmentUI";
import InsideUI from "@ui/InsideUI";
import MusicUI from "@ui/MusicUI";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PopUp from "./PopUp";
import useSound from "use-sound";

export const UI = ({ map }) => {
	const [soundMuted, setSoundMuted] = useState(false);
	const [confirmationSound] = useSound("/soundEffects/confirmation.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [clickSound] = useSound("/soundEffects/click.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [questionSound] = useSound("/soundEffects/question.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [changeMusic] = useSound("/soundEffects/changeMusic.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const goToHome = useGameStore((state) => state.goToHome);
	const gameState = useGameStore((state) => state.gameState);
	const setGameState = useGameStore((state) => state.setGameState);

	const [popUp, setPopUp] = useState(false);

	//hide ui button
	//save button
	//gamestates
	//environment
	//music

	//floors
	console.log(gameState);
	return (
		<main className='absolute top-0 inset-4 flex flex-col pointer-events-none justify-between items-center overflow-hidden'>
			<section
				className={` p-4 ${
					popUp ? `pointer-events-non` : `pointer-events-auto`
				} self-start justify-self-start w-full`}
			>
				<div className=' flex w-full justify-between '>
					{/* <ButtonToolTip
						text={<Icon name={"Back"} />}
						onClick={() => setPopUp(true)}
						sound={questionSound}
						className='red'
						toolTipText='Back to Home'
					/> */}
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
						setSoundMuted(!soundMuted);
						clickSound();
					}}
					whileTap={{ scale: 0.95 }}
					className={`iconBtn relative cursor-pointer pointer-events-auto`}
				>
					<FontAwesomeIcon size='xl' icon={faVolumeXmark} />
				</motion.button>
			</section>
			<PopUp isOpen={popUp} setIsOpen={setPopUp}>
				<>
					<p>Are you sure you want to go back to the home screen?</p>
					<p>This will reset your corner.</p>
					<div className='flex gap-4'>
						<button
							onClick={() => {
								goToHome();
								setPopUp(false);
							}}
							className='uiBtn'
						>
							Yes
						</button>
						<button
							onClick={() => {
								setPopUp(false);
							}}
							className='uiBtn'
						>
							No
						</button>
					</div>
				</>
			</PopUp>
			<section
				className={`flex items-center justify-center self-end justify-self-end w-full  transition ${
					popUp ? `pointer-events-non` : `pointer-events-auto`
				} `}
			>
				{/* <AnimatePresence> */}
				{gameState === "inside" ? <InsideUI /> : null}
				{gameState === "music" ? <MusicUI changeMusic={changeMusic} /> : null}
				{gameState === "outside" ? <EnvironmentUI /> : null}
				{/* </AnimatePresence> */}
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
