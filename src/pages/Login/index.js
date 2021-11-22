import React from 'react';
import {Container, Box, Typography, Button} from '@mui/material';
import {Link} from 'react-router-dom';

const Login = () => {
    return (
        <Box sx={{width:'100%',height:'100vh'}} className='login-screen'>
            <Container sx={{height:'100%',display: 'flex',justifyContent:'center',alignItems: 'center'}}>
                <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-evenly',alignItems: 'center',height:'50%'}}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography variant="h4" sx={{fontWeight:'600'}}>Welcome to GCES</Typography>
                        <Typography variant="caption">Sign in to continue your GCES sports journey</Typography>
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                        <Button variant="contained">
                            <Link to="/phone-register" style={{textDecoration:'none', color:'white'}}>Login with GCES account</Link>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Login
