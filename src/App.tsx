import { useRef, useEffect } from 'react';
import { range } from 'lodash';

import './App.css';

import { useGame } from './useGame';
import useAutoplay from './useAutoplay';
import Card from './Card';

const columns = 8;

export default function App() {
	const { playedCards, playTurn, reset, trapCards, horses, deck } = useGame({
		columns,
	});
	const intervalRef = useRef<HTMLInputElement>(null);

	const {
		autoplay,
		isAutoplaying,
		resetAutoplaying,
		stopAutoplaying,
	} = useAutoplay(playedCards, playTurn, deck, intervalRef);

	const gameOver =
		horses.some((h) => h.position === columns) || deck.length === 0;

	useEffect(() => {
		if (gameOver) {
			stopAutoplaying();
		}
	}, [gameOver, stopAutoplaying]);

	return (
		<div className="board">
			<button onClick={playTurn} disabled={!!isAutoplaying}>
				play turn
			</button>
			<button
				onClick={() => {
					reset();
					resetAutoplaying();
				}}
			>
				reset
			</button>
			<input
				type="number"
				ref={intervalRef}
				defaultValue="1500"
				disabled={!!isAutoplaying}
			/>
			<button onClick={autoplay}>{isAutoplaying ? 'stop' : 'play'}</button>
			{gameOver ? (
				<span
					style={{
						fontSize: '2rem',
					}}
				>
					Game over!
				</span>
			) : null}
			<div style={{ display: 'flex' }}>
				{range(0, columns + 1).map((n) => (
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
