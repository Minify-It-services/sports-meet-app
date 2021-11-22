import * as React from 'react'
import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import {useState} from 'react';


function SoloRegistration() {
    const [registered, setRegsitered] = useState(false);
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
        setRegsitered(!registered);
        setOpen(!open);
        if (open) {
           setTimeout(() => {
           setOpen(false); 
        }, 1000); 
        }
      }
    return (
            <>
            <div className="banner" style={{minHeight:"30vh",backgroundImage: "url(" + "https://i2-prod.irishmirror.ie/incoming/article8074062.ece/ALTERNATES/s1227b/Atletico-Madrid-v-Real-Madrid.jpg" + ")",
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
                disablePortal
                id="combo-box-demo"
                options={students}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Partner" variant="standard" />}
                />
              </div>
              <div>
              {/* <Typography variant="subtitle">Players</Typography> */}
              <Autocomplete
                multiple
                id="tags-standard"
                options={students}
                limitTags={2}
                getOptionLabel={(option) => option.label}
                // defaultValue={[students[0]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Players"
                    placeholder="Favorites"
                  />
                )}
              />
              </div>
              <div>
                {/* <Typography variant="subtitle">Coach</Typography> */}
                  <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={students}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Coach" variant="standard" />}
                />
              </div>
              <div>
              {/* <Typography variant="subtitle">Extras</Typography> */}
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={students}
                  limitTags={2}
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

export default SoloRegistration
