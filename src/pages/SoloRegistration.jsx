import * as React from 'react'
import {useState} from 'react';

import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//TODO: need fixing
function SoloRegistration() {
    const [registered, setRegsitered] = useState(false);
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
      }
    return (
            <>
            <div className="banner" style={{minHeight:"30vh",backgroundImage: "url(https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            <Container sx={{marginTop:5}}>
            <Stack spacing={3}>
            <Typography variant="h4">Chess</Typography>
            <p>Fact: There are over 318 billion different possible positions after four moves each.</p>
            <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={()=>handleRegister()}>{registered? "Leave":"Register"}</Button>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
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
