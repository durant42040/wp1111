import './css/Board.css';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(boardSize**2-mineNum);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [remainFlagNum, setRemainFlagNum] = useState(0);
    const [win, setWin] = useState(false);

    useEffect(() => {
        freshBoard();
    }, []);

    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        setNonMineCount(boardSize**2-mineNum);
        setRemainFlagNum(mineNum);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }
    if(nonMineCount === 0 && !win){
        setTimeout(() => {
               setWin(true);
               }, 1000);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        if(!newBoard[x][y].revealed && newFlagNum !== 0){
            if(newBoard[x][y].flagged){
                newFlagNum++
            }
            else{
                newFlagNum--
            }
            newBoard[x][y].flagged = !newBoard[x][y].flagged;
            setBoard(newBoard);
            setRemainFlagNum(newFlagNum)
        }
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        var newNonMinesCount = nonMineCount;
        const revealed = (board, x, y) => {
    if(!board[x][y].revealed){
                        newNonMinesCount--;
                        board[x][y].revealed = true;
                    }
    const reveal0 = (x,y) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                try{
                    if(!board[x - 1 + i][y - 1 + j].revealed){
                        newNonMinesCount--;
                        board[x - 1 + i][y - 1 + j].revealed = true;
                    }
                }
                catch (e) {
                }
            }
        }
    }
    if(board[x][y].value === 0){
        reveal0(x,y);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                try{
                    if(board[x-1+i][y-1+i].value === 0){
                    reveal0(x-1+i,y-1+i);
                }
                }
                catch (e) {
                }
            }
        }
    }


    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    return { board };
};
        revealed(newBoard, x, y);
        setNonMineCount(newNonMinesCount);
        setBoard(newBoard);
        if(board[x][y].value === '💣'){
            for(let i=0; i<boardSize; i++){
                for(let j=0; j<boardSize; j++){
                    if(i !== x && j !== y && board[i][j].value === '💣'){
                        revealed(newBoard, i, j)
                    }
                }
            }
            setTimeout(() => {
               setGameOver(true);
               }, 1000);
        }
        return;
    };



    return (
        <div className='boardPage' >
            <div className='boardContainer' style={{width: 34*boardSize+"px"}} >

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} win = {win}/>
                {board.map((i) =>
                    <div id={"row" + board.indexOf(i)} style = {{display:'flex'}}>
                        {i.map((j) => <Cell rowIdx={j.x} colIdx={j.y} detail = {board[j.x][j.y]}  updateFlag = {updateFlag} revealCell = {revealCell}/>)}
                    </div>
                    )
                }

            </div>
            {(gameOver) && <Modal restartGame = {restartGame} win={win} backToHome={backToHome}/>}
            {win && <Modal restartGame = {restartGame} win={win} backToHome={backToHome}/>}


        </div>

    );



}

export default Board