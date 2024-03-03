import React from "react";

const Icons = {
	Edit: <polygon points='16 3 21 8 8 21 3 21 3 16 16 3'></polygon>,
	ChevronDown: <path d='M6 9l6 6 6-6' />,
	SkipForward: (
		<>
			<polygon points='5 4 15 12 5 20 5 4'></polygon>
			<line x1='19' y1='5' x2='19' y2='19'></line>
		</>
	),
	House: (
		<>
			<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
			<polyline points='9 22 9 12 15 12 15 22'></polyline>
		</>
	),
	Moon: <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>,
	Sun: (
		<>
			<circle cx='12' cy='12' r='5' />
			<path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
		</>
	),
	Droplet: (
		<>
			<path d='M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'></path>
		</>
	),
	Mute: (
		<>
			<path d='M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6' />
		</>
	),
	SkipBackward: (
		<>
			<polygon points='19 20 9 12 19 4 19 20'></polygon>
			<line x1='5' y1='19' x2='5' y2='5'></line>
		</>
	),
	ChevronUp: <path d='M18 15l-6-6-6 6' />,
	ChevronLeft: <path d='M15 18l-6-6 6-6' />,
	ChevronRight: <path d='M9 18l6-6-6-6' />,
	Back: (
		<>
			<path d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z'></path>
			<line x1='18' y1='9' x2='12' y2='15'></line>
			<line x1='12' y1='9' x2='18' y2='15'></line>
		</>
	),
	Disc: (
		<>
			<circle cx='12' cy='12' r='10'></circle>
			<circle cx='12' cy='12' r='3'></circle>
		</>
	),
	Move: (
		<path d='M5.2 9l-3 3 3 3M9 5.2l3-3 3 3M15 18.9l-3 3-3-3M18.9 9l3 3-3 3M3.3 12h17.4M12 3.2v17.6' />
	),
	Music: (
		<>
			<circle cx='5.5' cy='17.5' r='2.5' />
			<circle cx='17.5' cy='15.5' r='2.5' />
			<path d='M8 17V5l12-2v12' />
		</>
	),
	Pause: (
		<>
			<rect x='6' y='4' width='4' height='16'></rect>
			<rect x='14' y='4' width='4' height='16'></rect>
		</>
	),
	Play: <polygon points='5 3 19 12 5 21 5 3'></polygon>,
	RotateLeft: <path d='M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38' />,
	RotateRight: <path d='M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38' />,
	Save: (
		<>
			<path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'></path>
			<polyline points='17 21 17 13 7 13 7 21'></polyline>
			<polyline points='7 3 7 8 15 8'></polyline>
		</>
	),
	Trash: (
		<>
			<polyline points='3 6 5 6 21 6'></polyline>
			<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
			<line x1='10' y1='11' x2='10' y2='17'></line>
			<line x1='14' y1='11' x2='14' y2='17'></line>
		</>
	),
	VolumeDown: (
		<>
			<polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>
			<path d='M15.54 8.46a5 5 0 0 1 0 7.07'></path>
		</>
	),
	VolumeUp: (
		<>
			<polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>
			<path d='M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07'></path>
		</>
	),
};

const Icon = ({ size = 24, color = "currentColor", name }) => (
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
		{Icons[name]}
	</svg>
);
export default Icon;
