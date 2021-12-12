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

    const [ notUser, setNotUser ] = useState(false)

    const navigate = useNavigate()
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: () => console.log('logged out')
    })

    const onSuccess = async (res) => {
        const { email } = res.profileObj

        setNotUser(false)

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
                gender: data.user.gender,
                contactNumber: data.user.contactNumber,
            }
            localStorage.setItem('player', JSON.stringify(player))
            let date = new Date()
            date.setDate(date.getDate() + 30)
            cookies.set('sports_app_token', data.tokens.access.token, { expires: date })
            
            navigate('/profile')
        }
        else{
            signOut();
            console.log(data, message);
            if(message === 'Incorrect email'){
                setNotUser(true)
            }
        }

    }
    const onFailure = (res) => {
        console.log(res);
    }

    return (
        <Box sx={{width:'100%',height:'100vh'}} className='login-screen'>
            <Container sx={{height:'100%',display: 'flex',justifyContent:'center',alignItems: 'center'}}>
                <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-evenly',alignItems: 'center',height:'60%'}}>
                    <Box sx={{textAlign:'center'}}>
                        <Typography color="primary" variant="h4" sx={{fontWeight:'600'}}>Welcome to GCES</Typography>
                        <Typography variant="subtitle2" sx={{fontWeight:'500', opacity:'0.5'}}>Log in to continue your GCES sports journey</Typography>
                    </Box>
                    <Box sx={{border: (notUser&&'1px solid #dc3545') }}>
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText='Login with GCES account'
                            isSignedIn={false}
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        />
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                        <Typography variant="caption" sx={{fontWeight:'500', opacity:'0.75'}}>OR</Typography>
                        <Typography variant="body2" sx={{fontWeight:'500', opacity:'0.75'}}>
                            Don't have an account?<br/>
                            <Link to="/register">Register Now</Link>
                        </Typography>
                    </Box>
                    {
                        notUser&&(
                            <Box sx={{textAlign: 'center'}}>
                                <Typography variant="subtitle2" sx={{color: '#dc3545'}}>User Not Found</Typography>
                            </Box>
                        )
                    }
                </Box>
            </Container>
        </Box>
    )
}

export default Login
