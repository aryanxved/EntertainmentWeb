import React, { Component } from 'react';
import NavBar from '../NavBar';
import Typography from "@material-ui/core/Typography";
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { height } from '@mui/system';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
root: {

    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '../images/filmwithcam.jpg'})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
},
}));

export default function Landing() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
            <CssBaseline /> 
                <div>
                    <Card style={{color: 'white', backgroundColor: '#001833'}}>
                    <Typography align="center" variant="h1" component="div" gutterBottom style={{fontFamily: 'Times'}}>
                    Entertainment Web
                    </Typography>
                    </Card>
                </div>

                <div align="center" marginTop="50px">
            <Card style={{color: 'white', backgroundColor: '#001833', marginLeft: "350px", marginRight: '350px',  marginTop: "50px", height: "60vh"}}>
            <Card style={{maxWidth: 450, marginTop:"50px", minWidth: 275, color: "white", backgroundColor:"#3f50b5", align: "center"}} align="center">
            <CardContent>
                <Typography style={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                    Welcome to Entertainment Web!
                </Typography>
                <Typography style={{ mb: 2 }} color="text.secondary">
                    The ultimate destination for movie lovers!
                </Typography>
                <Typography variant="body2">
                <br />
                <br />
                    Search through your favourite movies!
                    <br />
                    Tell us how you feel about a movie by leaving a review!
                    <br />
                    <br />
                    <br />
                    {'"Movie Fans Unite!"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
            </Card>
        </div>
            </div>
        </div>
        
    );
}