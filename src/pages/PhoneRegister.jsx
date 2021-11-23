import * as React from 'react'
import TextField from '@mui/material/TextField';
import Box  from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function PhoneRegister() {

    const navigate = useNavigate()
    const {id} = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const [contactNumber, setContactNumber] = React.useState('')
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
                        <Button variant="outlined" endIcon={<NavigateNextIcon />} onClick={handlePhoneRegister}>
                            Proceed
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default PhoneRegister