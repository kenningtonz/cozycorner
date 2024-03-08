import { useGameStore } from "@gameStore";
import { environments } from "@data/environments";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const EnvironmentUI = ({ selectSound }) => {
	const activeEnvironment = useGameStore((state) => state.environment.index);
	const isDay = useGameStore((state) => state.isDay);
	const setIsDay = useGameStore((state) => state.setIsDay);
	const setEnvironment = useGameStore((state) => state.setEnvironment);

	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"envUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0, delay: 0.5 }}
			className='rainbowBorder w-full pointer-events-auto'
		>
			<div className='rainbowInner p-4 self-end justify-self-end rounded-lg '>
				<div className='flex gap-4 w-full justify-stretch'>
					{environments.map((environment) => (
						<motion.button
							key={`${environment.name}-button`}
							className={`align-middle text-xl bg-gradient-to-bl hover:bg-gradient-to-tr shadow-md  transition rounded-lg p-2 flex-1 ${
								activeEnvironment == environment.index
									? `from-${environment.name}-600 to-${environment.name}-800 text-white`
									: `from-${environment.name}-200 to-${environment.name}-400 text-black`
							}`}
							onClick={() => {
								setEnvironment(environment.index);
								selectSound();
							}}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.95 }}
						>
							{environment.title}
						</motion.button>
					))}
					<motion.button
						className={`iconBtn ${
							isDay ? "bg-white" : "bg-black"
						}  cursor-pointer shadow-md`}
						onClick={() => {
							setIsDay(!isDay);
						}}
						aria-label='day/night'
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.95 }}
					>
						{isDay ? (
							<FontAwesomeIcon icon={faSun} color={"black"} size='xl' />
						) : (
							<FontAwesomeIcon icon={faMoon} color={"white"} size='xl' />
						)}
					</motion.button>
				</div>
			</div>
		</motion.section>
	);
};

export default EnvironmentUI;
