import { MusicTracks } from "@data/music";
import { useGameStore } from "@state/store";
import {
	setAudioPlaying,
	setAudioVolume,
	setAudioTrack,
} from "@state/audioStoreFunctions";
import Select from "@components/Select";
const MusicUI = () => {
	const { track, volume, playing } = useGameStore((state) => state.audio);

	return (
		<section className='flex gap-1 space-x-4 justify-self-end '>
			<div className='rainbowBorder pointer-events-auto '>
				<button
					onClick={() => setAudioPlaying(playing ? false : true)}
					className='btn flex-1 data-[playing=true]:bg-green'
					data-playing={playing == "true"}
				>
					{playing ? "Pause" : "Play"}
				</button>
				<Select
					options={Object.values(MusicTracks)}
					value={track}
					onClick={setAudioTrack}
				/>
				<div className='min-w-[200px]  rounded-lg'>
					<label
						htmlFor='volume-range'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Volume
					</label>
					<input
						id='volume-range'
						type='range'
						min={0}
						max={100}
						onChange={(e) => setAudioVolume(e.target.value / 100)}
						value={volume * 100}
						className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
					/>
				</div>
			</div>
		</section>
	);
};

export default MusicUI;
