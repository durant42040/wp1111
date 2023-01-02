import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import axios from "axios";
import BoxScoreRow from "./BoxScoreRow";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item. replace('./',"")] = r(item); });
    return images;
}

const images = importAll(require. context('../images', false, /\.(png|jpe? g|svg)$/));

const BoxScore = ({homeBoxScore, roadBoxScore}) => {
    if(homeBoxScore && roadBoxScore) {
        return (
            <TableContainer component={Paper} sx={{margin: '195px 0 250px 0'}}>
                <Box sx={{display: 'flex', margin: '5px 0 0 15px'}}>
                    <img className='image3' src={images[roadBoxScore[0]?.team.abbreviation + '.png']}/>
                    <Typography variant="h7" sx={{
                        fontFamily: ['-apple-system', 'sans-serif'].join(','),
                        fontWeight: 700,
                        margin: '6px 10px'
                    }}> {roadBoxScore[0]?.team.full_name}</Typography>
                </Box>
                <Table sx={{ minWidth: 650}} size="small">
                    <TableHead>
                        <BoxScoreRow row='start'/>
                    </TableHead>
                    <TableBody>
                        {roadBoxScore.slice(0,5).map((row, i) => {
                            return (
                                <BoxScoreRow key={i} row={row}/>
                            )
                        })}
                    </TableBody>
                    <TableHead>
                        <BoxScoreRow row='bench'/>
                    </TableHead>
                    <TableBody>
                        {roadBoxScore?.slice(5,roadBoxScore?.length-1).map((row, i) => {
                            return (
                                <BoxScoreRow key={i} row={row}/>
                            )
                        })}
                    </TableBody>
                    <TableHead>
                        <BoxScoreRow row={roadBoxScore[roadBoxScore?.length-1]}/>
                    </TableHead>
                    <Box sx={{display: 'flex', margin: '5px 0 0 15px'}}>
                        <img className='image3' src={images[homeBoxScore[0]?.team.abbreviation + '.png']}/>
                        <Typography variant="h7" sx={{
                            fontFamily: ['-apple-system', 'sans-serif'].join(','),
                            fontWeight: 700,
                            margin: '6px 10px'
                        }}> {homeBoxScore[0]?.team.full_name}</Typography>
                    </Box>
                    <TableHead>
                        <BoxScoreRow row='start'/>
                    </TableHead>
                    <TableBody>
                        {homeBoxScore?.slice(0,5).map((row, i) => (
                            <BoxScoreRow key={i} row={row}/>
                        ))}
                    </TableBody>
                    <TableHead>
                        <BoxScoreRow row='bench'/>
                    </TableHead>
                    <TableBody>
                        {homeBoxScore?.slice(5,homeBoxScore?.length-1).map((row, i) => (
                            <BoxScoreRow key={i} row={row}/>
                        ))}
                    </TableBody>
                    <TableHead>
                        <BoxScoreRow row={homeBoxScore[homeBoxScore?.length-1]}/>
                    </TableHead>
                </Table>
            </TableContainer>
        );
    }
}

export default BoxScore;