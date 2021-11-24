import * as React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()
    const id = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [contactNumber, setContactNumber] = React.useState('');
    const [phoneErro, setphoneErro] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setphoneErro(false);
      };

    const validatePhoneno=async()=>{
        if (contactNumber.match(/^\98?([0-9]{4})?([0-9]{4})$/)) {
           await handlePhoneRegister();
        }
        else{
            setphoneErro(true);
            setTimeout(() => {
                setphoneErro(false);
            }, 1500);
        }
    }
    const handlePhoneRegister = async ()=>{
        let response = {}
         await axios({
            method: 'PATCH',
            baseURL: process.env.REACT_APP_ENVIRONMENT === 'development'?'http://localhost:5000/v1':'Hosting URL',
            url: `/users/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
               contactNumber,
            }
        }).then(res => response = res.data)
        .catch(err => response = err.response.data)

        const {status, data, message} = response
        if(status === 'success'){
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/profile')
        }
        else{
            console.log(data, message);
        }
    }
    return (
        <div id="phone">
            <Container sx={{height:"100vh"}}>
                <Box sx={{display:'grid', gridTemplateRows:'3fr 0fr 4fr 2fr', height:"100%"}}>
                    <Typography variant="h4" gutterBottom component="div" sx={{alignSelf:"end"}}>Enter Your Phone number</Typography>
                    <Typography variant="p" gutterBottom component="div">Please enter your correct phone number</Typography>
                    <TextField id="standard-basic" label="Phone no" name="contactNumber" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} variant="standard" type="number"/>
                    <Box gridRow="span 4" sx={{alignSelf:"center", justifySelf:"end"}}>
                        <Button variant="outlined" endIcon={<NavigateNextIcon />} onClick={validatePhoneno}>
                            Proceed
                        </Button>
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