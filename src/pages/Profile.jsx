import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Box, Stack, Avatar, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Cookies from 'universal-cookie';
import jsendDestructor from '../utils/api/jsendDestructor';

import Layout from '../layout/Layout';

const Profile = () => {

    const navigate = useNavigate()
    const cookies = new Cookies()
    
    const player = JSON.parse(localStorage.getItem('player'))
    const token = cookies.get('sports_app_token')
    
    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    
    const [ user, setUser ] = useState({})

    const getUserData = async () => {
        const response = await jsendRes.destructFromApi(`/users/${player?.id}`, 'GET')

        if(response.message && response.message==='Please authenticate')
            navigate('/login')

        setUser(response.data)
    }
    useEffect(() => {
        if(!player){
            navigate('/login')
        }
        getUserData()
    // eslint-disable-next-line
    }, [])

    return (
        <Layout title="Profile Page">
            <Box sx={{width:'100%',height:'100vh'}}>
                <Container sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>

                    <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
                        <Avatar src={player?.imageUrl} variant="rounded" sx={{width:'100px', height:'100px'}}/>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{player?.name}</Typography>
                            <Typography variant="caption" sx={{fontStyle: 'italic', fontWeight: 'regular'}}>{player?.email}</Typography>
                            {
                                user?.role==='admin'&&(
                                    <Button variant="outlined" sx={{ textAlign: 'center' }}>
                                        <Link style={{ color: '#1976d2', textDecoration: 'none' }} to="/admin/dashboard">Admin side</Link>
                                    </Button>
                                )
                            }
                        </Box>
                    </Stack>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom:'25px' }}>Participated Sports:</Typography>
                        <Grid container spacing={1}>
                            {user?.teams?.map((team, id)=>{
                                
                                const {teamName, sport, role} = team;

                                return(
                                    <Grid key={id} item xs={6} md={3} justifyContent="center" textAlign="center">
                                        <Card>
                                            <CardContent>
                                                {/* <Box>{getIcon()}</Box> */}
                                                <Typography variant="body1" sx={{display:'flex', justifyContent:'flex-start'}}>
                                                    {teamName} | {sport}
                                                    <br />
                                                    {role}
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
