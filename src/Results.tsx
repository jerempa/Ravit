import React, { useState } from 'react';
import './Results.css';

interface ResultsProps {
    winner: string; 
  }

function Results({winner}: ResultsProps) {

  return (
    <div className="results">
        <h2> Results </h2>
        <h3> Winner: {winner}</h3>
    </div>)
}

export default Results;