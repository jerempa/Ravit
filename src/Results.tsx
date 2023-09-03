import React, { useState } from 'react';
import './Results.css';
import { Suit } from './deck';


interface Player {
	playerName: string;
	suit: Suit;
	bet: number;
  }

interface ResultsProps {
    winner: string;
    color: string;
    players: Player[]; 
  }

function Results({winner, color, players}: ResultsProps) {

  return (
    <div className="results">
        <h3> Results: </h3>
        <h3 style={{ color: color }}> Winner: {winner}</h3>
        <div>
        <h4>Amount of drinks:</h4>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
                {player.playerName} ({player.suit}) {player.suit === winner ? `shares ${player.bet * 2} hörppys` : `drinks ${player.bet} hörppys`}</li>
          ))}
        </ul>
      </div>
    </div>)
}

export default Results;