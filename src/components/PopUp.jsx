import { useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const PopUp = ({ children, isOpen, setIsOpen }) => {
	const popup = useRef();
	return (
		<>
			{isOpen && (
				<div
					onClick={(e) => {
						// console.log(e.target);
						if (popup.current.contains(e.target)) {
							return;
						}
						setIsOpen(false);
					}}
					className='fixed w-full pointer-events-auto  inset-0 bg-black/50 z-50 flex justify-center items-center h-dvh'
				>
					<section
						ref={popup}
						className='scroll-py-4 rainbowBorder pointer-events-auto w-auto max-w-[600px] overflow-auto  scrollbar max-h-[90dvh] '
					>
						<div className='rainbowInner p-4 flex flex-col items-center'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => {
									setIsOpen(false);
								}}
								className='self-end '
							>
								<FontAwesomeIcon size='2x' icon={faXmark} />
							</motion.button>
							{children}
						</div>
					</section>
				</div>
			)}
		</>
	);
};

export default PopUp;
