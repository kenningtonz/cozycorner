import { useState, useRef, useCallback } from "react";

const PopUp = ({ children, isOpen, setIsOpen }) => {
	const popup = useRef();
	return (
		<>
			{isOpen && (
				<div
					onClick={(e) => {
						console.log(e.target);
						if (popup.current.contains(e.target)) {
							return;
						}
						setIsOpen(false);
					}}
					className='fixed w-full pointer-events-auto  inset-0 bg-black/50 z-50 flex justify-center items-center'
				>
					<section
						ref={popup}
						className='scroll-py-4 rainbowBorder pointer-events-auto w-full max-w-[600px] sm:overflow-auto sm:max-h-[600px] scrollbar'
					>
						<div className='rainbowInner p-4'>{children}</div>
					</section>
				</div>
			)}
		</>
	);
};

export default PopUp;
