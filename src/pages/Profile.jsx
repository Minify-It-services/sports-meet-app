import React from 'react';
import { Container, Box, Stack, Avatar, Typography, Grid, Card, CardContent } from '@mui/material';

// data
import { sports } from '../utils/datas/sportData';

const Profile = () => {

    return (
        <Box sx={{width:'100%',height:'100vh'}}>
            <Container sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>

                <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
                    <Avatar src="./images/profile.jpg" variant="rounded" sx={{width:'100px', height:'100px'}}/>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sunil Paudel</Typography>
                        <Typography variant="caption" sx={{fontStyle: 'italic', fontWeight: 'regular'}}>be2018se001@gces.edu.np</Typography>
                    </Box>
                </Stack>

                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom:'25px' }}>Participated Sports:</Typography>
                    <Grid container spacing={1}>
                        {sports.map((sport)=>{
                            
                            const {id, typeOfSports, getIcon} = sport;

                            return(
                                <Grid key={id} item xs={6} md={3} justifyContent="center" textAlign="center">
                                    <Card>
                                        <CardContent sx={{display:'grid', gridTemplateColumns:'20% 80%'}}>
                                            <Box>{getIcon()}</Box>
                                            <Typography variant="body1" sx={{display:'flex', justifyContent:'flex-start'}}>
                                                {typeOfSports}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                            
                        })}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default Profile
