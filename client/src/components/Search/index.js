import React, { Component, useState } from 'react';
import NavBar from '../NavBar';
import Typography from "@material-ui/core/Typography";
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@material-ui/core/";
import { height } from '@mui/system';
import { makeStyles } from '@material-ui/styles';
import "./index.css"

const serverURL = "";


const useStyles = makeStyles((theme) => ({
    root: {
    
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + "reactEntertainment/client/src/components/Images/movie1.jpg"})`,
        //background: "lightblue",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        borderColor: "white"
    },
    }));
    

      function SearchTitle(props){
        const handleChange = (event) => {
            props.handler(event.target.value);
          };
    
          return(
            <form noValidate autocomplete='off'>
          <TextField
              onChange={props.onTitleSearch}
                  
                  id="MovieNameTextbox"
                  label="Enter Movie Title"
                  defaultValue=""
                  helperText={props.errorMessage}
                  variant="outlined"
                  style={{marginTop: "30px", width: "100vh", borderColor: "white"}}
                />
                </form>
          )
      }

      function SearchActor(props){
        const handleChange = (event) => {
            props.handler(event.target.value);
          };
    
          return(
            <form noValidate autocomplete='off'>
          <TextField
              onChange={props.onActorSearch}
        
                  id="MovieNameTextbox"
                  label="Enter Actor Name"
                  defaultValue=""
                  helperText={props.errorMessage}
                  variant="outlined"
                  style={{marginTop: "30px", width: "100vh"}}
                />
                </form>
          )
      }

      function SearchDirector(props){
        const handleChange = (event) => {
            props.handler(event.target.value);
          };
    
          return(
            <form noValidate autocomplete='off'>
          <TextField
              onChange={props.onDirectorSearch}
        
                  id="MovieNameTextbox"
                  label="Enter Director Name"
                  defaultValue=""
                  helperText={props.errorMessage}
                  variant="outlined"
                  style={{marginTop: "30px", width: "100vh"}}
                />
                </form>
          )
      }

    export default function Search() {
        const classes = useStyles();
        const [searchList, setSearchList] = useState([])

const [searchTitle, setSearchTitle] = useState("")
const handleSearchTitle = (event) => {
    setSearchTitle(event.target.value);
}

const [searchActor, setSearchActor] = useState("")
const handleSearchActor = (event) => {
    setSearchTitle(event.target.value);
}

const [searchDirector, setSearchDirector] = useState("")
const handleSearchDirector = (event) => {
    setSearchTitle(event.target.value);
}

var searchNames = searchList.map(a => a.name);
        const getSearch = () => {
            callApiGetSearch()
              .then(res => {
                console.log("callApiGetSearch returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetSearch parsed: ", parsed);
                setSearchList(parsed);
                console.log(searchNames)
              })
          }
        
          const callApiGetSearch = async () => {
            const url = serverURL + "/api/getSearch";
            console.log(url);
          
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              searchTitle: searchTitle,
              searchActor: searchActor,
              searchDirector: searchDirector  
              })
            });
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
          }
          



          const searchSubmit = () => {
            if (searchTitle != "" || searchActor != "" || searchDirector != ""){
                getSearch();
                // var names = [];
                // names = searchList.map(obj => obj.name)
            }
            
        }

        return (
            <div className="backdrop">
            <Card></Card>
            <div align="center" marginTop="50px">
            <Card style={{color: 'white', backgroundColor: '#001833', marginLeft: "150px", marginRight: '150px',  marginTop: "50px", height: "120vh"}}>
            <Card style={{maxWidth: 750, marginTop:"50px", minWidth: 275, color: "white", backgroundColor:"#3f50b5", align: "center"}} align="center">
            <CardContent>
                <Typography align="center" variant="h4">
                    Quick Search Tool
                </Typography>
            </CardContent>
            </Card>
            <Card style={{maxWidth: 750, marginTop:"50px", minWidth: 275, color: "white", backgroundColor:"#3f50b5", align: "center"}} align="center">
            <CardContent>
                <SearchTitle onTitleSearch={handleSearchTitle}></SearchTitle>
                <SearchActor onActorSearch={handleSearchActor}></SearchActor>
                <SearchDirector onDirectorSearch={handleSearchDirector}></SearchDirector>
                <Button 
                variant="outlined"
                onClick={searchSubmit}
                > Search
                </Button>
                <Typography style={{marginTop: '50px'}}>
                    Output
                </Typography>
                <Typography style={{marginTop: '50px'}}>
                    {searchTitle.name}
                </Typography>
            </CardContent>
            </Card>
            </Card>
        </div>
            </div>
            
    );
}