import { useGameStore } from "../state/store";
import { MusicTracks } from "../data/music";
import { useEffect } from "react";
import { setAudioRef } from "../state/audioStoreFunctions";
import useSound from "use-sound";

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

export const SoundEffectManager = () => {
	const muted = useGameStore((state) => state.muted);

	const [confirmationSound] = useSound("/soundEffects/confirmation.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [clickSound] = useSound("/soundEffects/click.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [questionSound] = useSound("/soundEffects/question.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [selectSound] = useSound("/soundEffects/select.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [spawnSound] = useSound("/soundEffects/spawn.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [placeSound] = useSound("/soundEffects/place.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [errorSound] = useSound("/soundEffects/error.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [trashSound] = useSound("/soundEffects/trash.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [moveSound] = useSound("/soundEffects/move.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [toggleSound] = useSound("/soundEffects/toggle.mp3", {
		volume: muted ? 0 : 0.5,
	});
	const [rotateSound] = useSound("/soundEffects/rotate.mp3", {
		volume: muted ? 0 : 0.5,
	});

	return {
		placeSound,
		confirmationSound,
		clickSound,
		questionSound,
		selectSound,
		spawnSound,
		errorSound,
		trashSound,
		moveSound,
		toggleSound,
		rotateSound,
	};
};
