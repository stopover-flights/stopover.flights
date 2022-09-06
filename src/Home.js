import  React, { useState, useEffect, View }  from 'react';
import TopImage from "./images/main_image.jpg";
import {
    AppBar,
    TextField,
    Toolbar,
    Button,
    IconButton,
    Box,
    InputLabel 
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SearchIcon from '@mui/icons-material/Search';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { maxHeight } from '@mui/system';
import { API, graphqlOperation } from 'aws-amplify';
import { createSearchEntry } from './graphql/mutations';
import { ConsoleLogger } from '@aws-amplify/core';

function Home() {
  
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");  
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [email, setEmail] = useState("");


    /*
    <AppBar position="sticky">
            <Toolbar>Stopover.Flights</Toolbar>
        </AppBar>
    */
   const submit = async function(){
    console.log({currentTime: new Date().toISOString(),
      departureLocation: departure,
      arrivalLocation: arrival,
      departureDate: departureDate.toISOString().substring(0, 10),
      returnDate: arrivalDate.toISOString().substring(0, 10),
      oneWay: false,
      email: email});
    await API.graphql(graphqlOperation(createSearchEntry, {input: {
      currentTime: new Date().toISOString(),
      departureLocation: departure,
      arrivalLocation: arrival,
      departureDate: departureDate.toISOString().substring(0, 10),
      returnDate: arrivalDate.toISOString().substring(0, 10),
      oneWay: false,
      email: email
    }}));
   }

    const swapDestinations = function(){
      console.log(arrival)
      let temp = arrival;
      setArrival(departure)
      setDeparture(temp)
    }
    return (
      <div className="Home" style={{display:"flex", "flexDirection":"column"}}>
        <Box style={{background:"#000000"}}>
          <img src={TopImage} alt="Logo" style={{width:"100%", maxWidth:"100%",objectFit:'cover', height:"auto", maxHeight:"30%"}}/>
          <p style={{"position": "absolute",
            "top": "8%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
            fontSize:"25px"
          }}><b>Stopover.flights - Experience Multiple destinations, one ticket</b></p>
        </Box>
        <div style={{display:"flex", "justifyContent": "center", "paddingTop":"30px"}}>
          <TextField
            label="Where from?"
            variant="outlined"
            value={departure}
            onChange={(s)=>setDeparture(s.target.value)}
          />
          <IconButton onClick={swapDestinations}>
            <AutorenewIcon />
          </IconButton>
          <TextField 
            label="Where to?"
            variant="outlined"
            value={arrival}
            onChange={(s)=>setArrival(s.target.value)}
            style={{"paddingRight":"50px"}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure date"
              inputFormat="MM/DD/YYYY"
              value={departureDate}
              onChange={(date)=>setDepartureDate(date)}
              renderInput={(params) => <TextField {...params} />}
              style={{"paddingLeft":"20px"}}
            />
            <DesktopDatePicker
              label="Return date"
              inputFormat="MM/DD/YYYY"
              value={arrivalDate}
              onChange={(date)=>setArrivalDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </div>
        <div style={{display:"flex", "justifyContent": "center", "paddingTop":"30px"}}>
          <TextField
            label="Your email."
            variant="outlined"
            onChange={(s)=>setEmail(s.target.value)}
            style={{"paddingRight":"10px", width:"400px"}}
          />
          <Button variant="contained" startIcon={<SearchIcon />} onClick={submit}>
            Where can I stop over?
          </Button>
        </div>
      </div>
    );
  }
  
  export default Home;