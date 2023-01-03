import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import './ScoreCard.css'
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useNavigate} from "react-router-dom";
import {useData} from "../hooks/useData";
import React from "react";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', "")] = r(item);
    });
    return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe? g|svg)$/));

const Gridstyles = {
    textTransform: 'none',
    borderColor: '#2853d4',
    color: '#5275de',
    borderRadius: '18.25px',
    minWidth: '110px'
}

const ScoreCard = ({game}) => {
    const {setActive2} = useData()
    const navigate = useNavigate()
    const color = (team) => {
        if (game?.period === 0) return 'grey'
        if (game?.status !== 'Final') return 'black'
        if (team === 0) {
            return (game?.home_team_score > game?.visitor_team_score) ? 'black' : 'grey';
        }
        return (game?.home_team_score > game?.visitor_team_score) ? 'grey' : 'black'
    }

    return (
        <Card className='card' sx={{borderRadius: '5px', boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.5)'}}>
            <CardContent sx={{height: '100%', alignItems: 'center'}}>
                <Grid className='grid' container spacing={2}>
                    <Grid item xs={3} sx={{textAlign: 'center'}}>
                        <img src={images[game?.visitor_team.abbreviation + '.png']}/>
                        <Typography variant="h6" sx={{
                            fontFamily: ['Roboto', 'sans-serif'].join(','),
                            fontWeight: 300,
                            color: color(1)
                        }}> {(game?.visitor_team.name === "Trail Blazers") ? "Blazers" : game?.visitor_team.name}</Typography>
                    </Grid>
                    <Grid item xs={(game.period === 0) ? 1 : 2} sx={{textAlign: 'center'}}>
                        <Typography variant="h4" sx={{
                            fontFamily: ['Lato', 'sans-serif'].join(','),
                            color: color(1),
                            fontWeight: 400
                        }}>{game.period !== 0 && game?.visitor_team_score}</Typography>
                    </Grid>
                    <Grid item xs={(game.period === 0) ? 4 : 2} sx={{textAlign: 'center'}}>
                        <Typography variant="h6" sx={{
                            fontFamily: ['-apple-system', 'sans-serif'].join(','),
                            fontWeight: 700,
                        }}>{game.status.substring(0, 8) || game?.time.time_in_period}</Typography></Grid>
                    <Grid item xs={(game.period === 0) ? 1 : 2} sx={{textAlign: 'center'}}>
                        <Typography variant="h4" sx={{
                            fontFamily: ['Lato', 'sans-serif'].join(','),
                            color: color(0),
                            fontWeight: 400
                        }}>{game.period !== 0 && game?.home_team_score}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{textAlign: 'center'}}>
                        <img src={images[game?.home_team.abbreviation + '.png']}/>
                        <Typography variant="h6" sx={{
                            fontFamily: ['Roboto', 'sans-serif'].join(','),
                            fontWeight: 300,
                            color: color(0)
                        }}>
                            {(game?.home_team.name === "Trail Blazers") ? "Blazers" : game?.home_team.name}
                        </Typography>
                    </Grid>
                </Grid>
                {game.period !== 0 && <Grid container spacing={2} sx={{position: 'relative', top: '-5px'}}>
                    <Grid item>
                        <Button variant={'outlined'} sx={Gridstyles} onClick={() => {
                            navigate('/game/' + game.id)
                            setActive2('Box Score')
                        }}>Box Score</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'} sx={Gridstyles} onClick={() => {
                            navigate('/game/' + game.id)
                            setActive2('Team Stats')
                        }}>Team Stats</Button>
                    </Grid>
                    {game.status === 'Final' && <Grid item>
                        <Button variant='outlined' sx={Gridstyles}
                                onClick={() => window.open(`https://www.youtube.com/results?search_query=${game?.visitor_team.name}+vs+${game?.home_team.name}`)}>Highlights</Button>
                    </Grid>}
                </Grid>}
            </CardContent>
        </Card>
    )
}

export default ScoreCard;