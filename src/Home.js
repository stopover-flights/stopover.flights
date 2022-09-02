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

 

function Home() {
  
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");  
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);

    /*
    <AppBar position="sticky">
            <Toolbar>Stopover.Flights</Toolbar>
        </AppBar>
    */
    return (
      <div className="Home" style={{display:"flex", "flex-direction":"column"}}>
        <Box style={{background:"#000000"}}>
          <img src={TopImage} alt="Logo" style={{width:"100%", "max-width":"100%",'object-fit':'cover', height:"auto", maxHeight:"30%"}}/>
          <p style={{"position": "absolute",
            "top": "8%",
            "left": "50%",
            "transform": "translate(-50%, -50%)",
            "font-size":"25px"
          }}><b>Stopover.flights - Experience Multiple destinations, one ticket</b></p>
        </Box>
        <div style={{display:"flex", "justify-content": "center", "padding-top":"30px"}}>
          <TextField
            label="Where from?"
            variant="outlined"
          />
          <IconButton>
            <AutorenewIcon />
          </IconButton>
          <TextField 
            label="Where to?"
            variant="outlined"
            style={{"padding-right":"50px"}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure date"
              inputFormat="MM/DD/YYYY"
              value={departureDate}
              onChange={(date)=>{}}
              renderInput={(params) => <TextField {...params} />}
              style={{"padding-end":"20px"}}
            />
            <DesktopDatePicker
              label="Return date"
              inputFormat="MM/DD/YYYY"
              value={arrivalDate}
              onChange={(date)=>{}}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </div>
        <div style={{display:"flex", "justify-content": "center", "padding-top":"30px"}}>
          <TextField
            label="Your email."
            variant="outlined"
            style={{"padding-right":"10px", width:"400px"}}
          />
          <Button variant="contained" startIcon={<SearchIcon />}>
            Where can I stop over?
          </Button>
        </div>
      </div>
    );
  }
  
  export default Home;