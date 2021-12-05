import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// components
import Layout from '../layout/Layout';
import MatchCard from '../components/MatchCard';
import NoticeCard from '../components/NoticeCard';

const Home = () => {
    return (
        <Layout title="Home Page">
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
                {/* Matches-section: */}
            <Box>
                <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', borderBottom:'2px dashed #00000050', marginBottom:'25px', padding:'10px 0px'}}>
                    Matches
                </Typography>
                <Grid container spacing={2}>
                    {/* -----Mappping from here----- */}
                    <Grid item xs={12} sm={6} lg={4}>
                        <MatchCard></MatchCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <MatchCard></MatchCard>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <MatchCard></MatchCard>
                    </Grid>
                </Grid>
            </Box>
            {/* Notice-section: */}
            <Box my='1rem'>
                <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', borderBottom:'2px dashed #00000050', marginBottom:'25px', padding:'10px 0px'}}>
                    Notices
                </Typography>
                <Grid container spacing={2}>
                    {/* -----Mappping from here----- */}
                    <Grid item xs={12} md={6} lg={4}>
                        <NoticeCard></NoticeCard>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <NoticeCard></NoticeCard>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <NoticeCard></NoticeCard>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        </Layout>
    )
}

export default Home;
