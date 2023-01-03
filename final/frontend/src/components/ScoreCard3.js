import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', "")] = r(item);
    });
    return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe? g|svg)$/));

const ScoreCard3 = ({game, color}) => {
    return <Card sx={{
        borderRadius: "5px",
        boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.5)",
        minWidth: "1060px",
        height: "80px",
        width: "100%",
        position: "fixed",
        top: "61px"
    }}>
        <CardContent sx={{height: "100%"}}>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{textAlign: "center", display: "flex", flexDirection: "row-reverse"}}>
                    <img className="image" src={images[game?.visitor_team.abbreviation + ".png"]}/>
                    <Box sx={{position: "relative", right: "10px"}}>
                        <Typography variant="h6" sx={{
                            fontFamily: ["Roboto", "sans-serif"].join(","),
                            fontWeight: 300,
                            color: color(0)
                        }}> {game?.visitor_team.full_name}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={1} sx={{textAlign: "center", justifyContent: "center"}}>
                    <Typography variant="h4" sx={{
                        fontFamily: ["Lato", "sans-serif"].join(","),
                        color: color(0),
                        fontWeight: 400
                    }}>{game?.visitor_team_score}</Typography>
                </Grid>
                <Grid item xs={4} sx={{textAlign: "center", position: "relative", bottom: "15px"}}><Typography
                    variant="h6" sx={{
                    fontFamily: ["-apple-system", "sans-serif"].join(","),
                    fontWeight: 700,
                    color: "grey"

                }}>{game?.status.substring(0, 8)}</Typography></Grid>
                <Grid item xs={1} sx={{textAlign: "center"}}>
                    <Typography variant="h4" sx={{
                        fontFamily: ["Lato", "sans-serif"].join(","),
                        color: color(1),
                        fontWeight: 400,
                    }}>{game?.home_team_score}</Typography>
                </Grid>
                <Grid item xs={3} sx={{textAlign: "center", display: "flex"}}>
                    <img className="image" src={images[game?.home_team.abbreviation + ".png"]}/>
                    <Box sx={{position: "relative", left: "10px"}}>
                        <Typography variant="h6" sx={{
                            fontFamily: ["Roboto", "sans-serif"].join(","),
                            fontWeight: 300,
                            color: color(1)
                        }}>
                            {game?.home_team.full_name}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
    </Card>;
}

export default ScoreCard3