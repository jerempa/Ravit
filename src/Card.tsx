import { Suit } from './deck';

const emojiSuitMap = {
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

function cardValue(value: CardValue): CardValue {
	return value === 11 ? 'J' : value === 12 ? 'Q' : value === 13 ? 'K' : value;
}

export default function Card({ suit, value, style, shown = true }: PropTypes) {
	return (
		<div
			className="card"
			style={{
				color: suit === Suit.diamonds || suit === Suit.hearts ? 'red' : 'black',
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
