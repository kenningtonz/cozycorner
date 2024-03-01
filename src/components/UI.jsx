import { ItemsUI } from "../components/ItemsUI";
import {
	useGameStore,
	setEnvironment,
	moveSelected,
	rotateSelected,
	placeSelected,
	colorSelected,
	removeSelected,
	saveMap,
} from "../store";
import { PopoverPicker } from "./PopoverColourPicker.jsx";
import { Joystick, JoystickShape } from "./joystick/index.tsx";
import { MusicTracks } from "../data";
import RotateLeft from "./icons/rotateLeft";
import RotateRight from "./icons/rotateRight";

export const UI = ({ map }) => {
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
	return (
		<main className='absolute top-0 inset-4 flex flex-col pointer-events-none justify-between items-center'>
			<section className=' p-4 pointer-events-auto self-start justify-self-start w-full'>
				<span className='flex justify-between '>
					<button onClick={goToHome} className='btn w-12 h-12 bg-red-300'>
						Back
					</button>
					<button className='btn w-12 h-12 bg-red-300'>Settings</button>
					<button
						onClick={() => saveMap(map)}
						className='btn w-12 h-12 bg-green-300'
					>
						Save
					</button>
				</span>
				<div className='rainbowBorder mx-14 '>
					<div className='flex w-full justify-stretch gap-2'>
						<button
							onClick={() => setGameState("music")}
							className='btn flex-1 data-[active=true]:bg-white '
							data-active={gameState == "music"}
						>
							Music
						</button>
						<button
							onClick={() => setGameState("outside")}
							className='btn flex-1 data-[active=true]:bg-white'
							data-active={gameState == "outside"}
						>
							Outside
						</button>
						<button
							onClick={() => setGameState("inside")}
							className='btn flex-1 data-[active=true]:bg-white'
							data-active={gameState == "inside"}
						>
							Inside
						</button>
						<button
							onClick={() => setGameState("view")}
							className='btn flex-1 data-[active=true]:bg-white'
							data-active={gameState == "view"}
						>
							View
						</button>
					</div>
				</div>
			</section>

			<section className='flex items-center  self-end justify-self-end w-full'>
				{gameState === "inside" ? <InsideUI /> : null}
				{gameState === "music" ? <MusicUI /> : null}
				{gameState === "outside" ? <EnvironmentUI /> : null}
			</section>
		</main>
	);
};

//credits

const InsideUI = () => {
	const selected = useGameStore((state) => state.selected);

	return (
		<>
			{selected.item !== null ? (
				<SelectedUI color={selected.color} />
			) : (
				<ItemsUI />
			)}
		</>
	);
};

const MusicUI = () => {
	const setAudioPlaying = useGameStore((state) => state.setAudioPlaying);
	const setAudioVolume = useGameStore((state) => state.setAudioVolume);
	const setAudioTrack = useGameStore((state) => state.setAudioTrack);
	return (
		<section className='flex gap-1 space-x-4 justify-self-end '>
			<div className='rainbowBorder pointer-events-auto '>
				<div className='min-w-[200px]  rounded-lg'>
					<label
						for='volume-range'
						class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Volume
					</label>
					<input
						id='volume-range'
						type='range'
						value='50'
						class='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
					/>
				</div>
			</div>
		</section>
	);
};

const EnvironmentUI = () => {
	return (
		<>
			<h2>Environment</h2>
			<button onClick={() => setEnvironment(1)}>Next</button>
		</>
	);
};

const SelectedUI = ({ color }) => {
	function handleMove(e) {
		const x = e.x;
		const y = e.y;
		moveSelected(-Math.round(x * 2), Math.round(y * 2));
	}
	return (
		<section className='flex gap-1 space-x-4 justify-self-end '>
			{/* <h2>{selected.name}</h2> */}
			<div className='rainbowBorder pointer-events-auto '>
				<div className='min-w-[200px]  rounded-lg'>
					<button
						onClick={() => rotateSelected(1)}
						className='w-12 h-12 btn bg-black/5 hover:bg-white/40 '
					>
						<RotateLeft />
					</button>
					<button
						onClick={() => rotateSelected(-1)}
						className='w-12 h-12 btn bg-black/5 hover:bg-white/40'
					>
						<RotateRight />
					</button>
					<button
						onClick={placeSelected}
						className='w-[90px] btn row-span-2 col-span-2 bg-green-200/80 hover:bg-green-300'
					>
						Place
					</button>

					<Joystick
						baseClassName={`row-span-2 col-span-2 bg-white/50`}
						stickClassName={`bg-black`}
						baseShape={JoystickShape.Square}
						size={100}
						stickSize={50}
						baseColor='red'
						stickColor='blue'
						throttle={100}
						// start={(e) => console.log(e)}
						move={(e) => handleMove(e)}
					></Joystick>

					<button
						onClick={removeSelected}
						className='w-12 h-12 btn bg-red-200/80 hover:bg-red-300 '
					>
						X
					</button>
				</div>
				{color !== null ? (
					<PopoverPicker onChange={colorSelected} color={color} />
				) : null}
			</div>
			{/* <DPad move={moveSelected} rotate={rotateSelected} place={placeSelected} /> */}
		</section>
	);
};
