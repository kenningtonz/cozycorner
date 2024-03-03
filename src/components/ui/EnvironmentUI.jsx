import { useGameStore, setEnvironment } from "@gameStore";
import { environments } from "@data/environments";
import { motion } from "framer-motion";

const EnvironmentUI = () => {
	//daybutton
	//nightbutton
	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"envUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder w-full pointer-events-auto'
		>
			<div className='rainbowInner  self-end justify-self-end rounded-lg '>
				<h2>Environment</h2>

				<div className='flex gap-4'>
					{environments.map((environment) => (
						<EnvironmentButton key={environment} environment={environment} />
					))}
				</div>
			</div>
		</motion.section>
	);
};

const EnvironmentButton = ({ environment }) => {
	return (
		<motion.button
			className={`bg-beach rounded-lg p-2 text-white shadow-neo shadow-beach-300`}
			onClick={() => {
				setEnvironment(environment);
			}}
		>
			{environment.name}
		</motion.button>
	);
};

export default EnvironmentUI;
