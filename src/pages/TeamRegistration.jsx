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
import Chip from '@mui/material/Chip';


function TeamRegistration() {
    const [registered, setRegsitered] = useState(false);
    const [manager, setmanager] = useState({});
    const [coach, setcoach] = useState({});
    const [captain, setcaptain] = useState({});
    const [players, setplayers] = useState([]);
    const [extraPlayers, setextraPlayers] = useState([]);
    const [hasError, sethasError] = useState(false);
    const [displayMessage, setdisplayMessage] = useState('');
    const [team, setteam] = useState({});
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
      const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
          return true;
        }
        else return false;
      }

      const handleRegister=()=>{
          if (!registered && players.length!==0 && extraPlayers.length!==0 && !isObjEmpty(coach) && !isObjEmpty(manager) && !isObjEmpty(captain)) {
            setdisplayMessage('Successfully registered a Team');
            setteam(
              {"name": "Software 5th sem Team A",
            "year": "2018",
            "semester": "5th",
            "faculty": "Software",
            "memberIds":[...players,...extraPlayers],
            "coach": coach,
            "manager": manager,
            "captain": captain,
            "sportId":"6198e9e4cd4bc645a092f230",
          }
          );
            sethasError(false);
            console.log('team register vayo!');
            console.log(team);
           setRegsitered(true);
           setOpen(!open);
          }
          else if(registered)
          {
            console.log('leave hanyo! ');
            sethasError(true);
            setdisplayMessage('You Left the Team');
            setRegsitered(false);
            setOpen(!open);
          }
          else{
            sethasError(true);
            setdisplayMessage('Please Fill the empty fields');
            setOpen(!open);
            console.log('partner chaina');
          }
        // console.log(manager,coach,captain,players,extraPlayers);
      }

      const handleLimitedPlayers=(checkIn,maxLimit)=>{
        if (checkIn.length>=maxLimit)
        return true
        else
          return false
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
            {!registered? <Stack spacing={{xs:2,md:4}}>
              <div>
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
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.label === value.label}
                multiple
                onChange={(event,value)=>setplayers(value)}
                options={students}
                getOptionDisabled={()=>handleLimitedPlayers(players,2)}
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
                  <Autocomplete
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  disablePortal
                  onChange={(event,value)=>setcoach(value)}
                  options={students}
                  renderInput={(params) => <TextField {...params} label="Coach" variant="standard" />}
                />
              </div>
              <div>
                <Autocomplete
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  multiple
                  options={students}
                  getOptionDisabled={()=>handleLimitedPlayers(extraPlayers,3)}
                  onChange={(event,value)=>setextraPlayers(value)}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Extras"
                    />
                  )}
                />
              </div>
            </Stack> : <Chip label="Chip Outlined" variant="outlined" />
            }
            <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={()=>handleRegister()}>{registered? "Leave":"Register"}</Button>
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={hasError?"error":"success"} sx={{ width: '100%' }}>
                    {displayMessage}
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
