import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import React from "react";

const TeamStats = ({homeBoxScore, roadBoxScore, homeName, roadName}) => {
    const total = (boxScore) => {
        return {
            pts: boxScore?.reduce((a, e) => a + e.pts, 0),
            ast: boxScore?.reduce((a, e) => a + e.ast, 0),
            reb: boxScore?.reduce((a, e) => a + e.reb, 0),
            stl: boxScore?.reduce((a, e) => a + e.stl, 0),
            blk: boxScore?.reduce((a, e) => a + e.blk, 0),
            turnover: boxScore?.reduce((a, e) => a + e.turnover, 0),
            oreb: boxScore?.reduce((a, e) => a + e.oreb, 0),
            dreb: boxScore?.reduce((a, e) => a + e.dreb, 0),
            pf: boxScore?.reduce((a, e) => a + e.pf, 0),
            fgm: boxScore?.reduce((a, e) => a + e.fgm, 0),
            fga: boxScore?.reduce((a, e) => a + e.fga, 0),
            fg3m: boxScore?.reduce((a, e) => a + e.fg3m, 0),
            fg3a: boxScore?.reduce((a, e) => a + e.fg3a, 0),
            ftm: boxScore?.reduce((a, e) => a + e.ftm, 0),
            fta: boxScore?.reduce((a, e) => a + e.fta, 0),
        }
    }
    const homeTotal = total(homeBoxScore)
    const roadTotal = total(roadBoxScore)

    return (
        <Container>
            <TableContainer component={Paper} sx={{margin: '200px auto', width: '600px', borderRadius: '10px'}}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{width: '200px'}}>{roadName}</TableCell>
                            <TableCell align="center" sx={{width: '200px'}}>Teams</TableCell>
                            <TableCell align="right" sx={{width: '200px'}}>{homeName}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">{roadTotal.pts}</TableCell>
                            <TableCell align="center">Points</TableCell>
                            <TableCell align="right">{homeTotal.pts}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.fgm} - {roadTotal.fga}</TableCell>
                            <TableCell align="center">Field Goals</TableCell>
                            <TableCell align="right">{homeTotal.fgm} - {homeTotal.fga}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{Math.round(roadTotal.fgm/roadTotal.fga*1000)/10}%</TableCell>
                            <TableCell align="center">FG%</TableCell>
                            <TableCell align="right">{Math.round(homeTotal.fgm/homeTotal.fga*1000)/10}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.fg3m} - {roadTotal.fg3a}</TableCell>
                            <TableCell align="center">3P</TableCell>
                            <TableCell align="right">{homeTotal.fg3m} - {homeTotal.fg3a}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{Math.round(roadTotal.fg3m/roadTotal.fg3a*1000)/10}%</TableCell>
                            <TableCell align="center">3P%</TableCell>
                            <TableCell align="right">{Math.round(homeTotal.fg3m/homeTotal.fg3a*1000)/10}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.ftm} - {roadTotal.fta}</TableCell>
                            <TableCell align="center">Free Throws</TableCell>
                            <TableCell align="right">{homeTotal.ftm} - {roadTotal.fta}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{Math.round(roadTotal.ftm/roadTotal.fta*1000)/10}%</TableCell>
                            <TableCell align="center">FT%</TableCell>
                            <TableCell align="right">{Math.round(homeTotal.ftm/homeTotal.fta*1000)/10}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.ast}</TableCell>
                            <TableCell align="center">Assists</TableCell>
                            <TableCell align="right">{homeTotal.ast}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.stl}</TableCell>
                            <TableCell align="center">Steals</TableCell>
                            <TableCell align="right">{homeTotal.stl}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.blk}</TableCell>
                            <TableCell align="center">Blocks</TableCell>
                            <TableCell align="right">{homeTotal.blk}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.reb}</TableCell>
                            <TableCell align="center">Rebounds</TableCell>
                            <TableCell align="right">{homeTotal.reb}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.oreb}</TableCell>
                            <TableCell align="center">Offensive Rebounds</TableCell>
                            <TableCell align="right">{homeTotal.oreb}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.dreb}</TableCell>
                            <TableCell align="center">Defensive Rebounds</TableCell>
                            <TableCell align="right">{homeTotal.dreb}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.turnover}</TableCell>
                            <TableCell align="center">Turnovers</TableCell>
                            <TableCell align="right">{homeTotal.turnover}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">{roadTotal.pf}</TableCell>
                            <TableCell align="center">Fouls</TableCell>
                            <TableCell align="right">{homeTotal.pf}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default TeamStats;