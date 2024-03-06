import { useState } from "react";
import { useGameStore } from "@state/store";

const AccordionItem = ({ content, label, onClick, index, isOpen }) => {
	return (
		<div
			className={`w-full  min-h-[150px] rounded-lg ml-2 shadow-md flex 
			
			`}
			key={`${label}-${index}`}
			data-open={isOpen}
		>
			<button
				className={`${
					isOpen ? "rounded-l-lg" : "rounded-lg"
				}  max-w-10 pt-1 text-md cursor-pointer w-full flex justify-center items-center  bg-lime-300/50 hover:bg-lime-300/80 transition-colors duration-1000 ease-in-out`}
				onClick={onClick}
				data-open={isOpen}
			>
				<p className='rotate-90'>{label}</p>
			</button>
			<div
				className={`${
					isOpen ? "w-[200px]  overflow-auto p-2" : "w-[0] overflow-hidden"
				}   bg-white rounded-r-lg transition-[width] duration-1000 ease-in-out max-h-[150px]`}
			>
				{content}
			</div>
		</div>
	);
};

export const Accordion = ({ items, clickSound }) => {
	const categoryOpen = useGameStore((state) => state.categoryOpen);
	const setCategoryOpen = useGameStore((state) => state.setCategoryOpen);
	return (
		<div className='flex h-full'>
			{Object.values(items).map((item, index) => (
				<AccordionItem
					isOpen={categoryOpen === index}
					key={index}
					index={index}
					label={item.props.category.name}
					content={item}
					onClick={() => {
						setCategoryOpen(index);
						clickSound();
					}}
				/>
			))}
		</div>
	);
};
