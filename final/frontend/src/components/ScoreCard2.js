import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import './ScoreCard2.css'
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from "@mui/material/Paper";
import BoxScoreRow from "./BoxScoreRow";
import {useData} from "../hooks/useData";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item. replace('./',"")] = r(item); });
    return images;
}

const images = importAll(require. context('../images', false, /\.(png|jpe? g|svg)$/));

const Gridstyles = {
    textTransform: 'none',
    borderColor: '#2853d4',
    color: '#5275de',
    height: '30px',
    borderRadius: '18.25px',
    margin: '5px auto'
}

const ScoreCard = ({game}) => {
    const {setActive2} = useData();
    const navigate = useNavigate()
    const color = (team) => {
        if(game?.home_team_score === game?.visitor_team_score) return 'grey'
        if (team === 0) {
            return (game?.home_team_score > game?.visitor_team_score) ? 'black' : 'grey';
        } else {
            return (game?.home_team_score > game?.visitor_team_score) ? 'grey' : 'black'
        }
    }
    console.log(game)



    if(game.period === 0 || game.hgameLeader?.name) return (
        <Card className='card3' sx={{borderRadius: 0}}>
            <CardContent sx={{height: '100%', width:'100%', alignItems: 'center', padding:'16px 16px 0 16px',
            }}>
                <Grid container spacing={2} sx={{height: '100%', '&::after': {
                    content: '""',
                    width: '95%',
                    height: '2px',
                    background: '#d8d8da',
                    position: 'relative',
                    left: '22px',
                    top: game?.period == 0?'-108px':'-135px'
                }}}>
                    <Grid item xs={10} sx={{textAlign: 'center', alignContent: 'center', height: '100%'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box sx={{display: 'flex'}}>
                                <img src={images[game?.visitor_team.abbreviation + '.png']}/>
                                <Typography variant="h6" sx={{
                                    fontFamily: ['-apple-system', 'sans-serif'].join(','),
                                    fontWeight: 500,
                                    color: color(1),
                                    margin: '5px 10px'
                                }}> {game?.visitor_team.full_name}</Typography>
                            </Box>
                            <Box sx={{display: 'flex'}}>
                                <Typography sx={{
                                    fontFamily: ['-apple-system', 'sans-serif'].join(','),
                                    color: color(1),
                                    fontWeight: 700,
                                    fontSize: (game.period === 0)? '18px':'25px',
                                    margin: (game.period === 0)?'10px 0 0 0':'auto 20px auto 0'
                                }}>{(game.period === 0)? game.status : game?.visitor_team_score}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', marginTop: '10px', justifyContent: 'space-between'}}>
                            <Box sx={{display: 'flex', maxHeight: '42px'}}>
                                <img src={images[game?.home_team.abbreviation + '.png']}/>
                                <Typography variant="h6" sx={{
                                    fontFamily: ['-apple-system', 'sans-serif'].join(','),
                                    fontWeight: 500,
                                    color: color(0),
                                    margin: '5px 10px',
                                    minWidth: '260px',
                                    textAlign: 'left',
                                }}> {game?.home_team.full_name}</Typography>
                                <TableContainer component={Paper} sx={{display: !game.hgameLeader?.name && 'none', boxShadow: 'none', position: 'relative', bottom: '60px', left: '20px', overflow: 'visible'}}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Game Leaders</TableCell>
                                                <TableCell align="left">PTS</TableCell>
                                                <TableCell align="left">AST</TableCell>
                                                <TableCell align="left">REB</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left">{game.vgameLeader?.name}</TableCell>
                                                <TableCell align="left">{game.vgameLeader?.pts}</TableCell>
                                                <TableCell align="left">{game.vgameLeader?.ast}</TableCell>
                                                <TableCell align="left">{game.vgameLeader?.reb}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left">{game.hgameLeader?.name}</TableCell>
                                                <TableCell align="left">{game.hgameLeader?.pts}</TableCell>
                                                <TableCell align="left">{game.hgameLeader?.ast}</TableCell>
                                                <TableCell align="left">{game.hgameLeader?.reb}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box sx={{display: 'flex', maxHeight: '42px'}}>
                                <Typography sx={{
                                    fontFamily: ['-apple-system', 'sans-serif'].join(','),
                                    color: color(0),
                                    fontWeight: 700,
                                    fontSize: '25px',
                                    margin: 'auto 20px auto 0'
                                }}>{game.period !== 0 && game?.home_team_score}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    {game.period !== 0 && <Grid item xs={2} sx={{textAlign: 'left', display: 'block', position: 'relative', top: '0px'}}>
                        <Button variant={'outlined'} sx={Gridstyles} onClick={() => {
                            game.period !== 0 && navigate('/game/' + game.id)
                            setActive2('Box Score')
                        }}>Box Score</Button>
                        <Button variant='outlined' sx={Gridstyles} onClick={() => {
                            game.period !== 0 && navigate('/game/' + game.id)
                            setActive2('Team Stats')
                        }}>Team Stats</Button>
                        {game.status === 'Final' && <Button variant='outlined' sx={Gridstyles}
                                                            onClick={() => window.open(`https://www.youtube.com/results?search_query=${game?.visitor_team.name}+vs+${game?.home_team.name}`)}>Highlights</Button>}
                    </Grid>}
                </Grid>
            </CardContent>
        </Card>
    )

}

export default ScoreCard;















