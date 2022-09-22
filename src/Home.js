import  React, { useState, useEffect, View }  from 'react';
import TopImage from "./images/main_image.jpg";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SearchIcon from '@mui/icons-material/Search';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { API, graphqlOperation } from 'aws-amplify';
import { createSearchEntry } from './graphql/mutations';
import './css/Home.css'
import {
  AppBar,
  TextField,
  Toolbar,
  Button,
  IconButton,
  Box,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentDialog,
  DialogContentText,
  ContentText,
  DialogTitle,
} from '@mui/material';

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
  const [open, setOpen] = useState(false);

  const [otherDatePicker, setOtherDatePicker] = useState();

  let arriveBy = false;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    /*
    <AppBar position="sticky">
            <Toolbar>Stopover.Flights</Toolbar>
        </AppBar>
    */
    const submit = async function(){
      //validate
      let errors = false;
      if(departure===""){
        setDeptValidation(true)
        errors = true;
      }
      if(arrival===""){
        setArrivalValidation(true)
        errors = true;
      }
      if(departureDate==="" || departureDate===null){
        setDeptDateValidation(true)
        errors = true;
      }
      if(arrivalDate==="" || arrivalDate===null){
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

      handleClickOpen();

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

    const addDatePicker = function(){
      arriveBy=true;
      setOtherDatePicker(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            //error={validateDeptDate}
            label="Arrive By"
            inputFormat="MM/DD/YYYY"
            value={departureDate}
            onChange={(date)=>setDepartureDate(date)}
            renderInput={(params) => <TextField {...params} error={validateDeptDate} sx={{ mb: "10px"}}/>}
          />
        </LocalizationProvider>
      );
    }

    const removeDatePicker = function(){
      arriveBy=false;
      setOtherDatePicker();
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for using our beta site. We will email you the results for your search as soon as possible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <div className="Home">
          <Box >
            <img src={TopImage} alt="Logo" className="DisplayImage"/>
            <p className='Heading'><b>Stopover.flights<br/>Experience Multiple destinations, one booking</b></p>
          </Box>
          <div className='Items'>
            <div className='locations'>
              <TextField
                error={validateDept}
                label="Home Airport?"
                variant="outlined"
                value={departure}
                sx={{maxWidth:"auto"}}
                onChange={(s)=>setDeparture(s.target.value)}
                
              />
              <IconButton onClick={swapDestinations}>
                <AutorenewIcon />
              </IconButton>
              <TextField 
                error={validateArrival}
                label="Final Destination?"
                variant="outlined"
                value={arrival}
                sx={{maxWidth:"auto"}}
                onChange={(s)=>setArrival(s.target.value)}
                />
            </div>
            <div style={{display:"flex", "flex-direction": "column", alignItems:"center"}}>
              <p>Do you need to arrive in your final destination by a certain date?</p>
              <div style={{display:"flex", "flex-direction": "row"}}>
                  <Button onClick={addDatePicker}>Yes</Button>
                  <Button onClick={removeDatePicker}>No</Button>
              </div>
              {otherDatePicker}
            </div>
            <div className='dates'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  //error={validateDeptDate}
                  label="Departure date"
                  inputFormat="MM/DD/YYYY"
                  value={departureDate}
                  onChange={(date)=>setDepartureDate(date)}
                  renderInput={(params) => <TextField {...params} error={validateDeptDate} sx={{ mr: "10px"}}/>}
                  style={{"paddingLeft":"20px"}}
                />
                <DesktopDatePicker
                  error={validatearrivalDate}
                  label="Return date"
                  inputFormat="MM/DD/YYYY"
                  value={arrivalDate}
                  onChange={(date)=>setArrivalDate(date)}
                  renderInput={(params) => <TextField {...params} error={validatearrivalDate} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="emailSubmit" >
            <TextField
              error={validateEmail}
              label="Your email."
              variant="outlined"
              value={email}
              onChange={(s)=>{setEmail(s.target.value); }}
              className="EmailInput"
              sx={{ mr: "10px", mt:"10px"}}
              />
            <Button className="submitButton" variant="contained" startIcon={<SearchIcon />} onClick={submit} sx={{mt:"10px"}}>
              Where can I stop over?
            </Button>
          </div>
        </div>
      </div>
    );

  }
  
  export default Home;
