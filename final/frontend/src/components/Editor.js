import {Modal, Radio} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useState} from 'react';
import {useData} from "../hooks/useData";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAuth0} from "@auth0/auth0-react";


const Editor = () => {
    const {open, setOpen, publishArticle, content, title, description, image, headline, setContent, edit,
        setTitle, setDescription, setImage, setHeadline
    } = useData()
    const {user} = useAuth0();
    const date = new Date();
    const {months, id} = useData()
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const time = `${month} ${day}, ${year}`;
    const [error, setError] = useState({title: false, description: false, content: false})


    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{overflowY:'scroll'}}>
            <Container sx={{background:'white', borderRadius:'15px', width:'900px', margin:'60px auto'}}>
                <Typography variant='h4' sx={{position: 'relative', top:'20px', fontFamily:['-apple-systems', 'sans-serif'], fontWeight:700}}>{edit? 'Edit Article':'Write an Article'}</Typography>
                <Box sx={{margin:'70px 0', display:'flex', flexDirection:'column', gap:'20px', position: 'relative', top:'-20px'}}>
                    <TextField error={error.title} required variant='filled' label="Title" size="small" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <TextField error={error.description} required variant='filled' label="Description" size="small" multiline value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <TextField variant='filled' label="Image URL" size="small" multiline value={image} onChange={(e) => setImage(e.target.value)}/>
                    <Box sx={{display:'flex'}}>
                        <Radio
                            sx={{width:'42px'}}
                            checked={headline}
                            onClick={(e) => {
                                setHeadline(!headline)
                            }}
                        />
                        <Typography sx={{margin:'auto 0'}}>
                            Headline
                        </Typography>
                    </Box>
                    <Typography sx={{color: 'red', display: !error.content && 'none'}}>
                        You did not write anything!
                    </Typography>
                    <ReactQuill theme='snow' value={content} onChange={setContent}/>
                    <Box sx={{display:'flex', flexDirection:'row-reverse', gap:'10px', position:'relative', right:'10px'}}>
                        <Button variant='contained' sx={{borderRadius:'8px', textTransform:'none'}} onClick={async () => {
                            if(title === '') {
                                setError((prev) => ({...prev, title: true}))
                                return
                            }
                            setError((prev) => ({...prev, title: false}))
                            if(description === '') {
                                setError((prev) => ({ ...prev, description: true}))
                                return
                            }
                            setError((prev) => ({...prev, description: false}))
                            if(content === '') {
                                setError((prev) => ({...prev, content: true}))
                                return
                            }
                            setError((prev) => ({...prev, content: false}))
                            await publishArticle({
                                variables: {
                                    writer: user?.nickname,
                                    imageURL: image,
                                    title,
                                    description,
                                    content,
                                    time,
                                    headline,
                                    userpic: user?.picture,
                                    id: edit? id : ''
                                }
                            });
                            setContent('')
                            setDescription('')
                            setTitle('')
                            setImage('')
                            await setHeadline(false)
                            setOpen(false)
                        }
                        }>Publish</Button>
                        <Button sx={{borderRadius:'8px', background:'#696868', color:'white', textTransform:'none', '&:hover': {
                                backgroundColor: '#979898',
                                borderColor: '#616162',
                                boxShadow: 'none',
                            },}} onClick={() => {
                            setOpen(false)
                            setError({title: false, description: false, content: false})
                        }}>Cancel</Button>
                    </Box>
                </Box>
            </Container>
        </Modal>
    );
};

export default Editor;