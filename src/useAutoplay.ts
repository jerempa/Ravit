import { toNumber } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Card } from './deck';

const introLength = 7 * 1000;

function useHorseRaceSong() {
	const [audioElement, setAudioElement] = useState<HTMLAudioElement>();

	useEffect(() => {
		setAudioElement(
			new Audio(`${process.env.PUBLIC_URL}/Raikku-laittaa-urut-solmuun.mp3`)
		);
	}, []);

	return audioElement;
}

export default function useAutoplay(
	playedCards: Card[],
	playTurn: () => void,
	deck: Card[],
	intervalInputRef: React.RefObject<HTMLInputElement>
) {
	const horseRaceAudioElement = useHorseRaceSong();
	const [isAutoplaying, setIsAutoplaying] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout>();
	const timeoutRef = useRef<NodeJS.Timeout>();

	const resetIntro = useCallback(
		function resetIntro() {
			horseRaceAudioElement?.load();
			clearTimeout(timeoutRef.current as NodeJS.Timeout);
		},
		[horseRaceAudioElement]
	);

	function startAutoplaying() {
		intervalRef.current = setInterval(
			playTurn,
			toNumber(intervalInputRef.current!.value)
		);
		playTurn();
	}

	const stopAutoplaying = useCallback(
		function stopAutoplaying() {
			clearInterval(intervalRef.current as NodeJS.Timeout);
			setIsAutoplaying(false);
			if (playedCards.length < 1) {
				resetIntro();
			}
		},
		[playedCards.length, resetIntro]
	);

	function resetAutoplaying() {
		stopAutoplaying();
		resetIntro();
	}

	useEffect(() => {
		if (deck.length === 0) {
			stopAutoplaying();
		}
	}, [deck.length, stopAutoplaying]);

	function autoplay() {
		if (isAutoplaying) {
			horseRaceAudioElement?.pause();
			stopAutoplaying();
		} else {
			if (playedCards.length > 0) {
				startAutoplaying();
			} else {
				timeoutRef.current = setTimeout(startAutoplaying, introLength);
			}
			setIsAutoplaying(true);
			horseRaceAudioElement?.play();
		}
	}

	return {
		autoplay,
		isAutoplaying,
		resetAutoplaying,
		stopAutoplaying,
	};
}
