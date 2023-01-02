import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {useData} from "../hooks/useData";

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const Datepicker = ({getGames}) => {
    const {setI, months} = useData();
    const [week, setWeek] = useState(0);
    const [current, setCurrent] = useState(90)

    const dates = [];
    const cdate = new Date();

    cdate.setDate(cdate.getDate() - 90);
    for (let i = 0; i < 180; i++) {
        dates.push({year: cdate.getFullYear(), month: cdate.getMonth() + 1, date: cdate.getDate(), day: (cdate.getDay() === 0)? 7: cdate.getDay()})
        cdate.setDate(cdate.getDate() + 1);
    }


    return (
        <Box sx={{display: 'flex', justifyContent: 'space-around', margin: 'auto'}}>
            <IconButton sx={{width: '50px', height:'50px'}} onClick={() => {
                week > -56 && setWeek(week-7);
            }}><ArrowBackIosIcon/></IconButton>
            {weekdays.map((e, i) => {
                const t = 90 - dates[90].day + i + week+1
                return (
                    <Box key={i} sx={{width: '50px', height:'50px', minWidth:'50px'}} onClick={() => {
                        setCurrent(t)
                        setI(0)
                        getGames(dates[t-1].year, dates[t-1].month, dates[t-1].date)
                    }}>
                        <Typography variant="h6" sx={{textAlign: 'center', cursor: 'pointer', fontWeight: (current === t)? 700 : 300}}>{e}</Typography>
                        <Box sx={{textAlign: 'center', cursor: 'pointer'}}>
                            <Typography variant="h7" sx={{fontWeight: (current === t)? 700 : 300}}>{months[dates[t].month - 1]} {dates[t].date}</Typography>
                        </Box>

                    </Box>
                )
            })}
            <IconButton sx={{width: '50px', height:'50px'}} onClick={() => {
                week < 56 && setWeek(week+7)
            }}><ArrowForwardIosIcon/></IconButton>
        </Box>
    )
}

export default Datepicker;