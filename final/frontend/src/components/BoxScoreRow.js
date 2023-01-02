import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";

const tranfermins = (x) => {
    if(x[0] == 0) return x[1];
    return x;
}

const BoxScoreRow = ({row}) => {
    if(row === 'start' || row === 'bench') return (
        <TableRow sx={{fontSize: '21%'}}>
            <TableCell>{row ==='start'? 'STARTERS' : 'BENCH'}</TableCell>
            <TableCell align="right">MIN</TableCell>
            <TableCell align="right">PTS</TableCell>
            <TableCell align="right">AST</TableCell>
            <TableCell align="right">REB</TableCell>
            <TableCell align="right" sx={{padding:'1% 1%'}}>FG</TableCell>
            <TableCell align="right" sx={{padding:'1% 1%'}}>3PT</TableCell>
            <TableCell align="right" sx={{padding:'1% 1%'}}>FT</TableCell>
            <TableCell align="right">DREB</TableCell>
            <TableCell align="right">OREB</TableCell>
            <TableCell align="right">STL</TableCell>
            <TableCell align="right">BLK</TableCell>
            <TableCell align="right">TOV</TableCell>
            <TableCell align="right">PF</TableCell>
        </TableRow>
    )

    if(row?.min !== '00') return (
        <TableRow
        sx={{"&:last-child td, &:last-child th": {border: 0}}}
    >
        <TableCell component="th" scope="row">{row?.player.first_name + " " + row?.player.last_name}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row && tranfermins(row?.min)}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.pts}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.ast}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.reb}</TableCell>
        <TableCell align="right" sx={{width: '5%', padding: '1% 1% 1% 0'}}>{row?.fgm+'-'+row?.fga}</TableCell>
        <TableCell align="right" sx={{width: '5%', padding: '1% 1% 1% 0'}}>{row?.fg3m+'-'+row?.fg3a}</TableCell>
        <TableCell align="right" sx={{width: '5%', padding: '1% 1% 1% 0'}}>{row?.ftm+'-'+row?.fta}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.dreb}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.oreb}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.stl}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.blk}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.turnover}</TableCell>
        <TableCell align="right" sx={{fontSize: '95%'}}>{row?.pf}</TableCell>
    </TableRow>);
}

export default BoxScoreRow