import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {restart} from '../axios'
function Win({restartGame, win}) {
    const [answer, setAnswer] = useState('0')
    const ans = async () => {
        const {data: {msg}} = await axios.get('http://localhost:4000/api/guess/start')
        setAnswer(msg)
    }

    ans()

  return (
    <>
        <p>you won! the number was {answer}.</p>
        <button onClick={restartGame}>Restart</button>
    </>
  );
}

export default Win;