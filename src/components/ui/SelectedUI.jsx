import { useEffect } from "react";
import { useGameStore } from "@gameStore";
import {
	placeSelected,
	removeSelected,
	colorSelected,
	moveSelected,
	rotateSelected,
} from "@state/selectedStoreFunctions";
import { Joystick, JoystickShape } from "@components/joystick/index.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRotateRight,
	faRotateLeft,
	faTrashCan,
	faPalette,
} from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import { PopoverPicker } from "@components/PopoverColourPicker.jsx";

const SelectedUI = ({ selectedId, muted }) => {
	const item = useGameStore((state) =>
		state.items.find((item) => item.id === selectedId)
	);

	const [moveSound] = useSound("/soundEffects/move.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [rotateSound] = useSound("/soundEffects/rotate.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [placeSound] = useSound("/soundEffects/place.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [errorSound] = useSound("/soundEffects/error.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [trashSound] = useSound("/soundEffects/trash.mp3", {
		volume: muted ? 0 : 0.5,
	});

	function cleanup() {
		document.removeEventListener("keypress", handleKeyPress);
	}

	useEffect(() => {
		document.addEventListener("keypress", handleKeyPress);
		return cleanup;
	}, []);

	function handleKeyPress(e) {
		if (e.key === "w") {
			moveSound();
			moveSelected(0, 0.5, item);
		}
		if (e.key === "s") {
			moveSound();
			moveSelected(0, -0.5, item);
		}
		if (e.key === "a") {
			moveSound();
			moveSelected(0.5, 0, item);
		}
		if (e.key === "d") {
			moveSound();
			moveSelected(-0.5, 0, item);
		}
		if (e.key === "q") {
			rotateSound();
			rotateSelected(1, item);
		}
		if (e.key === "e") {
			rotateSound();
			rotateSelected(-1, item);
		}
		if (e.key === " ") {
			placeSelected(item);
		}
		item.tempCanDrop ? placeSound() : errorSound();
		if (e.key === "x") {
			trashSound();
			removeSelected(item);
		}
	}
	function handleMove(e) {
		const x = e.x;
		const y = e.y;
		moveSound();
		moveSelected(-Math.round(x * 2), Math.round(y * 2), item);
	}
	return (
		<section className='flex gap-1 space-x-4 justify-self-end '>
			<div className='min-w-[200px] flex gap-2 rounded-lg '>
				<div className='grid gap-2 '>
					<button
						onClick={() => {
							rotateSelected(-1, item);
							rotateSound();
						}}
						className=' col-span-1 w-12 h-12 btn bg-black/5 hover:bg-white/40 '
					>
						<FontAwesomeIcon icon={faRotateLeft} />
					</button>
					<button
						onClick={() => {
							rotateSelected(1, item);
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

					{item.tempCol.length > 0 ? (
						<ul>
							{item.tempCol.map((col, index) => {
								return (
									<li key={`${index}-color`}>
										<PopoverPicker
											icon={faPalette}
											onChange={(e) => colorSelected(e, index)}
											color={col}
										/>
									</li>
								);
							})}
						</ul>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default SelectedUI;
