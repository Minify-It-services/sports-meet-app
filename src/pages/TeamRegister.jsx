import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import { Box, Container, Typography, Paper, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles';
import jsendDestructor from '../utils/api/jsendDestructor'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'

const Item = styled(Paper)(() => ({
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
  }));

const TeamRegister = () => {

    const cookies = new Cookies()
    const token = cookies.get('sports_app_token')
    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    const [ sports, setSports ] = useState([])
    const getSports = async ()=> {
        const {data, status, message} = await jsendRes.destructFromApi('/sports', 'GET')
        if(status === 'success'){
            setSports(data)
        }
        else{
            console.log(data, message);
        }
    }
    useEffect(() => {
        getSports()
    }, [])

    return (
        <Layout title='Team Register'>
            <Box sx={{ width: '100%' }}>
                <Container sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'start'}}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        Select sport you want to participate 
                    </Typography>
                    <Box sx={{display:'flex', flexWrap:'wrap', gap:'.5em', padding: '1em 0'}}>
                        {
                            sports?.map(sport=> {
                                let type = 'solo-registration'
                                if(sport.type === 'team'){
                                    type = 'team-registration'
                                }
                                if(sport.type === "duo"){
                                    type = 'duo-registration' 
                                }
                                return (
                                    <Link to={`/teamRegister/${type}`} key={sport.id} state={sport} style={{ textDecoration: 'none' }}>
                                        <Item sx={{display:'grid', gridTemplateColumns:'1fr 2fr', placeItems:'center', padding: '.5em 1em' }} elevation={8}>
                                            <Avatar src="https://media.istockphoto.com/photos/white-sphere-3d-render-on-background-picture-id1272466666?b=1&k=20&m=1272466666&s=170667a&w=0&h=OjcZdMXyoeRSmTzaQs7vgOZI_ks2YSzRQxh7KobCaq4=">
                                                A
                                            </Avatar>
                                            <Typography variant="body1">{sport.name}</Typography>
                                        </Item> 
                                    </Link>
                                )
                            })
                        }
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default TeamRegister
