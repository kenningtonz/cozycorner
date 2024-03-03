import { PopoverPicker } from "@components/PopoverColourPicker.jsx";
import { Joystick, JoystickShape } from "@components/joystick/index.tsx";
import { motion } from "framer-motion";
import Icon from "@components/Icon";
// import { SoundEffect } from "@components/AudioManager";

import useSound from "use-sound";

import { useGameStore } from "@gameStore";
import {
	placeSelected,
	removeSelected,
	colorSelected,
	moveSelected,
	rotateSelected,
} from "@state/selectedStoreFunctions";

import ItemsUI from "@ui/ItemsUI";
import { useEffect } from "react";

const InsideUI = () => {
	const selected = useGameStore((state) => state.selected);
	const setBaseColor = useGameStore((state) => state.setBaseColor);

	const baseColor = useGameStore((state) => state.map.baseColor);
	const setBuildingColor = useGameStore((state) => state.setBuildingColor);
	const buildingColor = useGameStore((state) => state.map.buildingColor);

	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"itemsUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder pointer-events-auto '
		>
			<div className='flex rainbowInner gap-4 items-stretch '>
				{selected.item !== null ? <SelectedUI selected={selected} /> : <ItemsUI />}
				<div className='line'></div>
				<div className='flex flex-col justify-between'>
					<PopoverPicker
						iconName={"House"}
						onChange={setBaseColor}
						color={baseColor}
					/>
					<PopoverPicker
						iconName={"House"}
						onChange={setBuildingColor}
						color={buildingColor}
					/>
				</div>
			</div>
		</motion.section>
	);
};

const SelectedUI = ({ selected }) => {
	const [placeSound] = useSound("/soundEffects/placeItem.mp3");
	const [errorSound] = useSound("/soundEffects/error.mp3");
	useEffect(() => {
		document.addEventListener("keypress", handleKeyPress);
	}, []);

	function handleKeyPress(e) {
		// document.removeEventListener('keypress',handleKeyPress);
		if (e.key === "w") {
			moveSelected(0, 0.5);
		}
		if (e.key === "s") {
			moveSelected(0, -0.5);
		}
		if (e.key === "a") {
			moveSelected(0.5, 0);
		}
		if (e.key === "d") {
			moveSelected(-0.5, 0);
		}
		if (e.key === "q") {
			rotateSelected(1, selected);
		}
		if (e.key === "e") {
			rotateSelected(-1, selected);
		}
		if (e.key === " ") {
			placeSelected();
		}
		if (e.key === "x") {
			removeSelected();
		}
	}
	function handleMove(e) {
		const x = e.x;
		const y = e.y;
		moveSelected(-Math.round(x * 2), Math.round(y * 2));
	}
	return (
		<section className='flex gap-1 space-x-4 justify-self-end '>
			<div className='min-w-[200px] flex gap-2 rounded-lg '>
				<div className='grid gap-2 '>
					<button
						onClick={() => rotateSelected(1, selected)}
						className=' col-span-1 w-12 h-12 btn bg-black/5 hover:bg-white/40 '
					>
						<Icon name={"RotateLeft"} />
					</button>
					<button
						onClick={() => rotateSelected(-1, selected)}
						className=' col-span-1  w-12 h-12 btn bg-black/5 hover:bg-white/40'
					>
						<Icon name={"RotateRight"} />
					</button>
					<Joystick
						baseClassName={`col-span-2 bg-white/50 `}
						stickClassName={`bg-black`}
						baseShape={JoystickShape.Square}
						size={100}
						stickSize={50}
						throttle={100}
						move={(e) => handleMove(e)}
					></Joystick>
				</div>

				<div className='grid gap-2 '>
					<button
						onClick={() => {
							{
								placeSelected();
								selected.canDrop ? placeSound() : errorSound();
							}
						}}
						className='btn row-span-2 col-span-2 green'
					>
						Place
					</button>

					<button onClick={removeSelected} className=' iconBtn red '>
						X
					</button>

					{selected.color !== null ? (
						<PopoverPicker
							iconName={"Droplet"}
							onChange={colorSelected}
							color={selected.color}
						/>
					) : null}
				</div>
			</div>
			{/* <DPad move={moveSelected} rotate={rotateSelected} place={placeSelected} /> */}
		</section>
	);
};

export default InsideUI;
