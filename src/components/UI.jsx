import { ItemsUI } from "../components/ItemsUI";
import {
	useGameStore,
	setEnvironment,
	moveSelected,
	rotateSelected,
	placeSelected,
	colorSelected,
	saveMap,
} from "../store";
import { RgbaColorPicker } from "react-colorful";

export const UI = ({ map }) => {
	const goToHome = useGameStore((state) => state.goToHome);
	const selected = useGameStore((state) => state.selected);
	const gameState = useGameStore((state) => state.gameState);

	//hide ui button
	//save button
	//gamestates
	//environment
	//music
	//wallpaper
	//floors
	return (
		<div className='absolute top-0  inset-4 flex flex-col pointer-events-none justify-between items-center'>
			<div className='flex items-center p-4 pointer-events-auto self-start justify-self-start'>
				<button onClick={goToHome} className='btn'>
					Back
				</button>
				<button onClick={() => setEnvironment(1)} className='btn'>
					Environment
				</button>
				<button onClick={() => saveMap(map)} className='btn'>
					Save
				</button>
			</div>
			<ItemsUI />
			{selected.item !== null && <SelectedUI />}
		</div>
	);
};

//credits

const DPad = ({ move, rotate, place }) => {
	return (
		<div className='grid grid-cols-3 grid-rows-3 pointer-events-auto'>
			<button onClick={() => rotate(1)} className='btn row-span-1 col-span-1'>
				R-L
			</button>
			<button onClick={() => move(0, 1)} className='btn row-span-1 col-span-1'>
				U
			</button>
			<button onClick={() => rotate(-1)} className='btn row-span-1 col-span-1'>
				R-R
			</button>

			<button onClick={() => move(1, 0)} className='btn row-span-1 col-span-1'>
				L
			</button>
			<button onClick={place} className='btn row-span-1 col-span-1'>
				S
			</button>
			<button onClick={() => move(-1, 0)} className='btn row-span-1 col-span-1'>
				R
			</button>
			<button
				onClick={() => move(0, -1)}
				className='btn row-span-1 col-span-3 justify-self-center '
			>
				D
			</button>
		</div>
	);
};

const SelectedUI = ({ selected }) => {
	return (
		<section className='flex gap-1 space-x-4 pointer-events-auto justify-self-end'>
			{/* <h2>{selected.name}</h2> */}

			<DPad move={moveSelected} rotate={rotateSelected} place={placeSelected} />
			<RgbaColorPicker />
		</section>
	);
};
