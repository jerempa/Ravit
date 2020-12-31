import { Suit } from './deck';

export const emojiSuitMap = {
	[Suit.clubs]: '♣️',
	[Suit.diamonds]: '♦️',
	[Suit.hearts]: '♥️',
	[Suit.spades]: '♠️',
};

type CardValue = string | number;

interface PropTypes {
	suit: Suit;
	value: CardValue;
	style?: React.CSSProperties;
	shown?: boolean;
}

export function suitColor(suit: Suit) {
	return suit === Suit.diamonds || suit === Suit.hearts ? 'red' : 'black';
}

function cardValue(value: CardValue): CardValue {
	return value === 11 ? 'J' : value === 12 ? 'Q' : value === 13 ? 'K' : value;
}

export default function Card({ suit, value, style, shown = true }: PropTypes) {
	return (
		<div
			className="card"
			style={{
				color: suitColor(suit),
				...style,
			}}
		>
			{shown && (
				<>
					<div>{cardValue(value)}</div>
					<div style={{ textAlign: 'center' }}>{emojiSuitMap[suit]}</div>
				</>
			)}
		</div>
	);
}
