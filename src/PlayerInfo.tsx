import React, { useState } from 'react';
import './PlayerInfo.css';
import Card, { suitColor, emojiSuitMap } from './Card';


enum Suit {
  clubs = '♣️',
  diamonds = '♦️',
  hearts = '♥️',
  spades = '♠️',
}

interface Player {
  playerName: string;
  suit: Suit;
  bet: string;
}

function PlayerInfo() {
  const [playerName, setPlayerName] = useState('');
  const [suit, setSuit] = useState<Suit>(Suit.clubs); // Default to clubs
  const [bet, setBet] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const handleSubmit = () => {

    const newPlayer = {
      playerName,
      suit,
      bet,
    };


    setPlayers([...players, newPlayer]);
    setPlayerName('');
    setSuit(Suit.clubs);
    setBet('');
  };

  const resetPlayers = () => {
    setPlayers([]);
  };

  return (
    <div className="player-info">
      <h2>Enter players</h2>
      <div>
        <input
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div>
        <select
          value={suit}
          onChange={(e) => setSuit(e.target.value as Suit)}
        >
          <option value={Suit.clubs}>♣️ Clubs</option>
          <option value={Suit.diamonds}>♦️ Diamonds</option>
          <option value={Suit.hearts}>♥️ Hearts</option>
          <option value={Suit.spades}>♠️ Spades</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Bet"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Enter Player</button>
      </div>
      {players.length > 0 && (
        <div>
          <h3>Players:</h3>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player.playerName}, {player.suit}, {player.bet}
              </li>
            ))}
          </ul>
        </div>
      )}
            <div>
            <button onClick={resetPlayers} style={{ display: players.length >= 1 ? 'block' : 'none' }}>
  Reset Players
</button>
      </div>
    </div>
  );
}

export default PlayerInfo;