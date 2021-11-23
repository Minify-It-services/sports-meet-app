import * as React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Box  from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function PhoneRegister() {
    const [phoneno, setphoneno] = useState('');
    const [phoneErro, setphoneErro] = useState(false);
    const navigate=useNavigate();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setphoneErro(false);
      };
    const validatePhoneno=()=>{
        if (phoneno.match(/^\98?([0-9]{4})?([0-9]{4})$/)) {
            console.log('valid phone');
            //TODO: checked valid phone number now add user details to api
            navigate('/profile');
            
        }
        else{
            console.log('invalid phone no');
            setphoneErro(true);
            setTimeout(() => {
                setphoneErro(false);
            }, 1500);
        }
    }
    return (
        <div id="phone">
            <Container sx={{height:"100vh"}}>
                <Box sx={{display:'grid', gridTemplateRows:'3fr 0fr 4fr 2fr', height:"100%"}}>
                    <Typography variant="h4" gutterBottom component="div" sx={{alignSelf:"end"}}>Enter Your Phone number</Typography>
                    <Typography variant="p" gutterBottom component="div">Please enter your correct phone number</Typography>
                    <TextField id="standard-basic" label="Phone no" variant="standard" type="number" onChange={(e) => setphoneno(e.target.value)}/>
                    <Box gridRow="span 4" sx={{alignSelf:"center", justifySelf:"end"}}>
                        <Button variant="outlined" endIcon={<NavigateNextIcon />} onClick={validatePhoneno}>Proceed</Button>
                    </Box>
                </Box>
                <Snackbar open={phoneErro} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={"error"} sx={{ width: '100%' }}>
                        "Enter Valid Phone Number"
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default PhoneRegister