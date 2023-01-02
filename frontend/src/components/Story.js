import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import {useNavigate} from "react-router-dom";

const Story = ({sx, title, imageURL, description, id}) => {
    const navigate = useNavigate();

    return <Card sx={{...sx, display: "flex"}} onClick={() => navigate('/stories/'+id)}>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <CardContent sx={{flex: "1 0 auto"}}>
                <Typography component="div" variant="h5">
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary" component="div">
                    {description}
                </Typography>
            </CardContent>
        </Box>
        <CardMedia
            component="img"
            sx={{width: 200}}
            image={imageURL}
        />
    </Card>;
}

export default Story