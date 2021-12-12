import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// components
import Layout from '../layout/Layout';
import MatchCard from '../components/MatchCard';
import NoticeCard from '../components/NoticeCard';

import jsendDestructor from '../utils/api/jsendDestructor'
import Minify from '../components/Minify';

const Home = () => {

    const jsendRes = new jsendDestructor()
    const [notices, setNotices] = useState([])
    const [matches, setMatches] = useState([])
    const [shownMatches, setShownMatches] = useState([])
    const [loading, setLoading] = useState(false)
    const [sports, setSports] = useState([])
    const [sport, setSport] = useState('all');

    const getNotices = async () => {
        const response = await jsendRes.destructFromApi('/notices/today', 'GET')

        if(response.status === 'success'){
            setNotices(response.data);
        }else{
            console.log(response);
        }
    }

    const getMatches = async () => {
        setLoading(true)
        const response = await jsendRes.destructFromApi('/matches/today', 'GET')

        if(response.status === 'success'){
            setMatches(response.data);
            setShownMatches(response.data);
        }else{
            console.log(response);
        }
        setLoading(false)
    }

    const fetchSports = async ()=>{
        const response = await jsendRes.destructFromApi('/sports','GET')
        if(response.status === 'success'){
            setSports(response.data)
        }
        else{
            console.log(response.message);
        }
    }

    useEffect(() => {
        getNotices();
        getMatches();
        fetchSports();
    // eslint-disable-next-line
    }, [])

    const handleChange = async (e) => {
        setSport(e.target.value)
        if(e.target.value==='all')
            setShownMatches(matches)
        else
            setShownMatches(matches.filter(match => match.sport.name===e.target.value))
    }

    return (
        <Layout title="Home">
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', borderBottom:'2px dashed #00000050', marginBottom:'25px', padding:'10px 0px'}}>
                        Matches
                    </Typography>
                    <FormControl sx={{ width: '200px', marginRight: '1em' }}>
                        <InputLabel id="demo-simple-select-label">Sport</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sport}
                            label="Sport"
                            onChange={e => handleChange(e)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            {
                                sports.map(sport => (<MenuItem value={sport.name} key={sport.id}>{sport.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </Box>
                {
                    loading?<LinearProgress color="inherit" />:(<>
                        {
                            shownMatches.length===0?(
                                <Typography color='primary' sx={{fontSize:'1rem', fontWeight: '500', padding:'10px 0px', textAlign: 'center'}}>No matches Today</Typography>
                            ):(
                                <Grid container spacing={2}>
                                    {
                                        shownMatches?.map(match => (
                                            <Grid item xs={12} sm={6} lg={4} key={match.id}>
                                                <MatchCard 
                                                    match={match}
                                                    sportName={match.sport.name}
                                                ></MatchCard>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            )
                        }
                    </>)
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
            <Minify />
        </Layout>
    )
}

export default Home;
