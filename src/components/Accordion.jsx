import { useGameStore } from "@state/store";
const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

const AccordionItem = ({ content, label, onClick, index, isOpen }) => {
	return (
		<div
			className={`sm:w-full   sm:min-h-[150px] rounded-lg mr-2 ml-2 sm:mr-0 shadow-md flex sm:flex-row flex-col
			`}
			key={`${label}-${index}`}
			data-open={isOpen}
		>
			<button
				className={`${
					isOpen ? "sm:rounded-l-lg rounded-t-lg" : "sm:rounded-lg rounded-t-lg"
				}  sm:max-w-10 pt-1 text-md sm:cursor-pointer cursor-default w-full flex justify-center items-center disabled sm:enabled  bg-pastel-${
					colors[index]
				}/50 hover:bg-pastel-${
					colors[index]
				}/80 transition-colors duration-1000 ease-in-out`}
				onClick={onClick}
				data-open={isOpen}
			>
				<p className='sm:rotate-90'>{label}</p>
			</button>
			<div
				className={`${
					isOpen
						? "sm:w-[200px]  sm:overflow-auto p-2"
						: "sm:w-[0] sm:overflow-hidden p-2 sm:p-0"
				}   bg-white sm:rounded-r-lg rounded-b-lg transition-[width] duration-1000 ease-in-out `}
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
		<div className='flex sm:flex-row flex-col h-full gap-2 sm:gap-1 max-h-[150px] overflow-y-auto'>
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
