import  React, { useState, useEffect }  from 'react';
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

 

function Home() {
  
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");  
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);

    return (
      <div className="Home" style={{display:"flex", "flex-direction":"column"}}>
        <AppBar position="sticky">
            <Toolbar>Stopover.Flights</Toolbar>
        </AppBar>
        <div class="container" style={{width:"100%"}}>
          <img src={TopImage} alt="Logo" style={{width:"auto", "max-width":"100%",'object-fit':'cover'}}/>
          <div class="top-left">Centered</div>
        </div>
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
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure date"
              inputFormat="MM/DD/YYYY"
              value={departureDate}
              onChange={(date)=>{}}
              renderInput={(params) => <TextField {...params} />}
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
          />
          <Button variant="contained" startIcon={<SearchIcon />}>
            Where can I stop over?
          </Button>
        </div>
      </div>
    );
  }
  
  export default Home;