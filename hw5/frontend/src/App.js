import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Game from './components/game'
import Start from './components/start'
import Win from './components/win'
import {startGame, guess, restart} from './axios'

function App() {
    const [start, setStart] = useState(false)
    const [win, setWin] = useState(false)
    const [status, setStatus] = useState('')

    const restartGame = async () => {
        await restart()
        setWin(false)
    }

    const handleGuess = async (e) => {
        const response = await guess(e)
        if(response === 'Equal') setWin(true)
        else setStatus(response)
    }

    const handleStart = async () => {
        const response = await startGame()
        if(response === 'The game has started.') setStart(true)
    }







  return (
      <div id ='div'>
          {win? <Win restartGame={restartGame} win={win}/>:start? <Game handleGuess={handleGuess} status={status}/>:<Start handleStart={handleStart}/>}
      </div>

  );
}

export default App;
