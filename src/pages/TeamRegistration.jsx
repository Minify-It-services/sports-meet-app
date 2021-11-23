import * as React from 'react'
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';


function TeamRegistration() {
    const [registered, setRegsitered] = useState(false);
    const [manager, setmanager] = useState({});
    const [coach, setcoach] = useState({});
    const [captain, setcaptain] = useState({});
    const [players, setplayers] = useState([{}]);
    const [extraPlayers, setextraPlayers] = useState([{}]);
    const students = [
      { label: 'Sunil Poudel'},
      { label: 'Anil Bhujel'},
      { label: 'Utasb Gurung'},
      { label: 'Biwash Thapa'},
    ];
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
      const handleRegister=()=>{
        console.log(manager,coach,captain,players,extraPlayers);
        setRegsitered(!registered);
        setOpen(!open);
      }
      //TODO: HANDLE LIMITING PLAYER SELECTION AND EMPTY FIELDS
      const handleLimitedPlayers=()=>{
        console.log('hi limited players');
        console.log(players);
        if (players.length>2){return true}
        else {return false}
      }
    return (
            <>
            <div className="banner" style={{minHeight:"30vh",backgroundImage: "url(https://i2-prod.irishmirror.ie/incoming/article8074062.ece/ALTERNATES/s1227b/Atletico-Madrid-v-Real-Madrid.jpg)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            <Container sx={{marginTop:5}}>
            <Stack spacing={3}>
            <Typography variant="h4">Football</Typography>
            <p>Fact: There are over 318 billion different possible positions after four moves each.</p>
            <Stack spacing={{xs:2,md:4}}>
              <div>
                {/* <Typography variant="subtitle">Manager</Typography> */}
                <Autocomplete
                isOptionEqualToValue={(option, value) => option.label === value.label}
                disablePortal
                options={students}
                onChange={(event,value)=>setmanager(value)}
                renderInput={(params) => <TextField {...params} label="Manager" variant="standard" />}
                />
              </div>
              <div>
                <Autocomplete
                isOptionEqualToValue={(option, value) => option.label === value.label}
                disablePortal
                options={students}
                onChange={(event,value)=>setcaptain(value)}
                renderInput={(params) => <TextField {...params} label="Captain" variant="standard" />}
                />
              </div>
              <div>
              {/* <Typography variant="subtitle">Players</Typography> */}
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.label === value.label}
                multiple
                onChange={(event,value)=>setplayers([value])}
                options={students}
                getOptionDisabled={handleLimitedPlayers}
                // limitTags={2}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Players"
                  />
                )}
              />
              </div>
              <div>
                {/* <Typography variant="subtitle">Coach</Typography> */}
                  <Autocomplete
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  disablePortal
                  onChange={(event,value)=>setcoach(value)}
                  options={students}
                  renderInput={(params) => <TextField {...params} label="Coach" variant="standard" />}
                />
              </div>
              <div>
              {/* <Typography variant="subtitle">Extras</Typography> */}
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  multiple
                  options={students}
                  limitTags={2}
                  onChange={(event,value)=>setextraPlayers([value])}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Extras"
                      placeholder="Favorites"
                    />
                  )}
                />
              </div>
            </Stack>
            <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={()=>handleRegister()}>{registered? "Leave":"Register"}</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={registered?"success":"error"} sx={{ width: '100%' }}>
                    {registered? "Your have successfully registered.Yay!!" :"You left! 🥺"}
                    </Alert>
                </Snackbar>
            <Typography variant="h4">Rules</Typography>
            <ul>
                <li>The King may move one square in any direction, so long as no piece is blocking his path.
                </li>
                <li>The Queen may move any number of squares straight or diagonally in any direction.
                </li>
                <li>The Rook may move in a straight line, any number of squares horizontally or vertically.
                </li>
            </ul>
            </Stack>
        </Container>
        </>
    )
}

export default TeamRegistration
