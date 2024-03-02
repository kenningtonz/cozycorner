import { useGameStore } from "../state/store";
import { MusicTracks } from "../data/music";
import { useEffect } from "react";
import { setAudioRef } from "../state/audioStoreFunctions";

export const MusicManager = () => {
	// const setAudioRef = useGameStore((state) => state.setAudioRef);
	useEffect(() => {
		const audio = document.getElementById("musicTag");

		setAudioRef(audio);
	}, []);
	const { track, volume, playing } = useGameStore((state) => state.audio);

	const trackPath = Object.values(MusicTracks)[track].path;

	if (playing) {
		console.log("playing");
	}
	return (
		<div>
			<audio
				id='musicTag'
				src={trackPath}
				autoPlay={playing}
				loop
				volume={volume}
			/>
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
