import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Datepicker from "../components/Datepicker";
import ScoreCard from "../components/ScoreCard2";
import './ScoreBoard.css'
import React, {useEffect} from "react";
import {useData} from "../hooks/useData";


const ScoreBoard = () => {
    const {games, getGames, active, setActive} = useData()

    useEffect(() => {
        setActive('ScoreBoard')
    }, [active])


    return(
        <div className='wrapper2'>
            <Card className='card2' sx={{borderRadius: '10px 10px 0 0', height: '90px'}}>
                <CardContent>
                    <Datepicker getGames={getGames}/>
                </CardContent>
            </Card>
            {games?.map((game, i) => (
                <ScoreCard key={i} game={game}/>
            ))
            }
        </div>
    )
}

export default ScoreBoard;