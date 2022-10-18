/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    return (
        <div className="Board-container">
            {turn == 0? <CurRow key="row_0" id="row_0" curGuess={curGuess} rowIdx={0}/>:<Row key="row_0" id="row_0" guess={guesses[0]} rowIdx={0}/>}
                {turn == 1? <CurRow key="row_1" id="row_1" curGuess={curGuess} rowIdx={1}/>:<Row key="row_1" id="row_1" guess={guesses[1]} rowIdx={1}/>}
                {turn == 2? <CurRow key="row_2" id="row_2" curGuess={curGuess} rowIdx={2}/>:<Row key="row_2" id="row_2" guess={guesses[2]} rowIdx={2}/>}
                {turn == 3? <CurRow key="row_3" id="row_3" curGuess={curGuess} rowIdx={3}/>:<Row key="row_3" id="row_3" guess={guesses[3]} rowIdx={3}/>}
                {turn == 4? <CurRow key="row_4" id="row_4" curGuess={curGuess} rowIdx={4}/>:<Row key="row_4" id="row_4" guess={guesses[4]} rowIdx={4}/>}
                {turn == 5? <CurRow key="row_5" id="row_5" curGuess={curGuess} rowIdx={5}/>:<Row key="row_5" id="row_5" guess={guesses[5]} rowIdx={5}/>}

            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            
        </div>
    )
};
export default Board;
