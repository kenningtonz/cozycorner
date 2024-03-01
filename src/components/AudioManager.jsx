import { useGameStore } from "../store";
import { MusicTracks } from "../data";

export const MusicManager = () => {
	const { track, volume, playing } = useGameStore((state) => state.audioState);

	const trackPath = MusicTracks.find((music) => music.track === track);

	return (
		<div>
			<audio src={trackPath} autoPlay={playing} loop volume={volume} />
		</div>
	);
};

export const SoundManager = () => {
	// const { track, volume, playing } = useGameStore((state) => state.audioState);

	// const trackPath = MusicTracks.find((music) => music.track === track);

	return (
		<div>
			{/* <audio src={trackPath} autoPlay={playing} loop volume={volume} /> */}
		</div>
	);
};
