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

  const [validateDept, setDeptValidation] = useState(false)
  const [validateArrival, setArrivalValidation] = useState(false)
  const [validateDeptDate, setDeptDateValidation] = useState(false)
  const [validatearrivalDate, setArrivalDateValidation] = useState(false)
  const [validateEmail, setEmailValidation] = useState(false)


    /*
    <AppBar position="sticky">
            <Toolbar>Stopover.Flights</Toolbar>
        </AppBar>
    */
    const submit = async function(){
      //validate
      let errors = false;
      if(departure==""){
        setDeptValidation(true)
        errors = true;
      }
      if(arrival==""){
        setArrivalValidation(true)
        errors = true;
      }
      if(departureDate=="" || departureDate==null){
        setDeptDateValidation(true)
        errors = true;
      }
      if(arrivalDate=="" || arrivalDate==null){
        setArrivalDateValidation(true)
        errors = true;
      }
      if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
        setEmailValidation(true)
        errors = true;
      }

      if(errors){
        return
      }
      //validate
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

      setDeparture("")
      setArrival ("")
      setDepartureDate(null)
      setArrivalDate(null)
      setEmail("")
    }

    const swapDestinations = function(){
      console.log(arrival)
      let temp = arrival;
      setArrival(departure)
      setDeparture(temp)
    }

    return (
      <div>
        <div className="Home">
          <Box >
            <img src={TopImage} alt="Logo" className="DisplayImage"/>
            <p className='Heading'><b>Stopover.flights<br/>Experience Multiple destinations, one ticket</b></p>
          </Box>
          <div className='Items'>
            <TextField
              error={validateDept}
              label="Where from?"
              variant="outlined"
              value={departure}
              onChange={(s)=>setDeparture(s.target.value)}
            />
            <IconButton onClick={swapDestinations}>
              <AutorenewIcon />
            </IconButton>
            <TextField 
              error={validateArrival}
              label="Where to?"
              variant="outlined"
              value={arrival}
              onChange={(s)=>setArrival(s.target.value)}
              style={{"paddingRight":"50px"}}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                //error={validateDeptDate}
                label="Departure date"
                inputFormat="MM/DD/YYYY"
                value={departureDate}
                onChange={(date)=>setDepartureDate(date)}
                renderInput={(params) => <TextField {...params} error={validateDeptDate}/>}
                style={{"paddingLeft":"20px"}}
              />
              <DesktopDatePicker
                error={validatearrivalDate}
                label="Return date"
                inputFormat="MM/DD/YYYY"
                value={arrivalDate}
                onChange={(date)=>setArrivalDate(date)}
                renderInput={(params) => <TextField {...params} error={validatearrivalDate}/>}
              />
          </LocalizationProvider>
          </div>
          <div style={{display:"flex", "justifyContent": "center", "paddingTop":"30px"}}>
            <TextField
              error={validateEmail}
              label="Your email."
              variant="outlined"
              value={email}
              onChange={(s)=>{setEmail(s.target.value); }}
              className="EmailInput"
            />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={submit}>
              Where can I stop over?
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;