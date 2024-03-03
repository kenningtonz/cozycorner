import Icon from "./Icon";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Carousel = ({ options, onClick }) => {
	const [selected, setSelected] = useState(0);

	function handleClick(change) {
		if (selected + change < 0) {
			setSelected(options.length - 1);
		} else if (selected + change >= options.length) {
			setSelected(0);
		} else {
			setSelected(selected + change);
		}
		onClick(selected);
	}

	return (
		<div className=' w-full p-1'>
			<div className='flex justify-between items-center'>
				<button onClick={() => handleClick(-1)}>
					<Icon name={"ChevronLeft"} />
				</button>
				<AnimatePresence mode='wait'>
					<motion.p
						key={options[selected].index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0 }}
					>
						{options[selected].name}
					</motion.p>
				</AnimatePresence>
				<button onClick={() => handleClick(1)}>
					<Icon name={"ChevronRight"} />
				</button>
			</div>
		</div>
	);
};

export default Carousel;
