import { useState } from "react";

const AccordionItem = ({ content, label, onClick, index, isOpen }) => {
	return (
		<div className='w-full min-w-[150px] rounded-lg ' key={`${label}-${index}`}>
			<button
				className=' cursor-pointer w-full flex justify-center items-center bg-white/50 hover:bg-white/80 transition-colors duration-1000 ease-in-out'
				onClick={onClick}
			>
				{label}
			</button>
			<div
				data-open={isOpen}
				className={
					"bg-white data-[open=true]:h-[100px] data-[open=false]:h-[0] overflow-hidden overflow-scroll-y  transition-[height] duration-1000 ease-in-out"
				}
			>
				{content}
			</div>
		</div>
	);
};

export const Accordion = ({ items, labels }) => {
	const [openCategory, setOpenCategory] = useState(0);
	return (
		<>
			{Object.values(items).map((item, index) => (
				<AccordionItem
					isOpen={openCategory === index}
					key={index}
					index={index}
					label={item.props.category.name}
					content={item}
					onClick={() => {
						setOpenCategory(index);
					}}
				/>
			))}
		</>
	);
};
