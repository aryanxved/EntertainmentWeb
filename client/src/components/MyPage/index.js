import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Card, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText} from "@material-ui/core/";
import NavBar from '../NavBar';

//Dev mode
//const serverURL = ""; //enable for dev mode

//Deployment mode instructions
const serverURL = "ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3093"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#51A0D5"
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
  <Typography align="center" variant="h3" component="div" gutterBottom style={{width: "120vh"}}>
        Magic - Review of Fortune
      </Typography>
  </div>
  
  ) 
}

function Review() {
  const [randomTitle, setRandomTitle] = useState("")
  const [randomDescription, setRandomDescription] = useState("")
  const [movieRandomInfo, setMovieRandomInfo] = useState("")
  
  const [randomReviewList, setRandomReviewList] = useState([])
  const [randomResulTitle,setRandomResult] = useState("")
  const [randomResultDescription ,setRandomResultDescription] = useState("")
  const [randomResultRating ,setRandomResultRating] = useState("")
  const [randomResultMovieId ,setRandomResultMovieId] = useState(0)
  const [randomResultMovieName ,setRandomResultMovieName] = useState("")
  const [movieList, setMoviesList] = useState([])

  


  var movieName = []

  movieName = movieList.map(item => item.name)

  var movieId = []
  movieId = movieList.map(obj => obj.id)

  var index = 0;
    for (var i = 0; i <= movieId.length; i++){
      if (movieId[i] == randomResultMovieId){
          index = i
      }
    }

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




  const getRandom = () => {
    callApiGetRandom()
      .then(res => {
        console.log("callApiGetRandom returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetRandom parsed: ", parsed);
        setRandomReviewList(parsed);
      })
  }

  React.useEffect(() => {
    getRandom();
  }, [])

  const callApiGetRandom = async () => {
    const url = serverURL + "/api/getRandom";
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


 

  const submitButton = () => {
    getRandom()
    console.log("movie selected id :" + randomResultMovieId)
    console.log("MovieName at index: " + movieName[index])
    console.log("MovieId : " + movieId)
    console.log("index: " + index)
    randomReviewList.map((item) => {
        setRandomResult(item.reviewTitle)
        setRandomResultDescription(item.reviewContent)
        setRandomResultRating(item.reviewScore)
        setRandomResultMovieId(item.movieID)
        console.log("movie selected id from loop:" + item.movieID)
      })
      setRandomResultMovieName(movieName[index])
    // if (Object.keys(movieRandomInfo).length !== 0){
        
    // //   setMovieRandomInfo(
    // //   <div className = "ReviewPosted" style={{marginTop: "30px", alignContent: "center", width: "120vh"}}>Thank you for your review: 
    // //     <div style={{fontSize: "14px", marginTop: "10px"}}>The title of the review: <br/>{randomReviewList.reviewTitle}</div>
    // //     <br/>
    // //     <div style={{fontSize: "14px", marginTop: "10px"}}>What is this review about? <br/>{randomReviewList.reviewContent}</div>
    // //     </div>)
    // }
    
  }

return(
  <div>
    <Card style={{marginLeft: "50px", marginRight: "50px", backgroundColor:"#001833"}}>
        <div align="center">
    <Title></Title>
      <Card style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px', backgroundColor: '#3f50b5', marginBottom: '20px', borderBlock: '2px'}}>
      <Card style={{align:"center", marginTop: '20px', marginLeft: '20px', marginRight: '20px', backgroundColor: '#5f7aff  ', marginBottom: '20px', borderBlock: '2px'}}>
      <Typography variant="h5" component="div" gutterBottom style={{marginTop: '20px'}}>
            What is this?
      </Typography>
      </Card>
      <Typography variant="h7" component="div" gutterBottom style={{marginTop: '20px', marginBottom: '20px'}}>
            Welcome to the random review finder. 
            Test your luck and read a random review written by a user. <br></br>
            Let's see what's in your fortune.
      </Typography>
      <Typography variant="h7" component="div" gutterBottom>
      <br></br> How it works: <br></br> <br></br>
            1. Click the blue button below <br></br>
            2. Wait for the magic to begin <br></br>
            3. Read the unique user review <br></br>
            <br></br>
      </Typography>
      </Card>
      <Button variant="outlined" onClick={submitButton} style={{backgroundColor: "#3f50b5", marginTop: '20px'}}>I'm Feeling Lucky</Button>
      
      <Typography variant="h5" component="div" gutterBottom style={{marginTop: '50px'}}>
            Your fortune states:
      </Typography>


      <Typography variant="h6" component="div" gutterBottom>
        The magic genie awaits! Genie believes you should watch the movie,<br></br> <Card style={{marginLeft: '20px', marginRight: '20px', backgroundColor: '#3f50b5'}}>{randomResultMovieName}</Card> and thinks you will really enjoy it. Psst... If you dont like it, try it again!
      </Typography>
      <Typography variant="h5" component="div" gutterBottom style={{marginTop: '50px'}}>
            Bored? Read a random review by our users!
      </Typography>
      <Typography variant="h5" component="div" gutterBottom style={{marginTop: '50px'}}>
            Review Title:
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
            {randomResulTitle}
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
            Review Description:
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
            {randomResultDescription}
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
            Review Rating:
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
            {randomResultRating}
      </Typography>
      
      </div>
      </Card>
  </div>

)
}

class MyPage extends Component {
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


MyPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyPage);


