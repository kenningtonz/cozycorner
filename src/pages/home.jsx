import { startGame, useGameStore } from "../state/store";
export const Home = () => {
	const localExists = useGameStore((state) => state.localExists);
	return (
		<div className='flex items-center justify-center h-screen'>
			<h1 className='text-4xl'>Home</h1>
			{localExists && (
				<button onClick={() => startGame(true)}>Load From Local</button>
			)}

			<button onClick={() => startGame(false)}>New Corner</button>
		</div>
	);
};
