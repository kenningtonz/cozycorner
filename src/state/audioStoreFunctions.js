import { unstable_batchedUpdates } from "react-dom";
import { useGameStore } from "./store";
import { MusicTracks } from "../data/music";

export const setAudioTrack = (track) => {
	unstable_batchedUpdates(() => {
		const ref = useGameStore.getState().audio.musicRef;

		ref.src = Object.values(MusicTracks)[track].path;
	});
	useGameStore.setState((state) => ({
		audio: {
			...state.audio,
			track,
		},
	}));
};

export const setAudioPlaying = (playing) => {
	unstable_batchedUpdates(() => {
		const ref = useGameStore.getState().audio.musicRef;
		if (playing) {
			ref.play();
		} else {
			ref.pause();
		}
	});
	useGameStore.setState((state) => ({
		audio: {
			...state.audio,
			playing,
		},
	}));
};

export const setAudioRef = (ref) => {
	useGameStore.setState((state) => ({
		audio: {
			...state.audio,
			musicRef: ref,
		},
	}));
};

export const setAudioVolume = (volume) => {
	unstable_batchedUpdates(() => {
		const ref = useGameStore.getState().audio.musicRef;
		ref.volume = volume;
	});
	useGameStore.setState((state) => ({
		audio: {
			...state.audio,
			volume,
		},
	}));
};
