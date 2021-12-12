import React from 'react';
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';

import Cookies from 'universal-cookie'
import jsendResDestructor from '../../../utils/api/jsendDestructor'

// components
import DrawerBar from '../../../components/DrawerBar';

const TeamDetail = () => {

    const { teamId } = useParams()
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('sports_app_token')
    const jsendRes = new jsendResDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    const [team, setTeam] = useState({});

    const fetchTeam = async ()=>{
        const response = await jsendRes.destructFromApi(`/teams/${teamId}`,'GET')
        if(response.status === 'success'){
            console.log(response.data);
            setTeam(response.data)
        }
        else{
            console.log(response.message);
        }
    }
    useEffect(() => {
       fetchTeam()
    // eslint-disable-next-line
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Team'} pageId ={3} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:'flex-start'}}>
                    <Button onClick={()=>navigate(-1)}> <ArrowBackIosIcon /></Button>
                </Box>
                <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Contact Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                team?._doc?.manager&&(
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">Manager</TableCell>
                                        <TableCell align="center">{team?._doc.manager?.name}</TableCell>
                                        <TableCell align="center">{team?._doc.manager?.contactNumber}</TableCell>
                                    </TableRow>
                                )
                            }
                            {
                                team?._doc?.coach&&(
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">Coach</TableCell>
                                        <TableCell align="center">{team?._doc.coach?.name}</TableCell>
                                        <TableCell align="center">{team?._doc.coach?.contactNumber}</TableCell>
                                    </TableRow>
                                )
                            }
                            {
                                team?.members?.map(member => (
                                    <TableRow key={member.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">Player</TableCell>
                                        <TableCell align="center">{member.name}</TableCell>
                                        <TableCell align="center">{member.contactNumber}</TableCell>
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

export default TeamDetail
