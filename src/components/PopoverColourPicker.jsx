//https://codesandbox.io/p/sandbox/react-colorful-popover-opmco?file=%2Fsrc%2FPopoverPicker.js%3A1%2C1-29%2C1

import React, { useCallback, useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import tinycolor from "tinycolor2";

import ColorPalette from "./icons/colorPalette";

export const PopoverPicker = ({ color, onChange }) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);
	const iconColor = tinycolor(color).isDark() ? "white" : "black";

	return (
		<div className='relative '>
			<div
				className='w-12 h-12 cursor-pointer rounded-lg shadow-md border-4 border-white flex items-center justify-center	'
				style={{ backgroundColor: color }}
				onClick={() => toggle(true)}
			>
				<ColorPalette color={iconColor} size={26} />
			</div>

			{isOpen && (
				<div
					className='absolute left-[50px] rounded-lg top-[-180px] border-4 border-white bg-white shadow-md '
					ref={popover}
				>
					<HexColorPicker color={color} onChange={onChange} />
				</div>
			)}
		</div>
	);
};

// Improved version of https://usehooks.com/useOnClickOutside/
const useClickOutside = (ref, handler) => {
	useEffect(() => {
		let startedInside = false;
		let startedWhenMounted = false;

		const listener = (event) => {
			// Do nothing if `mousedown` or `touchstart` started inside ref element
			if (startedInside || !startedWhenMounted) return;
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target)) return;

			handler(event);
		};

		const validateEventStart = (event) => {
			startedWhenMounted = ref.current;
			startedInside = ref.current && ref.current.contains(event.target);
		};

		document.addEventListener("mousedown", validateEventStart);
		document.addEventListener("touchstart", validateEventStart);
		document.addEventListener("click", listener);

		return () => {
			document.removeEventListener("mousedown", validateEventStart);
			document.removeEventListener("touchstart", validateEventStart);
			document.removeEventListener("click", listener);
		};
	}, [ref, handler]);
};
