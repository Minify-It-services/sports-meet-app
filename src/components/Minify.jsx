import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Minify = () => {
    return (
        <Box mx={{xs:'1rem', sm:'3rem', md:'5rem', lg:'9rem'}} my='1rem' sx={{ marginTop: '2em', textAlign: 'center', paddingTop: '1em', borderTop: '1px dashed #000'}}>
            <img src='/images/minifylogo.png' alt="minify logo" width="60px" /> <br />
            <Typography variant="caption"><b>Coded By:</b> Minify It Service Team</Typography>
        </Box>
    )
}

export default Minify
