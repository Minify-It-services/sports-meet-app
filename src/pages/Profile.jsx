import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

import { Container, Box, Stack, Avatar, Typography, Button, IconButton } from '@mui/material';

// components
import Layout from '../layout/Layout';
import jsendDestructor from '../utils/api/jsendDestructor';
import { Edit } from '@mui/icons-material';
import ParticipatedSportCard from '../components/ParticipatedSportCard'

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
        const response = await jsendRes.destructFromApi(`/users/${player.id}`, 'GET')

        if(response.message && response.message==='Please authenticate')
            navigate('/register')

        setUser(response.data)
    }
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
    // const getRandomWords = () => {
    //     let text = "";
    //     const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //     for (var i = 0; i < 5; i++)
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));

    //     setSeed(text)
    // }
    useEffect(() => {
        if(!player){
            navigate('/register')
        }
        getUserData()
    // eslint-disable-next-line
    }, [])

    return (
        <Layout title="Profile Page">
            <Box sx={{width:'100%'}}>
                <Container sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <Stack direction="row" spacing={5} justifyContent="center" alignItems="center" sx={{ margin:'1em 0' }}>
                        <Avatar src={`https://avatars.dicebear.com/api/bottts/${player?.name}.svg?scale=80`} variant="rounded" sx={{width:'100px', height:'100px', border: '1px solid #25252521'}}/>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Typography variant="h6">{player?.name}</Typography>
                            <Box>
                                <Typography variant="caption" sx={{fontStyle: 'italic', fontWeight: 'regular'}}>{player?.email}</Typography>
                                <IconButton color="primary" onClick={()=>navigate('/phone-register')}>
                                    <Edit />
                                </IconButton>
                            </Box>
                            <Typography variant="subtitle2" gutterBottom component="div" color="secondary">{ `${user?.year} | ${getSem(user?.year)} sem | ${user?.faculty}`}</Typography>  
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
                        <Typography variant="h6" sx={{ fontWeight: '600', marginBottom:'25px' }}>Participated Sports:</Typography>
                        <Box display='grid'  gridTemplateColumns={{md:"repeat(2,1fr)",lg:"repeat(3,1fr)", xs:"repeat(1,1fr)", sm:"repeat(2,1fr)"}} gap={{xs:1,md:3,sm:2}} justifyContent="center">
                            {user?.teams?.map((team, id)=>{
                                const {teamName, sport, role} = team;
                                return <ParticipatedSportCard role={role} sport={sport.name} sportType={sport.gameType} title={teamName} key={id}/>
                            })}
                    </Box>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default Profile
