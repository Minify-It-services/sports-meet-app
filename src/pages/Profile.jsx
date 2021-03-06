import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

import { Container, Box, Stack, Avatar, Typography, Button, IconButton } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

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
    const [ loading, setLoading ] = useState(false)

    const getUserData = async () => {
        setLoading(true)
        const response = await jsendRes.destructFromApi(`/users/${player.id}`, 'GET')

        if(response.message && response.message==='Please authenticate')
            navigate('/register')

        setUser(response.data)
        setLoading(false)
    }

    useEffect(() => {
        if(!player){
            navigate('/register')
        }else{
            getUserData()
        }
    // eslint-disable-next-line
    }, [])

    return (
        <Layout title="Profile">
            <Box sx={{width:'100%'}}>
                <Container sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <Stack direction="row" spacing={5} justifyContent="center" alignItems="center" sx={{ margin:'1em 0' }}>
                        <Avatar src={`https://avatars.dicebear.com/api/bottts/${player?.name}.svg?scale=80`} variant="rounded" sx={{width:'100px', height:'100px', border: '1px solid #25252521'}}/>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Typography variant="h6" sx={{fontSize:'1.1rem'}}>{player?.name}</Typography>
                            <Box>
                                <Typography variant="caption" sx={{fontStyle: 'italic', fontWeight: '400', fontSize:'0.675rem'}}>{player?.email}</Typography>
                                <IconButton color="primary" onClick={()=>navigate('/phone-register')}>
                                    <Edit sx={{fontSize:'1.25rem'}} />
                                </IconButton>
                            </Box>
                            <Typography variant="subtitle2" gutterBottom component="div" color="secondary" sx={{fontSize:'0.8rem'}}>{ `${player?.year} | ${player?.semester} sem | ${player?.faculty}`}</Typography>  
                            {
                                user?.role==='admin'&&(
                                    <Button variant="outlined" sx={{ textAlign: 'center', fontSize:'0.75rem' }}>
                                        <Link style={{ color: '#1976d2', textDecoration: 'none' }} to="/admin/dashboard">Admin side</Link>
                                    </Button>
                                )
                            }
                        </Box>
                    </Stack>
                    <Box sx={{marginTop:'25px'}}>
                        <Typography variant='body1' sx={{ fontWeight: '600', marginBottom:'25px' }}>Participated Sports:</Typography>
                        {
                            loading?<LinearProgress color="inherit" />:(
                                <>
                                    {
                                    user?.teams?.length>=0?(
                                        <Box display='grid'  gridTemplateColumns={{md:"repeat(2,1fr)",lg:"repeat(3,1fr)", xs:"repeat(1,1fr)", sm:"repeat(2,1fr)"}} gap={{xs:1,md:3,sm:2}} justifyContent="center">
                                            {user?.teams?.map((team, id)=>{
                                                const {teamName, sport, role} = team;
                                                return <ParticipatedSportCard role={role} sport={sport.name||''} sportType={sport.gameType||''} title={teamName} key={id}/>
                                            })}
                                        </Box>
                                    )
                                    :<Typography variant="body2" maxWidth="450px" margin="0 auto" textAlign="center" gutterBottom component="div" color='secondary'>You are not participating in any sports. Participate in one and see them here.</Typography>}
                                </>
                            )
                        }
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default Profile
