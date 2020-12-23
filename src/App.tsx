import { range } from 'lodash';

import './App.css';

import { useGame } from './useGame';
import Card from './Card';

export default function App() {
	const { playedCards, playTurn, reset, trapCards, horses } = useGame();

	return (
		<div className="board">
			<button onClick={playTurn}>play turn</button>
			<button onClick={reset}>reset</button>
			<div style={{ display: 'flex' }}>
				{range(0, 11).map((n) => (
					<div className="column-header">{n}</div>
				))}
			</div>
			{horses.map((h) => (
				<Card
					suit={h.suit}
					value="A"
					style={{ transform: `translateX(${h.position * 120}px)` }}
				/>
			))}
			<div style={{ display: 'flex', marginLeft: 120 }}>
				{trapCards.map((tc, i) => (
					<Card {...tc} />
				))}
			</div>
			<h3>Played Cards: {playedCards.length}</h3>
			<div className="played-cards-grid">
				{playedCards.map((pc) => (
					<Card {...pc} />
				))}
			</div>
		</div>
	);
}
