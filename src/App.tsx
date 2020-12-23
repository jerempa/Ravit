import { useState, useRef, useEffect, useCallback } from 'react';
import { range, toNumber } from 'lodash';

import './App.css';

import { useGame } from './useGame';
import Card from './Card';

const columns = 8;

export default function App() {
	const { playedCards, playTurn, reset, trapCards, horses, deck } = useGame({
		columns,
	});
	const [isAutoplaying, setIsAutoplaying] = useState<NodeJS.Timeout | null>(
		null
	);
	const intervalRef = useRef<HTMLInputElement>(null);

	const stopAutoplaying = useCallback(
		function stopAutoplaying() {
			clearInterval(isAutoplaying as NodeJS.Timeout);
			setIsAutoplaying(null);
		},
		[isAutoplaying]
	);

	useEffect(() => {
		if (deck.length === 0) {
			stopAutoplaying();
		}
	}, [deck.length, stopAutoplaying]);

	function autoplay() {
		if (isAutoplaying) {
			stopAutoplaying();
		} else {
			setIsAutoplaying(
				setInterval(playTurn, toNumber(intervalRef.current!.value))
			);
		}
	}

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
					stopAutoplaying();
				}}
			>
				reset
			</button>
			<input
				type="number"
				ref={intervalRef}
				defaultValue="750"
				disabled={!!isAutoplaying}
			/>
			<button onClick={autoplay}>{isAutoplaying ? 'stop' : 'autoplay'}</button>
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
