import  React, { useState, useEffect }  from 'react';
import {
    AppBar,
    TextField,
    Toolbar
} from '@mui/material';

function Home() {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

    return (
      <div className="Home" style={{display:"flex", "flex-direction":"column"}}>
        <AppBar>
            <Toolbar>Stopover.Flights</Toolbar>
        </AppBar>
        <div style={{display:"flex"}}>
          <TextField />
          <TextField />
        </div>
      </div>
    );
  }
  
  export default Home;