import { useUIStore } from "../store";

export const Accordion = ({ label, content, index, open }) => {
	const setOpenCategory = useUIStore((state) => state.setOpenCategory);
	console.log(index);
	return (
		<div className='w-full min-w-[150px] rounded-lg ' key={`${label}-${index}`}>
			<button
				className=' cursor-pointer w-full flex justify-center items-center bg-white/50 hover:bg-white/80 transition-colors duration-1000 ease-in-out'
				onClick={() => {
					setOpenCategory(index);
					// console.log(index, openCategory);
				}}
			>
				{label}
			</button>

			<div
				data-open={open}
				className={
					"bg-white data-[open=true]:h-[100px] data-[open=false]:h-[0] overflow-hidden overflow-scroll-y  transition-[height] duration-1000 ease-in-out"
				}
			>
				{content}
			</div>
		</div>
	);
};
