import React, { useState, useEffect }from 'react'
import Layout from '../layout/Layout'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import jsendDestructor from '../utils/api/jsendDestructor';

const League = () => {
    const jsendRes = new jsendDestructor()
    const [league, setLeague] = useState({})

    const getLeague = async () => {
        const { data, status } = await jsendRes.destructFromApi('/tieSheets/league', 'GET')

        if(status === 'success') {
            setLeague(data[0])
        }
    }

    useEffect(() => {
        getLeague()
        //eslint-disable-next-line
    }, [])
    return (
        <Layout title="Fixture" isSecondPage>
            <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem'>
                {
                    league?.tables?.map(table => (
                        <Box sx={{ width: '90%', margin: 'auto' }}>
                            <Typography variant="h6">{table.name}</Typography>
                            <img src={table.imageUrl} alt={table.name} width="100%" />
                        </Box>
                    ))
                }
            </Box>
        </Layout>
    )
}

export default League
