import { useGameStore, saveUserData, createScreenshot } from "@gameStore";
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
	faDownload,
} from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import EnvironmentUI from "@ui/EnvironmentUI";
import InsideUI from "@ui/InsideUI";
import MusicUI from "@ui/MusicUI";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PopUp from "./PopUp";

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

const ViewUI = ({ sound }) => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"envUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder pointer-events-auto '
		>
			<div className=' rainbowInner flex items-center gap-4 p-4'>
				<motion.button
					onClick={() => {
						sound();
						createScreenshot();
					}}
					// whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`iconBtn green relative`}
				>
					<FontAwesomeIcon size='xl' icon={faDownload} />
				</motion.button>
				<motion.button
					onClick={() => {
						sound();
						saveUserData();
					}}
					// whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`iconBtn green relative`}
				>
					<FontAwesomeIcon size='xl' icon={faFloppyDisk} />
				</motion.button>
			</div>
		</motion.section>
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
