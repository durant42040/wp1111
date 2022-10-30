import React, { useEffect, useState } from 'react';

function Game({handleGuess, status}) {
    const [number, setNumber] = useState('')
  return (
      <div>
        <p>Guess a number between 1 to 100</p>
        <input onChange={(e) => {setNumber(e.target.value)}} value={number}></input>
        <button onClick={() => {handleGuess(number); setNumber('')}}>guess!</button>
        <p>{status}</p>
      </div>
  );
}

export default Game;