const ToolTip = ({ text }) => {
	return (
		<div className='absolute sm:top-3 w-32 sm:left-14 top-14 h-6 bg-white/80 rounded-md'>
			<p className=''> {text}</p>
		</div>
	);
};

const ButtonToolTip = ({ text, onClick, className, toolTipText, sound }) => {
	const [showToolTip, setShowToolTip] = useState(false);

	return (
		<motion.button
			onClick={() => {
				onClick();
				sound();
			}}
			// whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onHoverStart={() => {
				setShowToolTip(true);
			}}
			onHoverEnd={() => {
				setShowToolTip(false);
			}}
			className={`iconBtn ${className} relative`}
		>
			{text}

			{showToolTip && <ToolTip text={toolTipText} />}
		</motion.button>
	);
};
