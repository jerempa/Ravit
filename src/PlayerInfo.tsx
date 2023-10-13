import React, { useState } from 'react';
import './PlayerInfo.css';
import Card, { suitColor, emojiSuitMap } from './Card';
import Results from './Results';
import Horse from './HorseInfo';
import { Suit } from './deck';


interface Player {
  playerName: string;
  suit: Suit;
  bet: number;
}

interface PlayerInfoProps {
  onPlayerSubmit: (player: Player) => void;
  resetPlayers: () => void;
}

function PlayerInfo({onPlayerSubmit, resetPlayers }: PlayerInfoProps) {
  const [playerName, setPlayerName] = useState('');
  const [suit, setSuit] = useState<Suit>(Suit.clubs); // Default to clubs
  const [bet, setBet] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleSubmit = () => {

    const newPlayer = {
      playerName,
      suit,
      bet,
    };

    onPlayerSubmit(newPlayer);

    setPlayers([...players, newPlayer]);
    setPlayerName('');
    setSuit(Suit.clubs);
    setBet(1);

  };


  const handleResetPlayers  = () => {
    setPlayers([]);
    resetPlayers();
  };

  return (
    <div>
      <h2 style={{ fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "40px"}}>Enter players</h2>
      <div>
        <input style={{ fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "105px", width: "400px"}}
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div>
        <select style={{fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "170px"}}
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
      <label htmlFor="betSize" style={{ fontSize: "45px", position: "absolute", marginLeft: "1500px", marginTop: "10px", top: "235px"}}>(Bet size)</label>
        <input style={{fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "235px", width: "275px"}}
          type="number"
          placeholder= "Bet size"
          value={bet}
          onChange={(e) => setBet(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <button onClick={handleSubmit} style={{fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "300px"}}>Enter Player</button>
      </div>
      {players.length > 0 && (
        <div className="player-info">
          <h3>Players:</h3>
          <ul>
            {players.map((player, index) => (
              <li key={index} style={{ color: suitColor(player.suit) }}>
                {player.playerName}, {emojiSuitMap[player.suit]}, {player.bet}
              </li>
            ))}
          </ul>
        </div>
      )}
            <div>
            <button onClick={handleResetPlayers } style={{ display: players.length >= 1 ? 'block' : 'none', fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "375px"}}>
  Reset Players
</button>
<Horse nicknames="Testi"/>
      </div>
    </div>
  );
}

export default PlayerInfo;