import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import {Container, Box, Typography} from '@mui/material';
import { GoogleLogin, useGoogleLogout } from 'react-google-login';

// components
import jsendDestructor from '../utils/api/jsendDestructor';

const Login = () => {

    const cookies = new Cookies()
    const jsendRes = new jsendDestructor()

    const [ differentEmail, setDifferentEmail ] = useState(false)

    const navigate = useNavigate()
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: () => console.log('logged out')
    })

    const onSuccess = async (res) => {
        const { email } = res.profileObj

        if(!email.match(/^be20(1|2)(0|7|8|9)(s|c)e[0-9]{1,3}@gces.edu.np$/g)){
            setDifferentEmail(true)
            signOut()
            return
        }
        setDifferentEmail(false)

        const response = await jsendRes.destructFromApi('/auth/login', 'POST', {email})

        const {status, data, message} = response
        if(status === 'success'){
            const player = {
                id: data.user.id,
                year: data.user.year,
                semester: data.user.semester,
                faculty: data.user.faculty,
                email: data.user.email,
                imageUrl: data.user.imageUrl,
                name: data.user.name,
            }
            localStorage.setItem('player', JSON.stringify(player))
            let date = new Date()
            date.setDate(date.getDate() + 30)
            cookies.set('sports_app_token', data.tokens.access.token, { expires: date })
            
            navigate('/profile')
        }
        else{
            console.log(data, message);
        }

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
                        <Typography variant="caption">Log in to continue your GCES sports journey</Typography>
                    </Box>
                    <Box sx={{textAlign:'center', border: (differentEmail&&'1px solid #dc3545') }}>
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText='Login with GCES account'
                            isSignedIn={false}
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        />
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                        <Typography variant="caption">OR</Typography>
                        <Typography variant="body2">
                            Don't have an account?
                            <Link to="/register">Register Now</Link>
                        </Typography>
                    </Box>
                    {
                        differentEmail&&(
                            <Box sx={{textAlign: 'center'}}>
                                <Typography variant="h6" sx={{color: '#dc3545'}}>Please Use the Bese Email</Typography>
                            </Box>
                        )
                    }
                </Box>
            </Container>
        </Box>
    )
}

export default Login
