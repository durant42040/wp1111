import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
import "../containers/MineSweeper"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver , win }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000);
  });

  useEffect(() => {setSTime(time)
  }, [gameOver || win]);

  if((gameOver || win) && time !== 0 && sTime !== 0){
    setTime(0);
  }


  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver || win? sTime : time}
        </div>
      </div>
    </div>
  );
}
