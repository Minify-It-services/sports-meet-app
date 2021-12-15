import React, { useState, useEffect }from 'react'
import Layout from '../layout/Layout'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import jsendDestructor from '../utils/api/jsendDestructor';

const TieSheet = () => {
    const jsendRes = new jsendDestructor()
    const [tieSheets, setTieSheets] = useState({})

    const getTieSheets = async () => {
        const { data, status } = await jsendRes.destructFromApi('/tieSheets', 'GET')

        if(status === 'success') {
            setTieSheets(data[0])
        }
    }

    useEffect(() => {
        getTieSheets()
        //eslint-disable-next-line
    }, [])
    return (
        <Layout title="Fixture" isSecondPage>
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.badmintonBoys?.name}</Typography>
                    <img src={tieSheets?.badmintonBoys?.imageUrl} alt={tieSheets?.badmintonBoys?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.badmintonGirls?.name}</Typography>
                    <img src={tieSheets?.badmintonGirls?.imageUrl} alt={tieSheets?.badmintonGirls?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.badmintonBoysDouble?.name}</Typography>
                    <img src={tieSheets?.badmintonBoysDouble?.imageUrl} alt={tieSheets?.badmintonBoysDouble?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.badmintonGirlsDouble?.name}</Typography>
                    <img src={tieSheets?.badmintonGirlsDouble?.imageUrl} alt={tieSheets?.badmintonGirlsDouble?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.tableTennisBoys?.name}</Typography>
                    <img src={tieSheets?.tableTennisBoys?.imageUrl} alt={tieSheets?.tableTennisBoys?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.tableTennisGirls?.name}</Typography>
                    <img src={tieSheets?.tableTennisGirls?.imageUrl} alt={tieSheets?.tableTennisGirls?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.tableTennisBoysDouble?.name}</Typography>
                    <img src={tieSheets?.tableTennisBoysDouble?.imageUrl} alt={tieSheets?.tableTennisBoysDouble?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.tableTennisGirlsDouble?.name}</Typography>
                    <img src={tieSheets?.tableTennisGirlsDouble?.imageUrl} alt={tieSheets?.tableTennisGirlsDouble?.name} width="100%" />
                </Box>
                <Box sx={{ width: '90%', margin: 'auto' }}>
                    <Typography variant="h6">{tieSheets?.chess?.name}</Typography>
                    <img src={tieSheets?.chess?.imageUrl} alt={tieSheets?.chess?.name} width="100%" />
                </Box>
            </Box>
        </Layout>
    )
}

export default TieSheet
