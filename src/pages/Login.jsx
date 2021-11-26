import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import {Container, Box, Typography} from '@mui/material';
import { GoogleLogin, useGoogleLogout } from 'react-google-login'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Login = () => {

    const cookies = new Cookies()

    const [ differentEmail, setDifferentEmail ] = useState(false)
    const token = cookies.get('sports_app_token')
    const player = JSON.parse(localStorage.getItem('player'))

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

    const onSuccess = async (res) => {
        const { name, email, imageUrl } = res.profileObj

        if(!email.match(/^be20(1|2)(0|7|8|9)(s|c)e[0-9]{1,3}@gces.edu.np$/g)){
            setDifferentEmail(true)
            signOut()
            return
        }
        setDifferentEmail(false)
        const year = email.substring(2, 6)
        const semester = getSem(year)
        const faculty = email.substring(6, 7).toLowerCase()==='s'?'Software':'Computer'

        let response = {}
            if(player){
                await axios({
                    method: 'POST',
                    baseURL: process.env.REACT_APP_ENVIRONMENT === 'development'?'http://localhost:5000/v1':'Hosting URL',
                    url: '/auth/login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        email,
                    }
                }).then(res => response = res.data)
                .catch(err => response = err.response.data)
            }
            else{
                await axios({
                   method: 'POST',
                   baseURL: process.env.REACT_APP_ENVIRONMENT === 'development'?'http://localhost:5000/v1':'Hosting URL',
                   url: '/auth/register',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   data: {
                       name,
                       email,
                       year,
                       faculty,
                       semester,
                       imageUrl,
                   }
               }).then(res => response = res.data)
               .catch(err => response = err.response.data)
            }

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
            if(data.user.contactNumber!==''){
                navigate('/profile')
            }
            else{
                navigate('/phone-register')
            }
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
                        <Typography variant="caption">Sign in to continue your GCES sports journey</Typography>
                    </Box>
                    <Box sx={{textAlign:'center', border: (differentEmail&&'1px solid #dc3545') }}>
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText={`${token?'Login':'SignUp'} with GCES account`}
                            isSignedIn={false}
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        />
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
