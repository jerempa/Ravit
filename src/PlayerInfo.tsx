import React, { useState } from 'react';
import './PlayerInfo.css'; 

interface Player {
  playerName: string;
  suit: string;
  bet: string;
}

function PlayerInfo() {
  const [playerName, setPlayerName] = useState('');
  const [suit, setSuit] = useState('');
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
    setSuit('');
    setBet('');
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
        <input
          type="text"
          placeholder="Suit"
          value={suit}
          onChange={(e) => setSuit(e.target.value)}
        />
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
    </div>
  );
}

export default PlayerInfo;
