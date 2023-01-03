import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Login = () => {
    return (
        <Box sx={{background: 'white', width: '100%', height: '100vh'}}>
            <Box sx={{position:'relative', top: '170px', alignItems: 'center', display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Typography variant='h4' sx={{marginBottom: "30px", fontFamily:['-apple-system', 'sans-serif'], fontWeight: 700}}>Sign In</Typography>
                <TextField id="outlined-basic" label="Username" variant="outlined"  sx={{margin: '7px auto', width: '320px'}}/>
                <TextField id="outlined-basic" label="Password" variant="outlined"  sx={{margin: '7px auto', width: '320px'}}/>
                <Button variant="contained" sx={{width: '320px', margin: '7px auto', height: '52px', left: '0', textTransform: 'none'}}>
                    <Typography sx={{fontFamily:['-apple-system', 'sans-serif'], fontWeight: 400, fontSize: '18px'}}>Continue</Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default Login;