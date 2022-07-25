import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText} from "@material-ui/core/";
import NavBar from '../NavBar';

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "ec2-18-216-101-119.us-east-2.compute.amazonaws.com:"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ff3b30",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});
function Title(){
  return(
  <div>
  <Typography align="center" variant="h3" component="div" gutterBottom>
        Review a Movie
      </Typography>
  </div>
  
  ) 
}

function ReviewTitle(props){
  
  const handleChange = (event) => {
    props.handler(event.target.value);
  };

  return(
  <TextField
      error={props.errorMessage==="" ? false : true}
      onChange={handleChange}

          id="MovieNameTextbox"
          label="Title of Review"
          defaultValue=""
          helperText={props.errorMessage}
          variant="outlined"
          style={{marginTop: "50px", width: "120vh"}}
        />
  )
}

function MovieSelection(props){

  const handleChange = (event) => {
    props.handler(event.target.value);
  };
  
  return(
    <div>
      <FormControl variant="outlined" style={{marginTop: "30px", width: "120vh"}}>
        <InputLabel>Select Movie</InputLabel>
        <Select
          error={props.errorMessage==="" ? false : true}
          onChange={handleChange}
        >
          {props.movies.map((item) => {
              return(
                <MenuItem value ={item}> {item.name} </MenuItem>
              );
            })}
        </Select>
        <FormHelperText error>{props.errorMessage}</FormHelperText>
      </FormControl>
    </div>
  )
}

function ReviewBody(props){
  
  const handleChange = (event) => {
    props.handler(event.target.value);
  };
  
  return(
  <div>
    <TextField style={{width: "120vh", marginTop: "30px"}}
    
    error={props.errorMessage==="" ? false : true}
    onChange={handleChange}

          id="outlined-multiline-static"
          label="Enter Review Description"
          multiline
          minRows={4}
          inputProps={{maxLength: 200}}
          variant="outlined"
          helperText={props.errorMessage}
        />
  </div>
  )
}

function ReviewRating(props){
  
  const handleChange = (event) => {
    props.handler(event.target.value);
  };

  return(
    <div>
      <FormControl style={{marginTop: "30px", justifyItems: "center"}} error={props.errorMessage==="" ? false : true}
          onChange={handleChange}>
      <FormLabel id="demo-row-radio-buttons-group-label">Star Rating</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <FormHelperText error>{props.errorMessage}</FormHelperText>
    </FormControl>
    </div>
  )
}


function Review() {
  const [movie, setMovie] = useState("")
  const [movieError, setMovieError] = useState("")
  const [movieTitle, setMovieTitle] = useState("")
  const [movieErrorTitle, setMovieErrorTitle] = useState("")
  const [movieDescription, setMovieDescription] = useState("")
  const [movieErrorDescription, setMovieErrorDescription] = useState("")
  const [movieRating, setMovieRating] = useState("")
  const [movieErrorRating, setMovieErrorRating] = useState("")
  const [movieInfo, setMovieInfo] = useState("")
  
  const [movieList, setMoviesList] = useState([])

  const [userID, setUserID] = useState(1)


  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setMoviesList(parsed);
      })
  }

  React.useEffect(() => {
    getMovies();
  }, [])

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  
  const handleAddReview = () => {
    callApiAddReview()
      .then(res => {
      });
  }

  const callApiAddReview = async () => {

    const url = serverURL + "/api/addReview";
    
    var submittedReview = {
      "reviewTitle": movieTitle,
      "reviewContent": movieDescription,
      "reviewScore": movieRating,
      "userID": userID,
      "movieID": movie.id
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify(submittedReview)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found reviews: ", body);
    return body;
  }

  

  const submitButton = () => {
    setMovieError("");
    setMovieErrorTitle("");
    setMovieErrorDescription("");
    setMovieErrorRating("");
    if (Object.keys(movie).length === 0){
      setMovieError("Error: Please select a movie from the dropdown!")
    }
    if (movieTitle === ""){
      setMovieErrorTitle("Error: Please enter a movie title!")
    }
    if (movieDescription === ""){
      setMovieErrorDescription("Error: Please enter a movie description!")
    }
    if (movieRating === ""){
      setMovieErrorRating("Error: Please input a star rating!")
    }


    if (Object.keys(movie).length !== 0 && movieTitle !== "" && movieDescription !== "" && movieRating !== ""){
      setMovieInfo(
      <div className = "ReviewPosted" style={{marginTop: "30px", alignContent: "center", width: "120vh"}}>Thank you for your review: 
        <div style={{fontSize: "14px", marginTop: "10px"}}>The selected movie name is: <br/>{movie.name}</div>
        <br/>
        <div style={{fontSize: "14px", marginTop: "10px"}}>What is this movie about? <br/>{movieTitle}</div>
        <br/>
        <div style={{fontSize: "14px", marginTop: "10px"}}>What I thought about the movie? <br/>{movieDescription}</div>
        <br/>
        <div style={{fontSize: "14px", marginTop: "10px"}}>What I rate the movie out of 5? <br/>{movieRating}</div>
        </div>)
        handleAddReview();
    }
    
  }

return(
  <div>
      <Title></Title>
      <MovieSelection handler={setMovie} errorMessage = {movieError} movies = {movieList}></MovieSelection>
      <ReviewTitle handler={setMovieTitle} errorMessage = {movieErrorTitle}></ReviewTitle>
      <ReviewBody handler={setMovieDescription} errorMessage = {movieErrorDescription}></ReviewBody>
      <ReviewRating handler={setMovieRating} errorMessage = {movieErrorRating}></ReviewRating>
      <Button variant="outlined" onClick={submitButton}>Submit</Button>
      <Typography variant="h5" component="div" gutterBottom>
        {movieInfo}
      </Typography>
  </div>

)
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;



    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Welcome to MSci245!
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

        </Grid>
      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {/* <NavBar /> */}
          <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <Review></Review>
          </Grid>
        

        </div>
      </MuiThemeProvider>
    );
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);


