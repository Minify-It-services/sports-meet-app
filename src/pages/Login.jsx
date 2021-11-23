import React from 'react';
import { useNavigate } from 'react-router-dom'

import {Container, Box, Typography} from '@mui/material';
import { GoogleLogin, useGoogleLogout } from 'react-google-login'

const Login = () => {

    const navigate = useNavigate()
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: () => console.log('logged out')
    })

    const getSem = (year) => {
        switch (year) {
            case '2018':
                return '5th'
            case '2017':
                return '7th'
            case '2019':
                return '3rd'
            case '2020':
                return '1st'
            default: return 'unknown'
        }
    }

    const onSuccess = (res) => {
        const { name, email, imageUrl } = res.profileObj

        if(!email.match(/^be20(1|2)(0|7|8|9)(s|c)e[0-9]{1,3}@gces.edu.np$/g)){
            // TODO: handle error
            signOut()
            return
        }
        const year = email.substring(2, 6)
        const semester = getSem(year)
        const faculty = email.substring(6, 7).toLowerCase()==='s'?'Software':'Computer'

        console.log(name, email, semester, faculty, year, imageUrl);
        //TODO: add backend

        navigate('/phone-register')
    }
    const onFailure = (res) => {
        console.log(res);
    }

    return (
        <Box sx={{width:'100%',height:'100vh'}} className='login-screen'>
            <Container sx={{height:'100%',display: 'flex',justifyContent:'center',alignItems: 'center'}}>
                <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-evenly',alignItems: 'center',height:'50%'}}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography variant="h4" sx={{fontWeight:'600'}}>Welcome to GCES</Typography>
                        <Typography variant="caption">Sign in to continue your GCES sports journey</Typography>
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText='Login with GCES account'
                            isSignedIn={false}
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Login