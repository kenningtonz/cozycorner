import { useGameStore, saveMap } from "@gameStore";

import EnvironmentUI from "@ui/EnvironmentUI";
import InsideUI from "@ui/InsideUI";
import MusicUI from "@ui/MusicUI";

export const UI = ({ map }) => {
	const goToHome = useGameStore((state) => state.goToHome);
	const gameState = useGameStore((state) => state.gameState);
	const setGameState = useGameStore((state) => state.setGameState);

	//hide ui button
	//save button
	//gamestates
	//environment
	//music
	//wallpaper
	//floors
	return (
		<main className='absolute top-0 inset-4 flex flex-col pointer-events-none justify-between items-center'>
			<section className=' p-4 pointer-events-auto self-start justify-self-start w-full'>
				<span className='flex justify-between '>
					<button onClick={goToHome} className='btn w-12 h-12 bg-red-300'>
						Back
					</button>
					<button className='btn w-12 h-12 bg-red-300'>Settings</button>
					<button
						onClick={() => saveMap(map)}
						className='btn w-12 h-12 bg-green-300'
					>
						Save
					</button>
				</span>
				<div className='rainbowBorder mx-14 '>
					<div className='flex w-full justify-stretch gap-2'>
						<button
							onClick={() => setGameState("music")}
							className='btn flex-1 data-[active=true]:bg-white '
							data-active={gameState == "music"}
						>
							Music
						</button>
						<button
							onClick={() => setGameState("outside")}
							className='btn flex-1 data-[active=true]:bg-white'
							data-active={gameState == "outside"}
						>
							Outside
						</button>
						<button
							onClick={() => setGameState("inside")}
							className='btn flex-1 data-[active=true]:bg-white'
							data-active={gameState == "inside"}
						>
							Inside
						</button>
						<button
							onClick={() => setGameState("view")}
							className='btn flex-1 data-[active=true]:bg-white'
							data-active={gameState == "view"}
						>
							View
						</button>
					</div>
				</div>
			</section>

			<section className='flex items-center  self-end justify-self-end w-full'>
				{gameState === "inside" ? <InsideUI /> : null}
				{gameState === "music" ? <MusicUI /> : null}
				{gameState === "outside" ? <EnvironmentUI /> : null}
			</section>
		</main>
	);
};

//credits
