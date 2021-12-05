import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import TextField from '@mui/material/TextField';
import Box  from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// components:
import jsendDestructor from '../utils/api/jsendDestructor';

const PhoneRegister = () => {
    const navigate = useNavigate()
    const cookies = new Cookies()
    const player = JSON.parse(localStorage.getItem('player'));
    const token = cookies.get('sports_app_token');

    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })

    const [contactNumber, setContactNumber] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [phoneErro, setphoneErro] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('')
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
            setDisplayMessage('"Enter Valid Phone Number"')
            setTimeout(() => {
                setphoneErro(false);
            }, 1500);
        }
    }
    const handlePhoneRegister = async ()=>{
        const response = await jsendRes.destructFromApi(`/users/${player.id}`, 'PATCH', {contactNumber, gender})
        const {status, data, message} = response

        if(status === 'success'){
            const newPlayer = {
                ...player,
                gender: data.gender,
                contactNumber: data.contactNumber,
            }
            localStorage.setItem('player', JSON.stringify(newPlayer))
            navigate('/profile')
        }
        else{
            if(message==='"gender" must be one of [male, female], "gender" is not allowed to be empty'){
                setphoneErro(true)
                setDisplayMessage('Please select a gender')
            }
        }
    }

    useEffect(() => {
        if(player.contactNumber)
            setContactNumber(player.contactNumber)
        if(player.gender)
            setGender(player.gender)
    // eslint-disable-next-line
    }, [])

    return (
        <div id="phone">
            <Container sx={{height:"95vh"}}>
                <Box sx={{display:'grid', gridTemplateRows:'4fr 1fr 1fr 1fr 4fr', height:"100%"}}>
                    {/* phone-number */}
                    <Typography color="primary" variant="body1" gutterBottom component="div" sx={{alignSelf:"end", fontWeight:'500', fontSize:'1.15rem'}}>
                        Enter Your Phone number
                    </Typography>
                    <TextField id="standard-basic" label="Phone no" name="contactNumber" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} variant="standard" type="number"/>
                    {/* select-gender */}
                    <Typography color="primary" variant="body1" gutterBottom component="div" sx={{alignSelf:"end", fontWeight:'500', fontSize:'1.15rem'}}>
                        Please Select Gender
                    </Typography>
                    <FormControl component="fieldset">
                        {/* <FormLabel component="legend" sx={{fontSize:'0.9rem'}}>Gender</FormLabel> */}
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={gender} required={true}>
                            <FormControlLabel value="female" control={<Radio size="small" color="primary" />} label="Female" onClick={(e)=> setGender(e.target.value)} />
                            <FormControlLabel value="male" control={<Radio size="small" color="primary" />} label="Male" onClick={(e)=> setGender(e.target.value)} />
                        </RadioGroup>
                    </FormControl>
                    {/* proceed-button */}
                    <Box gridRow="span 4" sx={{alignSelf:"end", justifySelf:"end"}}>
                        <Button color="primary" variant="contained" endIcon={<NavigateNextIcon />} onClick={validatePhoneno}>
                            Proceed
                        </Button>
                    </Box>
                </Box>

                <Snackbar open={phoneErro} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={"error"} sx={{ width: '100%' }}>
                        {displayMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
    }
export default PhoneRegister