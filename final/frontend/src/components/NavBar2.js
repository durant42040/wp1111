import Box from '@mui/material/Box';
import "./NavBar2.css"
const pages = ["Box Score", "Team Stats"]

const NavBar = ({active, setActive}) => {
    return (
        <div className='Nav2'>
            <div className='NavBar'>
                {pages.map((page, i) => (
                    <Box className='page2' key={page} id={page} onClick={() => {
                        setActive(page);
                    }}
                         sx={{
                             cursor: 'pointer',
                             '&::after': {
                                 content: '""',
                                 width: '65%',
                                 height: '2px',
                                 background: '#2853d4',
                                 position: 'absolute',
                                 bottom: '-6px',
                                 left: '20px'
                             },
                             ...(active === page && {
                                 color: '#2853d4', '&::after': {content: '""', transform: 'scale(1,1) !important'}})
                    }}
                    >{page}</Box>
                ))}
            </div>
        </div>
    );
}
export default NavBar;