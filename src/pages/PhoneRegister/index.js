import * as React from 'react'
import TextField from '@mui/material/TextField';
import Box  from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link} from 'react-router-dom';

function PhoneRegister() {
    return (
        <div id="phone">
            <Container sx={{height:"100vh"}}>
                <Box sx={{display:'grid', gridTemplateRows:'3fr 0fr 4fr 2fr', height:"100%"}}>
                    <Typography variant="h4" gutterBottom component="div" sx={{alignSelf:"end"}}>Enter Your Phone number</Typography>
                    <Typography variant="p" gutterBottom component="div">Please enter your correct phone number</Typography>
                    <TextField id="standard-basic" label="Phone no" variant="standard" type="number"/>
                    <Box gridRow="span 4" sx={{alignSelf:"center", justifySelf:"end"}}>
                        <Button variant="outlined" endIcon={<NavigateNextIcon />}>
                            <Link to="/profile" style={{textDecoration:'none', color:'primary'}}>Proceed</Link>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default PhoneRegister