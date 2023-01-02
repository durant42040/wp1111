import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {useParams, useNavigate} from "react-router-dom";
import {GET_ARTICLE_QUERY, DELETE_ARTICLE_MUTATION, GET_ARTICLES_QUERY} from "../graphql";
import {useMutation, useQuery} from "@apollo/client";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import {useAuth0} from "@auth0/auth0-react";
import DOMPurify from "dompurify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {useData} from "../hooks/useData";
import CircularProgress from "@mui/material/CircularProgress";

const Article = () => {
    const {i, setI, setOpen, setEdit, setContent, setDescription, setHeadline, setImage, setTitle, setId} = useData()
    const navigate = useNavigate()
    const {id} = useParams()
    const {data, refetch}  = useQuery(GET_ARTICLE_QUERY, {variables: {id}})
    const {data: data2, refetch: refetch2}  = useQuery(GET_ARTICLES_QUERY)
    const {user} = useAuth0();
    const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION, {variables:{id}})
    refetch()
    refetch2()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if(!data) return <CircularProgress color="inherit" sx={{margin: '150px 50%'}}/>
    return (
        <Box sx={{marginTop: data?.getArticle.imageURL === ''? '60px' : '55px', display:'flex', width:'1100px', gap:'30px', marginX:'auto'}}>
            <Box sx={{width: '75%', background:'white', borderRadius: '5px', margin:'auto'}}>
                <Box sx={{width:'100%'}}>
                    {data?.getArticle.imageURL !== '' && <CardMedia component="img" height={500} image={data?.getArticle.imageURL}/>}
                </Box>
                <Typography variant='h4' sx={{fontFamily:['-apple-systems', 'sans-serif'], fontWeight:700, margin:'10px 20px'}}>
                    {data?.getArticle.title}
                </Typography>
                <Box sx={{display:'flex', justifyContent:'space-between',}}>
                    <Box sx={{display:'flex',gap:'5px'}}>
                        <Box sx={{display:'flex',gap:'20px'}}>
                            <Box sx={{position:'relative', left:'20px', top:'7px'}}>
                                <img className='profilepic' src={data?.getArticle.userpic}/>
                            </Box>
                            <Typography variant='h7' sx={{fontFamily:['-apple-systems', 'sans-serif'], fontWeight:500, margin:'10px'}}>
                                {data?.getArticle.writer}
                            </Typography>
                        </Box>
                        {user?.nickname === data?.getArticle.writer &&
                            <Box>
                                <IconButton onClick={async () => {
                                    await deleteArticle()
                                    navigate('/')
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton onClick={() => {
                                    console.log(data?.getArticle)
                                    setEdit(true)
                                    setTitle(data?.getArticle.title)
                                    setContent(data?.getArticle.content)
                                    setImage(data?.getArticle.imageURL)
                                    setHeadline(data?.getArticle.headline)
                                    setDescription(data?.getArticle.description)
                                    setId(data?.getArticle.id)
                                    setOpen(true)
                                }
                                }>
                                    <EditIcon/>
                                </IconButton>
                            </Box>
                        }
                    </Box>
                    <Box sx={{color:'grey', margin:'3px 10px 0 0'}}>
                        {data?.getArticle.time}
                    </Box>
                </Box>
                <Box
                    sx={{margin:'20px 40px', fontSize:'18px'}}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.getArticle.content),
                    }}
                ></Box>
            </Box>
            <Box sx={{width:'25%', background:'white', height:'fit-content', margin:'60px auto'}}>
                <Typography sx={{margin:'10px',fontFamily: ['-apple-system', 'sans-serif'].join(','),
                    fontWeight: 700,}}>
                    Read More
                </Typography>
                {data2?.getArticles.filter(e => e.title !== data?.getArticle.title).map(
                    (e) => {
                        return(
                            <Box sx={{margin:'5px 8px', fontSize:'14px', color:'#3a3a3a',
                                fontFamily: ['-apple-system', 'sans-serif'].join(','),
                                fontWeight: 500,
                                '&::after': {
                                    content: '""',
                                    display: 'inline-block',
                                    width: '100%',
                                    height: '1px',
                                    background: '#d4d4d5',
                                    position: 'relative',
                                },
                                '&:hover': {
                                    color:'#405ec5'
                                },
                                cursor:'pointer'
                            }} onClick={() => navigate('/stories/'+e.id)}>
                                {e.title}
                            </Box>
                        )
                    }
                )}
            </Box>
        </Box>
    );
};

export default Article;