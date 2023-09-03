import React, { useState } from 'react';
import './Results.css';

enum Suit {
	clubs = '♣️',
	diamonds = '♦️',
	hearts = '♥️',
	spades = '♠️',
  }

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
        <h2> Results </h2>
        <h3 style={{ color: color }}> Winner: {winner}</h3>
        <div>
        <h4>Players:</h4>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.playerName}, {player.suit}, {player.bet}
            </li>
          ))}
        </ul>
      </div>
    </div>)
}

export default Results;