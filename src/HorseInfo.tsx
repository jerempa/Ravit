import React, { useState } from 'react';
import './PlayerInfo.css';
import Card, { suitColor, emojiSuitMap } from './Card';
import Results from './Results';
import { Suit } from './deck';


interface Player {
  playerName: string;
  suit: Suit;
  bet: number;
}
interface Horse {
  suit: Suit;
  nickname: string;
}

interface HorseInfoProps {
    nicknames: string;
}

function HorseInfo({ }: HorseInfoProps) {
  const [playerName, setPlayerName] = useState('');
  const [suit, setSuit] = useState<Suit>(Suit.clubs); // Default to clubs
  const [bet, setBet] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);


  return (
    <div>
      <h2 style={{ fontSize: "45px", position: "absolute", marginLeft: "1700px", marginTop: "10px", top: "40px"}}>Horse nicknames?!?</h2>
      <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "1650px", marginTop: "60px", top: "40px"}}>♣️</h3>
        <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "1650px", marginTop: "150px", top: "40px", color: "red"}}>♦️</h3>
        <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "2000px", marginTop: "150px", top: "40px", color: "red"}}>♥️</h3>
        <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "2000px", marginTop: "60px", top: "40px"}}>♠️</h3>
    </div>
  );
}

export default HorseInfo;