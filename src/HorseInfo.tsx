import React, { useState } from 'react';
import './PlayerInfo.css';
import Card, { suitColor, emojiSuitMap } from './Card';
import Results from './Results';
import { Suit } from './deck';



interface Nickname {
  nickname: string;
  suit: Suit;
}

interface HorseInfoProps {
    nicknames: Nickname[];
}

function HorseInfo({ nicknames }: HorseInfoProps) {


  return (
    <div>
      <h2 style={{ fontSize: "45px", position: "absolute", marginLeft: "1700px", marginTop: "10px", top: "40px"}}>Horse nicknames?!?</h2>
      <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "1650px", marginTop: "60px", top: "40px"}}>♣️</h3>
        <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "1650px", marginTop: "150px", top: "40px", color: "red"}}>♦️</h3>
        <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "2000px", marginTop: "150px", top: "40px", color: "red"}}>♥️</h3>
        <h3 style={{ fontSize: "85px", position: "absolute", marginLeft: "2000px", marginTop: "60px", top: "40px"}}>♠️</h3>
        <div>
        {nicknames.length > 0 && (
        <div className="horse-info">
          <h3>Horse Nicknames:</h3>
          <ul>
          {nicknames.map((nickname, index) => (
              <li key={index} style={{ color: suitColor(nickname.suit) }}>
                {nickname.nickname}, {emojiSuitMap[nickname.suit]}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}

export default HorseInfo;