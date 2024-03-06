import { PopoverPicker } from "@components/PopoverColourPicker.jsx";
import { motion } from "framer-motion";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { useGameStore } from "@gameStore";
import ItemsUI from "@ui/ItemsUI";
import SelectedUI from "@ui/SelectedUI";

const InsideUI = ({ muted }) => {
	const {
		setFloorColor,
		selectedId,
		setBuildingColor,
		buildingColor,
		floorColor,
	} = useGameStore((state) => ({
		setFloorColor: state.setFloorColor,
		buildingColor: state.buildingColor,
		selectedId: state.selectedId,
		setBuildingColor: state.setBuildingColor,
		floorColor: state.floorColor,
	}));

	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"itemsUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder pointer-events-auto '
		>
			<div className='flex rainbowInner gap-4 items-stretch p-4 '>
				{selectedId != null ? (
					<SelectedUI selectedId={selectedId} muted={muted} />
				) : (
					<ItemsUI muted={muted} />
				)}
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

export default InsideUI;
