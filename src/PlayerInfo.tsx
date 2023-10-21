import React, { useState } from 'react';
import './PlayerInfo.css';
import { suitColor, emojiSuitMap } from './Card';
import { Suit } from './deck';


interface Player {
  playerName: string;
  suit: Suit;
  bet: number;
}

interface Nickname {
  nickname: string;
  suit: Suit;
}

interface PlayerInfoProps {
  onPlayerSubmit: (player: Player) => void;
  resetPlayers: () => void;
  onNicknameSubmit: (nickname: Nickname) => void;

}

function PlayerInfo({onPlayerSubmit, resetPlayers, onNicknameSubmit }: PlayerInfoProps) {
  const [playerName, setPlayerName] = useState('');
  const [suit, setSuit] = useState<Suit>(Suit.clubs); // Default to clubs
  const [bet, setBet] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [nickname, setNickname] = useState('');
  const [nicknames, setNicknames] = useState<Nickname[]>([]);


  const handleSubmit = () => {

    const newPlayer = {
      playerName,
      suit,
      bet,
    };

    const newNickname = {
      nickname,
      suit,
    };

    onPlayerSubmit(newPlayer);
    onNicknameSubmit(newNickname);

    setNicknames([...nicknames, newNickname]);
    setNickname('');
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
      {/*<div>
        <input style={{fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "235px", width: "400px"}}
          type="text"
          placeholder="Horse nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div> */}
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
            <button onClick={handleResetPlayers } style={{ display: players.length >= 1 ? 'block' : 'none', fontSize: "45px", position: "absolute", marginLeft: "1200px", marginTop: "10px", top: "365px"}}>
  Reset Players
</button>
      </div>
    </div>
  );
}

export default PlayerInfo;