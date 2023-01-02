import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import axios from "axios";
import BoxScore from "../components/BoxScore"
import NavBar from "../components/NavBar2"
import TeamStats from '../components/TeamStats'
import './Game.css'
import ScoreCard3 from "../components/ScoreCard3";
import CircularProgress from "@mui/material/CircularProgress";
import {useData} from "../hooks/useData";


const Game = () => {
    const [game, setGame] = useState(undefined)
    const {active2, setActive2, setI, i} = useData()
    const { id } = useParams()
    const instance = axios.create({
        baseURL: 'https://www.balldontlie.io/api/v1'
    })
    const [boxScore, setBoxScore] = useState(undefined)
    const [homeBoxScore, setHomeBoxScore] = useState(undefined)
    const [roadBoxScore, setRoadBoxScore] = useState(undefined)

    const getBoxScore = async () => {
        const {
            data: {data}
        } = await instance.get('/stats?seasons[]=2022&per_page=50&game_ids[]='+id);
        setBoxScore(data)
    }

    useEffect(() => {
        getBoxScore()
    }, []);

    useEffect(() => {
        if(boxScore){
            setHomeBoxScore(boxScore?.filter((e) => e.player.team_id === game?.home_team.id))
            setRoadBoxScore(boxScore?.filter((e) => e.player.team_id === game?.visitor_team.id))
        }
    }, [boxScore])

    const getGame = async () => {
        const data = await instance.get('/games/'+id);
        setGame(data.data)
    }


    const color = (team) => {
        if(game?.home_team_score === game?.visitor_team_score) return 'grey'
        if (team === 0) {
            return (game?.home_team_score > game?.visitor_team_score) ? 'black' : 'grey';
        }
        return (game?.home_team_score > game?.visitor_team_score) ? 'grey' : 'black'
    }

    useEffect(() => {
        getGame()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setI(i + 1)
        }, 1000)
    }, [i])

    const content = () => {
        switch (active2) {
            case 'Box Score':
                return <BoxScore homeBoxScore={homeBoxScore} roadBoxScore={roadBoxScore}/>
            case 'Team Stats':
                return <TeamStats homeBoxScore={homeBoxScore} roadBoxScore={roadBoxScore}
                                  homeName={game.home_team.full_name} roadName={game.visitor_team.full_name}/>
        }

    }

    if(!game || !homeBoxScore || !roadBoxScore) return <CircularProgress color="inherit" sx={{margin: '150px 50%'}}/>
    return (
        <Box sx={{marginTop: '61px'}}>
            <ScoreCard3 game={game} color={color}/>
            <NavBar active={active2} setActive={setActive2}/>
            {content()}
        </Box>

    )
}

export default Game











