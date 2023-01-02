import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import {useNavigate} from "react-router-dom";

const Headline = ({sx, title, imageURL, description, id}) => {
    const navigate = useNavigate();

    return <Card sx={sx} onClick={() => navigate('/stories/'+id)}>
        <CardMedia
            component="img"
            image={imageURL}
            height={400}
            sx={{margin:'auto'}}
        />
        <CardContent sx={{backgroundColor: "transparent"}}>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </Card>;
}

export default Headline