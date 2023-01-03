import Box from '@mui/material/Box';
import "./NavBar.css"
import logo from '../images/logo.png'
import {useNavigate} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {useData} from "../hooks/useData";
import Editor from "./Editor";
import Typography from "@mui/material/Typography";

const buttonStyles = {
    borderColor: '#8c8b8b',
    color: '#383838',
    borderRadius: '17px',
    height: '34px',
    '&:hover': {
        backgroundColor: '#e7e7e7',
        borderColor: '#8c8b8b',
        boxShadow: 'none',
    },
}

const navigateArray = ['/', '/scores']

const NavBar = ({pages}) => {
    const {
        active,
        setActive,
        open,
        setOpen,
        setEdit,
        setContent,
        setDescription,
        setHeadline,
        setImage,
        setTitle
    } = useData()

    const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();

    const navigate = useNavigate();

    const handleAdd = () => {
        setOpen(true)
        setDescription('')
        setTitle('')
        setEdit(false)
        setImage('')
        setHeadline(false)
        setContent('')
    }

    if (window.location.href.slice(-5) !== 'login') return (
        <Box className='Nav'>
            <div className='NavBar'>
                <img src={logo} id='logo'/>
                {pages.map((page, i) => (
                    <Box className='page' key={page} id={page} onClick={() => {
                        setActive(page);
                        navigate(navigateArray[i])
                    }}
                         sx={{
                             cursor: 'pointer',
                             '&::after': {
                                 content: '""',
                                 width: (page === 'ScoreBoard') ? '67%' : '50%',
                                 height: '2px',
                                 background: '#2853d4',
                                 position: 'absolute',
                                 bottom: '-6px',
                                 left: '20px'
                             },
                             ...(active === page && {
                                 color: '#2853d4', '&::after': {content: '""', transform: 'scale(1,1) !important'}
                             })
                         }}
                    >{page}</Box>
                ))}
            </div>
            <Box>
                {isAuthenticated ?
                    <Box sx={{
                        marginTop: '5px',
                        position: 'relative',
                        right: open && '15px',
                        display: 'flex',
                        gap: '5px'
                    }}>
                        <Typography sx={{fontWeight: '500', position: 'relative', top: '5px', right: '5px'}}>
                            {user.nickname}
                        </Typography>
                        <img className='profilepic' src={user.picture}/>
                        <Button variant='outlined' sx={{
                            maxWidth: '34px',
                            minWidth: '34px',
                            marginRight: '5px',
                            ...buttonStyles
                        }} onClick={() => handleAdd()}><AddIcon/></Button>
                        <Button sx={{
                            ...buttonStyles,
                            textTransform: 'none'
                        }} variant='outlined' onClick={() => logout({returnTo: window.location.origin})}>Log
                            Out</Button>
                    </Box> :
                    <Button className='loginbutton'
                            sx={{
                                textTransform: 'none',
                                ...buttonStyles,
                                marginTop: '3px',
                            }} variant='outlined' onClick={() => loginWithRedirect()}>Log In</Button>}
            </Box>
            <Editor/>
        </Box>
    );
}
export default NavBar;