import { MusicTracks } from "@data/music";
import { useGameStore } from "@state/store";
import {
	setAudioPlaying,
	setAudioVolume,
	setAudioTrack,
} from "@state/audioStoreFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faVolumeHigh,
	faVolumeOff,
	faPause,
	faPlay,
	faForwardStep,
	faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const MusicUI = ({ changeMusic }) => {
	// console.log(sounds);
	const { track, volume, playing } = useGameStore((state) => state.audio);
	const tracks = Object.values(MusicTracks);

	console.log("music");
	function handleClick(change) {
		if (track + change < 0) {
			setAudioTrack(tracks.length - 1);
		} else if (track + change >= tracks.length) {
			setAudioTrack(0);
		} else {
			setAudioTrack(track + change);
		}
	}
	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"envUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder'
		>
			<div className=' rainbowInner flex flex-col items-center gap-4 p-4'>
				{/* <Carousel options={Object.values(MusicTracks)} onClick={setAudioTrack} /> */}
				{/* <Select
					options={Object.values(MusicTracks)}
					value={track}
					onClick={setAudioTrack}
				/> */}
				<div className='text-center'>
					<h2 className='text-lg uppercase font-bold'>{tracks[track].name}</h2>
					<p className='text-md'>{tracks[track].artist}</p>
				</div>

				<div className='flex justify-between w-full'>
					<motion.button
						onClick={() => {
							handleClick(-1);
							changeMusic();
						}}
					>
						<FontAwesomeIcon icon={faBackwardStep} size={"xl"} />
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setAudioPlaying(playing ? false : true)}
						className='btn w-14 h-14  data-[playing=true]:bg-red-300/80 hover:data-[playing=true]:bg-red-300  data-[playing=false]:bg-green-300/80 hover:data-[playing=false]:bg-green-300 '
						data-playing={`${playing}`}
					>
						{playing ? (
							<FontAwesomeIcon icon={faPause} size={"2xl"} />
						) : (
							<FontAwesomeIcon icon={faPlay} size={"2xl"} />
						)}
					</motion.button>
					<motion.button
						onClick={() => {
							handleClick(-1);
							changeMusic();
						}}
						className='transition-colors'
						whileHover={{ color: "red" }}
					>
						<FontAwesomeIcon icon={faForwardStep} size={"xl"} />
					</motion.button>
				</div>

				<div className='min-w-[200px]  rounded-lg flex items-center gap-2'>
					<FontAwesomeIcon icon={faVolumeOff} />

					<input
						id='volume-range'
						type='range'
						min={0}
						max={100}
						onChange={(e) => setAudioVolume(e.target.value / 100)}
						value={volume * 100}
						className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
					/>
					<FontAwesomeIcon icon={faVolumeHigh} />
				</div>
			</div>
		</motion.section>
	);
};

export default MusicUI;
