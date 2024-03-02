import { PopoverPicker } from "@components/PopoverColourPicker.jsx";
import { Joystick, JoystickShape } from "@components/joystick/index.tsx";

import RotateLeft from "@icons/rotateLeft";
import RotateRight from "@icons/rotateRight";

import { useGameStore } from "@gameStore";
import {
	moveSelected,
	rotateSelected,
	placeSelected,
	colorSelected,
	removeSelected,
} from "@state/selectedStoreFunctions";

import ItemsUI from "@ui/ItemsUI";

const InsideUI = () => {
	const selected = useGameStore((state) => state.selected);
	const setBaseColor = useGameStore((state) => state.setBaseColor);
	const baseColor = useGameStore((state) => state.map.baseColor);
	const setBuildingColor = useGameStore((state) => state.setBuildingColor);
	const buildingColor = useGameStore((state) => state.map.buildingColor);
	return (
		<>
			{selected.item !== null ? (
				<SelectedUI color={selected.color} />
			) : (
				<ItemsUI />
			)}
			<div className='rainbowBorder pointer-events-auto '>
				<PopoverPicker onChange={setBaseColor} color={baseColor} />
				<PopoverPicker onChange={setBuildingColor} color={buildingColor} />
			</div>
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

export default InsideUI;
