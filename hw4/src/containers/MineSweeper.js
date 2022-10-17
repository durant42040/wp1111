import './MineSweeper.css';
import Board from '../components/Board'
import React, { useState } from 'react';
import HomePage from '../components/HomePage'

const MineSweeper = () => {
    const [startGame, setStartGame] = useState(false);      // A boolean variable. If true, show `Board`, else show `HomePage`.
    const [mineNum, setMineNum] = useState(10);             // A integer variable to store the number of mines in the game. The default value is 10.
    const [boardSize, setBoardSize] = useState(8);          // A integer variable to store the board size in the game. The default value is 8.

    var newmineNum = mineNum;
    var newboardSize = boardSize;

    const startGameOnClick = () => {
         setStartGame(true);
    }

    const mineNumOnChange = (e) => {
        setMineNum(e.target.value)
    }
// Advanced TODO: Change `boardSize` to the number you send by this function
    const boardSizeOnChange = (e) => {
        setBoardSize(e.target.value)
    }

    const backToHomeOnClick = () => {
        setStartGame(false);
    }

    return (
        <div className='mineSweeper'>
            {startGame?  <Board mineNum = {mineNum} boardSize={boardSize} backToHome={backToHomeOnClick}/> : <HomePage startGameOnClick={startGameOnClick} mineNum = {mineNum} boardSize={boardSize} mineNumOnChange={mineNumOnChange} boardSizeOnChange={boardSizeOnChange}/>}
        </div>
    );
}
export default MineSweeper;