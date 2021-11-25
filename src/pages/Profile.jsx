import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, Stack, Avatar, Typography, Grid, Card, CardContent } from '@mui/material';

// data
import Layout from '../layout/Layout';

const Profile = () => {

    const navigate = useNavigate()
    
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    const [ user, setUser ] = useState({})

    const getUserData = async () => {
        let response = {}
        await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_ENVIRONMENT === 'development'?'http://localhost:5000/v1':'Hosting URL',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            url: `/users/${id}`,
        }).then(res => response = res?.data.data)
          .catch(err => response = err?.response.data)

        if(response.message && response.message==='Please authenticate')
            navigate('/login')

        setUser(response)
    }

    useEffect(() => {
        if(!id){
            navigate('/login')
        }
        getUserData()
    // eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <Box sx={{width:'100%',height:'100vh'}}>
                <Container sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>

                    <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
                        <Avatar src="./images/profile.jpg" variant="rounded" sx={{width:'100px', height:'100px'}}/>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
                            <Typography variant="caption" sx={{fontStyle: 'italic', fontWeight: 'regular'}}>{user.email}</Typography>
                        </Box>
                    </Stack>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom:'25px' }}>Participated Sports:</Typography>
                        <Grid container spacing={1}>
                            {user?.teams?.map((sport)=>{
                                
                                const {id, typeOfSports, getIcon} = sport;

                                return(
                                    <Grid key={id} item xs={6} md={3} justifyContent="center" textAlign="center">
                                        <Card>
                                            <CardContent sx={{display:'grid', gridTemplateColumns:'20% 80%'}}>
                                                <Box>{getIcon()}</Box>
                                                <Typography variant="body1" sx={{display:'flex', justifyContent:'flex-start'}}>
                                                    {typeOfSports}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                                
                            })}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default Profile
