import useClickOutside from "../hooks/ClickOutside";
import React, { useRef, useState, useCallback } from "react";
const Select = ({ options, value, onClick }) => {
	const [open, setOpen] = useState(false);
	const select = useRef();
	const close = useCallback(() => setOpen(false), []);
	useClickOutside(select, close);

	return (
		<div className='custom-select rounded-lg relative'>
			<button
				onClick={() => setOpen(!open)}
				className='btn w-full cursor-pointer flex justify-between items-center p-2 '
			>
				<span className=''>Music</span>
				<span className='>'></span>
			</button>
			{open ? (
				<ul
					ref={select}
					className=' bg-white rounded-lg absolute w-full p-2 overflow-y-auto max-h-40'
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
				</ul>
			) : null}
		</div>
	);
};

export default Select;
