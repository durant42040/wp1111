import React, {useEffect} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useQuery} from "@apollo/client";
import {GET_ARTICLES_QUERY} from "../graphql";
import Headline from "./Headline";
import Story from "./Story";
import CircularProgress from '@mui/material/CircularProgress';

const cardStyle = {
    maxWidth: 750,
    margin: '7px  16px 16px 16px',
    borderRadius: '15px',
    boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
    "&:hover": {background: '#f3f3f3'},
    justifyContent: 'space-between'
}

const NewsPage = () => {
    const { data, refetch } = useQuery(GET_ARTICLES_QUERY)
    const headline = data?.getArticles.find(e => e.headline === true)
    const stories = data?.getArticles.filter(e => e.headline !== true)
    console.log('data', data)
    refetch()
    setTimeout(() => {
        refetch()
    }, 1000)


    if(!data){
        return <CircularProgress color="inherit" sx={{margin: '50px 50%'}}/>
    }

    return (
        <>
            <Typography gutterBottom variant="h6" component="div" className='wrapper' sx={{color: '#454a5e'}}>
                Top Stories
            </Typography>
            {headline && <Headline sx={cardStyle} imageURL={headline?.imageURL} title={headline?.title} id={headline?.id}
                       description={headline?.description}/>}
            {stories?.map(e => {
                return <Story sx={cardStyle}  imageURL={e?.imageURL} title={e?.title} description={e?.description} id={e?.id}/>
            })}
        </>
    )
}

export default NewsPage;