import './Homepage.css';
import React, {useEffect} from 'react'
import ScoreCard from "../components/ScoreCard";
import Datepicker from "../components/Datepicker";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Newscard from '../components/NewsPage'
import {useData} from "../hooks/useData";

const Homepage = () => {
    const {games, getGames, active, setActive} = useData()

    useEffect(() => {
        setActive('Home')
    }, [active])

    return (
        <>
            <div className={'container'}>
                <div className='news'>
                    <Newscard/>
                </div>
                <div className='scores'>
                    <Card className='card' sx={{borderRadius: '5px', boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.5)', height: '90px'}}>
                        <CardContent>
                            <Datepicker getGames={getGames}/>
                        </CardContent>
                    </Card>
                    {games?.map((game, i) => (
                        <ScoreCard key={i} game={game}/>
                    ))
                    }
                </div>
            </div>
        </>
    );
}

export default Homepage;
