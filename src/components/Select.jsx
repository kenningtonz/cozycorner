import useClickOutside from "../hooks/ClickOutside";
import React, { useRef, useState, useCallback } from "react";
import Icon from "./Icon";
import { motion, AnimatePresence } from "framer-motion";

const Select = ({ options, value, onClick }) => {
	const [open, setOpen] = useState(false);
	const select = useRef();
	const close = useCallback(() => setOpen(false), []);
	useClickOutside(select, close);

	return (
		<div className='custom-select rounded-lg relative min-w-40'>
			<button
				onClick={() => setOpen(!open)}
				className={` w-full cursor-pointer flex justify-between items-center p-2 z-20 bg-white ${
					open ? "rounded-t-lg" : "rounded-lg"
				}`}
			>
				Music
				{open ? <Icon name={"ChevronUp"} /> : <Icon name={"ChevronDown"} />}
			</button>
			<AnimatePresence>
				{open ? (
					<motion.ul
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						ref={select}
						className=' bg-white rounded-b-lg border-t  absolute w-full p-2 overflow-y-auto max-h-40 z-10'
					>
						{options.map((option) => (
							<li
								key={option.index}
								value={option.index}
								onClick={(e) => {
									onClick(e.target.value);
									// console.log(e.target.value);
									setOpen(false);
								}}
								className='hover:bg-green-300/50 cursor-pointer data-selected=[value=true]:bg-gray-200'
								data-selected={value == option.index}
							>
								{option.name}
							</li>
						))}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</div>
	);
};

export default Select;
