import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Container,Typography } from '@mui/material';
//TODO: need to redisign again

function Sports() {
    return (
        <div id="sport">
        <Container >
            <Typography variant="h5" component="h2">Select sports you want to participate</Typography>
            <Box justifyContent="center" sx={{display:"grid", gridTemplateColumns:"repeat(2,1fr)"}} gap={2} md={4}>
                <Chip onClick={()=>console.log('hi')}
                    avatar={<Avatar alt="cicket" src="/assets/img/cricket.png" />}
                    label="Circket"
                    variant="outlined"
                />
                <Chip 
                    avatar={<Avatar alt="Natacha" src="/assets/img/football.png" />}
                    label="Football"
                    variant="outlined"
                />
                <Chip 
                    avatar={<Avatar alt="Natacha" src="/assets/img/football.png" />}
                    label="Badminton"
                    variant="outlined"
                />
            </Box>
        </Container>
        </div>
    )
}

export default Sports
