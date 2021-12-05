import React from 'react'
import FixtureCard from '../components/FixtureCard'
import Layout from '../layout/Layout'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function Fixture() {
    return (
        <Layout title="Fixture Page">
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
            <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', }}>Team Games</Typography>
                <FixtureCard/>
            </Box>
        </Layout>
    )
}

export default Fixture
