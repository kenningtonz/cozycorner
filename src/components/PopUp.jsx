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
					<div ref={popup} className='bg-white rounded-lg p-4 pointer-events-auto '>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default PopUp;
