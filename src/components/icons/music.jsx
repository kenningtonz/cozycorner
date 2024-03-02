import React from "react";
const Music = ({ size = 24, color = "currentColor" }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		stroke={color}
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<circle cx='5.5' cy='17.5' r='2.5' />
		<circle cx='17.5' cy='15.5' r='2.5' />
		<path d='M8 17V5l12-2v12' />
	</svg>
);
export default Music;
