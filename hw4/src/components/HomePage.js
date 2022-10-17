import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState(false);

  if(mineNum >= boardSize**2 && !error){
      setError(true)
  }
  if(mineNum < boardSize**2 && error){
      setError(false)
  }


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      <button className="btn" onClick={!error && startGameOnClick}>Start Game</button>
      <div className="controlContainer">
          <button className="btn" onClick={() => {setShowPanel(!showPanel)}}>Difficulty</button>
          {showPanel && <div className="controlWrapper">
              <div className="error">{error && "TOO MANY MINES!!"}</div>
              <div className="controlPanel">
                  <div className="controlCol">
                      <p className="controlTitle">Mines Number</p>
                      <input id="num" type="range" step="1" min="4" max = "100" defaultValue="10" onChange={mineNumOnChange}/>
                      <p className="controlNum" id="controlnum" style={{color: error && "#880000"}}>{mineNum}</p>
                  </div>
                  <div className="controlCol">
                      <p className="controlTitle">Board Size (nxn)</p>
                      <input id="size" type="range" step="1" min="3" max = "20" defaultValue="8" onChange={boardSizeOnChange}/>
                      <p className="controlNum" id="controlsize" style={{color: error && "#880000"}}>{boardSize}</p>
                  </div>
              </div>
          </div>}
      </div>





    </div>
  );

}
export default HomePage;   