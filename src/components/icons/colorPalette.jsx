import React from "react";
const ColorPalette = ({ size = 24, color = "currentColor" }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 512 512'
		width={size}
		height={size}
	>
		<circle
			cx='256'
			cy='184'
			r='120'
			fill='none'
			stroke={color}
			strokeLinejoin='round'
			strokeWidth='32'
		/>
		<circle
			cx='344'
			cy='328'
			r='120'
			fill='none'
			stroke={color}
			strokeLinejoin='round'
			strokeWidth='32'
		/>
		<circle
			cx='168'
			cy='328'
			r='120'
			fill='none'
			stroke={color}
			strokeLinejoin='round'
			strokeWidth='32'
		/>
	</svg>
);
export default ColorPalette;
