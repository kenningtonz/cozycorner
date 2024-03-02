import { useGameStore, setEnvironment } from "@gameStore";

const EnvironmentUI = () => {
	return (
		<section className='rainbowBorder'>
			<div className='pointer-events-auto self-end  justify-self-end rounded-lg '>
				<h2>Environment</h2>
				<button onClick={() => setEnvironment(1)}>Next</button>
			</div>
		</section>
	);
};

export default EnvironmentUI;
