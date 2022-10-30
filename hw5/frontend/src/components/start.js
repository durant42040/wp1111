import React, { useEffect, useState } from 'react';
import {startGame} from '../axios'

function Start({handleStart}) {
  return (
    <button onClick={async () => {await startGame(); handleStart()}}>Start</button>
  );
}

export default Start;