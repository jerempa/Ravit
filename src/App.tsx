import { useRef, useEffect, useState } from 'react';

import './App.css';

import { useGame } from './useGame';
import useAutoplay from './useAutoplay';
import Card, { suitColor, emojiSuitMap } from './Card';
import PlayerInfo from './PlayerInfo';
import Results from './Results';
import { Suit } from './deck';

const lodash = require("lodash");



interface Player {
	playerName: string;
	suit: Suit;
	bet: number;
  }

interface Nickname {
	nickname: string;
	suit: Suit;
  }

const columns = 8;

export default function App() {
	const { playedCards, playTurn, reset, trapCards, horses, deck } = useGame({
		columns,
	});
	const intervalRef = useRef<HTMLInputElement>(null);
	// 			<HorseInfo nicknames={nicknames} />


	const {
		autoplay,
		isAutoplaying,
		resetAutoplaying,
		stopAutoplaying,
		playWinningSong
	} = useAutoplay(playedCards, playTurn, deck, intervalRef);

	const gameOver =
		horses.some((h) => h.position === columns + 1) || deck.length === 0;

	const winner = horses.find((h) => h.position === columns + 1);

	useEffect(() => {
		if (gameOver) {
			resetAutoplaying();
		}
	}, [gameOver, stopAutoplaying]);

	useEffect(() => {
		if (winner && emojiSuitMap[winner?.suit] === "♠️") {
			playWinningSong();
		}
	});

	const [players, setPlayers] = useState<Player[]>([]);
	const [nicknames, setNicknames] = useState<Nickname[]>([]);

	const handlePlayerSubmit = (newPlayer: Player) => {
		setPlayers([...players, newPlayer]);
	  };

	  const resetPlayers = () => {
		setPlayers([]);
		setNicknames([]);
	  };


	const handleNicknameSubmit = (newNickname: Nickname) => {
		  setNicknames([...nicknames, newNickname]);
		};
	

	return (
		<div className="board" style={{fontSize: "40px"}}>
			<button onClick={playTurn} disabled={!!isAutoplaying} style={{fontSize: "40px"}}>
				Play one turn
			</button>
			<button style={{fontSize: "40px"}}
				onClick={() => {
					reset();
					resetAutoplaying();
				}}
			>
				Reset
			</button>
			<input
				type="number"
				ref={intervalRef}
				defaultValue="1500"
				disabled={!!isAutoplaying}
				style={{fontSize: "40px"}}
			/>
			<button style={{fontSize: "40px"}} onClick={autoplay}>{isAutoplaying ? 'Stop' : 'Auto-Play'}</button>
			{gameOver ? (
				<span
					style={{
						fontSize: '2rem',
					}}
				>
					{winner && <Results winner = {emojiSuitMap[winner?.suit]} color = {suitColor(winner.suit) } players={players} cards={deck.length}/>
					}
				</span>
			) : null}
			<div style={{ display: 'flex' }}>
				{lodash.range(0, columns + 1).map((n: number) => (
					<div className="column-header">{n}</div>
				))}
			</div>
			<div className="Players">
			<PlayerInfo onPlayerSubmit={handlePlayerSubmit} resetPlayers={resetPlayers} onNicknameSubmit={handleNicknameSubmit} />
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

