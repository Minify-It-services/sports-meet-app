import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Cookies from 'universal-cookie';

import TextField from '@mui/material/TextField';
import Box  from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// components:
import jsendDestructor from '../utils/api/jsendDestructor';

const PhoneRegister = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const { id } = JSON.parse(localStorage.getItem('player'));
    const token = cookies.get('sports_app_token');

    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })

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
        const response = await jsendRes.destructFromApi(`/users/${id}`, 'PATCH', {contactNumber})
        const {status, data, message} = response

        if(status === 'success'){
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