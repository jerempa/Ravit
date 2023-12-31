const lodash = require("lodash");

export enum Suit {
	clubs = 'clubs',
	spades = 'spades',
	hearts = 'hearts',
	diamonds = 'diamonds',
}

export interface Card {
	suit: Suit;
	value: number;
}

export function allSuits(): Suit[] {
	return [Suit.clubs, Suit.spades, Suit.hearts, Suit.diamonds];
}

export function shuffledDeck(): Card[] {
	const cards = allSuits().flatMap((s) =>
	lodash.range(2, 14).map((v: number) => ({ suit: s, value: v }))
	);

	return lodash.shuffle(cards);
}
