import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import DrawerBar from '../../../components/DrawerBar';
import jsendDestructor from '../../../utils/api/jsendDestructor';
import { Chip } from '@mui/material';

const Dashboard = () => {

    const date = new Date();
    const navigate = useNavigate()
    const cookies = new Cookies();
    
    const token = cookies.get('sports_app_token');
    const [counts, setCounts] = useState({})
    const [matches, setMatches] = useState([])

    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    
    const getData = async () => {
        const { data, status, message } = await jsendRes.destructFromApi('/admin/dashboard', 'GET')

        if(status === 'success'){
            setCounts(data)
        }else{
            if(message === 'Forbidden')
            navigate('/profile')
        }
    }
    const getTodayMatches = async () => {
        const { data, status, message } = await jsendRes.destructFromApi('/matches/today')

        if(status === 'success')
            setMatches(data)
        else
            console.log(data, message);
    }

    useEffect(() => {
        getData();
        getTodayMatches();
    // eslint-disable-next-line
    }, []);
    
    return (
        <Box sx={{ display: 'flex', marginBottom:'50px' }}>
            <DrawerBar pageName={'Dashboard'} pageId={1} />
            <Box sx={{ flexGrow: 1, pt: 12.5, px: { xs: 2, sm: 3, md: 5 } }}>
                {/* cards: total numbers */}
                <Stack direction='row' spacing={5}>
                    <Card sx={{width:'150px'}} >
                        <CardContent align='center'>
                            <Typography variant='h7' sx={{fontWeight:'400', opacity:'0.75'}}>
                                Players
                            </Typography>
                            <Typography variant='h3' sx={{fontWeight:'500'}}>
                                {counts.totalUsers}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{width:'150px'}} >
                        <CardContent align='center'>
                            <Typography variant='h7' sx={{fontWeight:'400', opacity:'0.75'}}>
                                Sports
                            </Typography>
                            <Typography variant='h3' sx={{fontWeight:'500'}}>
                                {counts.totalSports}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{width:'150px'}} >
                        <CardContent align='center'>
                            <Typography variant='h7' sx={{fontWeight:'400', opacity:'0.75'}}>
                                Teams
                            </Typography>
                            <Typography variant='h3' sx={{fontWeight:'500'}}>
                                {counts.totalTeams}
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
                <TableContainer component={Paper} sx={{ marginTop:'50px'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{height:'100px'}}>
                                <TableCell align="left" sx={{fontSize:'2rem', fontWeight:'600'}}>Matches Of The Day</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" sx={{fontSize:'1.25rem', fontWeight:'500', opacity:'0.85'}}>{date.toISOString().substr(0, 10)}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                matches.map((match, i) => (
                                    <TableRow>
                                        <TableCell align="left">
                                            <span style={{marginRight:'25px'}}>{match.team1.name}</span>
                                            <strong>VS</strong>
                                            <span style={{marginLeft:'25px'}}>{match.team2.name}</span>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Chip
                                                size="small"
                                                variant="outlined"
                                                color={match.sport.gameType==='team'?'primary':match.sport.gameType==='duo'?'warning':'success'}
                                                label={match.sport.name}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{match.time}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Dashboard
