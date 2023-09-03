import React, { useState } from 'react';

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
    <div>
      <h2>Enter Player Information</h2>
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
          <h3>Player Info:</h3>
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
