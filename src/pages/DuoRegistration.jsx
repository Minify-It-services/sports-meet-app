import * as React from 'react'
import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert } from '@mui/material';
import {useState} from 'react';

//TODO: Fix FONT SIZING
function SoloRegistration() {
    const [registered, setRegsitered] = useState(false);
    const [partner, setpartner] = useState({});
    const [displayMessage, setdisplayMessage] = useState('');
    const [hasError, sethasError] = useState(false);

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
      //TODO: API INTEGRATION
      const handleRegister=()=>{
        console.log(partner);
        if (!registered && !isObjEmpty(partner)) {
          sethasError(false);
          setdisplayMessage('Successfully registered a Duo Team');
          setRegsitered(true);
          setOpen(!open);
        }
        else if(registered)
        {
          sethasError(true);
          setdisplayMessage('You Left the Team');
          setpartner('');
          setRegsitered(false);
          setOpen(!open);

        }
        else{
          sethasError(true);
          setdisplayMessage('Please Fill the empty fields');
          setOpen(!open);
        }
      }
    return (
            <>
            <div className="banner" style={{minHeight:"30vh",backgroundImage: "url(https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            <Container sx={{marginTop:5}}>
            <Stack spacing={{xs:2,md:4}}>
            <Typography variant="h5">Badminton</Typography>
            <p>Fact: There are over 318 billion different possible positions after four moves each.</p>
            {!registered? <Typography variant="subtitle">Select Your Partner</Typography> :
            
            <div><Typography variant="h5">Your Partner</Typography><p>{partner.label}</p></div>
            } 
            {
               !registered? <Autocomplete
               isOptionEqualToValue={(option, value) => option.label === value.label}
                autoComplete={false}
                options={students}
                onChange={(event, value) => setpartner(value)}
                renderInput={(params) => <TextField {...params} label="Partner" variant="standard" required={true}/>}
                /> : <div></div>
            }
            <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={handleRegister}>{registered? "Leave":"Register"}</Button>
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={!hasError?"success":"error"} sx={{ width: '100%' }}>
                    {displayMessage}
                    </Alert>
                </Snackbar>
            <Typography variant="h5">Rules</Typography>
            <ul style={{margin:"0 20px",fontSize:"18px"}}>
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

export default SoloRegistration
