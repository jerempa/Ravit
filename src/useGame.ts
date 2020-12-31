import { useState } from 'react';

import { Suit, Card, shuffledDeck, allSuits } from './deck';

export interface GameState {
	playedCards: Card[];
	deck: Card[];
	trapCards: TrapCard[];
}

interface Horse {
	suit: Suit;
	position: number;
}

export interface TrapCard extends Card {
	shown: boolean;
}

function calculateHorses(playedCards: Card[], trapCards: TrapCard[]) {
	const horses = allSuits().map((s) => ({
		suit: s,
		position: 0,
	}));

	playedCards.forEach((pc) => {
		const horse = horses.find((h) => pc.suit === h.suit) as Horse;
		horse.position += 1;
	});

	trapCards.forEach((tc) => {
		if (tc.shown) {
			const horse = horses.find((h) => tc.suit === h.suit) as Horse;
			horse.position -= 1;
		}
	});

	return horses;
}

export function useGame({ columns }: { columns: number }) {
	const [{ playedCards, deck, trapCards }, setState] = useState<GameState>(
		initialState
	);

	function playTurn() {
		setState(({ playedCards, deck, trapCards }) => {
			const horses = calculateHorses(playedCards, trapCards);
			const minPosition = Math.min(...horses.map((h) => h.position));
			const trapCardPosition = minPosition - 1;
			const shouldDrawTrapCard =
				minPosition !== 0 && !trapCards[trapCardPosition].shown;

			if (shouldDrawTrapCard) {
				trapCards = [...trapCards];
				const newTrapCard = { ...trapCards[trapCardPosition] };
				newTrapCard.shown = true;
				trapCards[trapCardPosition] = newTrapCard;
			} else {
				const drawnCard = deck[deck.length - 1];
				playedCards = drawnCard ? [...playedCards, drawnCard] : playedCards;
				deck = deck.slice(0, -1);
			}

			return { playedCards, deck, trapCards };
		});
	}

	function initialState() {
		const deck = shuffledDeck();
		return {
			playedCards: [],
			deck: deck.slice(0, -columns),
			trapCards: deck.slice(-columns).map((tc) => ({ ...tc, shown: false })),
		};
	}

	function reset() {
		setState(initialState);
	}

	return {
		playedCards,
		deck,
		playTurn,
		reset,
		trapCards,
		horses: calculateHorses(playedCards, trapCards),
	};
}
