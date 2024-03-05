import { PopoverPicker } from "@components/PopoverColourPicker.jsx";
import { Joystick, JoystickShape } from "@components/joystick/index.tsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
// import { SoundEffect } from "@components/AudioManager";
import {
	faRotateRight,
	faRotateLeft,
	faTrashCan,
	faPalette,
	faPaintRoller,
	faSwatchbook,
} from "@fortawesome/free-solid-svg-icons";
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
import { SoundEffectManager } from "@components/AudioManager";

const InsideUI = () => {
	const selectedId = useGameStore((state) => state.selectedId);

	const setBuildingColor = useGameStore((state) => state.setBuildingColor);
	const buildingColor = useGameStore((state) => state.map.buildingColor);
	const setFloorColor = useGameStore((state) => state.setFloorColor);
	const floorColor = useGameStore((state) => state.map.floorColor);

	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"itemsUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder pointer-events-auto '
		>
			<div className='flex rainbowInner gap-4 items-stretch p-4 '>
				{selectedId != null ? <SelectedUI selectedId={selectedId} /> : <ItemsUI />}
				<div className='line'></div>
				<div className='flex flex-col justify-between'>
					<PopoverPicker
						icon={faPaintRoller}
						onChange={setBuildingColor}
						color={buildingColor}
					/>
					<PopoverPicker
						icon={faHouse}
						onChange={setFloorColor}
						color={floorColor}
					/>
				</div>
			</div>
		</motion.section>
	);
};

const SelectedUI = ({ selectedId }) => {
	const { moveSound, rotateSound, placeSound, errorSound, trashSound } =
		SoundEffectManager();
	const item = useGameStore((state) =>
		state.items.find((item) => item.id === selectedId)
	);

	function cleanup() {
		document.removeEventListener("keypress", handleKeyPress);
	}

	useEffect(() => {
		document.addEventListener("keypress", handleKeyPress);
		return cleanup;
	}, []);

	function handleKeyPress(e) {
		if (e.key === "w") {
			moveSelected(0, 0.5, item);
			moveSound();
		}
		if (e.key === "s") {
			moveSelected(0, -0.5, item);
			moveSound();
		}
		if (e.key === "a") {
			moveSelected(0.5, 0, item);
			moveSound();
		}
		if (e.key === "d") {
			moveSelected(-0.5, 0, item);
			moveSound();
		}
		if (e.key === "q") {
			rotateSelected(1, item);
			rotateSound();
		}
		if (e.key === "e") {
			rotateSelected(-1, item);
			rotateSound();
		}
		if (e.key === " ") {
			placeSelected(item);
			item.tempCanDrop ? placeSound() : errorSound();
		}
		if (e.key === "x") {
			removeSelected(item);
			trashSound();
		}
	}
	function handleMove(e) {
		const x = e.x;
		const y = e.y;
		moveSelected(-Math.round(x * 2), Math.round(y * 2), item);
		moveSound();
	}
	return (
		<section className='flex gap-1 space-x-4 justify-self-end '>
			<div className='min-w-[200px] flex gap-2 rounded-lg '>
				<div className='grid gap-2 '>
					<button
						onClick={() => {
							rotateSelected(1, item);
							rotateSound();
						}}
						className=' col-span-1 w-12 h-12 btn bg-black/5 hover:bg-white/40 '
					>
						<FontAwesomeIcon icon={faRotateLeft} />
					</button>
					<button
						onClick={() => {
							rotateSelected(-1, item);
							rotateSound();
						}}
						className=' col-span-1  w-12 h-12 btn bg-black/5 hover:bg-white/40'
					>
						<FontAwesomeIcon icon={faRotateRight} />
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
								placeSelected(item);
								item.tempCanDrop ? placeSound() : errorSound();
							}
						}}
						className='btn row-span-2 col-span-2 green'
					>
						Place
					</button>

					<button
						onClick={() => {
							removeSelected(item);
							trashSound();
						}}
						className=' iconBtn red '
					>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>

					{item.tempCol.length > 0
						? item.tempCol.map((col, index) => {
								return (
									<PopoverPicker
										icon={faPalette}
										onChange={(e) => colorSelected(e, index)}
										color={col}
									/>
								);
						  })
						: null}
				</div>
			</div>
			{/* <DPad move={moveSelected} rotate={rotateSelected} place={placeSelected} /> */}
		</section>
	);
};

export default InsideUI;
