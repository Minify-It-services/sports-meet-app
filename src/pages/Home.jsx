import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// components
import Layout from '../layout/Layout';
import MatchCard from '../components/MatchCard';
import NoticeCard from '../components/NoticeCard';

import jsendDestructor from '../utils/api/jsendDestructor'

const Home = () => {

    const jsendRes = new jsendDestructor()
    const [notices, setNotices] = useState([])
    const [matches, setMatches] = useState([])

    const getNotices = async () => {
        const response = await jsendRes.destructFromApi('/notices/today', 'GET')

        if(response.status === 'success'){
            setNotices(response.data);
        }else{
            console.log(response);
        }
    }

    const getMatches = async () => {
        const response = await jsendRes.destructFromApi('/matches/today', 'GET')

        if(response.status === 'success'){
            setMatches(response.data);
        }else{
            console.log(response);
        }
    }

    useEffect(() => {
        getNotices();
        getMatches();
    // eslint-disable-next-line
    }, [])

    return (
        <Layout title="Home Page">
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
            <Box>
                <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', borderBottom:'2px dashed #00000050', marginBottom:'25px', padding:'10px 0px'}}>
                    Matches
                </Typography>
                {
                    matches.length===0?(
                        <Typography color='primary' sx={{fontSize:'1rem', fontWeight: '500', padding:'10px 0px', textAlign: 'center'}}>No matches Today</Typography>
                    ):(
                        <Grid container spacing={2}>
                            {
                                matches?.map(match => (
                                    <Grid item xs={12} sm={6} lg={4} key={match.id}>
                                        <MatchCard 
                                            team1={match.team1.name} 
                                            team2={match.team2.name} 
                                            time={match.time}
                                            sports={match.sport.name}
                                            status={match.status}
                                            score1={match.score.team1Score}
                                            score2={match.score.team2Score}
                                        ></MatchCard>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    )
                }
            </Box>
            {
                notices.length!==0&&(
                    <Box my='1rem'>
                        <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', borderBottom:'2px dashed #00000050', marginBottom:'25px', padding:'10px 0px'}}>
                            Notices
                        </Typography>
                        <Grid container spacing={2}>
                            {
                                notices?.map(notice => (
                                    <Grid item xs={12} md={6} lg={4} key={notice.id}>
                                        <NoticeCard title={notice.title} desc={notice.description} status={notice.label}></NoticeCard>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                )
            }
            </Box>
        </Layout>
    )
}

export default Home;
